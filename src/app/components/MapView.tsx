import { useEffect, useRef } from "react";
import type { Gem } from "../data/gems";
import { categoryColors, categoryIcons } from "../data/gems";

interface MapViewProps {
  gems: Gem[];
  selectedGem: Gem | null;
  onSelectGem: (gem: Gem | null) => void;
}

export function MapView({ gems, selectedGem, onSelectGem }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leafletMapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<Record<string, any>>({});

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    // Dynamically import leaflet to avoid SSR / window issues
    import("leaflet").then((L) => {
      // Fix default icon paths broken by bundlers
      // @ts-expect-error leaflet private
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        center: [20.5937, 78.9629], // Center of India
        zoom: 5,
        zoomControl: false,
        attributionControl: false,
      });

      leafletMapRef.current = map;

      // Add zoom control to top-right
      L.control.zoom({ position: "topright" }).addTo(map);

      // Dark tile layer (CartoDB dark)
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          subdomains: "abcd",
        }
      ).addTo(map);

      // Custom attribution
      L.control
        .attribution({ position: "bottomright", prefix: "" })
        .addAttribution('© <a href="https://carto.com/">CARTO</a>')
        .addTo(map);

      // Add markers for all gems
      gems.forEach((gem) => {
        const color = categoryColors[gem.category];
        const emoji = categoryIcons[gem.category];

        // Custom HTML div icon
        const icon = L.divIcon({
          className: "",
          html: `
            <div style="
              position: relative;
              display: flex;
              flex-direction: column;
              align-items: center;
              cursor: pointer;
            ">
              <div style="
                width: 36px;
                height: 36px;
                border-radius: 50%;
                background: ${color};
                border: 2px solid white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                box-shadow: 0 2px 12px ${color}80, 0 0 0 4px ${color}30;
                transition: transform 0.2s;
              ">${emoji}</div>
              <div style="
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 8px solid ${color};
                margin-top: -1px;
              "></div>
            </div>
          `,
          iconSize: [36, 50],
          iconAnchor: [18, 50],
          popupAnchor: [0, -52],
        });

        const marker = L.marker([gem.lat, gem.lng], { icon });

        // Popup content
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
            width:220px;
            font-family: system-ui, sans-serif;
            background: #0a1420;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.12);
          ">
            <div style="position:relative;height:110px;overflow:hidden;">
              <img src="${gem.image}" alt="${gem.name}"
                style="width:100%;height:100%;object-fit:cover;" />
              <div style="
                position:absolute;inset:0;
                background:linear-gradient(to top, #0a1420 0%, transparent 60%);
              "></div>
            </div>
            <div style="padding:10px 12px 12px;">
              <div style="color:${color};font-size:11px;margin-bottom:4px;">
                ${emoji} ${gem.category}
              </div>
              ${verifiedBadge}
              <div style="color:white;font-weight:600;font-size:14px;margin-bottom:4px;line-height:1.3;">
                ${gem.name}
              </div>
              <div style="color:#9ca3af;font-size:11px;margin-bottom:8px;">
                📍 ${gem.location}, ${gem.city}
              </div>
              <div style="color:#d1d5db;font-size:11px;line-height:1.5;margin-bottom:10px;
                display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
                ${gem.description}
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;">
                <div style="display:flex;align-items:center;gap:4px;color:#fbbf24;font-size:12px;">
                  ★ <span style="color:white;font-weight:600;">${gem.rating}</span>
                  <span style="color:#6b7280;">(${gem.reviewCount})</span>
                </div>
                <a href="/gem/${gem.id}"
                  style="
                    font-size:11px;padding:4px 12px;border-radius:999px;
                    background:linear-gradient(to right,#00e5c0,#0077ff);
                    color:#050a0f;font-weight:700;text-decoration:none;
                  ">
                  View →
                </a>
              </div>
            </div>
          </div>
        `;

        marker.bindPopup(popupHtml, {
          maxWidth: 240,
          className: "hidden-gems-popup",
        });

        marker.on("click", () => {
          onSelectGem(gem);
        });

        marker.addTo(map);
        markersRef.current[gem.id] = marker;
      });
    });

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
        markersRef.current = {};
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pan to selected gem and open its popup
  useEffect(() => {
    if (!leafletMapRef.current || !selectedGem) return;
    const marker = markersRef.current[selectedGem.id];
    if (marker) {
      leafletMapRef.current.flyTo([selectedGem.lat, selectedGem.lng], 13, {
        animate: true,
        duration: 0.8,
      });
      setTimeout(() => marker.openPopup(), 500);
    }
  }, [selectedGem]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
