(() => {
  const prefersReducedMotion = () =>
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const createNoise = () => {
    const noise = document.createElement('canvas');
    const size = 256;
    noise.width = size;
    noise.height = size;
    const nctx = noise.getContext('2d', { alpha: true });
    const img = nctx.createImageData(size, size);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 255;
      img.data[i] = v;
      img.data[i + 1] = v;
      img.data[i + 2] = v;
      img.data[i + 3] = 35;
    }
    nctx.putImageData(img, 0, 0);
    return noise;
  };

  const drawFallback = (ctx, w, h) => {
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, 'rgba(111, 76, 30, 0.25)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.6)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
  };

  const initHeader = (header) => {
    const canvas = header.querySelector('.hero-mosh');
    if (!canvas || prefersReducedMotion()) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    const mosh = document.createElement('canvas');
    const mctx = mosh.getContext('2d', { alpha: true });
    const base = document.createElement('canvas');
    const bctx = base.getContext('2d', { alpha: true });
    const noise = createNoise();

    const state = {
      w: 0,
      h: 0,
      dpr: 1,
      raf: 0,
      last: 0,
      burst: 0,
    };

    const setSize = () => {
      const rect = header.getBoundingClientRect();
      const dpr = clamp(window.devicePixelRatio || 1, 1, 2);
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));
      state.w = w;
      state.h = h;
      state.dpr = dpr;
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      base.width = w;
      base.height = h;
      mosh.width = w;
      mosh.height = h;
      drawFallback(bctx, w, h);
    };

    const distort = () => {
      const { w, h } = state;
      const sx = (Math.random() - 0.5) * 18;
      const sy = (Math.random() - 0.5) * 8;
      mctx.globalCompositeOperation = 'source-over';
      mctx.clearRect(0, 0, w, h);
      mctx.drawImage(base, 0, 0);
      mctx.globalCompositeOperation = 'lighter';
      mctx.drawImage(noise, 0, 0, w, h);
      mctx.globalCompositeOperation = 'source-over';
      mctx.drawImage(base, sx, sy, w, h);
    };

    const render = (ts) => {
      const { w, h } = state;
      const dt = ts - state.last;
      state.last = ts;
      if (Math.random() > 0.94) {
        state.burst = clamp(state.burst + 0.5, 0, 1);
      } else {
        state.burst = clamp(state.burst - dt * 0.0006, 0, 1);
      }
      distort();
      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = 0.5 + state.burst * 0.3;
      ctx.drawImage(mosh, 0, 0);
      ctx.globalAlpha = 1;
      state.raf = requestAnimationFrame(render);
    };

    setSize();
    window.addEventListener('resize', setSize, { passive: true });
    state.raf = requestAnimationFrame(render);
  };

  const headers = document.querySelectorAll('.hero-header');
  headers.forEach((header) => initHeader(header));
})();
