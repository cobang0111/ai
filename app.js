(function () {
  const papers = Array.isArray(window.ICLR_PAPERS) ? window.ICLR_PAPERS : [];

  const labels = {
    priority: {
      high: "Lead",
      medium: "Brief",
      low: "Mention",
    },
  };

  const priorityOrder = { high: 0, medium: 1, low: 2 };

  const state = {
    query: "",
    session: "all",
    priority: "all",
    tag: "all",
    sort: "feature",
    flash: null,
  };

  const els = {
    searchInput: document.querySelector("#searchInput"),
    sortSelect: document.querySelector("#sortSelect"),
    sessionFilters: document.querySelector("#sessionFilters"),
    priorityFilters: document.querySelector("#priorityFilters"),
    tagFilters: document.querySelector("#tagFilters"),
    leadStory: document.querySelector("#leadStory"),
    paperGrid: document.querySelector("#paperGrid"),
    emptyState: document.querySelector("#emptyState"),
    activeFilters: document.querySelector("#activeFilters"),
    visibleCount: document.querySelector("#visibleCount"),
    statTotal: document.querySelector("#statTotal"),
    statOral: document.querySelector("#statOral"),
    statTopics: document.querySelector("#statTopics"),
    sessionQueue: document.querySelector("#sessionQueue"),
    topicChart: document.querySelector("#topicChart"),
    resetButton: document.querySelector("#resetButton"),
  };

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
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
        return `${a.slot} ${a.session} ${a.title}`.localeCompare(`${b.slot} ${b.session} ${b.title}`);
      }

      const aOral = a.presentation.toLowerCase() === "oral" ? -0.5 : 0;
      const bOral = b.presentation.toLowerCase() === "oral" ? -0.5 : 0;
      return (
        (priorityOrder[a.priority] ?? 9) +
          aOral -
          ((priorityOrder[b.priority] ?? 9) + bOral) ||
        a.title.localeCompare(b.title)
      );
    });
  }

  function authorsLine(authors) {
    if (authors.length <= 4) {
      return authors.join(", ");
    }
    return `${authors.slice(0, 4).join(", ")} 외 ${authors.length - 4}명`;
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

  function storyLabel(paper) {
    const presentation = paper.presentation.toLowerCase() === "oral" ? "Oral" : "Poster";
    return `${labels.priority[paper.priority] || "Brief"} / ${presentation}`;
  }

  function linkActions(paper) {
    const pdfHref = encodeURI(paper.pdf);
    const isFlash = state.flash === paper.id;

    return `
      <div class="card-actions">
        <a class="icon-button primary" href="${pdfHref}" target="_blank" rel="noopener" title="PDF 열기">
          ${icon("file")}
          PDF
        </a>
        <a class="icon-button" href="${escapeHtml(paper.source)}" target="_blank" rel="noopener" title="OpenReview 열기">
          ${icon("external")}
          OpenReview
        </a>
        <button class="icon-button" type="button" data-action="copy" data-id="${escapeHtml(paper.id)}" title="브리프 복사">
          ${icon("copy")}
          Copy
        </button>
        ${isFlash ? '<span class="copy-flash">Copied</span>' : ""}
      </div>
    `;
  }

  function tagList(paper) {
    return `
      <div class="tag-list">
        ${paper.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
      </div>
    `;
  }

  function leadTemplate(paper) {
    if (!paper) {
      return "";
    }

    return `
      <article class="lead-card priority-${escapeHtml(paper.priority)}" data-id="${escapeHtml(paper.id)}">
        <div class="story-kicker">
          <span>${escapeHtml(storyLabel(paper))}</span>
          <span>#${escapeHtml(paper.id)}</span>
        </div>
        <h3>${escapeHtml(paper.title)}</h3>
        <p class="dek">${escapeHtml(paper.summary)}</p>
        <div class="byline">
          <span>${escapeHtml(authorsLine(paper.authors))}</span>
          <span>${escapeHtml(paper.session)} / ${escapeHtml(paper.slot)}</span>
        </div>
        <div class="story-columns">
          <section>
            <p class="mini-heading">Why It Matters</p>
            <ul class="takeaways">
              ${paper.takeaways.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          </section>
          <section>
            <p class="mini-heading">Question to Watch</p>
            <p class="question">${escapeHtml(paper.question)}</p>
            ${tagList(paper)}
          </section>
        </div>
        ${linkActions(paper)}
      </article>
    `;
  }

  function cardTemplate(paper) {
    return `
      <article class="paper-card priority-${escapeHtml(paper.priority)}" data-id="${escapeHtml(paper.id)}">
        <div class="card-top">
          <span class="story-type">${escapeHtml(storyLabel(paper))}</span>
          <span class="paper-id">#${escapeHtml(paper.id)}</span>
        </div>
        <h3>${escapeHtml(paper.title)}</h3>
        <div class="paper-meta">
          <span>${escapeHtml(paper.session)}</span>
          <span>${escapeHtml(paper.slot)}</span>
          <span>${escapeHtml(authorsLine(paper.authors))}</span>
        </div>
        <p class="summary">${escapeHtml(paper.summary)}</p>
        <p class="mini-heading">Key Read</p>
        <ul class="takeaways compact">
          ${paper.takeaways.slice(0, 2).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
        <p class="mini-heading">Watch</p>
        <p class="question">${escapeHtml(paper.question)}</p>
        ${tagList(paper)}
        ${linkActions(paper)}
      </article>
    `;
  }

  function renderStats(allPapers, visiblePapers) {
    const topicCount = unique(allPapers.flatMap((paper) => paper.tags || [])).length;

    els.statTotal.textContent = String(allPapers.length);
    els.statOral.textContent = String(allPapers.filter((paper) => paper.presentation.toLowerCase() === "oral").length);
    els.statTopics.textContent = String(topicCount);
    els.visibleCount.textContent = `${visiblePapers.length} shown`;
  }

  function renderActiveFilters() {
    const active = [];
    if (state.query.trim()) active.push(`검색: ${state.query.trim()}`);
    if (state.session !== "all") active.push(state.session);
    if (state.priority !== "all") active.push(labels.priority[state.priority]);
    if (state.tag !== "all") active.push(`#${state.tag}`);

    els.activeFilters.innerHTML = active.map((item) => `<span class="filter-pill">${escapeHtml(item)}</span>`).join("");
  }

  function renderQueue(allPapers) {
    const sessionMap = new Map();
    allPapers.forEach((paper) => {
      const key = `${paper.session}|${paper.slot}`;
      const entry = sessionMap.get(key) || { session: paper.session, slot: paper.slot, count: 0, lead: 0 };
      entry.count += 1;
      if (paper.priority === "high") entry.lead += 1;
      sessionMap.set(key, entry);
    });

    els.sessionQueue.innerHTML = [...sessionMap.values()]
      .sort((a, b) => `${a.slot} ${a.session}`.localeCompare(`${b.slot} ${b.session}`))
      .map(
        (entry) => `
          <div class="queue-row">
            <div>
              <strong>${escapeHtml(entry.session)}</strong>
              <small>${escapeHtml(entry.slot)} / lead ${entry.lead}</small>
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
    return [
      `### ${paper.title}`,
      "",
      `- ID: ${paper.id}`,
      `- Format: ${storyLabel(paper)}`,
      `- Session: ${paper.session} / ${paper.slot}`,
      `- PDF: ${paper.pdf}`,
      `- OpenReview: ${paper.source}`,
      `- Topics: ${paper.tags.join(", ")}`,
      "",
      `Summary: ${paper.summary}`,
      "",
      "Why it matters:",
      ...paper.takeaways.map((item) => `- ${item}`),
      "",
      `Question to watch: ${paper.question}`,
    ].join("\n");
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
    const paper = papers.find((item) => item.id === id);
    if (!paper) return;

    await writeClipboard(paperMarkdown(paper));
    state.flash = id;
    render();
    window.setTimeout(() => {
      state.flash = null;
      render();
    }, 1300);
  }

  function render() {
    const visible = sortPapers(papers.filter(matches));
    const [lead, ...briefs] = visible;

    renderFilterControls();
    renderStats(papers, visible);
    renderActiveFilters();
    renderQueue(papers);
    renderTopicChart(papers);

    els.leadStory.innerHTML = leadTemplate(lead);
    els.paperGrid.innerHTML = briefs.map(cardTemplate).join("");
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

  els.resetButton.addEventListener("click", () => {
    state.query = "";
    state.session = "all";
    state.priority = "all";
    state.tag = "all";
    state.sort = "feature";
    els.searchInput.value = "";
    els.sortSelect.value = "feature";
    render();
  });

  render();
})();
