(() => {
  const initHoudiniEngineeringBG = () => {
    if (!('paintWorklet' in CSS) || !CSS.paintWorklet) return;

    const setDpr = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      document.documentElement.style.setProperty('--eng-bg-dpr', String(dpr));
    };
    setDpr();
    window.addEventListener('resize', setDpr, { passive: true });

    const workletCode = `
      /* Houdini Paint Worklet: engineeringBG */
      const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
      const num = (props, name, fallback) => {
        const v = props && props.get && props.get(name);
        const n = parseFloat(v === undefined || v === null ? '' : String(v));
        return Number.isFinite(n) ? n : fallback;
      };

      const makeRng = (seed) => {
        let t = (seed >>> 0) || 1;
        return () => {
          t += 0x6D2B79F5;
          let r = Math.imul(t ^ (t >>> 15), 1 | t);
          r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
          return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
        };
      };

      const noise1 = (x, seed) => {
        let n = ((x * 0.14) | 0) + (seed | 0);
        n = Math.imul(n ^ (n >>> 16), 0x45d9f3b);
        n = Math.imul(n ^ (n >>> 16), 0x45d9f3b);
        n = (n ^ (n >>> 16)) >>> 0;
        return (n / 4294967296) * 2 - 1;
      };

      class EngineeringBG {
        static get inputProperties() {
          return [
            '--eng-bg-grid',
            '--eng-bg-major',
            '--eng-bg-hatch',
            '--eng-bg-seed',
            '--eng-bg-dpr',
            '--eng-bg-phase',
            '--eng-bg-grid-alpha',
            '--eng-bg-major-alpha',
            '--eng-bg-hatch-alpha',
            '--eng-bg-noise-alpha',
            '--eng-bg-scope-alpha',
            '--eng-bg-scope-thickness',
            '--eng-bg-cal-alpha',
          ];
        }

        paint(ctx, geom, props) {
          const w = Math.max(1, geom.width);
          const h = Math.max(1, geom.height);

          const dpr = clamp(num(props, '--eng-bg-dpr', 1), 1, 2);
          const W = w / dpr;
          const H = h / dpr;

          const grid = clamp(num(props, '--eng-bg-grid', 28), 12, 84);
          const major = clamp(num(props, '--eng-bg-major', grid * 4), grid * 2, grid * 14);
          const hatch = clamp(num(props, '--eng-bg-hatch', 160), 70, 340);

          const seed = (num(props, '--eng-bg-seed', 1337) | 0) >>> 0;
          const phase = num(props, '--eng-bg-phase', 0);

          const aGrid = clamp(num(props, '--eng-bg-grid-alpha', 0.055), 0, 0.25);
          const aMajor = clamp(num(props, '--eng-bg-major-alpha', 0.080), 0, 0.35);
          const aHatch = clamp(num(props, '--eng-bg-hatch-alpha', 0.035), 0, 0.25);
          const aNoise = clamp(num(props, '--eng-bg-noise-alpha', 0.028), 0, 0.20);
          const aScope = clamp(num(props, '--eng-bg-scope-alpha', 0.055), 0, 0.30);
          const scopeW = clamp(num(props, '--eng-bg-scope-thickness', 1.15), 0.6, 2.2);
          const aCal = clamp(num(props, '--eng-bg-cal-alpha', 0.050), 0, 0.22);

          ctx.save();
          ctx.scale(dpr, dpr);

          ctx.lineWidth = 1;
          ctx.strokeStyle = 'rgba(0,0,0,' + aGrid + ')';
          ctx.beginPath();

          const x0 = (seed % grid);
          for (let x = x0; x <= W; x += grid) {
            const xx = (x | 0) + 0.5;
            ctx.moveTo(xx, 0);
            ctx.lineTo(xx, H);
          }

          const y0 = ((seed * 3) % grid);
          for (let y = y0; y <= H; y += grid) {
            const yy = (y | 0) + 0.5;
            ctx.moveTo(0, yy);
            ctx.lineTo(W, yy);
          }
          ctx.stroke();

          ctx.strokeStyle = 'rgba(0,0,0,' + aMajor + ')';
          ctx.beginPath();

          const mx0 = (seed % major);
          for (let x = mx0; x <= W; x += major) {
            const xx = (x | 0) + 0.5;
            ctx.moveTo(xx, 0);
            ctx.lineTo(xx, H);
          }

          const my0 = ((seed * 5) % major);
          for (let y = my0; y <= H; y += major) {
            const yy = (y | 0) + 0.5;
            ctx.moveTo(0, yy);
            ctx.lineTo(W, yy);
          }
          ctx.stroke();

          if (aHatch > 0) {
            ctx.strokeStyle = 'rgba(0,0,0,' + aHatch + ')';
            ctx.beginPath();

            const diag = Math.sqrt(W * W + H * H);
            const start = -diag;
            const end = diag * 2;
            for (let t = start; t < end; t += hatch) {
              ctx.moveTo(t, -20);
              ctx.lineTo(t + H + 20, H + 20);
            }
            ctx.stroke();
          }

          if (aCal > 0) {
            const cx = W * 0.5;
            const cy = H * 0.32;
            const baseR = Math.min(W, H) * 0.10;

            ctx.strokeStyle = 'rgba(0,0,0,' + aCal + ')';
            ctx.lineWidth = 1;
            ctx.setLineDash([6, 10]);

            for (let i = 0; i < 3; i++) {
              const r = baseR * (1 + i * 0.85);
              ctx.beginPath();
              ctx.arc(cx, cy, r, 0, Math.PI * 2);
              ctx.stroke();
            }

            ctx.setLineDash([]);

            ctx.beginPath();
            ctx.moveTo(cx - baseR * 2.1, cy + 0.5);
            ctx.lineTo(cx + baseR * 2.1, cy + 0.5);
            ctx.moveTo(cx + 0.5, cy - baseR * 2.1);
            ctx.lineTo(cx + 0.5, cy + baseR * 2.1);
            ctx.stroke();

            const tick = Math.max(10, grid * 0.6);
            const inset = Math.max(10, grid * 0.7);
            ctx.beginPath();
            ctx.moveTo(inset, inset + 0.5); ctx.lineTo(inset + tick, inset + 0.5);
            ctx.moveTo(inset + 0.5, inset); ctx.lineTo(inset + 0.5, inset + tick);
            ctx.moveTo(W - inset, inset + 0.5); ctx.lineTo(W - inset - tick, inset + 0.5);
            ctx.moveTo(W - inset + 0.5, inset); ctx.lineTo(W - inset + 0.5, inset + tick);
            ctx.moveTo(inset, H - inset + 0.5); ctx.lineTo(inset + tick, H - inset + 0.5);
            ctx.moveTo(inset + 0.5, H - inset); ctx.lineTo(inset + 0.5, H - inset - tick);
            ctx.moveTo(W - inset, H - inset + 0.5); ctx.lineTo(W - inset - tick, H - inset + 0.5);
            ctx.moveTo(W - inset + 0.5, H - inset); ctx.lineTo(W - inset + 0.5, H - inset - tick);
            ctx.stroke();
          }

          if (aScope > 0) {
            ctx.strokeStyle = 'rgba(0,0,0,' + aScope + ')';
            ctx.lineWidth = scopeW;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';

            const rows = 3;
            for (let r = 0; r < rows; r++) {
              const yBase = H * (0.54 + r * 0.14);
              const freq = 1.6 + r * 0.35;
              const amp = 3.8 + r * 1.1;

              ctx.beginPath();
              for (let x = 0; x <= W; x += 6) {
                const s = Math.sin((x / W) * Math.PI * 2 * freq + phase * (0.7 + r * 0.2));
                const n = noise1(x + r * 971, seed + r * 1013);
                const y = yBase + s * amp + n * 1.6;
                if (x === 0) ctx.moveTo(0, y);
                else ctx.lineTo(x, y);
              }
              ctx.stroke();
            }
          }

          if (aNoise > 0) {
            const rng = makeRng(seed ^ 0x9E3779B9);
            const count = Math.min(1800, Math.max(250, ((W * H) / 7000) | 0));
            ctx.fillStyle = 'rgba(0,0,0,' + aNoise + ')';

            for (let i = 0; i < count; i++) {
              const x = (rng() * W) | 0;
              const y = (rng() * H) | 0;
              const s = rng() < 0.85 ? 1 : 2;
              ctx.fillRect(x, y, s, s);
            }
          }

          ctx.restore();
        }
      }

      registerPaint('engineeringBG', EngineeringBG);
    `;

    try {
      const blob = new Blob([workletCode], { type: 'application/javascript' });
      const url = URL.createObjectURL(blob);
      CSS.paintWorklet.addModule(url).finally(() => {
        try { URL.revokeObjectURL(url); } catch (_) {}
      });
    } catch (e) {
      // In case CSP disallows blob: URLs, we just silently skip
    }
  };

  window.addEventListener('load', initHoudiniEngineeringBG);
})();
