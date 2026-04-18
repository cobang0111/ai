(function () {
  const meta = window.PAPER_LIBRARY_META || window.ICLR_META || {};
  const sourcePapers = Array.isArray(window.PAPER_LIBRARY)
    ? window.PAPER_LIBRARY
    : Array.isArray(window.ICLR_PAPERS)
      ? window.ICLR_PAPERS
      : [];
  const paperDetails = window.PAPER_DETAILS || {};

  const labels = {
    priority: {
      high: "Spotlight",
      medium: "Brief",
      low: "Reference",
    },
  };

  const priorityOrder = { high: 0, medium: 1, low: 2 };

  const els = {
    homeView: document.querySelector("#homeView"),
    papersView: document.querySelector("#papersView"),
    paperDetailView: document.querySelector("#paperDetailView"),
    paperDetailContent: document.querySelector("#paperDetailContent"),
    searchInput: document.querySelector("#searchInput"),
    sortSelect: document.querySelector("#sortSelect"),
    collectionFilters: document.querySelector("#collectionFilters"),
    priorityFilters: document.querySelector("#priorityFilters"),
    tagFilters: document.querySelector("#tagFilters"),
    collectionDeck: document.querySelector("#collectionDeck"),
    collectionTitle: document.querySelector("#collectionTitle"),
    paperGrid: document.querySelector("#paperGrid"),
    emptyState: document.querySelector("#emptyState"),
    activeFilters: document.querySelector("#activeFilters"),
    visibleCount: document.querySelector("#visibleCount"),
    statTotal: document.querySelector("#statTotal"),
    statCollections: document.querySelector("#statCollections"),
    statTopics: document.querySelector("#statTopics"),
    statUpdated: document.querySelector("#statUpdated"),
    sessionList: document.querySelector("#sessionQueue"),
    topicChart: document.querySelector("#topicChart"),
    resetButton: document.querySelector("#resetButton"),
    networkCanvas: document.querySelector("#networkCanvas"),
  };

  const papers = sourcePapers.map(normalizePaper);
  const collections = unique(papers.map((paper) => paper.collection));

  const state = {
    query: "",
    collection: collections[0] || "all",
    priority: "all",
    tag: "all",
    sort: "featured",
    flash: null,
    route: "home",
    detailId: null,
  };

  function normalizePaper(paper, index) {
    const details = paperDetails[paper.id] || {};
    const title = paper.title || `Untitled Paper ${index + 1}`;
    const venue = paper.venue || paper.conference || (paper.session ? "ICLR 2026" : "AI Automation Project");
    const collection = paper.collection || paper.conference || paper.venue || venue || "Library";
    const authors = Array.isArray(paper.authors) ? paper.authors : [];
    const keywords = Array.isArray(details.keywords)
      ? details.keywords
      : Array.isArray(paper.keywords)
        ? paper.keywords
        : Array.isArray(paper.tags)
          ? paper.tags
          : [];

    return {
      ...paper,
      ...details,
      id: paper.id || slugify(title),
      title,
      authors,
      collection,
      venue,
      year: paper.year || "2026",
      session: paper.session || collection,
      slot: paper.slot || "",
      type: paper.type || paper.presentation || "Paper",
      priority: paper.priority || "medium",
      pdf: paper.pdf || "",
      source: paper.source || "",
      tags: keywords.slice(0, 3),
      summary: paper.summary || "A summary has not been generated yet.",
      takeaways: Array.isArray(paper.takeaways) ? paper.takeaways : [],
      question: paper.question || "No reading question has been added yet.",
    };
  }

  function slugify(value) {
    return String(value)
      .toLowerCase()
      .replace(/[^a-z0-9가-힣]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);
  }

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

  function selectedCollectionPapers() {
    if (state.collection === "all") {
      return papers;
    }
    return papers.filter((paper) => paper.collection === state.collection);
  }

  function makeFilterButton(label, value, current, type, className = "chip") {
    const button = document.createElement("button");
    button.className = className;
    button.type = "button";
    button.dataset.type = type;
    button.dataset.value = value;
    button.setAttribute("aria-pressed", String(value === current));
    button.textContent = label;
    return button;
  }

  function renderCollectionControls() {
    els.collectionFilters.replaceChildren(
      ...collections.map((collection) =>
        makeFilterButton(collection, collection, state.collection, "collection", "collection-button"),
      ),
    );
  }

  function renderFilterControls() {
    renderCollectionControls();

    els.priorityFilters.replaceChildren(
      makeFilterButton("All", "all", state.priority, "priority"),
      ...Object.entries(labels.priority).map(([value, label]) => makeFilterButton(label, value, state.priority, "priority")),
    );

    const tags = unique(selectedCollectionPapers().flatMap((paper) => paper.tags || []));
    els.tagFilters.replaceChildren(
      makeFilterButton("All", "all", state.tag, "tag"),
      ...tags.map((tag) => makeFilterButton(tag, tag, state.tag, "tag")),
    );
  }

  function matches(paper) {
    const q = state.query.trim().toLowerCase();
    const haystack = [
      paper.id,
      paper.title,
      paper.authors.join(" "),
      paper.collection,
      paper.venue,
      paper.session,
      paper.type,
      paper.summary,
      paper.question,
      ...(paper.tags || []),
    ]
      .join(" ")
      .toLowerCase();

    return (
      (!q || haystack.includes(q)) &&
      (state.collection === "all" || paper.collection === state.collection) &&
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

      const aOral = a.type.toLowerCase() === "oral" ? -0.5 : 0;
      const bOral = b.type.toLowerCase() === "oral" ? -0.5 : 0;
      return (
        (priorityOrder[a.priority] ?? 9) +
          aOral -
          ((priorityOrder[b.priority] ?? 9) + bOral) ||
        a.title.localeCompare(b.title)
      );
    });
  }

  function authorsLine(authors) {
    if (!authors.length) return "Unknown authors";
    if (authors.length <= 4) {
      return authors.join(", ");
    }
    return `${authors.slice(0, 4).join(", ")} +${authors.length - 4}`;
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
    return `${labels.priority[paper.priority] || "Brief"} / ${paper.type}`;
  }

  function linkActions(paper) {
    const isFlash = state.flash === paper.id;
    const pdfHref = paper.pdf ? encodeURI(paper.pdf) : "";
    const sourceHref = paper.source ? escapeHtml(paper.source) : "";

    return `
      <div class="card-actions">
        ${
          pdfHref
            ? `<a class="icon-button primary" href="${pdfHref}" target="_blank" rel="noopener" title="Open PDF">${icon("file")}PDF</a>`
            : ""
        }
        ${
          sourceHref
            ? `<a class="icon-button" href="${sourceHref}" target="_blank" rel="noopener" title="Open source">${icon("external")}Source</a>`
            : ""
        }
        <button class="icon-button" type="button" data-action="copy" data-id="${escapeHtml(paper.id)}" title="Copy brief">
          ${icon("copy")}Copy
        </button>
        ${isFlash ? '<span class="copy-flash">Copied</span>' : ""}
      </div>
    `;
  }

  function tagList(paper) {
    return `
      <div class="tag-list">
        ${paper.tags.slice(0, 3).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
      </div>
    `;
  }

  function renderCollectionDeck() {
    const collectionPapers = selectedCollectionPapers();
    const topics = unique(collectionPapers.flatMap((paper) => paper.tags || []));
    const sessions = unique(collectionPapers.map((paper) => paper.session));
    const spotlight = collectionPapers.filter((paper) => paper.priority === "high").length;

    els.collectionTitle.textContent = state.collection === "all" ? "All Papers" : state.collection;
    els.collectionDeck.innerHTML = `
      <section class="collection-hero">
        <div>
          <p class="eyebrow">Selected Collection</p>
          <h3>${escapeHtml(state.collection === "all" ? "All Papers" : state.collection)}</h3>
          <p>${collectionPapers.length} papers across ${sessions.length} sessions, with ${spotlight} spotlight picks.</p>
        </div>
        <div class="collection-metrics">
          <span><b>${collectionPapers.length}</b> Papers</span>
          <span><b>${sessions.length}</b> Sessions</span>
          <span><b>${topics.length}</b> Topics</span>
        </div>
      </section>
    `;
  }

  function cardTemplate(paper) {
    return `
      <article class="library-card interactive-card priority-${escapeHtml(paper.priority)}" data-id="${escapeHtml(paper.id)}" tabindex="0">
        <div class="card-top">
          <span class="story-type">${escapeHtml(storyLabel(paper))}</span>
          <span class="paper-id">#${escapeHtml(paper.id)}</span>
        </div>
        <h3>${escapeHtml(paper.title)}</h3>
        <div class="paper-meta">
          <span>${escapeHtml(paper.session)}</span>
          <span>${escapeHtml(paper.slot || paper.venue)}</span>
          <span>${escapeHtml(authorsLine(paper.authors))}</span>
        </div>
        <p class="summary">${escapeHtml(paper.summary)}</p>
        ${tagList(paper)}
        <div class="card-hint">Open detail</div>
      </article>
    `;
  }

  function detailTemplate(paper) {
    return `
      <div class="detail-kicker">
        <span>${escapeHtml(storyLabel(paper))}</span>
        <span>${escapeHtml(paper.collection)}</span>
      </div>
      <h2>${escapeHtml(paper.title)}</h2>
      <div class="detail-meta">
        <span>${escapeHtml(authorsLine(paper.authors))}</span>
        <span>${escapeHtml(paper.venue)}</span>
        <span>${escapeHtml(paper.session)}${paper.slot ? ` / ${escapeHtml(paper.slot)}` : ""}</span>
      </div>
      <section class="detail-section detail-abstract">
        <h3>Abstract Translation</h3>
        <p>${escapeHtml(paper.abstractKo || paper.summary)}</p>
      </section>
      <div class="analysis-grid">
        <section class="detail-section">
          <h3>Problem</h3>
          <p>${escapeHtml(paper.problem || "Not yet analyzed.")}</p>
        </section>
        <section class="detail-section">
          <h3>Objective</h3>
          <p>${escapeHtml(paper.objective || "Not yet analyzed.")}</p>
        </section>
        <section class="detail-section">
          <h3>Key Idea</h3>
          <p>${escapeHtml(paper.keyIdea || "Not yet analyzed.")}</p>
        </section>
        <section class="detail-section">
          <h3>Contribution</h3>
          <p>${escapeHtml(paper.contribution || "Not yet analyzed.")}</p>
        </section>
      </div>
      <section class="detail-section">
        <h3>Reading Signals</h3>
        <ul class="takeaways">
          ${paper.takeaways.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </section>
      <section class="detail-section">
        <h3>Question</h3>
        <p>${escapeHtml(paper.question)}</p>
      </section>
      <section class="detail-section">
        <h3>Topics</h3>
        ${tagList(paper)}
      </section>
      ${linkActions(paper)}
    `;
  }

  function renderStats(allPapers, visiblePapers) {
    const topicCount = unique(allPapers.flatMap((paper) => paper.tags || [])).length;
    const collectionCount = collections.length;

    els.statTotal.textContent = String(allPapers.length);
    els.statCollections.textContent = String(collectionCount);
    els.statTopics.textContent = String(topicCount);
    els.statUpdated.textContent = meta.updated ? `Updated ${meta.updated}` : "Library";
    els.visibleCount.textContent = `${visiblePapers.length} shown`;
  }

  function renderActiveFilters() {
    const active = [];
    if (state.query.trim()) active.push(`Search: ${state.query.trim()}`);
    if (state.priority !== "all") active.push(labels.priority[state.priority]);
    if (state.tag !== "all") active.push(`#${state.tag}`);

    els.activeFilters.innerHTML = active.map((item) => `<span class="filter-pill">${escapeHtml(item)}</span>`).join("");
  }

  function renderSessions(allPapers) {
    const sessionMap = new Map();
    allPapers.forEach((paper) => {
      const key = `${paper.session}|${paper.slot}`;
      const entry = sessionMap.get(key) || { session: paper.session, slot: paper.slot, count: 0, leads: 0 };
      entry.count += 1;
      if (paper.priority === "high") entry.leads += 1;
      sessionMap.set(key, entry);
    });

    els.sessionList.innerHTML = [...sessionMap.values()]
      .sort((a, b) => `${a.session} ${a.slot}`.localeCompare(`${b.session} ${b.slot}`))
      .map(
        (entry) => `
          <div class="session-row">
            <div>
              <strong>${escapeHtml(entry.session)}</strong>
              <small>${escapeHtml(entry.slot || "Any time")} / ${entry.leads} spotlight</small>
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
    const top = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 10);
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
      `- Collection: ${paper.collection}`,
      `- Format: ${storyLabel(paper)}`,
      `- Venue: ${paper.venue}`,
      `- Session: ${paper.session} / ${paper.slot}`,
      `- PDF: ${paper.pdf}`,
      `- Source: ${paper.source}`,
      `- Topics: ${paper.tags.join(", ")}`,
      "",
      `Abstract translation: ${paper.abstractKo || paper.summary}`,
      "",
      `Problem: ${paper.problem || ""}`,
      `Objective: ${paper.objective || ""}`,
      `Key idea: ${paper.keyIdea || ""}`,
      `Contribution: ${paper.contribution || ""}`,
      "",
      `Summary: ${paper.summary}`,
      "",
      "Signals:",
      ...paper.takeaways.map((item) => `- ${item}`),
      "",
      `Question: ${paper.question}`,
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

  function openDetail(id) {
    window.location.hash = `paper/${encodeURIComponent(id)}`;
  }

  function renderDetailPage(id) {
    const paper = papers.find((item) => item.id === id);
    if (!paper) {
      els.paperDetailContent.innerHTML = `
        <section class="detail-page-card">
          <a class="back-link" href="#papers">Back to Papers</a>
          <h1>Paper not found.</h1>
          <p class="lead">The requested paper does not exist in this archive.</p>
        </section>
      `;
      return;
    }

    state.collection = paper.collection;
    els.paperDetailContent.innerHTML = `
      <section class="detail-page-card">
        <a class="back-link" href="#papers">Back to ${escapeHtml(paper.collection)}</a>
        ${detailTemplate(paper)}
      </section>
    `;
  }

  function parseRoute() {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash || hash === "home") {
      return { route: "home", detailId: null };
    }
    if (hash === "library" || hash === "papers") {
      return { route: "papers", detailId: null };
    }
    if (hash.startsWith("paper/")) {
      return { route: "paper", detailId: decodeURIComponent(hash.slice("paper/".length)) };
    }
    return { route: "home", detailId: null };
  }

  function applyRoute() {
    const next = parseRoute();
    state.route = next.route;
    state.detailId = next.detailId;

    els.homeView.classList.toggle("is-hidden", state.route !== "home");
    els.papersView.classList.toggle("is-hidden", state.route !== "papers");
    els.paperDetailView.classList.toggle("is-hidden", state.route !== "paper");

    if (state.route === "paper") {
      renderDetailPage(state.detailId);
    }
  }

  function bindCardInteractions() {
    document.querySelectorAll(".interactive-card").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty("--tilt-x", `${(-y * 3).toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${(x * 3).toFixed(2)}deg`);
      });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      });
    });
  }

  function render() {
    if (state.collection !== "all" && !collections.includes(state.collection)) {
      state.collection = collections[0] || "all";
    }

    const collectionPapers = selectedCollectionPapers();
    const visible = sortPapers(papers.filter(matches));

    renderFilterControls();
    renderStats(papers, visible);
    renderActiveFilters();
    renderCollectionDeck();
    renderSessions(collectionPapers);
    renderTopicChart(collectionPapers);

    els.paperGrid.innerHTML = visible.map(cardTemplate).join("");
    els.emptyState.hidden = visible.length > 0;
    bindCardInteractions();

    if (state.route === "paper" && state.detailId) renderDetailPage(state.detailId);
  }

  function startNetworkCanvas() {
    const canvas = els.networkCanvas;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    const pointer = { x: 0, y: 0, active: false };
    let width = 0;
    let height = 0;
    let points = [];

    function resize() {
      const ratio = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      points = Array.from({ length: Math.max(34, Math.floor(width / 28)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;

      points.forEach((point) => {
        point.x += point.vx;
        point.y += point.vy;
        if (point.x < 0 || point.x > width) point.vx *= -1;
        if (point.y < 0 || point.y > height) point.vy *= -1;
      });

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const a = points[i];
          const b = points[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 130) {
            ctx.strokeStyle = `rgba(77, 215, 255, ${0.16 * (1 - distance / 130)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      points.forEach((point) => {
        const pulse = pointer.active ? Math.max(0, 1 - Math.hypot(point.x - pointer.x, point.y - pointer.y) / 180) : 0;
        ctx.fillStyle = pulse ? `rgba(156, 255, 109, ${0.32 + pulse * 0.4})` : "rgba(244, 247, 251, 0.42)";
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.5 + pulse * 2.2, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    });
    window.addEventListener("pointerleave", () => {
      pointer.active = false;
    });

    resize();
    draw();
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
    const actionButton = event.target.closest("[data-action='copy']");
    if (actionButton) {
      event.stopPropagation();
      copyPaper(actionButton.dataset.id);
      return;
    }

    const filterButton = event.target.closest("[data-type]");
    if (filterButton) {
      state[filterButton.dataset.type] = filterButton.dataset.value;
      if (filterButton.dataset.type === "collection") {
        state.tag = "all";
      }
      render();
      return;
    }

    const card = event.target.closest(".library-card");
    if (card) {
      openDetail(card.dataset.id);
    }
  });

  document.addEventListener("keydown", (event) => {
    if ((event.key === "Enter" || event.key === " ") && event.target.classList.contains("library-card")) {
      event.preventDefault();
      openDetail(event.target.dataset.id);
    }
  });

  els.resetButton.addEventListener("click", () => {
    state.query = "";
    state.collection = collections[0] || "all";
    state.priority = "all";
    state.tag = "all";
    state.sort = "featured";
    els.searchInput.value = "";
    els.sortSelect.value = "featured";
    render();
  });

  window.addEventListener("hashchange", () => {
    applyRoute();
    render();
  });

  render();
  applyRoute();
  startNetworkCanvas();
})();
