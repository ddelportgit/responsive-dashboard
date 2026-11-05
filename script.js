/* ============================================================
   Element refs
   ============================================================ */
const sidebar = document.getElementById("sidebar");
const backdrop = document.getElementById("backdrop");
const toggle = document.getElementById("menuToggle");
const pageTitle = document.getElementById("pageTitle");
const search = document.getElementById("searchInput");

const navButtons = [
  document.querySelector(".dashboardBtn"),
  document.querySelector(".analyticsBtn"),
  document.querySelector(".reportsBtn"),
  document.querySelector(".settingsBtn"),
];

/* ============================================================
   Nav active state + page title
   ============================================================ */
navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    navButtons.forEach((b) => b.classList.remove("activeBtn"));
    btn.classList.add("activeBtn");

    const label =
      btn.querySelector("span")?.textContent ?? btn.textContent.trim();
    pageTitle.textContent = label;
    document.title = `InsightFlow | ${label}`;
  });
});

/* ============================================================
   Mobile menu
   ============================================================ */
const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

function setMenu(open) {
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  sidebar.classList.toggle("open", open);
  backdrop.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);
}

toggle.addEventListener("click", () => {
  const next = !isOpen();
  setMenu(next);
  if (next) sidebar.querySelector("button")?.focus();
});

backdrop.addEventListener("click", () => setMenu(false));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isOpen()) {
    setMenu(false);
    toggle.focus();
  }
});

/* close after picking a section — mobile only */
sidebar.addEventListener("click", (e) => {
  const navBtn = e.target.closest("button");
  if (navBtn && !window.matchMedia("(min-width: 901px)").matches) {
    setMenu(false);
    toggle.focus();
  }
});

/* reset state when resizing back up to desktop */
window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => {
  if (e.matches) setMenu(false);
});

/* ============================================================
   Live table search
   ============================================================ */
if (search) {
  search.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase().trim();
    document.querySelectorAll("tbody tr").forEach((row) => {
      const name = row.cells[0].textContent.toLowerCase();
      row.hidden = q.length > 0 && !name.includes(q);
    });
  });
}

/* ============================================================
   Chart
   ============================================================ */
const canvas = document.getElementById("myChart");
if (canvas && window.Chart) {
  const ctx = canvas.getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Sales",
          data: [60, 85, 40, 72, 95, 68],
          borderColor: "#4f46e5",
          backgroundColor: (c) => {
            const g = c.chart.ctx.createLinearGradient(0, 0, 0, 300);
            g.addColorStop(0, "rgba(79, 70, 229, 0.25)");
            g.addColorStop(1, "rgba(79, 70, 229, 0)");
            return g;
          },
          fill: true,
          tension: 0.4,
          borderWidth: 2.5,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#4f46e5",
          pointHoverBorderColor: "#ffffff",
          pointHoverBorderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#0f172a",
          padding: 12,
          cornerRadius: 8,
          titleFont: { size: 12, weight: "600" },
          bodyFont: { size: 13, weight: "600" },
          displayColors: false,
          callbacks: {
            label: (ctx) => `R${ctx.parsed.y}k`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { color: "#64748b", font: { size: 12 } },
        },
        y: {
          beginAtZero: true,
          grid: { color: "#e2e8f0", drawTicks: false },
          border: { display: false },
          ticks: { color: "#64748b", font: { size: 12 }, padding: 8 },
        },
      },
    },
  });
}
