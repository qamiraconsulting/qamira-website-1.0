import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; vx: number; vy: number };

type NeuronFieldProps = {
  className?: string;
  /** Approximate particle count at a 1000x700 reference area; scales with actual size. */
  density?: number;
  /** Whether particles gather toward the cursor. Set false for a purely ambient background. */
  interactive?: boolean;
  dotColor?: string;
  lineColor?: string;
};

// Ambient "neuron" network: soft-drifting nodes connected by faint lines,
// with nodes drawn toward the cursor within a radius when interactive.
// The Qamira brand mark, expanded -- an AI-native firm's signature motif,
// rendered as a light, unobtrusive texture rather than a demo effect.
export function NeuronField({
  className,
  density = 70,
  interactive = true,
  dotColor = "184, 134, 58",
  lineColor = "20, 24, 42",
}: NeuronFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    function seed() {
      const area = width * height;
      const count = Math.max(18, Math.round(density * (area / (1000 * 700))));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    }

    function resize() {
      const rect = container!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    const linkDistance = 130;
    const attractRadius = 170;

    function step() {
      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        let pulled = false;
        if (interactive && mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < attractRadius && dist > 0.01) {
            const pull = (1 - dist / attractRadius) ** 1.5 * 3.2;
            p.x += (dx / dist) * pull;
            p.y += (dy / dist) * pull;
            pulled = true;
          }
        }

        // Ambient drift continues everywhere, but is damped near the
        // cursor so attracted particles visibly settle instead of just
        // passing through -- this is what sells "gathering" over a subtle
        // statistical nudge.
        const driftScale = pulled ? 0.12 : 1;
        p.x += p.vx * driftScale;
        p.y += p.vy * driftScale;
        p.x = Math.min(Math.max(p.x, 0), width);
        p.y = Math.min(Math.max(p.y, 0), height);
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < linkDistance) {
            ctx!.strokeStyle = `rgba(${lineColor}, ${0.12 * (1 - dist / linkDistance)})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }

        if (interactive && mouse.active) {
          const dist = Math.hypot(mouse.x - particles[i].x, mouse.y - particles[i].y);
          if (dist < attractRadius) {
            ctx!.strokeStyle = `rgba(${dotColor}, ${0.35 * (1 - dist / attractRadius)})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(mouse.x, mouse.y);
            ctx!.lineTo(particles[i].x, particles[i].y);
            ctx!.stroke();
          }
        }
      }

      ctx!.fillStyle = `rgba(${dotColor}, 0.55)`;
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (!prefersReducedMotion) {
        frame = requestAnimationFrame(step);
      }
    }

    function onPointerMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }
    function onPointerLeave() {
      mouse.active = false;
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    if (interactive) {
      container.addEventListener("pointermove", onPointerMove);
      container.addEventListener("pointerleave", onPointerLeave);
    }

    if (prefersReducedMotion) {
      step();
    } else {
      frame = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [density, interactive, dotColor, lineColor]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
