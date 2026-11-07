(() => {
  const cveIdFromUrl = url => decodeURIComponent(url || '').match(/CVE-\d{4}-\d{4,}/i)?.[0].toUpperCase();
  const issueFromUrl = url => (url || '').match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)\/issues\/(\d+)\/?$/i);
  const cleanIssueTitle = title => title.replace(/^\s*\[security\]\s*/i, '').trim();
  const normalizeCve = item => {
    const id = item.id?.toUpperCase() || cveIdFromUrl(item.nvd);
    const issue = issueFromUrl(item.issue);
    return {
      ...item,
      id,
      year: item.year || Number(id?.match(/^CVE-(\d{4})-/)?.[1]),
      project: item.project || (issue ? issue[2].toUpperCase() : '—'),
      source: 'CVE',
      label: id,
      url: item.nvd || `https://nvd.nist.gov/vuln/detail/${id}`,
      issueApi: issue ? `https://api.github.com/repos/${issue[1]}/${issue[2]}/issues/${issue[3]}` : null,
      issueTitle: item.title ? cleanIssueTitle(item.title) : ''
    };
  };
  const entries = [
    ...window.BDU_ENTRIES.map(item => ({ ...item, source: 'BDU', label: `BDU:${item.id}`, url: `https://bdu.fstec.ru/vul/${item.id}` })),
    ...window.CVE_ENTRIES.map(normalizeCve)
  ];
  const state = { year: 'all', source: 'all', project: 'all', query: '' };
  const years = [...new Set(entries.map(item => item.year))].sort();
  const projects = [...new Set(entries.map(item => item.project))].sort();
  const el = id => document.getElementById(id);
  const button = (label, key, value, extra = '') => `<button type="button" class="${extra} ${state[key] === String(value) ? 'is-active' : ''}" data-key="${key}" data-value="${value}">${label}</button>`;

  function renderControls() {
    el('years').innerHTML = years.map(year => button(`${year} <span class="year-pill-count">${entries.filter(item => item.year === year).length}</span>`, 'year', year, 'year-pill')).join('') + button(`всё <span class="year-pill-count">${entries.length}</span>`, 'year', 'all', 'year-pill year-pill--all');
    el('filters').innerHTML = button('все источники', 'source', 'all', 'filter-chip') + button('BDU', 'source', 'BDU', 'filter-chip') + button('CVE', 'source', 'CVE', 'filter-chip') + '<span class="bdu-filter-sep" aria-hidden="true">·</span>' + projects.map(project => button(project, 'project', project, 'filter-chip')).join('');
  }

  function render() {
    const shown = entries.filter(item => (state.year === 'all' || String(item.year) === state.year) && (state.source === 'all' || item.source === state.source) && (state.project === 'all' || item.project === state.project) && `${item.id} ${item.issueTitle}`.toLowerCase().includes(state.query));
    el('total').textContent = entries.length;
    el('count').textContent = `Показано ${shown.length} из ${entries.length}`;
    el('list').replaceChildren(...shown.map(item => {
      const row = document.createElement('li');
      row.className = `bdu-row ${item.source === 'CVE' && item.issueTitle ? 'bdu-row--titled' : ''}`;
      const link = document.createElement('a');
      link.href = item.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      const label = document.createElement('span');
      label.className = 'bdu-id';
      label.textContent = item.issueTitle ? `${item.label} ${item.label}: ${item.issueTitle}` : item.label;
      const project = document.createElement('span');
      project.className = 'bdu-project';
      project.textContent = item.project;
      const year = document.createElement('span');
      year.className = 'bdu-year';
      year.textContent = item.year;
      const severity = document.createElement('span');
      severity.className = `bdu-sev bdu-sev--${item.severity || 'na'}`;
      severity.textContent = item.severity || item.source;
      const arrow = document.createElement('span');
      arrow.className = 'bdu-arrow';
      arrow.textContent = '↗';
      link.append(label, project, year, severity, arrow);
      row.append(link);
      return row;
    }));
    renderControls();
  }

  async function loadIssueTitles() {
    await Promise.all(entries.filter(item => item.issueApi && !item.issueTitle).map(async item => {
      try {
        const response = await fetch(item.issueApi, { headers: { Accept: 'application/vnd.github+json' } });
        if (!response.ok) return;
        const issue = await response.json();
        item.issueTitle = cleanIssueTitle(issue.title || '');
      } catch (_) {
        // The registry remains usable when GitHub is unavailable or rate-limited.
      }
    }));
    render();
  }

  document.addEventListener('click', event => {
    const target = event.target.closest('[data-key]');
    if (!target) return;
    state[target.dataset.key] = target.dataset.value;
    render();
  });
  el('search').addEventListener('input', event => { state.query = event.target.value.trim().toLowerCase(); render(); });
  render();
  loadIssueTitles();
})();
