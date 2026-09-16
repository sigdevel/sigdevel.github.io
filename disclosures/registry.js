(() => {
  const entries = [
    ...window.BDU_ENTRIES.map(item => ({ ...item, source: 'BDU', label: `BDU:${item.id}`, url: `https://bdu.fstec.ru/vul/${item.id}` })),
    ...window.CVE_ENTRIES.map(item => ({ ...item, source: 'CVE', label: item.id, url: `https://nvd.nist.gov/vuln/detail/${item.id}` }))
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
    const shown = entries.filter(item => (state.year === 'all' || String(item.year) === state.year) && (state.source === 'all' || item.source === state.source) && (state.project === 'all' || item.project === state.project) && item.id.toLowerCase().includes(state.query));
    el('total').textContent = entries.length;
    el('count').textContent = `Показано ${shown.length} из ${entries.length}`;
    el('list').innerHTML = shown.map(item => `<li class="bdu-row"><a href="${item.url}" target="_blank" rel="noopener noreferrer"><span class="bdu-id">${item.label}</span><span class="bdu-project">${item.project}</span><span class="bdu-year">${item.year}</span><span class="bdu-sev bdu-sev--${item.severity || 'na'}">${item.severity || item.source}</span><span class="bdu-arrow">↗</span></a></li>`).join('');
    renderControls();
  }

  document.addEventListener('click', event => {
    const target = event.target.closest('[data-key]');
    if (!target) return;
    state[target.dataset.key] = target.dataset.value;
    render();
  });
  el('search').addEventListener('input', event => { state.query = event.target.value.trim().toLowerCase(); render(); });
  render();
})();
