from __future__ import annotations

import argparse
import json
import os
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_FILE = ROOT / "papers.js"
DRAFT_DIR = ROOT / "library_drafts"
DEFAULT_MODEL = os.environ.get("OPENAI_MODEL", "gpt-5.4-mini")
MAX_TEXT_CHARS = 42000


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-zA-Z0-9가-힣]+", "-", value.strip().lower()).strip("-")
    return slug[:80] or "paper"


def clean_text(value: str) -> str:
    value = re.sub(r"[ \t]+", " ", value)
    value = re.sub(r"\n{3,}", "\n\n", value)
    return value.strip()


def extract_pdf_text(pdf_path: Path, max_pages: int) -> str:
    try:
        from pypdf import PdfReader
    except ImportError as exc:
        raise RuntimeError(
            "pypdf is required. Use the bundled Codex Python runtime or install pypdf."
        ) from exc

    reader = PdfReader(str(pdf_path))
    chunks: list[str] = []
    for page in reader.pages[:max_pages]:
        chunks.append(page.extract_text() or "")
    return clean_text("\n".join(chunks))[:MAX_TEXT_CHARS]


def guess_title(pdf_path: Path, text: str) -> str:
    for line in text.splitlines()[:45]:
        candidate = clean_text(line)
        lower = candidate.lower()
        if (
            18 <= len(candidate) <= 190
            and len(candidate.split()) >= 4
            and "abstract" not in lower
            and "openreview" not in lower
            and "proceedings" not in lower
        ):
            return candidate
    return pdf_path.stem.replace("_", " ").replace("-", " ").strip().title()


def relative_path(path: Path) -> str:
    try:
        return path.resolve().relative_to(ROOT).as_posix()
    except ValueError:
        return path.as_posix()


def base_entry(pdf_path: Path, args: argparse.Namespace, text: str) -> dict:
    title = args.title or guess_title(pdf_path, text)
    return {
        "id": args.id or slugify(pdf_path.stem),
        "title": title,
        "authors": [],
        "collection": args.collection,
        "venue": args.venue,
        "year": args.year,
        "type": args.type,
        "priority": args.priority,
        "pdf": relative_path(pdf_path),
        "source": args.source,
        "tags": args.tags,
        "keywords": args.tags[:3],
        "summary": "PDF 텍스트 추출은 완료되었고, 요약은 아직 생성되지 않았습니다.",
        "abstractKo": "초록 번역은 아직 생성되지 않았습니다.",
        "problem": "문제 정의가 아직 생성되지 않았습니다.",
        "objective": "목표가 아직 생성되지 않았습니다.",
        "keyIdea": "핵심 아이디어가 아직 생성되지 않았습니다.",
        "contribution": "기여가 아직 생성되지 않았습니다.",
        "takeaways": [
            "원문 텍스트를 바탕으로 요약을 생성할 준비가 되어 있습니다.",
            "OPENAI_API_KEY가 설정되면 이 초안은 자동 브리프로 교체됩니다.",
        ],
        "question": "이 논문의 핵심 주장과 한계를 추가 확인해야 합니다.",
    }


def response_text(payload: dict) -> str:
    if isinstance(payload.get("output_text"), str):
        return payload["output_text"]

    parts: list[str] = []
    for item in payload.get("output", []):
        for content in item.get("content", []):
            if isinstance(content, dict) and isinstance(content.get("text"), str):
                parts.append(content["text"])
    return "\n".join(parts).strip()


def parse_json_text(value: str) -> dict:
    value = value.strip()
    value = re.sub(r"^```(?:json)?", "", value).strip()
    value = re.sub(r"```$", "", value).strip()
    start = value.find("{")
    end = value.rfind("}")
    if start == -1 or end == -1 or end <= start:
        raise ValueError("model response did not contain a JSON object")
    return json.loads(value[start : end + 1])


def summarize_with_openai(entry: dict, text: str, model: str) -> dict | None:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        return None

    instructions = (
        "You create concise Korean research-library entries from paper text. "
        "Return only valid JSON. Use this schema exactly: "
        "{title:string, authors:string[], collection:string, venue:string, year:string, "
        "type:string, priority:'high'|'medium'|'low', keywords:string[], tags:string[], "
        "summary:string, abstractKo:string, problem:string, objective:string, keyIdea:string, "
        "contribution:string, takeaways:string[], question:string}. "
        "The summary should be one Korean paragraph. takeaways should contain 3 Korean bullets. "
        "abstractKo should be a Korean translation/paraphrase of the abstract. "
        "problem, objective, keyIdea, and contribution should be concise Korean sentences derived from the introduction. "
        "keywords must contain exactly 3 short keyword strings. "
        "question should be a concrete Korean question to investigate while reading."
    )
    user_input = {
        "known_metadata": entry,
        "paper_excerpt": text,
    }
    body = {
        "model": model,
        "input": [
            {"role": "developer", "content": instructions},
            {"role": "user", "content": json.dumps(user_input, ensure_ascii=False)},
        ],
    }
    request = urllib.request.Request(
        "https://api.openai.com/v1/responses",
        data=json.dumps(body).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=90) as response:
            payload = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"OpenAI API request failed: {exc.code} {detail}") from exc

    return parse_json_text(response_text(payload))


def normalize_model_entry(base: dict, generated: dict | None) -> dict:
    merged = {**base, **(generated or {})}
    merged["id"] = base["id"]
    merged["pdf"] = base["pdf"]
    merged["source"] = merged.get("source") or base["source"]
    merged["collection"] = merged.get("collection") or base["collection"]
    merged["venue"] = merged.get("venue") or base["venue"]
    merged["year"] = str(merged.get("year") or base["year"])
    merged["type"] = merged.get("type") or base["type"]
    merged["priority"] = merged.get("priority") if merged.get("priority") in {"high", "medium", "low"} else base["priority"]

    if isinstance(merged.get("authors"), str):
        merged["authors"] = [item.strip() for item in merged["authors"].split(",") if item.strip()]
    if not isinstance(merged.get("authors"), list):
        merged["authors"] = []
    if not isinstance(merged.get("tags"), list):
        merged["tags"] = base["tags"]
    if not isinstance(merged.get("keywords"), list):
        merged["keywords"] = merged["tags"][:3]
    if not isinstance(merged.get("takeaways"), list):
        merged["takeaways"] = base["takeaways"]
    for field in ["abstractKo", "problem", "objective", "keyIdea", "contribution"]:
        if not isinstance(merged.get(field), str) or not merged[field].strip():
            merged[field] = base[field]
    merged["tags"] = [str(tag).strip() for tag in merged["tags"] if str(tag).strip()][:8]
    merged["keywords"] = [str(tag).strip() for tag in merged["keywords"] if str(tag).strip()][:3]
    if len(merged["keywords"]) < 3:
        merged["keywords"] = (merged["keywords"] + merged["tags"])[:3]
    merged["takeaways"] = [str(item).strip() for item in merged["takeaways"] if str(item).strip()][:4]
    return merged


def write_draft(entry: dict, out_dir: Path) -> Path:
    out_dir.mkdir(parents=True, exist_ok=True)
    draft_path = out_dir / f"{entry['id']}.json"
    draft_path.write_text(json.dumps(entry, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return draft_path


def append_to_data_file(entry: dict, data_file: Path) -> None:
    text = data_file.read_text(encoding="utf-8")
    marker = "\n];"
    idx = text.rfind(marker)
    if idx == -1:
        raise RuntimeError(f"Could not find the library array closing marker in {data_file}")

    entry_json = json.dumps(entry, ensure_ascii=False, indent=2)
    entry_json = "  " + entry_json.replace("\n", "\n  ")
    text = f"{text[:idx]},\n{entry_json}{text[idx:]}"
    data_file.write_text(text, encoding="utf-8")


def process_pdf(pdf_path: Path, args: argparse.Namespace) -> dict:
    text = extract_pdf_text(pdf_path, args.max_pages)
    base = base_entry(pdf_path, args, text)
    generated = None if args.no_ai else summarize_with_openai(base, text, args.model)
    return normalize_model_entry(base, generated)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Create Paper Library entries from PDF files.")
    parser.add_argument("pdfs", nargs="+", type=Path)
    parser.add_argument("--append", action="store_true", help="Append generated entries directly to papers.js.")
    parser.add_argument("--no-ai", action="store_true", help="Skip OpenAI summarization and create metadata drafts only.")
    parser.add_argument("--model", default=DEFAULT_MODEL)
    parser.add_argument("--collection", default="Inbox")
    parser.add_argument("--venue", default="Paper Library")
    parser.add_argument("--year", default="2026")
    parser.add_argument("--type", default="Paper")
    parser.add_argument("--priority", choices=["high", "medium", "low"], default="medium")
    parser.add_argument("--source", default="")
    parser.add_argument("--tags", nargs="*", default=[])
    parser.add_argument("--title")
    parser.add_argument("--id")
    parser.add_argument("--max-pages", type=int, default=10)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    for pdf in args.pdfs:
        pdf_path = pdf if pdf.is_absolute() else (ROOT / pdf)
        if not pdf_path.exists():
            print(f"missing PDF: {pdf}", file=sys.stderr)
            return 1

        entry = process_pdf(pdf_path, args)
        draft_path = write_draft(entry, DRAFT_DIR)
        if args.append:
            append_to_data_file(entry, DATA_FILE)
            print(f"appended {entry['id']} and wrote {draft_path}")
        else:
            print(f"wrote draft {draft_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
