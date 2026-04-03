import { useEffect, useRef } from "react";
import type { Gem } from "../data/gems";
import { categoryColors, categoryIcons } from "../data/gems";

interface MapProps {
  gems: Gem[];
  selectedGem: Gem | null;
  onSelectGem: (gem: Gem | null) => void;
}

/**
 * A modular Leaflet map component.
 *
 * Key design:
 *  - Effect 1 (deps: []):          Initialises the Leaflet map once on mount.
 *  - Effect 2 (deps: [gems, ...]):  Clears and re-renders ALL markers whenever
 *                                   the `gems` array changes (filter/search fix).
 *  - Effect 3 (deps: [selectedGem]):Pan + open popup when the caller selects a gem.
 */
export function Map({ gems, selectedGem, onSelectGem }: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<Record<string, any>>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leafletRef = useRef<any>(null);

  /* ── Effect 1: initialise map once ───────────────────────────────────────── */
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    import("leaflet").then((L) => {
      leafletRef.current = L;

      // Fix default icon paths broken by bundlers
      // @ts-expect-error – private API
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(containerRef.current!, {
        center: [20.5937, 78.9629], // centre of India
        zoom: 5,
        zoomControl: false,
        attributionControl: false,
      });

      mapRef.current = map;

      // Dark tile layer (CartoDB dark matter)
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        { maxZoom: 19, subdomains: "abcd" }
      ).addTo(map);

      L.control.zoom({ position: "topright" }).addTo(map);

      L.control
        .attribution({ position: "bottomright", prefix: "" })
        .addAttribution('© <a href="https://carto.com/">CARTO</a>')
        .addTo(map);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current = {};
        leafletRef.current = null;
      }
    };
  }, []);

  /* ── Effect 2: re-render markers whenever gems list changes ──────────────── */
  useEffect(() => {
    const map = mapRef.current;
    const L = leafletRef.current;
    if (!map || !L) return;

    // Remove all existing markers
    Object.values(markersRef.current).forEach((m: any) => m.remove());
    markersRef.current = {};

    gems.forEach((gem) => {
      const color = categoryColors[gem.category];
      const emoji = categoryIcons[gem.category];

      const icon = L.divIcon({
        className: "",
        html: `
          <div style="
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            filter: drop-shadow(0 2px 8px ${color}80);
          ">
            <div style="
              width: 38px;
              height: 38px;
              border-radius: 50%;
              background: linear-gradient(135deg, ${color}, ${color}cc);
              border: 2.5px solid white;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 17px;
              box-shadow: 0 0 0 4px ${color}30, 0 4px 16px rgba(0,0,0,0.5);
              transition: transform 0.2s ease;
            ">${emoji}</div>
            <div style="
              width: 0;
              height: 0;
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              border-top: 9px solid ${color};
              margin-top: -2px;
            "></div>
          </div>
        `,
        iconSize: [38, 52],
        iconAnchor: [19, 52],
        popupAnchor: [0, -54],
      });

      const marker = L.marker([gem.lat, gem.lng], { icon });

      /* Rich HTML popup */
      const verifiedBadge = gem.verified
        ? `<span style="
              display:inline-flex;align-items:center;gap:4px;
              background:rgba(0,229,192,0.15);color:#00e5c0;
              font-size:10px;border:1px solid rgba(0,229,192,0.4);
              border-radius:999px;padding:2px 8px;margin-bottom:6px;
            ">✓ Verified</span>`
        : "";

      const popupHtml = `
        <div style="
          width:228px;
          font-family: system-ui, -apple-system, sans-serif;
          background: #0a1420;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
        ">
          <div style="position:relative;height:112px;overflow:hidden;">
            <img src="${gem.image}" alt="${gem.name}"
              style="width:100%;height:100%;object-fit:cover;" />
            <div style="
              position:absolute;inset:0;
              background:linear-gradient(to top, #0a1420 0%, transparent 55%);
            "></div>
          </div>
          <div style="padding:10px 13px 13px;">
            <div style="color:${color};font-size:11px;margin-bottom:3px;">
              ${emoji} ${gem.category}
            </div>
            ${verifiedBadge}
            <div style="color:white;font-weight:700;font-size:14px;margin-bottom:3px;line-height:1.3;">
              ${gem.name}
            </div>
            <div style="color:#9ca3af;font-size:11px;margin-bottom:7px;">
              📍 ${gem.location}, ${gem.city}
            </div>
            <div style="
              color:#d1d5db;font-size:11px;line-height:1.55;margin-bottom:10px;
              display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
            ">
              ${gem.description}
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div style="display:flex;align-items:center;gap:4px;color:#fbbf24;font-size:12px;">
                ★ <span style="color:white;font-weight:700;">${gem.rating}</span>
                <span style="color:#6b7280;">(${gem.reviewCount})</span>
              </div>
              <a href="/gem/${gem.id}"
                style="
                  font-size:11px;padding:5px 13px;border-radius:999px;
                  background:linear-gradient(to right,#00e5c0,#0077ff);
                  color:#050a0f;font-weight:700;text-decoration:none;
                  transition: opacity 0.2s;
                "
                onmouseover="this.style.opacity='0.85'"
                onmouseout="this.style.opacity='1'"
              >
                View →
              </a>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        maxWidth: 248,
        className: "hidden-gems-popup",
      });

      marker.on("click", () => {
        onSelectGem(gem);
      });

      marker.addTo(map);
      markersRef.current[gem.id] = marker;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gems]);

  /* ── Effect 3: pan + open popup when a gem is selected ───────────────────── */
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedGem) return;
    const marker = markersRef.current[selectedGem.id];
    if (marker) {
      map.flyTo([selectedGem.lat, selectedGem.lng], 13, {
        animate: true,
        duration: 0.8,
      });
      setTimeout(() => marker.openPopup(), 500);
    }
  }, [selectedGem]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
