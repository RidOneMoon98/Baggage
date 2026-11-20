"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Factory,
  Images,
  Pause,
  Play,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import type { CopyProps, ProductPhoto } from "../types/manufacturing.types";
import { getWorkshopTimeline, smoothStep } from "./workshop-timeline";

interface SpriteFrame {
  sx: number;
  sy: number;
  sw: number;
  sh: number;
  foot: number;
}
interface LoadedPhoto {
  photo: ProductPhoto;
  image: HTMLImageElement;
  crop: { x: number; y: number; width: number; height: number };
}
const ART_WIDTH = 1672,
  ART_HEIGHT = 941;
const ASSET_ROOT = "/";
const BOY_FRAMES: SpriteFrame[] = [
  { sx: 281, sy: 12, sw: 305, sh: 862, foot: 136.88417586674416 },
  { sx: 1126, sy: 49, sw: 459, sh: 825, foot: 110.96995216600419 },
];
const GIRL_FRAMES: SpriteFrame[] = [
  { sx: 163, sy: 28, sw: 384, sh: 692, foot: 273.5556465769456 },
  { sx: 964, sy: 8, sw: 247, sh: 712, foot: 131.8056628056628 },
  { sx: 1637, sy: 9, sw: 398, sh: 712, foot: 126.20915108582045 },
];
interface StorageFrame extends SpriteFrame {
  handX: number;
  handY: number;
}
const STORAGE_FRAMES: StorageFrame[] = [
  {
    sx: 216,
    sy: 15,
    sw: 386,
    sh: 699,
    foot: 132.23055004955404,
    handX: 560,
    handY: 192,
  },
  {
    sx: 928,
    sy: 69,
    sw: 374,
    sh: 644,
    foot: 111.70196078431371,
    handX: 1260,
    handY: 395,
  },
  {
    sx: 1612,
    sy: 230,
    sw: 377,
    sh: 483,
    foot: 123.07015959048476,
    handX: 1950,
    handY: 588,
  },
];

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

// Render once per translated company name, then composite it onto the back wall.
const wallSigns = new Map<string, HTMLCanvasElement>();
function drawCompanyWallSign(context: CanvasRenderingContext2D, name: string) {
  let sign = wallSigns.get(name);
  if (!sign) {
    sign = document.createElement("canvas");
    sign.width = 1100;
    sign.height = 140;
    const paint = sign.getContext("2d");
    if (!paint) return;
    const rounded = (x: number, y: number, w: number, h: number, r: number) => {
      paint.beginPath();
      paint.moveTo(x + r, y);
      paint.lineTo(x + w - r, y);
      paint.quadraticCurveTo(x + w, y, x + w, y + r);
      paint.lineTo(x + w, y + h - r);
      paint.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      paint.lineTo(x + r, y + h);
      paint.quadraticCurveTo(x, y + h, x, y + h - r);
      paint.lineTo(x, y + r);
      paint.quadraticCurveTo(x, y, x + r, y);
      paint.closePath();
    };
    // Wall shadow and a narrow bronze mounting edge.
    paint.shadowColor = "rgba(0,0,0,0.65)";
    paint.shadowBlur = 11;
    paint.shadowOffsetY = 7;
    rounded(23, 19, 1054, 99, 11);
    paint.fillStyle = "#594329";
    paint.fill();
    paint.shadowColor = "transparent";
    const plate = paint.createLinearGradient(0, 14, 0, 112);
    plate.addColorStop(0, "#484035");
    plate.addColorStop(0.45, "#302b24");
    plate.addColorStop(1, "#25211c");
    rounded(19, 14, 1054, 98, 11);
    paint.fillStyle = plate;
    paint.fill();
    paint.strokeStyle = "rgba(221,191,139,0.65)";
    paint.lineWidth = 1.2;
    paint.stroke();
    rounded(24, 19, 1044, 88, 8);
    paint.strokeStyle = "rgba(255,235,194,0.12)";
    paint.lineWidth = 0.8;
    paint.stroke();
    let size = 50;
    const font = () =>
      "600 " +
      size +
      'px Georgia, "Noto Serif SC", "Songti SC", "SimSun", serif';
    paint.font = font();
    while (paint.measureText(name).width > 940 && size > 24) {
      size--;
      paint.font = font();
    }
    paint.textAlign = "center";
    paint.textBaseline = "middle";
    // Cast shadow, solid letter depth, then a brushed champagne-gold face.
    paint.shadowColor = "rgba(0,0,0,0.8)";
    paint.shadowBlur = 5;
    paint.shadowOffsetX = 2;
    paint.shadowOffsetY = 5;
    paint.fillStyle = "#241a10";
    paint.fillText(name, 550, 66);
    paint.shadowColor = "transparent";
    for (let depth = 5; depth > 0; depth--) {
      paint.fillStyle = depth > 2 ? "#70512c" : "#a47d43";
      paint.fillText(name, 550 + depth * 0.45, 62 + depth);
    }
    const metal = paint.createLinearGradient(0, 34, 0, 89);
    metal.addColorStop(0, "#fff3d2");
    metal.addColorStop(0.36, "#ead4a4");
    metal.addColorStop(0.52, "#b28a4c");
    metal.addColorStop(0.72, "#f1d9a3");
    metal.addColorStop(1, "#9c743d");
    paint.fillStyle = metal;
    paint.fillText(name, 550, 62);
    paint.strokeStyle = "rgba(255,244,215,0.48)";
    paint.lineWidth = 0.45;
    paint.strokeText(name, 550, 62);
    // Small mounting bolts and a restrained inset line finish the physical sign.
    for (const x of [38, 1054])
      for (const y of [32, 96]) {
        const bolt = paint.createRadialGradient(x - 1, y - 1, 0, x, y, 3.5);
        bolt.addColorStop(0, "#f9e9c1");
        bolt.addColorStop(0.5, "#b39762");
        bolt.addColorStop(1, "#4f3a21");
        paint.beginPath();
        paint.arc(x, y, 3.2, 0, Math.PI * 2);
        paint.fillStyle = bolt;
        paint.fill();
      }
    const rule = paint.createLinearGradient(430, 0, 670, 0);
    rule.addColorStop(0, "transparent");
    rule.addColorStop(0.5, "rgba(226,197,143,0.65)");
    rule.addColorStop(1, "transparent");
    paint.fillStyle = rule;
    paint.fillRect(430, 99, 240, 1);
    wallSigns.set(name, sign);
  }
  context.save();
  context.drawImage(
    sign,
    ART_WIDTH * 0.51 - sign.width / 2,
    ART_HEIGHT * 0.065 - sign.height / 2,
  );
  context.restore();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Image unavailable: " + src));
    image.src = src;
  });
}
function getPhotoCrop(image: HTMLImageElement) {
  const fallback = {
    x: 0,
    y: 0,
    width: image.naturalWidth,
    height: image.naturalHeight,
  };
  try {
    const scan = document.createElement("canvas");
    scan.width = 256;
    scan.height = Math.max(
      1,
      Math.round((256 * image.naturalHeight) / image.naturalWidth),
    );
    const context = scan.getContext("2d");
    if (!context) return fallback;
    context.drawImage(image, 0, 0, scan.width, scan.height);
    const data = context.getImageData(0, 0, scan.width, scan.height).data;
    let left = scan.width,
      right = 0,
      top = scan.height,
      bottom = 0;
    for (let y = 0; y < scan.height; y++)
      for (let x = 0; x < scan.width; x++) {
        if (data[(y * scan.width + x) * 4 + 3] > 24) {
          left = Math.min(left, x);
          right = Math.max(right, x);
          top = Math.min(top, y);
          bottom = Math.max(bottom, y);
        }
      }
    if (right <= left || bottom <= top) return fallback;
    left = Math.max(0, left - 2);
    top = Math.max(0, top - 2);
    right = Math.min(scan.width - 1, right + 2);
    bottom = Math.min(scan.height - 1, bottom + 2);
    return {
      x: (left / scan.width) * image.naturalWidth,
      y: (top / scan.height) * image.naturalHeight,
      width: ((right - left + 1) / scan.width) * image.naturalWidth,
      height: ((bottom - top + 1) / scan.height) * image.naturalHeight,
    };
  } catch {
    return fallback;
  }
}

export default function ManufacturingHeroScene({
  copy,
  photos: suppliedPhotos,
}: CopyProps & { photos: ProductPhoto[] }) {
  const photos = useMemo(() => {
    const source = suppliedPhotos.filter(
      (photo) =>
        photo.conveyor !== false && !photo.src.includes("product-hero-3d"),
    );
    const preferred = ["photo-7", "photo-3", "photo-1"];
    return [
      ...preferred
        .map((id) => source.find((photo) => photo.id === id))
        .filter((photo): photo is ProductPhoto => Boolean(photo)),
      ...source.filter((photo) => !preferred.includes(photo.id)),
    ];
  }, [suppliedPhotos]);
  const companyNameRef = useRef(copy.company.name);
  useEffect(() => {
    companyNameRef.current = copy.company.name;
  }, [copy.company.name]);
  const canvas = useRef<HTMLCanvasElement>(null),
    time = useRef(0),
    offset = useRef(0),
    playingRef = useRef(true);
  const [playing, setPlaying] = useState(true),
    [reduced, setReduced] = useState(false),
    [state, setState] = useState<"loading" | "ready" | "failed">("loading"),
    [current, setCurrent] = useState(0),
    [stored, setStored] = useState(0);
  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = canvas.current;
    if (!element || !photos.length) return;
    const context = element.getContext("2d");
    if (!context) {
      setState("failed");
      return;
    }
    let disposed = false,
      frame = 0,
      previous = 0,
      visible = true,
      draw: () => void = () => {};
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const resize = new ResizeObserver(() => {
      const bounds = element.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio, 1.5);
      element.width = Math.max(1, Math.round(bounds.width * dpr));
      element.height = Math.max(1, Math.round(bounds.height * dpr));
      draw();
    });
    resize.observe(element);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(element);

    Promise.all([
      loadImage(ASSET_ROOT + "workshop.png"),
      loadImage(ASSET_ROOT + "worker-left.png"),
      loadImage(ASSET_ROOT + "worker-right.png"),
      loadImage(ASSET_ROOT + "worker-storage-levels.png"),
      Promise.all(
        photos.map(async (photo) => {
          try {
            const source = photo.src.startsWith("/manufacturing/products/")
              ? "/" + photo.src.slice(24)
              : photo.src.startsWith("/manufacturing/workspaces/")
                ? "/" + photo.src.slice(26)
                : photo.src;
            const image = await loadImage(source);
            return { photo, image, crop: getPhotoCrop(image) };
          } catch {
            return null;
          }
        }),
      ),
    ])
      .then(([background, boy, girl, storageGirl, loaded]) => {
        if (disposed) return;
        const available = loaded.filter(
          (entry): entry is LoadedPhoto => entry !== null,
        );
        if (!available.length) {
          setState("failed");
          return;
        }
        setState("ready");
        function photoAt(index: number) {
          return available[
            ((index % available.length) + available.length) % available.length
          ];
        }
        function drawBag(
          index: number,
          x: number,
          bottom: number,
          scale = 1,
          angle = 0,
          shadow = false,
        ) {
          const entry = photoAt(index);
          const ratio = entry.crop.width / entry.crop.height;
          const width =
              Math.min(ART_WIDTH * 0.13, ART_HEIGHT * 0.36 * ratio) * scale,
            height = width / ratio;
          const px = x * ART_WIDTH,
            py = bottom * ART_HEIGHT;
          context!.save();
          if (shadow) {
            context!.fillStyle = "rgba(35,25,13,0.18)";
            context!.beginPath();
            context!.ellipse(
              px,
              py + 3,
              width * 0.42,
              9 * scale,
              0,
              0,
              Math.PI * 2,
            );
            context!.fill();
          }
          context!.translate(px, py);
          context!.rotate(angle);
          context!.drawImage(
            entry.image,
            entry.crop.x,
            entry.crop.y,
            entry.crop.width,
            entry.crop.height,
            -width / 2,
            -height,
            width,
            height,
          );
          context!.restore();
        }
        function drawPose(
          image: HTMLImageElement,
          frames: SpriteFrame[],
          pose: number,
          footX: number,
          bend = 0,
          alpha = 1,
        ) {
          if (alpha <= 0) return;
          const f = frames[pose];
          const maxHeight = Math.max(...frames.map((item) => item.sh));
          const scale = (ART_HEIGHT * 0.86) / maxHeight;
          const height = f.sh * scale,
            width = f.sw * scale,
            x = footX * ART_WIDTH - f.foot * scale,
            y = ART_HEIGHT * 0.95 - height;
          context!.save();
          context!.globalAlpha = alpha;
          // Keep the complete character intact. A flat sprite cannot bend at the waist.
          void bend;
          context!.drawImage(
            image,
            f.sx,
            f.sy,
            f.sw,
            f.sh,
            x,
            y,
            width,
            height,
          );
          context!.restore();
        }
        function blendPose(
          image: HTMLImageElement,
          frames: SpriteFrame[],
          from: number,
          to: number,
          t: number,
          footX: number,
          bend = 0,
        ) {
          // Pose keyframes remain opaque; no double-exposed character silhouettes.
          drawPose(image, frames, t < 0.5 ? from : to, footX, bend);
        }

        function drawStorageGirl(
          row: number,
          column: number,
          progress: number,
        ) {
          if (!element) return;
          const p = smoothStep(progress);
          const targetX = (0.888 + column * 0.041) * ART_WIDTH;
          const targetY = (0.344 + row * 0.111 - 0.035) * ART_HEIGHT;
          const back = STORAGE_FRAMES[row];
          const backScale = 0.52;
          const backFootX =
            targetX - (back.handX - back.sx - back.foot) * backScale;
          const backFootY =
            targetY + (back.sy + back.sh - back.handY) * backScale;
          const footX = lerp(0.84 * ART_WIDTH, backFootX, p);
          const footY = lerp(0.95 * ART_HEIGHT, backFootY, p);
          const scale = lerp(
            (ART_HEIGHT * 0.86) /
              Math.max(...GIRL_FRAMES.map((frame) => frame.sh)),
            backScale,
            p,
          );
          // Each storage pose is a complete body. No waist clipping or rotation.
          const useStorage = p >= 0.5;
          const frame = useStorage ? back : GIRL_FRAMES[1];
          context!.save();
          context!.drawImage(
            useStorage ? storageGirl : girl,
            frame.sx,
            frame.sy,
            frame.sw,
            frame.sh,
            footX - frame.foot * scale,
            footY - frame.sh * scale,
            frame.sw * scale,
            frame.sh * scale,
          );
          context!.restore();
          if (p === 1) {
            element.dataset.handX = String(
              (footX + (back.handX - back.sx - back.foot) * scale) / ART_WIDTH,
            );
            element.dataset.handY = String(
              (footY - (back.sy + back.sh - back.handY) * scale) / ART_HEIGHT,
            );
          }
          element.dataset.storageContact = String(p === 1);
        }

        let lastCycle = -1,
          lastStored = -1;
        draw = () => {
          if (disposed) return;
          const t = getWorkshopTimeline(
            time.current,
            available.length,
            offset.current,
          );
          const phase = t.phase;
          context!.setTransform(
            element.width / ART_WIDTH,
            0,
            0,
            element.height / ART_HEIGHT,
            0,
            0,
          );
          context!.clearRect(0, 0, ART_WIDTH, ART_HEIGHT);
          context!.drawImage(background, 0, 0, ART_WIDTH, ART_HEIGHT);
          drawCompanyWallSign(context!, companyNameRef.current);
          // A subtle moving sheen across the photographed roller bed.
          context!.save();
          context!.beginPath();
          context!.moveTo(ART_WIDTH * 0.17, ART_HEIGHT * 0.594);
          context!.lineTo(ART_WIDTH * 0.81, ART_HEIGHT * 0.594);
          context!.lineTo(ART_WIDTH * 0.835, ART_HEIGHT * 0.671);
          context!.lineTo(ART_WIDTH * 0.14, ART_HEIGHT * 0.671);
          context!.closePath();
          context!.clip();
          context!.lineWidth = 4;
          context!.strokeStyle = "rgba(255,246,218,0.09)";
          const shift = (time.current * 42) % 42;
          for (let x = -40; x < ART_WIDTH; x += 42) {
            context!.beginPath();
            context!.moveTo(x + shift, ART_HEIGHT * 0.59);
            context!.lineTo(x + shift - 22, ART_HEIGHT * 0.68);
            context!.stroke();
          }
          context!.restore();

          // Stored products remain on the three shelf levels; the display holds the last nine.
          for (let n = Math.max(0, t.storedCount - 9); n < t.storedCount; n++) {
            const slot = n % 9,
              row = Math.floor(slot / 3),
              column = slot % 3;
            drawBag(
              n + offset.current,
              0.888 + column * 0.041,
              0.344 + row * 0.111,
              0.28,
              0,
              false,
            );
          }
          const travel = smoothStep(t.travel);
          drawBag(t.left, lerp(0.265, 0.505, travel), 0.659, 1, 0, true);
          drawBag(t.middle, lerp(0.505, 0.745, travel), 0.659, 1, 0, true);

          // The arriving bag follows the girl's hands, then moves onto the shelf.
          const shelfSlot = t.cycle % 9,
            shelfRow = Math.floor(shelfSlot / 3),
            shelfColumn = shelfSlot % 3;
          const shelfX = 0.888 + shelfColumn * 0.041,
            shelfY = 0.344 + shelfRow * 0.111;
          // Body pose transitions are timed to the actual pickup, loading and shelf phases.
          const boyReach =
            phase < 4.3
              ? 0
              : phase < 4.6
                ? (phase - 4.3) / 0.3
                : phase < 5.7
                  ? 1
                  : phase < 6.1
                    ? 1 - (phase - 5.7) / 0.4
                    : 0;
          blendPose(boy, BOY_FRAMES, 0, 1, boyReach, 0.088);

          element.dataset.shelfRow = String(shelfRow);
          element.dataset.shelfColumn = String(shelfColumn);
          element.dataset.storageContact = "false";
          if (phase < 0.8) blendPose(girl, GIRL_FRAMES, 0, 1, t.pickup, 0.84);
          else if (phase < 1.4)
            drawStorageGirl(shelfRow, shelfColumn, (phase - 0.8) / 0.6);
          else if (phase < 1.95) drawStorageGirl(shelfRow, shelfColumn, 1);
          else if (phase < 2.4)
            drawStorageGirl(shelfRow, shelfColumn, 1 - (phase - 1.95) / 0.45);
          else drawPose(girl, GIRL_FRAMES, 0, 0.84);

          if (phase < 0.8) {
            const p = smoothStep(t.pickup);
            drawBag(
              t.outgoing,
              lerp(0.745, 0.815, p),
              lerp(0.659, 0.585, p),
              lerp(1, 0.84, p),
              -0.08 * p,
              false,
            );
          } else if (phase < 1.9) {
            const p = smoothStep(t.store);
            drawBag(
              t.outgoing,
              lerp(0.815, shelfX, p),
              lerp(0.585, shelfY, p),
              lerp(0.84, 0.28, p),
              -0.08 * (1 - p),
              false,
            );
          }
          if (phase >= 2.5) {
            const p = smoothStep(t.load);
            drawBag(
              t.incoming,
              lerp(0.19, 0.265, p),
              lerp(0.555, 0.659, p),
              lerp(0.88, 1, p),
              -0.08 * (1 - p),
              p > 0.85,
            );
          }

          const activeCount = 2 + (phase < 1.9 || phase >= 2.5 ? 1 : 0);
          element.dataset.visibleCount = String(activeCount);
          element.dataset.phase =
            phase < 0.8
              ? "collecting"
              : phase < 1.3
                ? "carrying"
                : phase < 1.9
                  ? "storing"
                  : phase < 2.5
                    ? "returning"
                    : phase < 4.4
                      ? "preparing"
                      : phase < 5.7
                        ? "loading"
                        : "travelling";
          element.dataset.storedCount = String(t.storedCount);
          element.dataset.currentPhotoId = photoAt(t.outgoing).photo.id;
          if (lastCycle !== t.cycle) {
            lastCycle = t.cycle;
            setCurrent(t.outgoing);
          }
          if (lastStored !== t.storedCount) {
            lastStored = t.storedCount;
            setStored(t.storedCount);
          }
        };
        function animate(timestamp: number) {
          if (disposed) return;
          frame = requestAnimationFrame(animate);
          const dt = previous
            ? Math.min((timestamp - previous) / 1000, 0.05)
            : 0;
          previous = timestamp;
          if (!visible) return;
          if (playingRef.current && !media.matches) time.current += dt;
          draw();
        }
        draw();
        frame = requestAnimationFrame(animate);
      })
      .catch(() => {
        if (!disposed) setState("failed");
      });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
    };
  }, [photos]);

  function change(delta: number) {
    offset.current =
      (((offset.current + delta) % Math.max(1, photos.length)) +
        Math.max(1, photos.length)) %
      Math.max(1, photos.length);
    time.current = 0;
    setCurrent(offset.current);
    setStored(0);
  }
  const focused = photos[current % Math.max(1, photos.length)];
  return (
    <div className="relative isolate overflow-hidden rounded-[32px] border border-[#d3b986]/40 bg-[#26231e] shadow-[3px_4px_0_#dbc79d,9px_12px_0_#7b633e,0_35px_50px_-25px_black] sm:rounded-[48px]">
      <div className="relative aspect-[1672/941] w-full overflow-hidden">
        <canvas
          ref={canvas}
          width={ART_WIDTH}
          height={ART_HEIGHT}
          role="img"
          aria-label={copy.hero.sceneLabel}
          data-company-name={copy.company.name}
          data-visible-count="0"
          className={
            "absolute inset-0 h-full w-full " +
            (state === "ready" ? "opacity-100" : "opacity-0")
          }
        />
        {state !== "ready" && (
          <div
            role="status"
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center text-[#e6cfa1]"
          >
            <Images className="size-12" strokeWidth={1} />
            <p className="max-w-lg text-sm leading-7">
              {state === "failed" ? copy.hero.fallback : copy.hero.loading}
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#cdb07b]/20 px-5 py-5 sm:px-8">
        <div>
          <p className="text-xs tracking-wide text-[#cdb17c]">
            {copy.photos.render}
          </p>
          <p aria-live="polite" className="mt-2 text-sm text-[#f1e4cb]">
            {focused
              ? (copy.photos.names[focused.id] ?? focused.name)
              : copy.photos.photos}
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm text-[#d3c5ab]">
          <Factory className="size-4" aria-hidden="true" />
          <span>
            {copy.photos.photos}: {stored}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label={copy.photos.previous}
            disabled={state !== "ready"}
            onClick={() => change(-1)}
            className="text-[#e1c99a] hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={playing ? copy.hero.pause : copy.hero.play}
            aria-pressed={!playing}
            disabled={state !== "ready" || reduced}
            onClick={() => setPlaying((value) => !value)}
            className="text-[#e1c99a] hover:bg-white/10 hover:text-white"
          >
            {playing ? <Pause /> : <Play />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={copy.photos.next}
            disabled={state !== "ready"}
            onClick={() => change(1)}
            className="text-[#e1c99a] hover:bg-white/10 hover:text-white"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
