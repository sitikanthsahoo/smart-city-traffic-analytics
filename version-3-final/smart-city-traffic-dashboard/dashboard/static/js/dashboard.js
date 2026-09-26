// Smart City Traffic Analytics — dashboard rendering + interactivity

const fmt = (n) => Number(n).toLocaleString(undefined, { maximumFractionDigits: 0 });
const fmt2 = (n) => Number(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

let DATA = null;
let mrRows = [];
let mrSort = { key: 'average_vehicles', dir: 'desc' };
let hsRows = [];
let hsSort = { key: 'future_congestion_score', dir: 'desc' };

async function boot() {
  const res = await fetch('/api/data');
  DATA = await res.json();

  renderOverview(DATA);
  renderMapReduce(DATA);
  renderClustering(DATA);
  renderScenarios(DATA);
  renderSecurity(DATA);
  renderHotspots(DATA);
  setupScrollSpy();
}

// ---------------- Overview ----------------
function renderOverview(d) {
  const o = d.overview;
  const stats = [
    { v: fmt(o.total_records), u: 'rows', l: 'Records processed' },
    { v: o.unique_intersections, u: '', l: 'Intersections tracked' },
    { v: o.city_zones, u: 'zones', l: 'City zones' },
    { v: `${o.peak_hour}:00`, u: `· ${fmt(o.peak_avg)} avg`, l: 'Peak traffic hour' },
  ];
  const row = document.getElementById('stat-row');
  row.innerHTML = stats.map(s => `
    <div class="stat">
      <div class="v">${s.v}<span class="unit">${s.u}</span></div>
      <div class="l">${s.l}</div>
    </div>`).join('');
}

// ---------------- MapReduce table ----------------
function renderMapReduce(d) {
  mrRows = d.mapreduce_top10.slice();
  drawMrTable();

  document.getElementById('mr-search').addEventListener('input', (e) => {
    drawMrTable(e.target.value.trim().toUpperCase());
  });

  document.querySelectorAll('#mr-table thead th[data-key]').forEach(th => {
    th.addEventListener('click', () => {
      const key = th.dataset.key;
      if (mrSort.key === key) mrSort.dir = mrSort.dir === 'asc' ? 'desc' : 'asc';
      else mrSort = { key, dir: 'desc' };
      drawMrTable(document.getElementById('mr-search').value.trim().toUpperCase());
    });
  });
}

function drawMrTable(filterText = '') {
  let rows = mrRows.filter(r => !filterText || r.intersection_id.toUpperCase().includes(filterText));

  if (mrSort.key !== 'rank') {
    rows = rows.slice().sort((a, b) => {
      const av = a[mrSort.key], bv = b[mrSort.key];
      const cmp = typeof av === 'string' ? av.localeCompare(bv) : av - bv;
      return mrSort.dir === 'asc' ? cmp : -cmp;
    });
  }

  document.querySelectorAll('#mr-table thead th[data-key]').forEach(th => {
    th.classList.remove('sorted', 'sorted-asc');
    if (th.dataset.key === mrSort.key) th.classList.add(mrSort.dir === 'asc' ? 'sorted-asc' : 'sorted');
  });

  const tbody = document.getElementById('mr-tbody');
  if (!rows.length) {
    tbody.innerHTML = `<tr><td colspan="7" style="color:var(--text-faint); text-align:center; padding:24px;">No intersections match "${filterText}"</td></tr>`;
    return;
  }

  tbody.innerHTML = rows.map((r, i) => `
    <tr>
      <td><span class="rank">${i + 1}</span></td>
      <td style="color:var(--amber);">${r.intersection_id}</td>
      <td>${fmt(r.total_vehicles)}</td>
      <td>${fmt2(r.average_vehicles)}</td>
      <td>${fmt(r.max_vehicles)}</td>
      <td>${fmt(r.min_vehicles)}</td>
      <td>${fmt(r.record_count)}</td>
    </tr>`).join('');
}

// ---------------- Clustering ----------------
function renderClustering(d) {
  const cards = d.clusters.labels.slice().sort((a, b) => b.pct - a.pct);
  document.getElementById('cluster-cards').innerHTML = cards.map(c => `
    <div class="card cluster-card">
      <div class="bar" style="background:${c.color};"></div>
      <h3 style="color:${c.color};">${c.level} congestion</h3>
      <div class="pct">${c.pct}%</div>
      <div class="count">${fmt(c.count)} readings</div>
      <div class="avg">Cluster avg vehicle count <b>${fmt2(c.avg_vehicles)}</b></div>
    </div>`).join('');

  const levelPill = (level) => {
    const cls = level.toLowerCase();
    return `<span class="pill ${cls}">${level}</span>`;
  };

  document.getElementById('pred-tbody').innerHTML = d.clusters.sample_predictions.map(p => `
    <tr>
      <td style="color:var(--amber);">${p.intersection_id}</td>
      <td>${p.city_zone}</td>
      <td>${fmt(p.vehicle_count)}</td>
      <td>${fmt2(p.congestion_score)}</td>
      <td>${levelPill(p.congestion_level)}</td>
    </tr>`).join('');
}

// ---------------- Scenarios ----------------
function renderScenarios(d) {
  const classFor = (s) => s.includes('Normal') ? 'normal' : s.includes('Increased') ? 'increased' : 'peak';
  document.getElementById('scenario-cards').innerHTML = d.scenarios.map(s => `
    <div class="card scenario-card ${classFor(s.scenario)}">
      <div class="top">
        <div>
          <h3>${s.scenario}</h3>
        </div>
      </div>
      <div class="value">${fmt(s.expected_vehicles)}<span class="u"> vehicles/hr</span></div>
      <div class="period" style="text-align:left; margin-top:4px;">${s.time_period}</div>
      <p>${s.explanation}</p>
      <div class="action">
        <b>RECOMMENDED ACTION</b>
        ${s.action}
      </div>
    </div>`).join('');
}

// ---------------- Security ----------------
function renderSecurity(d) {
  const riskColor = { CRITICAL: 'var(--red)', HIGH: 'var(--orange)', MEDIUM: 'var(--amber)' };
  const counts = d.key_findings.security_summary;
  document.getElementById('risk-summary').innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <span class="pill critical">Critical</span><span style="font-family:var(--mono); font-size:13px;">${counts.critical}</span>
    </div>
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <span class="pill high">High</span><span style="font-family:var(--mono); font-size:13px;">${counts.high}</span>
    </div>
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <span class="pill medium">Medium</span><span style="font-family:var(--mono); font-size:13px;">${counts.medium}</span>
    </div>
  `;

  document.getElementById('stride-rows').innerHTML = d.stride.map(t => `
    <div class="stride-row">
      <div class="cat">
        <span class="icon">${t.icon}</span>
        <div>
          <h4>${t.category}</h4>
          <div class="fields">${t.fields}</div>
        </div>
      </div>
      <div class="body">
        <p>${t.description}</p>
        <p class="example">e.g. ${t.example}</p>
      </div>
      <div class="mitig">
        <span class="pill ${t.risk.toLowerCase()}">${t.risk}</span>
        <ul>${t.mitigation.map(m => `<li>${m}</li>`).join('')}</ul>
      </div>
    </div>`).join('');

  document.getElementById('layer-stack').innerHTML = d.security_layers.map(l => `
    <div class="layer">
      <div class="name"><span>${l.icon}</span>${l.name}</div>
      <ul>${l.controls.map(c => `<li>${c}</li>`).join('')}</ul>
    </div>`).join('');
}

// ---------------- Hotspots ----------------
function renderHotspots(d) {
  document.getElementById('hotspot-desc').textContent =
    `Current average congestion per intersection projected forward under a +${d.future_growth_factor}% ` +
    `urban-expansion growth assumption to flag tomorrow's critical intersections today.`;

  hsRows = d.future_hotspots.slice();
  drawHotspotTable();

  document.querySelectorAll('#hotspot-table thead th[data-key]').forEach(th => {
    th.addEventListener('click', () => {
      const key = th.dataset.key;
      if (hsSort.key === key) hsSort.dir = hsSort.dir === 'asc' ? 'desc' : 'asc';
      else hsSort = { key, dir: 'desc' };
      drawHotspotTable();
    });
  });
}

function drawHotspotTable() {
  let rows = hsRows.slice().sort((a, b) => {
    const av = a[hsSort.key], bv = b[hsSort.key];
    const cmp = typeof av === 'string' ? av.localeCompare(bv) : av - bv;
    return hsSort.dir === 'asc' ? cmp : -cmp;
  });

  document.querySelectorAll('#hotspot-table thead th[data-key]').forEach(th => {
    th.classList.remove('sorted', 'sorted-asc');
    if (th.dataset.key === hsSort.key) th.classList.add(hsSort.dir === 'asc' ? 'sorted-asc' : 'sorted');
  });

  document.getElementById('hotspot-tbody').innerHTML = rows.map((r, i) => `
    <tr>
      <td><span class="rank">${i + 1}</span></td>
      <td style="color:var(--amber);">${r.intersection_id}</td>
      <td>${r.city_zone}</td>
      <td>${fmt2(r.avg_vehicles)}</td>
      <td style="color:var(--orange);">${fmt2(r.future_avg_vehicles)}</td>
      <td style="color:var(--red);">${fmt2(r.future_congestion_score)}</td>
    </tr>`).join('');
}

// ---------------- Scroll spy ----------------
function setupScrollSpy() {
  const links = Array.from(document.querySelectorAll('nav.toc a'));
  const sections = links.map(l => document.querySelector(l.getAttribute('href')));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = '#' + entry.target.id;
      const link = links.find(l => l.getAttribute('href') === id);
      if (!link) return;
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-10% 0px -70% 0px', threshold: 0 });

  sections.forEach(s => s && observer.observe(s));
  if (links[0]) links[0].classList.add('active');
}

boot();
