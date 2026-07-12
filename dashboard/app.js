const TIERS = {
  gold:   { label: "Diamond",   icon: "💎", cssClass: "t-gold" },
  silver: { label: "Gold",      icon: "🥇", cssClass: "t-silver" },
  bronze: { label: "Silver",    icon: "🥈", cssClass: "t-bronze" },
  entry:  { label: "Submitted", icon: "✅", cssClass: "t-entry" },
};
const TIER_ORDER = ["gold", "silver", "bronze", "entry"];

let selectedDay = null;
let knownTotalDays = 5;
let pollTimer = null;

async function fetchLeaderboard(day) {
  const qs = day ? `?day=${day}` : "";
  const res = await fetch(`/api/leaderboard${qs}`, { cache: "no-store" });
  return res.json();
}

function renderTabs(activeDay) {
  const tabs = document.getElementById("tabs");
  tabs.innerHTML = "";
  for (let d = 1; d <= knownTotalDays; d++) {
    const btn = document.createElement("button");
    btn.className = "tab" + (d === activeDay ? " active" : "");
    btn.textContent = `Day ${d}`;
    btn.onclick = () => { selectedDay = d; load(); };
    tabs.appendChild(btn);
  }
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

function chipHTML(entry, tier) {
  const meta = TIERS[tier];
  return `
    <div class="chip">
      <div class="chip-badge">${meta.icon}</div>
      <div class="chip-rank">#${entry.rank}</div>
      <div class="chip-name">${escapeHTML(entry.name)}</div>
      <div class="chip-github">@${escapeHTML(entry.github)}</div>
      <div class="chip-score">${meta.label}</div>
    </div>`;
}

function render(data) {
  document.getElementById("updated").textContent =
    data.generated_at ? `Updated ${new Date(data.generated_at).toLocaleTimeString()}` : "";

  if (data.error === "roster_empty") {
    document.getElementById("content").innerHTML =
      `<div class="error">roster.json not found or empty — add student GitHub usernames there first.</div>`;
    return;
  }
  if (data.error === "no_data") {
    document.getElementById("content").innerHTML =
      `<div class="empty">No submissions yet. Waiting for students to push their day${data.day || 1}.json…</div>`;
    return;
  }

  knownTotalDays = data.total_days || knownTotalDays;
  renderTabs(data.day);

  document.getElementById("stat-submitted").textContent = data.submitted_count ?? 0;
  document.getElementById("stat-total").textContent = data.total_students ?? "–";
  document.getElementById("stat-day").textContent = data.day ?? "–";

  const ranked = data.ranked || [];
  const byTier = { gold: [], silver: [], bronze: [], entry: [] };
  ranked.forEach((r) => byTier[r.tier]?.push(r));

  let html = "";

  if (ranked.length === 0) {
    html = `<div class="empty">No submissions for Day ${data.day} yet. Students push submissions/day${data.day}.json to their fork.</div>`;
  } else {
    TIER_ORDER.forEach((t) => {
      if (byTier[t].length === 0) return;
      const meta = TIERS[t];
      html += `
        <div class="tier ${meta.cssClass}">
          <div class="tier-head">
            <span class="tier-icon">${meta.icon}</span>
            <span class="tier-name">${meta.label}</span>
            <span class="tier-count">${byTier[t].length} student${byTier[t].length > 1 ? "s" : ""}</span>
          </div>
          <div class="chip-grid">
            ${byTier[t].map((e) => chipHTML(e, t)).join("")}
          </div>
        </div>`;
    });
  }

  if ((data.pending || []).length > 0) {
    html += `
      <div class="pending-head">⏳ Awaiting submission — ${data.pending.length} student${data.pending.length > 1 ? "s" : ""}</div>
      <div class="pending-grid">
        ${data.pending.map((p) => `<span class="pending-chip">${escapeHTML(p.name)}</span>`).join("")}
      </div>`;
  }

  document.getElementById("content").innerHTML = html;
}

async function load() {
  try {
    const data = await fetchLeaderboard(selectedDay);
    render(data);
  } catch {
    document.getElementById("content").innerHTML =
      `<div class="error">Cannot reach the leaderboard function. Check Netlify deployment.</div>`;
  }
}

function startPolling() {
  if (pollTimer) clearInterval(pollTimer);
  pollTimer = setInterval(load, 20000);
}

load();
startPolling();
