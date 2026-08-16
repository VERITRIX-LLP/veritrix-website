"use client";

import { useEffect, useRef } from "react";

type Node = {
  latitude: number;
  longitude: number;
  targetX: number;
  targetY: number;
  phase: number;
  drift: number;
  radius: number;
  bright: boolean;
};

export function ParticleWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const hero = canvas.closest(".hero");
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let startedAt = performance.now();

    const randomAt = (index: number, salt: number) => {
      const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
      return value - Math.floor(value);
    };

    function setHeroState(complete: boolean) {
      hero?.classList.toggle("hero-intro-running", !complete);
      hero?.classList.toggle("hero-intro-complete", complete);
    }

    function resize() {
      const ratio = Math.min(devicePixelRatio, 2);
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      canvas!.width = Math.round(width * ratio);
      canvas!.height = Math.round(height * ratio);
      context!.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = Math.max(74, Math.min(132, Math.round(width / 18)));
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      nodes = Array.from({ length: count }, (_, index) => {
        const y = 1 - (index / (count - 1)) * 2;
        return {
          latitude: Math.asin(y),
          longitude: goldenAngle * index,
          targetX: randomAt(index, 1) * width,
          targetY: (0.035 + randomAt(index, 2) * 0.73) * height,
          phase: randomAt(index, 3) * Math.PI * 2,
          drift: 6 + randomAt(index, 4) * 15,
          radius: 1.15 + randomAt(index, 5) * 2.15,
          bright: randomAt(index, 6) > 0.84,
        };
      });
    }

    function draw(now: number) {
      const elapsed = reducedMotion.matches ? 4 : (now - startedAt) / 1000;
      const explosion = Math.min(1, Math.max(0, (elapsed - 1.05) / 1.65));
      const eased = 1 - Math.pow(1 - explosion, 3);
      const dark = document.documentElement.dataset.theme === "dark";
      const rotation = reducedMotion.matches ? 0.25 : Math.min(elapsed, 1.2) * 0.22;
      const globeRadius = Math.min(width, height) * (width < 700 ? 0.39 : 0.34);
      const globeX = width * (width < 700 ? 0.61 : 0.6);
      const globeY = height * 0.39;

      if (explosion >= 0.96) setHeroState(true);
      context!.clearRect(0, 0, width, height);

      const fieldPanX = reducedMotion.matches ? 0 : Math.sin(elapsed * 0.23) * width * 0.032;
      const fieldPanY = reducedMotion.matches ? 0 : Math.cos(elapsed * 0.19) * height * 0.024;

      const points = nodes.map((node) => {
        const longitude = node.longitude + rotation;
        const globePointX = globeX + Math.cos(node.latitude) * Math.sin(longitude) * globeRadius;
        const globePointY = globeY + Math.sin(node.latitude) * globeRadius;
        const depth = Math.cos(node.latitude) * Math.cos(longitude);
        const outwardX = globePointX - globeX;
        const outwardY = globePointY - globeY;
        const burst = Math.sin(explosion * Math.PI) * (0.12 + randomAt(Math.round(node.phase * 100), 8) * 0.12);
        const settledDrift = explosion * (reducedMotion.matches ? 0 : 1);
        const localX = Math.sin(elapsed * (0.27 + randomAt(Math.round(node.phase * 100), 9) * 0.13) + node.phase)
          * node.drift * 1.7 * settledDrift;
        const localY = Math.cos(elapsed * (0.21 + randomAt(Math.round(node.phase * 100), 10) * 0.11) + node.phase)
          * node.drift * 1.15 * settledDrift;
        return {
          ...node,
          depth,
          drawX: globePointX + (node.targetX - globePointX) * eased + outwardX * burst
            + (fieldPanX + localX) * eased,
          drawY: globePointY + (node.targetY - globePointY) * eased + outwardY * burst
            + (fieldPanY + localY) * eased,
        };
      });

      if (explosion < 0.82) {
        const globeAlpha = (1 - explosion) * (dark ? 0.22 : 0.36);
        context!.beginPath();
        context!.arc(globeX, globeY, globeRadius, 0, Math.PI * 2);
        context!.strokeStyle = dark
          ? `rgba(247,243,238,${globeAlpha})`
          : `rgba(35,4,11,${globeAlpha})`;
        context!.lineWidth = 1;
        context!.stroke();
      }

      // Soft depth particles echo the defocused foreground/background lights in
      // the motion reference. They remain deliberately subtle behind the text.
      if (explosion > 0.18) {
        const bokehReveal = Math.min(1, (explosion - 0.18) / 0.7);
        for (let index = 0; index < 46; index++) {
          const phase = randomAt(index, 21) * Math.PI * 2;
          const radius = 4 + randomAt(index, 22) * 17;
          const x = randomAt(index, 23) * width
            + fieldPanX * (0.35 + randomAt(index, 24))
            + Math.sin(elapsed * (0.12 + randomAt(index, 25) * 0.1) + phase) * (18 + radius);
          const y = randomAt(index, 26) * height * 0.8
            + fieldPanY * (0.4 + randomAt(index, 27))
            + Math.cos(elapsed * (0.1 + randomAt(index, 28) * 0.09) + phase) * (12 + radius);
          context!.beginPath();
          context!.arc(x, y, radius, 0, Math.PI * 2);
          context!.shadowBlur = radius * 1.45;
          context!.shadowColor = dark ? "#ffe7ed" : "#5a1828";
          context!.fillStyle = dark
            ? `rgba(247,243,238,${(0.018 + randomAt(index, 29) * 0.045) * bokehReveal})`
            : `rgba(90,24,40,${(0.012 + randomAt(index, 29) * 0.03) * bokehReveal})`;
          context!.fill();
        }
        context!.shadowBlur = 0;
      }

      const connectionDistance = explosion < 0.55
        ? Math.max(82, globeRadius * 0.22)
        : Math.max(105, Math.min(178, width / 12));
      for (let first = 0; first < points.length; first++) {
        for (let second = first + 1; second < points.length; second++) {
          const dx = points[first].drawX - points[second].drawX;
          const dy = points[first].drawY - points[second].drawY;
          const distance = Math.hypot(dx, dy);
          if (distance > connectionDistance) continue;
          const depthAlpha = explosion < 0.55
            ? Math.max(0.2, (points[first].depth + points[second].depth + 2) / 4)
            : 1;
          const lightGlobeBoost = !dark && explosion < 0.55 ? 0.48 : 0.27;
          const alpha = (1 - distance / connectionDistance) * (dark ? 0.36 : lightGlobeBoost) * depthAlpha;
          const luminous = points[first].bright || points[second].bright;
          context!.beginPath();
          context!.moveTo(points[first].drawX, points[first].drawY);
          context!.lineTo(points[second].drawX, points[second].drawY);
          context!.strokeStyle = dark
            ? `rgba(247,243,238,${alpha})`
            : `rgba(${explosion < 0.55 ? "35,4,11" : "90,24,40"},${alpha})`;
          context!.lineWidth = luminous ? 1.05 : 0.65;
          context!.shadowBlur = luminous ? 5 : 0;
          context!.shadowColor = dark ? "#ffe7ed" : "#d996a7";
          context!.stroke();
        }
      }
      context!.shadowBlur = 0;

      points.forEach((point, index) => {
        const pulse = point.bright ? 0.75 + Math.sin(elapsed * 2.4 + point.phase) * 0.2 : 0.46;
        const depthAlpha = explosion < 0.55 ? Math.max(dark ? 0.24 : 0.42, (point.depth + 1) / 2) : 1;
        const blush = index % 9 === 0;
        context!.beginPath();
        context!.arc(point.drawX, point.drawY, point.radius * (point.bright ? 1.65 : 1), 0, Math.PI * 2);
        context!.shadowBlur = point.bright ? 25 : 5;
        context!.shadowColor = dark ? "#ffe7ed" : "#d996a7";
        context!.fillStyle = dark
          ? blush ? `rgba(255,218,228,${pulse * depthAlpha})` : `rgba(247,243,238,${pulse * depthAlpha})`
          : blush ? `rgba(217,150,167,${pulse * depthAlpha})` : `rgba(${explosion < 0.55 ? "35,4,11" : "90,24,40"},${Math.min(1, pulse * depthAlpha * (explosion < 0.55 ? 1.2 : 1))})`;
        context!.fill();
      });
      context!.shadowBlur = 0;

      if (!reducedMotion.matches) animationFrame = requestAnimationFrame(draw);
    }

    setHeroState(reducedMotion.matches);
    const observer = new ResizeObserver(() => {
      resize();
      cancelAnimationFrame(animationFrame);
      draw(performance.now());
    });
    observer.observe(canvas);
    resize();
    draw(performance.now());
    const motionChange = () => {
      cancelAnimationFrame(animationFrame);
      startedAt = performance.now();
      setHeroState(reducedMotion.matches);
      draw(startedAt);
    };
    reducedMotion.addEventListener("change", motionChange);
    return () => {
      hero?.classList.remove("hero-intro-running", "hero-intro-complete");
      observer.disconnect();
      reducedMotion.removeEventListener("change", motionChange);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <div className="particle-wave constellation-field"><canvas ref={canvasRef} /><span>VERITRIX<br />TEK—STUDIO</span></div>;
}
