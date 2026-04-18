(function () {
  const papers = Array.isArray(window.ICLR_PAPERS) ? window.ICLR_PAPERS : [];
  const storeKey = "iclr-2026-field-notes-v1";

  const labels = {
    priority: {
      high: "높음",
      medium: "보통",
      low: "낮음",
    },
    status: {
      todo: "읽기 전",
      skimmed: "초록 확인",
      visit: "현장 방문",
      done: "완료",
    },
  };

  const priorityOrder = { high: 0, medium: 1, low: 2 };

  const state = {
    query: "",
    session: "all",
    priority: "all",
    tag: "all",
    sort: "priority",
    flash: null,
  };

  const els = {
    searchInput: document.querySelector("#searchInput"),
    sortSelect: document.querySelector("#sortSelect"),
    sessionFilters: document.querySelector("#sessionFilters"),
    priorityFilters: document.querySelector("#priorityFilters"),
    tagFilters: document.querySelector("#tagFilters"),
    paperGrid: document.querySelector("#paperGrid"),
    emptyState: document.querySelector("#emptyState"),
    activeFilters: document.querySelector("#activeFilters"),
    visibleCount: document.querySelector("#visibleCount"),
    statTotal: document.querySelector("#statTotal"),
    statHigh: document.querySelector("#statHigh"),
    statNotes: document.querySelector("#statNotes"),
    sessionQueue: document.querySelector("#sessionQueue"),
    topicChart: document.querySelector("#topicChart"),
    resetButton: document.querySelector("#resetButton"),
    exportButton: document.querySelector("#exportButton"),
  };

  let saved = loadSaved();

  function loadSaved() {
    try {
      return JSON.parse(localStorage.getItem(storeKey)) || {};
    } catch (error) {
      console.warn("Could not load saved notes", error);
      return {};
    }
  }

  function persist() {
    localStorage.setItem(storeKey, JSON.stringify(saved));
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function effectivePaper(paper) {
    const paperState = saved[paper.id] || {};
    return {
      ...paper,
      priority: paperState.priority || paper.priority || "medium",
      status: paperState.status || paper.status || "todo",
      note: paperState.note || "",
    };
  }

  function updateSaved(id, patch) {
    saved[id] = { ...(saved[id] || {}), ...patch };
    persist();
    render();
  }

  function unique(values) {
    return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
  }

  function makeFilterButton(label, value, current, type) {
    const button = document.createElement("button");
    button.className = "chip";
    button.type = "button";
    button.dataset.type = type;
    button.dataset.value = value;
    button.setAttribute("aria-pressed", String(value === current));
    button.textContent = label;
    return button;
  }

  function renderFilterControls() {
    const sessions = unique(papers.map((paper) => paper.session));
    els.sessionFilters.replaceChildren(
      makeFilterButton("전체", "all", state.session, "session"),
      ...sessions.map((session) => makeFilterButton(session.replace(" Session ", " "), session, state.session, "session")),
    );

    els.priorityFilters.replaceChildren(
      makeFilterButton("전체", "all", state.priority, "priority"),
      ...Object.entries(labels.priority).map(([value, label]) => makeFilterButton(label, value, state.priority, "priority")),
    );

    const tags = unique(papers.flatMap((paper) => paper.tags || []));
    els.tagFilters.replaceChildren(
      makeFilterButton("전체", "all", state.tag, "tag"),
      ...tags.map((tag) => makeFilterButton(tag, tag, state.tag, "tag")),
    );
  }

  function matches(paper) {
    const q = state.query.trim().toLowerCase();
    const haystack = [
      paper.id,
      paper.title,
      paper.authors.join(" "),
      paper.session,
      paper.presentation,
      paper.summary,
      paper.question,
      ...(paper.tags || []),
    ]
      .join(" ")
      .toLowerCase();

    return (
      (!q || haystack.includes(q)) &&
      (state.session === "all" || paper.session === state.session) &&
      (state.priority === "all" || paper.priority === state.priority) &&
      (state.tag === "all" || (paper.tags || []).includes(state.tag))
    );
  }

  function sortPapers(list) {
    return [...list].sort((a, b) => {
      if (state.sort === "title") {
        return a.title.localeCompare(b.title);
      }
      if (state.sort === "session") {
        return `${a.session} ${a.slot} ${a.title}`.localeCompare(`${b.session} ${b.slot} ${b.title}`);
      }
      return (priorityOrder[a.priority] ?? 9) - (priorityOrder[b.priority] ?? 9) || a.title.localeCompare(b.title);
    });
  }

  function authorsLine(authors) {
    if (authors.length <= 4) {
      return authors.join(", ");
    }
    return `${authors.slice(0, 4).join(", ")} 외 ${authors.length - 4}명`;
  }

  function optionList(options, selected) {
    return Object.entries(options)
      .map(([value, label]) => `<option value="${value}"${value === selected ? " selected" : ""}>${label}</option>`)
      .join("");
  }

  function cardTemplate(paper) {
    const pdfHref = encodeURI(paper.pdf);
    const isFlash = state.flash === paper.id;
    const presentationClass = paper.presentation.toLowerCase() === "oral" ? "oral" : "poster";

    return `
      <article class="paper-card priority-${escapeHtml(paper.priority)}" data-id="${escapeHtml(paper.id)}">
        <div class="card-top">
          <span class="paper-id">#${escapeHtml(paper.id)}</span>
          <span class="badge ${presentationClass}">${escapeHtml(paper.presentation)}</span>
        </div>
        <h3>${escapeHtml(paper.title)}</h3>
        <div class="paper-meta">
          <span>${escapeHtml(paper.session)}</span>
          <span>${escapeHtml(paper.slot)}</span>
          <span>${escapeHtml(authorsLine(paper.authors))}</span>
        </div>
        <p class="mini-heading">요약</p>
        <p class="summary">${escapeHtml(paper.summary)}</p>
        <p class="mini-heading">볼 포인트</p>
        <ul class="takeaways">
          ${paper.takeaways.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
        <p class="mini-heading">질문</p>
        <p class="summary">${escapeHtml(paper.question)}</p>
        <div class="tag-list">
          ${paper.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
        <div class="card-form">
          <label>
            상태
            <select data-action="status" data-id="${escapeHtml(paper.id)}">
              ${optionList(labels.status, paper.status)}
            </select>
          </label>
          <label>
            우선순위
            <select data-action="priority" data-id="${escapeHtml(paper.id)}">
              ${optionList(labels.priority, paper.priority)}
            </select>
          </label>
          <label class="note-field">
            현장 메모
            <textarea data-action="note" data-id="${escapeHtml(paper.id)}" placeholder="저자에게 물어볼 점, 관련 아이디어, follow-up">${escapeHtml(paper.note)}</textarea>
          </label>
        </div>
        <div class="card-actions">
          <a class="icon-button primary" href="${pdfHref}" target="_blank" rel="noopener" title="PDF 열기">
            ${icon("file")}
            PDF
          </a>
          <a class="icon-button" href="${escapeHtml(paper.source)}" target="_blank" rel="noopener" title="OpenReview 열기">
            ${icon("external")}
            OpenReview
          </a>
          <button class="icon-button" type="button" data-action="copy" data-id="${escapeHtml(paper.id)}" title="논문 메모 복사">
            ${icon("copy")}
            복사
          </button>
          ${isFlash ? '<span class="copy-flash">복사됨</span>' : ""}
        </div>
      </article>
    `;
  }

  function icon(name) {
    const icons = {
      file: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"></path><path d="M14 3v5h5"></path></svg>',
      external:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7"></path><path d="m10 14 11-11"></path><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"></path></svg>',
      copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
    };
    return icons[name] || "";
  }

  function renderStats(allPapers, visiblePapers) {
    els.statTotal.textContent = String(allPapers.length);
    els.statHigh.textContent = String(allPapers.filter((paper) => paper.priority === "high").length);
    els.statNotes.textContent = String(allPapers.filter((paper) => paper.note.trim()).length);
    els.visibleCount.textContent = `${visiblePapers.length} shown`;
  }

  function renderActiveFilters() {
    const active = [];
    if (state.query.trim()) active.push(`검색: ${state.query.trim()}`);
    if (state.session !== "all") active.push(state.session);
    if (state.priority !== "all") active.push(`우선순위 ${labels.priority[state.priority]}`);
    if (state.tag !== "all") active.push(`#${state.tag}`);

    els.activeFilters.innerHTML = active.map((item) => `<span class="filter-pill">${escapeHtml(item)}</span>`).join("");
  }

  function renderQueue(allPapers) {
    const sessionMap = new Map();
    allPapers.forEach((paper) => {
      const key = `${paper.session}|${paper.slot}`;
      const entry = sessionMap.get(key) || { session: paper.session, slot: paper.slot, count: 0, high: 0 };
      entry.count += 1;
      if (paper.priority === "high") entry.high += 1;
      sessionMap.set(key, entry);
    });

    els.sessionQueue.innerHTML = [...sessionMap.values()]
      .sort((a, b) => `${a.slot} ${a.session}`.localeCompare(`${b.slot} ${b.session}`))
      .map(
        (entry) => `
          <div class="queue-row">
            <div>
              <strong>${escapeHtml(entry.session)}</strong>
              <small>${escapeHtml(entry.slot)} · high ${entry.high}</small>
            </div>
            <span>${entry.count}</span>
          </div>
        `,
      )
      .join("");
  }

  function renderTopicChart(allPapers) {
    const counts = new Map();
    allPapers.forEach((paper) => {
      paper.tags.forEach((tag) => counts.set(tag, (counts.get(tag) || 0) + 1));
    });
    const top = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 8);
    const max = Math.max(...top.map(([, count]) => count), 1);

    els.topicChart.innerHTML = top
      .map(
        ([tag, count]) => `
          <div class="topic-row">
            <span>${escapeHtml(tag)}</span>
            <div class="topic-bar"><span style="width:${Math.round((count / max) * 100)}%"></span></div>
            <b>${count}</b>
          </div>
        `,
      )
      .join("");
  }

  function paperMarkdown(paper) {
    const lines = [
      `### ${paper.title}`,
      "",
      `- ID: ${paper.id}`,
      `- Session: ${paper.session} / ${paper.slot}`,
      `- Priority: ${labels.priority[paper.priority]}`,
      `- Status: ${labels.status[paper.status]}`,
      `- PDF: ${paper.pdf}`,
      `- OpenReview: ${paper.source}`,
      `- Tags: ${paper.tags.join(", ")}`,
      "",
      `Summary: ${paper.summary}`,
      "",
      "Takeaways:",
      ...paper.takeaways.map((item) => `- ${item}`),
      "",
      `Question: ${paper.question}`,
    ];

    if (paper.note.trim()) {
      lines.push("", `Note: ${paper.note.trim()}`);
    }

    return lines.join("\n");
  }

  async function writeClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  async function copyPaper(id) {
    const paper = effectivePaper(papers.find((item) => item.id === id));
    if (!paper) return;

    await writeClipboard(paperMarkdown(paper));
    state.flash = id;
    render();
    window.setTimeout(() => {
      state.flash = null;
      render();
    }, 1300);
  }

  function exportNotes() {
    const allPapers = papers.map(effectivePaper);
    const body = [
      "# ICLR 2026 Paper Field Notes",
      "",
      `Updated: ${new Date().toISOString().slice(0, 10)}`,
      "",
      ...allPapers.map(paperMarkdown),
    ].join("\n\n");

    const blob = new Blob([body], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "iclr-2026-paper-notes.md";
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  function render() {
    const allPapers = papers.map(effectivePaper);
    const visible = sortPapers(allPapers.filter(matches));

    renderFilterControls();
    renderStats(allPapers, visible);
    renderActiveFilters();
    renderQueue(allPapers);
    renderTopicChart(allPapers);

    els.paperGrid.innerHTML = visible.map(cardTemplate).join("");
    els.emptyState.hidden = visible.length > 0;
  }

  els.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    render();
  });

  els.sortSelect.addEventListener("change", (event) => {
    state.sort = event.target.value;
    render();
  });

  document.addEventListener("click", (event) => {
    const filterButton = event.target.closest("[data-type]");
    if (filterButton) {
      state[filterButton.dataset.type] = filterButton.dataset.value;
      render();
      return;
    }

    const actionButton = event.target.closest("[data-action='copy']");
    if (actionButton) {
      copyPaper(actionButton.dataset.id);
    }
  });

  document.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLTextAreaElement) || target.dataset.action !== "note") {
      return;
    }
    saved[target.dataset.id] = { ...(saved[target.dataset.id] || {}), note: target.value };
    persist();
    renderStats(papers.map(effectivePaper), sortPapers(papers.map(effectivePaper).filter(matches)));
  });

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement) || !target.dataset.action) {
      return;
    }
    updateSaved(target.dataset.id, { [target.dataset.action]: target.value });
  });

  els.resetButton.addEventListener("click", () => {
    state.query = "";
    state.session = "all";
    state.priority = "all";
    state.tag = "all";
    state.sort = "priority";
    els.searchInput.value = "";
    els.sortSelect.value = "priority";
    render();
  });

  els.exportButton.addEventListener("click", exportNotes);

  render();
})();
