"use client";
import { useEffect, useState } from "react";

// ─── Ward mapping ─────────────────────────────────────────────────────────────
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

interface WardStat {
  wardNumber: number;
  _count: { id: number };
}

const MEDALS = ["🥇", "🥈", "🥉"];

function getRankColor(index: number) {
  if (index === 0) return { bar: "#ef4444", badge: "#fef2f2", text: "#dc2626" }; // red = most reports = worst
  if (index === 1) return { bar: "#f97316", badge: "#fff7ed", text: "#ea580c" };
  if (index === 2) return { bar: "#eab308", badge: "#fefce8", text: "#ca8a04" };
  return { bar: "#94a3b8", badge: "#f8fafc", text: "#64748b" };
}

export default function AreaLeaderboard() {
  const [stats, setStats] = useState<WardStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/reports/stats/by-area")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const maxCount = stats[0]?._count?.id || 1;

  return (
    <>
      <style>{`
        .lb-shell {
          background: #fff;
          border-radius: 20px;
          border: 1.5px solid #f1f5f9;
          overflow: hidden;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
          font-family: 'DM Sans', 'Helvetica Neue', sans-serif;
        }
        .lb-header {
          padding: 18px 20px 16px;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .lb-title {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.3px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .lb-subtitle {
          font-size: 11px;
          color: #94a3b8;
          font-weight: 500;
          margin-top: 2px;
        }
        .lb-badge {
          background: #fef2f2;
          color: #dc2626;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
        }
        .lb-list {
          display: flex;
          flex-direction: column;
        }
        .lb-row {
          padding: 13px 20px;
          border-bottom: 1px solid #f8fafc;
          display: flex;
          align-items: center;
          gap: 14px;
          transition: background 0.15s;
        }
        .lb-row:last-child { border-bottom: none; }
        .lb-row:hover { background: #fafafa; }
        .lb-rank {
          width: 28px;
          text-align: center;
          font-size: 16px;
          flex-shrink: 0;
        }
        .lb-rank-num {
          font-size: 12px;
          font-weight: 700;
          color: #cbd5e1;
        }
        .lb-info {
          flex: 1;
          min-width: 0;
        }
        .lb-ward-name {
          font-size: 13px;
          font-weight: 600;
          color: #1e293b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .lb-ward-num {
          font-size: 11px;
          color: #94a3b8;
          font-weight: 500;
          margin-top: 1px;
        }
        .lb-bar-wrap {
          flex: 1;
          height: 6px;
          background: #f1f5f9;
          border-radius: 99px;
          overflow: hidden;
          max-width: 80px;
        }
        .lb-bar-fill {
          height: 100%;
          border-radius: 99px;
          transition: width 0.6s cubic-bezier(0.4,0,0.2,1);
        }
        .lb-count {
          font-size: 12px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 20px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .lb-empty {
          padding: 36px 20px;
          text-align: center;
          color: #94a3b8;
          font-size: 13px;
        }
        .lb-skeleton {
          padding: 13px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          border-bottom: 1px solid #f8fafc;
        }
        .lb-skel-circle {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: #f1f5f9;
          animation: shimmer 1.4s infinite;
        }
        .lb-skel-line {
          height: 12px;
          border-radius: 6px;
          background: #f1f5f9;
          animation: shimmer 1.4s infinite;
        }
        @keyframes shimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      <div className="lb-shell">
        <div className="lb-header">
          <div>
            <div className="lb-title">🏚️ Ward Report Leaderboard</div>
            <div className="lb-subtitle">Most waste complaints · Jabalpur</div>
          </div>
          <div className="lb-badge">Live</div>
        </div>

        <div className="lb-list">
          {loading &&
            Array.from({ length: 5 }).map((_, i) => (
              <div className="lb-skeleton" key={i}>
                <div className="lb-skel-circle" />
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  <div className="lb-skel-line" style={{ width: "60%" }} />
                  <div className="lb-skel-line" style={{ width: "35%" }} />
                </div>
                <div
                  className="lb-skel-line"
                  style={{ width: 48, height: 24, borderRadius: 12 }}
                />
              </div>
            ))}

          {!loading && error && (
            <div className="lb-empty">
              ⚠️ Could not load data. Check backend connection.
            </div>
          )}

          {!loading && !error && stats.length === 0 && (
            <div className="lb-empty">
              No reports yet. All wards are clean! 🌿
            </div>
          )}

          {!loading &&
            !error &&
            stats.map((stat, index) => {
              const colors = getRankColor(index);
              const wardName =
                WARD_NAMES[stat.wardNumber] ?? `Ward ${stat.wardNumber}`;
              const pct = Math.max(8, (stat._count.id / maxCount) * 100);

              return (
                <div className="lb-row" key={stat.wardNumber}>
                  <div className="lb-rank">
                    {index < 3 ? (
                      <span>{MEDALS[index]}</span>
                    ) : (
                      <span className="lb-rank-num">{index + 1}</span>
                    )}
                  </div>
                  <div className="lb-info">
                    <div className="lb-ward-name">{wardName}</div>
                    <div className="lb-ward-num">Ward #{stat.wardNumber}</div>
                  </div>
                  <div className="lb-bar-wrap">
                    <div
                      className="lb-bar-fill"
                      style={{ width: `${pct}%`, background: colors.bar }}
                    />
                  </div>
                  <div
                    className="lb-count"
                    style={{ background: colors.badge, color: colors.text }}
                  >
                    {stat._count.id} reports
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
