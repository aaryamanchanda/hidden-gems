import { useEffect, useRef, useState } from "react";

interface LocationPickerProps {
  lat: string;
  lng: string;
  onChange: (lat: string, lng: string) => void;
}

export function LocationPicker({ lat, lng, onChange }: LocationPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    import("leaflet").then((L) => {
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

      const initialLat = lat ? parseFloat(lat) : 20.5937;
      const initialLng = lng ? parseFloat(lng) : 78.9629;
      const initialZoom = lat && lng ? 13 : 4;

      const map = L.map(containerRef.current!, {
        center: [initialLat, initialLng],
        zoom: initialZoom,
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

      // Add a marker if we already have coordinates
      if (lat && lng && !isNaN(initialLat) && !isNaN(initialLng)) {
        markerRef.current = L.marker([initialLat, initialLng]).addTo(map);
      }

      // Handle map clicks
      map.on("click", (e: any) => {
        const { lat, lng } = e.latlng;
        
        // Remove existing marker if any
        if (markerRef.current) {
          map.removeLayer(markerRef.current);
        }
        
        // Add new marker
        markerRef.current = L.marker([lat, lng]).addTo(map);
        
        // Call the onChange callback
        onChange(lat.toFixed(6), lng.toFixed(6));
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update map or marker if props change outside (though mostly it's driven by map clicks)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    
    import("leaflet").then((L) => {
        const currentLat = lat ? parseFloat(lat) : NaN;
        const currentLng = lng ? parseFloat(lng) : NaN;
        
        if (!isNaN(currentLat) && !isNaN(currentLng)) {
            if (markerRef.current) {
                markerRef.current.setLatLng([currentLat, currentLng]);
            } else {
                markerRef.current = L.marker([currentLat, currentLng]).addTo(map);
                map.flyTo([currentLat, currentLng], 13);
            }
        } else if (markerRef.current) {
            map.removeLayer(markerRef.current);
            markerRef.current = null;
        }
    });
  }, [lat, lng]);

  return (
    <div style={{ position: "relative", width: "100%", height: "250px", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      <div className="absolute bottom-2 left-2 z-[400] bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white pointer-events-none">
        Click on the map to drop a pin
      </div>
    </div>
  );
}
