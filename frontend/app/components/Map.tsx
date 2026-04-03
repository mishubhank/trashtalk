"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";

interface TrashPoint {
  id: string;
  latitude: number;
  longitude: number;
  areaName: string;
}

const trashIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/484/484662.png",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

export default function Map({ reports }: { reports: TrashPoint[] }) {
  const center: [number, number] = [23.1695, 79.9323];

  const [selectedReport, setSelectedReport] = useState<TrashPoint | null>(null);

  return (
    <>
      <div className="h-[400px] w-full rounded-3xl overflow-hidden border">
        <MapContainer center={center} zoom={13} className="h-full w-full">
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {reports.map((report) => (
            <Marker
              key={report.id}
              position={[report.latitude, report.longitude]}
              icon={trashIcon}
              eventHandlers={{
                click: () => {
                  console.log("marker clicked", report.id);
                  const element = document.getElementById(
                    `report-${report.id}`,
                  );

                  if (element) {
                    console.log("Scrolling to element:", element);
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });

                    element.classList.add("border-black", "border-2");

                    setTimeout(() => {
                      element.classList.remove("border-black", "border-2");
                    }, 2000);
                  }

                  setSelectedReport(report);
                },
              }}
            />
          ))}
        </MapContainer>
      </div>

      {selectedReport && (
        <div className="fixed bottom-6 left-6 bg-black text-white p-4 rounded-xl shadow-xl">
          <div className="font-bold">{selectedReport.areaName}</div>
          <div className="text-sm">Trash reported here</div>

          <button
            className="mt-2 text-xs underline"
            onClick={() => setSelectedReport(null)}
          >
            close
          </button>
        </div>
      )}
    </>
  );
}
