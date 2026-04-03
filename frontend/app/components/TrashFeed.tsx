"use client";
import { useEffect, useState } from "react";

const WARD_NAMES: Record<number, string> = {
  1: "Veer Savarkar Nagar",
  2: "Ramakrishna Paramahans",
  3: "Sant Kabir Das",
  4: "Yatiyatan Lal",
  5: "Banjari Mata Mandir",
  6: "Veerangana Avanti Bai",
  7: "Veer Shivaji",
  8: "Netaji Kanhaiya Lal Bajari",
  9: "Thakkar Bapa",
  10: "Bal Gangadhar Tilak Nagar",
  11: "Danveer Bhamashah",
  12: "Shaheed Manmohan Singh Bakshi",
  13: "Shri Bhagat Singh",
  14: "Pt. Ishwari Charan Shukla",
  15: "Swami Atmanand",
  16: "Shri Choodamani Nayak",
  17: "Ramsagar Para",
  18: "Sardar Vallabhbhai Patel",
  19: "Sant Ramdas",
  20: "Indira Gandhi",
  21: "Raman Mandir",
  22: "Rajiv Gandhi",
  23: "Rani Laxmi Bai",
  24: "Pt. Ravishankar Shukla",
  25: "Mahatma Gandhi",
  26: "Kushabhau Thakre",
  27: "Dr. Bhimrao Ambedkar",
  28: "Maharshi Valmiki",
  29: "Netaji Subhash Chandra Bose",
  30: "Kalimata",
  31: "Shankar Nagar",
  32: "Shaheed Veernarayan Singh",
  33: "Lal Bahadur Shastri",
  34: "Guru Govind Singh",
  35: "Shaheed Hemu Kalani",
  36: "Havaldar Abdul Hamid",
  37: "Pandit Jawaharlal Nehru",
  38: "Tatyapara",
  39: "Sadar Bazar",
  40: "Babu Jagjivan Ram",
  41: "Maulana Abdul Raouf",
  42: "Civil Lines",
  43: "Mother Teresa",
  44: "Guru Ghasidas",
  45: "Rani Durgavati",
  46: "Dr. Rajendra Prasad",
  47: "Lieutenant Arvind Dixit",
  48: "Pt. Bhagwati Charan Shukla",
  49: "Pt. Motilal Nehru",
  50: "Shri Pankaj Vikram",
  51: "Rabindranath Tagore",
  52: "Chandrashekhar Azad",
  53: "Mureshwar Rao Gader",
  54: "Shri Rajeev Pande",
  55: "Shri Brigadier Usman",
  56: "Dr. Vipin Bihari Soor",
  57: "Swami Vivekanand",
  58: "Brahmanpara",
  59: "Kankalipara",
  60: "Thakur Pyarelal",
  61: "Mahant Laxminarayan Das",
  62: "Mahamaya Mandir",
  63: "Dr. Shyama Prasad Mukherjee",
  64: "Vaman Rao Lakhe",
  65: "Comrade Sudhir Mukherjee",
  66: "Pandit Sundar Lal Sharma",
  67: "Dr. Khubchand Baghel",
  68: "Madhavrao Sapre",
  69: "Pandit Deendayal Upadhyay",
  70: "Sant Ravidas",
};

interface Report {
  id: string;
  imageUrl: string;
  wardNumber: number;
  description: string;
  createdAt: string;
  latitude: number;
  longitude: number;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function SkeletonCard() {
  return (
    <div className="tf-card">
      <div className="tf-img-wrap" style={{ background: "#f1f5f9" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            animation: "tf-shimmer 1.4s infinite",
          }}
        />
      </div>
      <div className="tf-body">
        <div
          style={{
            height: 12,
            width: "55%",
            borderRadius: 6,
            background: "#f1f5f9",
            animation: "tf-shimmer 1.4s infinite",
          }}
        />
        <div
          style={{
            height: 10,
            width: "80%",
            borderRadius: 6,
            background: "#f1f5f9",
            animation: "tf-shimmer 1.4s infinite",
            marginTop: 10,
          }}
        />
        <div
          style={{
            height: 10,
            width: "60%",
            borderRadius: 6,
            background: "#f1f5f9",
            animation: "tf-shimmer 1.4s infinite",
            marginTop: 6,
          }}
        />
      </div>
    </div>
  );
}

export default function TrashFeed() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch("http://localhost:3001/reports/find-all")
      .then((res) => res.json())
      .then((data) => {
        setReports(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <style>{`
        .tf-wrap {
          font-family: 'DM Sans', 'Helvetica Neue', sans-serif;
        }
        .tf-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2px 16px;
        }
        .tf-heading {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.4px;
        }
        .tf-count {
          font-size: 12px;
          font-weight: 600;
          color: #64748b;
          background: #f1f5f9;
          padding: 4px 12px;
          border-radius: 20px;
        }
        .tf-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
        }
        .tf-card {
          background: #fff;
          border-radius: 18px;
          border: 1.5px solid #f1f5f9;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          transition: transform 0.18s, box-shadow 0.18s;
          display: flex;
          flex-direction: column;
        }
        .tf-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.10);
        }
        .tf-img-wrap {
          position: relative;
          aspect-ratio: 4/3;
          background: #f8fafc;
          overflow: hidden;
          flex-shrink: 0;
        }
        .tf-img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s;
        }
        .tf-card:hover .tf-img { transform: scale(1.03); }
        .tf-img-placeholder {
          width: 100%; height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: #cbd5e1;
          font-size: 12px;
          font-weight: 500;
        }
        .tf-ward-pill {
          position: absolute;
          top: 10px; left: 10px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(8px);
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          color: #1e293b;
          box-shadow: 0 1px 6px rgba(0,0,0,0.10);
          max-width: calc(100% - 20px);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .tf-time-pill {
          position: absolute;
          top: 10px; right: 10px;
          background: rgba(15,23,42,0.70);
          backdrop-filter: blur(8px);
          padding: 4px 9px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 600;
          color: #fff;
        }
        .tf-body {
          padding: 14px 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }
        .tf-ward-label {
          font-size: 11px;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .tf-desc {
          font-size: 13px;
          color: #475569;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .tf-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 10px;
          border-top: 1px solid #f1f5f9;
          margin-top: auto;
        }
        .tf-ward-num {
          font-size: 11px;
          font-weight: 600;
          color: #cbd5e1;
        }
        .tf-map-btn {
          font-size: 12px;
          font-weight: 700;
          color: #1a6b3a;
          background: #e8f5ee;
          padding: 5px 12px;
          border-radius: 20px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.15s;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .tf-map-btn:hover { background: #d1ead9; }
        .tf-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
          color: #94a3b8;
          font-size: 14px;
        }
        .tf-error {
          grid-column: 1 / -1;
          text-align: center;
          padding: 48px 20px;
          color: #ef4444;
          font-size: 13px;
          font-weight: 500;
        }
        @keyframes tf-shimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      <div className="tf-wrap">
        <div className="tf-topbar">
          <div className="tf-heading">📋 Recent Reports</div>
          {!loading && !error && (
            <div className="tf-count">{reports.length} total</div>
          )}
        </div>

        <div className="tf-grid">
          {loading &&
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

          {!loading && error && (
            <div className="tf-error">
              ⚠️ Failed to load reports. Check backend connection.
            </div>
          )}

          {!loading && !error && reports.length === 0 && (
            <div className="tf-empty">
              🌿 No reports yet. The city is clean!
            </div>
          )}

          {!loading &&
            !error &&
            reports.map((report) => {
              const wardName =
                WARD_NAMES[report.wardNumber] ?? `Ward ${report.wardNumber}`;
              const mapsUrl = `https://www.google.com/maps?q=${report.latitude},${report.longitude}`;
              const hasImgError = imgErrors[report.id];

              return (
                <div
                  className="tf-card"
                  key={report.id}
                  id={`report-${report.id}`}
                >
                  <div className="tf-img-wrap">
                    {!hasImgError && report.imageUrl ? (
                      <img
                        src={report.imageUrl}
                        alt={`Waste at ${wardName}`}
                        className="tf-img"
                        onError={() =>
                          setImgErrors((p) => ({ ...p, [report.id]: true }))
                        }
                      />
                    ) : (
                      <div className="tf-img-placeholder">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#cbd5e1"
                          strokeWidth="1.5"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="3" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="M21 15l-5-5L5 21" />
                        </svg>
                        <span>No image</span>
                      </div>
                    )}

                    <div className="tf-ward-pill">📍 {wardName}</div>
                    <div className="tf-time-pill">
                      {timeAgo(report.createdAt)}
                    </div>
                  </div>

                  <div className="tf-body">
                    <p className="tf-desc">
                      {report.description || "No description provided."}
                    </p>
                    <div className="tf-footer">
                      <span className="tf-ward-num">
                        Ward #{report.wardNumber}
                      </span>
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tf-map-btn"
                      >
                        View on Map ↗
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
