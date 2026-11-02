/* Museum of Failure — prototype behaviour.
   No build step, no dependencies. Submissions are stored in this browser only (localStorage). */

const data = [
  {title:"We built the solution before we understood the problem.",cat:"PRODUCT DESIGN",year:2026,attempt:"We designed a feature-rich productivity tool after a few enthusiastic conversations.",outcome:"Testing showed participants could not explain when they would use it. We solved a workflow we imagined, not one they had.",lesson:"Test the question before polishing the answer."},
  {title:"The data looked perfect. That was the problem.",cat:"RESEARCH",year:2025,attempt:"Our survey pattern aligned almost exactly with our hypothesis.",outcome:"An audit revealed duplicate entries and a biased sample. The result was not reproducible.",lesson:"Unexpectedly clean results deserve scrutiny. Keep the data trail."},
  {title:"A campaign everyone liked, nobody remembered.",cat:"CREATIVE",year:2025,attempt:"We created polished visuals and familiar language.",outcome:"People recognized the design but forgot the message.",lesson:"Approval is not recall. Test what people remember."},
  {title:"Our onboarding had more steps than the task.",cat:"PRODUCT",year:2024,attempt:"We added a guided setup to make a simple tool feel complete.",outcome:"Users had to answer questions before reaching their intended action.",lesson:"Make it easier to begin than to understand every option."},
  {title:"We confused correlation with a compelling story.",cat:"RESEARCH",year:2024,attempt:"Two variables moved together, and we built an explanation around them.",outcome:"A third variable and study limits made our causal story unsupported.",lesson:"Correlation is a lead, not a conclusion."}
].map((d, id) => ({...d, id}));   // id is the stable catalogue number (id + 1), independent of sort order

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const pad = (n, l = 2) => String(n).padStart(l, "0");
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const root = document.documentElement;

const rows = $("#rows"), count = $("#count"), dialog = $("#dialog"), detail = $("#detail"), toast = $("#toast");
const header = $("header"), menuBtn = $("#menuToggle"), nav = $("#nav");
const overlay = $("#search"), q = $("#q"), results = $("#results"), searchStatus = $("#searchStatus"), searchOpenBtn = $("#searchOpen");

/* Scroll lock shared by the dialog and search overlay (scrollbar-gutter keeps layout steady) */
let locks = 0;
const lock = () => { if (locks++ === 0) root.classList.add("is-locked"); };
const unlock = () => { if (locks > 0 && --locks === 0) root.classList.remove("is-locked"); };

/* Clicks that start and end on the backdrop (not drags that merely end there) */
function onBackdrop(el, fn) {
  let down = false;
  el.addEventListener("pointerdown", e => { down = e.target === el; });
  el.addEventListener("click", e => { if (down && e.target === el) fn(); down = false; });
}

/* Toast ----------------------------------------------------------------- */
let toastTimer;
function show(msg) {
  clearTimeout(toastTimer);
  toast.textContent = msg;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

/* Collection ------------------------------------------------------------ */
let filter = "all", order = "new", swapTimer, endTimer;

function sorted() {
  const list = [...data].sort((a, b) => b.year - a.year || a.id - b.id);
  return order === "new" ? list : list.reverse();
}

function rowEl(d, i) {
  const li = document.createElement("li");
  li.style.setProperty("--i", i);
  const b = document.createElement("button");
  b.type = "button";
  b.className = "row";
  b.dataset.id = d.id;
  b.setAttribute("aria-haspopup", "dialog");
  b.innerHTML = `<span class="num">${pad(d.id + 1, 3)}</span><span><strong>${esc(d.title)}</strong><small>${esc(d.cat)} · ${d.year}</small></span><span class="status">ARCHIVED</span><span class="go" aria-hidden="true">↗</span>`;
  li.append(b);
  return li;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

function buildRows() {
  const list = sorted().filter(d => filter === "all" || d.cat.toLowerCase().includes(filter));
  if (list.length) {
    rows.replaceChildren(...list.map(rowEl));
  } else {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = "Nothing on view in this field yet.";
    rows.replaceChildren(li);
  }
  count.textContent = pad(list.length) + (list.length === 1 ? " OBJECT" : " OBJECTS");
}

/* Fade out → swap → fade in, animating the list height so nothing below jumps */
function updateRows() {
  clearTimeout(swapTimer); clearTimeout(endTimer);
  if (reduced()) { buildRows(); rows.className = ""; rows.style.height = ""; return; }
  const from = rows.offsetHeight;
  rows.style.height = from + "px";
  rows.className = "is-animating is-leaving";
  swapTimer = setTimeout(() => {
    buildRows();
    rows.style.height = "auto";
    const to = rows.offsetHeight;
    rows.style.height = from + "px";
    rows.offsetHeight;                       // commit start height before transitioning
    rows.className = "is-animating is-entering";
    rows.style.height = to + "px";
    endTimer = setTimeout(() => { rows.className = ""; rows.style.height = ""; }, 700);
  }, 160);
}

$$("[data-filter]").forEach(b => b.addEventListener("click", () => {
  if (b.dataset.filter === filter) return;
  $$("[data-filter]").forEach(x => { x.classList.remove("active"); x.setAttribute("aria-pressed", "false"); });
  b.classList.add("active");
  b.setAttribute("aria-pressed", "true");
  filter = b.dataset.filter;
  updateRows();
}));

$("#sort").addEventListener("click", e => {
  order = order === "new" ? "old" : "new";
  const newest = order === "new";
  e.currentTarget.textContent = newest ? "Newest ↓" : "Oldest ↑";
  e.currentTarget.setAttribute("aria-label", `Sort order: ${newest ? "newest" : "oldest"} first. Activate to reverse.`);
  updateRows();
  show(newest ? "Showing newest first" : "Showing oldest first");
});

buildRows();
rows.addEventListener("click", e => {
  const b = e.target.closest(".row");
  if (b) openExhibit(+b.dataset.id, b);
});
$$(".art").forEach(b => b.addEventListener("click", () => openExhibit(+b.dataset.id, b)));
$$("[data-show]").forEach(b => b.addEventListener("click", () => show("Exhibition preview: " + b.dataset.show)));

/* Exhibit record dialog -------------------------------------------------- */
let opener = null, closing = false;

function openExhibit(id, from) {
  const d = data[id];
  if (!d || dialog.open) return;
  opener = from || document.activeElement;
  $("#dmeta").textContent = `${pad(d.id + 1, 3)} / ${d.cat} / ${d.year}`;
  detail.innerHTML = `<h2 id="detailTitle">${esc(d.title)}</h2><h3>THE ATTEMPT</h3><p>${esc(d.attempt)}</p><h3>WHAT HAPPENED</h3><p>${esc(d.outcome)}</p><blockquote><small>TAKEAWAY</small>${esc(d.lesson)}</blockquote>`;
  detail.scrollTop = 0;
  lock();
  dialog.showModal();
  requestAnimationFrame(() => dialog.classList.add("is-open"));
}

function closeExhibit() {
  if (!dialog.open || closing) return;
  closing = true;
  if (reduced()) { dialog.close(); return; }
  dialog.classList.remove("is-open");
  setTimeout(() => { if (dialog.open) dialog.close(); }, 280);
}

dialog.addEventListener("cancel", e => { e.preventDefault(); closeExhibit(); });   // Escape
dialog.addEventListener("close", () => {
  closing = false;
  dialog.classList.remove("is-open");
  unlock();
  const back = opener && document.contains(opener) ? opener : searchOpenBtn;
  back.focus({preventScroll: true});
  opener = null;
});
$("#close").addEventListener("click", closeExhibit);
onBackdrop(dialog, closeExhibit);

/* Search overlay --------------------------------------------------------- */
let searchReturn = null;
const isSearchOpen = () => overlay.classList.contains("open");

function openSearch() {
  if (isSearchOpen()) return;
  closeMenu();
  searchReturn = document.activeElement;
  overlay.inert = false;
  overlay.classList.add("open");
  lock();
  renderResults();
  q.focus({preventScroll: true});
  q.select();
}

function closeSearch(restore = true) {
  if (!isSearchOpen()) return;
  overlay.classList.remove("open");
  overlay.inert = true;
  unlock();
  if (restore && searchReturn) searchReturn.focus({preventScroll: true});
}

function renderResults() {
  const term = q.value.trim().toLowerCase();
  results.replaceChildren();
  if (!term) { searchStatus.textContent = "Type to search titles, fields and lessons."; return; }
  const hits = data.filter(d => [d.title, d.cat, d.attempt, d.outcome, d.lesson].join(" ").toLowerCase().includes(term));
  searchStatus.textContent = pad(hits.length) + (hits.length === 1 ? " OBJECT" : " OBJECTS");
  if (!hits.length) {
    const box = document.createElement("div");
    box.className = "noresult";
    const strong = document.createElement("strong");
    strong.textContent = `Nothing on view for “${q.value.trim()}”.`;
    const p = document.createElement("p");
    p.textContent = "Try a field such as “research”, “product” or “creative”, or a single word like “data”.";
    box.append(strong, p);
    results.append(box);
    return;
  }
  hits.forEach((d, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "hit";
    b.style.setProperty("--i", i);
    b.innerHTML = `<span>${esc(d.title)}</span><small>${esc(d.cat)} · ${d.year}</small>`;
    b.addEventListener("click", () => { closeSearch(false); openExhibit(d.id, searchOpenBtn); });
    results.append(b);
  });
}

searchOpenBtn.addEventListener("click", openSearch);
$("#searchClose").addEventListener("click", () => closeSearch());
onBackdrop(overlay, () => closeSearch());
q.addEventListener("input", renderResults);
overlay.addEventListener("keydown", e => {
  const hits = $$(".hit", results);
  if (e.key === "Enter" && e.target === q && hits[0]) { e.preventDefault(); hits[0].click(); }
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    const all = [q, ...hits], i = all.indexOf(document.activeElement);
    if (i === -1) return;
    e.preventDefault();
    const next = e.key === "ArrowDown" ? Math.min(i + 1, all.length - 1) : Math.max(i - 1, 0);
    all[next].focus();
  }
  if (e.key === "Tab") {                       // keep focus inside the overlay
    const f = [$("#searchClose"), q, ...hits].filter(Boolean);
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

/* Mobile navigation ------------------------------------------------------ */
const narrow = matchMedia("(max-width: 820px)");
function setMenu(open) {
  header.classList.toggle("menu-open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.textContent = open ? "Close ×" : "Menu";
}
function closeMenu() { if (header.classList.contains("menu-open")) setMenu(false); }
menuBtn.addEventListener("click", () => setMenu(!header.classList.contains("menu-open")));
nav.addEventListener("click", e => { if (e.target.closest("a")) closeMenu(); });
document.addEventListener("click", e => {
  if (header.classList.contains("menu-open") && !header.contains(e.target)) closeMenu();
});
narrow.addEventListener("change", () => { if (!narrow.matches) closeMenu(); });

document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  if (isSearchOpen()) closeSearch();
  else if (header.classList.contains("menu-open")) { closeMenu(); menuBtn.focus(); }
});

/* Submission form (prototype: localStorage only) ------------------------- */
const form = $("#form"), send = $(".send"), formStatus = $("#formStatus");
const KEY = "museum-exhibits";
let saving = false, resetTimer;

const readAll = () => { try { const v = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(v) ? v : []; } catch { return []; } };
const valid = c => c.type === "checkbox" ? c.checked : c.value.trim() !== "";

function setError(c, msg) {
  let err = c.closest("label").querySelector(".field-error");
  if (!err) {
    err = document.createElement("span");
    err.className = "field-error";
    err.id = "err-" + (c.name || "consent");
    err.setAttribute("aria-hidden", "true");     // announced through aria-describedby instead
    c.closest("label").append(err);
  }
  if (msg) {
    err.textContent = msg;
    err.classList.add("show");
    c.setAttribute("aria-invalid", "true");
    c.setAttribute("aria-describedby", err.id);
  } else {
    err.classList.remove("show");
    c.removeAttribute("aria-invalid");
    c.removeAttribute("aria-describedby");
  }
}

const fit = t => { t.style.height = "auto"; t.style.height = Math.min(t.scrollHeight + 1, 340) + "px"; };
$$("textarea", form).forEach(t => t.addEventListener("input", () => fit(t)));
$$("[required]", form).forEach(c => c.addEventListener(c.type === "checkbox" || c.tagName === "SELECT" ? "change" : "input", () => {
  if (c.hasAttribute("aria-invalid") && valid(c)) setError(c, "");
}));

form.addEventListener("submit", e => {
  e.preventDefault();
  if (saving) return;
  const fields = $$("[required]", form);
  fields.forEach(c => setError(c, valid(c) ? "" : c.dataset.error));
  const bad = fields.filter(c => !valid(c));
  if (bad.length) {
    formStatus.textContent = `Please check ${bad.length} ${bad.length === 1 ? "field" : "fields"} before saving.`;
    bad[0].focus();
    return;
  }
  formStatus.textContent = "";
  saving = true;
  clearTimeout(resetTimer);
  send.classList.add("is-saving");
  send.textContent = "Saving…";
  setTimeout(() => {
    const entry = Object.fromEntries([...new FormData(form)].map(([k, v]) => [k, String(v).trim()]));
    try {
      const all = readAll();
      all.push(entry);
      localStorage.setItem(KEY, JSON.stringify(all));
    } catch {
      saving = false;
      send.classList.remove("is-saving");
      send.textContent = "Save exhibit ↗";
      show("We couldn’t save this in your browser. Storage may be blocked or full.");
      return;
    }
    form.reset();
    $$("textarea", form).forEach(t => { t.style.height = ""; });
    saving = false;
    send.classList.replace("is-saving", "is-saved");
    send.textContent = "Saved in this browser ✓";
    show("Saved in this browser. Thank you for contributing.");
    resetTimer = setTimeout(() => { send.classList.remove("is-saved"); send.textContent = "Save exhibit ↗"; }, 2600);
  }, reduced() ? 0 : 380);
});

/* Scroll behaviour: header state, current section, orbit drift ----------- */
const art = $(".art");
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    header.classList.toggle("scrolled", scrollY > 8);
    if (art && !reduced()) {
      const r = art.getBoundingClientRect(), vh = innerHeight;
      const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh));
      art.style.setProperty("--spin", (p * -8).toFixed(2) + "deg");
    }
  });
}
addEventListener("scroll", onScroll, {passive: true});
onScroll();

if ("IntersectionObserver" in window) {
  const links = $$("nav a[href^='#']").filter(a => a.hash.length > 1);
  const live = new Set();
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => en.isIntersecting ? live.add(en.target.id) : live.delete(en.target.id));
    const current = links.find(a => live.has(a.hash.slice(1)));
    links.forEach(a => a === current ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current"));
  }, {rootMargin: "-35% 0px -60% 0px"});
  links.forEach(a => { const s = $(a.hash); if (s) spy.observe(s); });

  if (!reduced()) {
    const targets = $$("main section:not(.hero) > *");
    targets.forEach(el => el.classList.add("reveal"));
    const io = new IntersectionObserver(entries => {
      let n = 0;
      entries.filter(en => en.isIntersecting).forEach(en => {
        const el = en.target;
        el.style.transitionDelay = Math.min(n++, 4) * 70 + "ms";
        el.classList.add("in");
        io.unobserve(el);
        setTimeout(() => { el.classList.remove("reveal", "in"); el.style.transitionDelay = ""; }, 1500);
      });
    }, {rootMargin: "0px 0px -8% 0px", threshold: .08});
    targets.forEach(el => io.observe(el));
  }
}
