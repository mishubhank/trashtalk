"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { JABALPUR_WARDS, WardOption } from "../components/WardSelect";

const WardSelect = dynamic(() => import("../components/WardSelect"), {
  ssr: false,
});

// ─── Inline CameraCapture (slim, prop-driven) ────────────────────────────────
function CameraCapture({
  image,
  setImage,
}: {
  image: File | null;
  setImage: (f: File | null) => void;
}) {
  return (
    <label className="rp-photo-zone" aria-label="Upload photo">
      {image ? (
        <>
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="rp-photo-preview"
          />
          <span className="rp-photo-badge">Tap to retake</span>
        </>
      ) : (
        <div className="rp-photo-empty">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          <span className="rp-photo-hint">Tap to capture</span>
          <span className="rp-photo-sub">Point camera at the waste</span>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="rp-hidden-input"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
    </label>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ReportPage() {
  const [ward, setWard] = useState<WardOption | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | "info";
    msg: string;
  } | null>(null);
  const [done, setDone] = useState(false);

  const canSubmit = !!image && !!ward && !loading;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setStatus({ type: "info", msg: "Acquiring GPS signal…" });

    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        setStatus({ type: "info", msg: "Uploading report…" });
        try {
          const fd = new FormData();
          fd.append("image", image!);
          fd.append("wardNumber", String(ward!.value));
          fd.append("latitude", String(latitude));
          fd.append("longitude", String(longitude));
          fd.append("description", "Reported via mobile");

          await fetch("http://localhost:3001/reports", {
            method: "POST",
            body: fd,
          });

          setStatus({ type: "success", msg: "Report submitted — thank you!" });
          setDone(true);
          setImage(null);
          setWard(null);
          setTimeout(() => {
            setDone(false);
            setStatus(null);
          }, 4000);
        } catch {
          setStatus({ type: "error", msg: "Upload failed. Please retry." });
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
        setStatus({
          type: "error",
          msg: "Location access denied. Enable GPS and try again.",
        });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  };

  const step1Done = !!image;
  const step2Done = !!ward;

  return (
    <>
      {/* ── Scoped styles ─────────────────────────────────────────────── */}
      <style>{`
        /* Tokens */
        :root {
          --ink: #0a0a0a;
          --ink-2: #3d3d3d;
          --ink-3: #8a8a8a;
          --surface: #f5f4f0;
          --card: #ffffff;
          --border: #e8e6e1;
          --accent: #1a6b3a;
          --accent-light: #e8f5ee;
          --accent-hover: #155830;
          --red: #c0392b;
          --red-light: #fdf0ee;
          --amber: #b45309;
          --amber-light: #fef8ee;
          --radius-card: 20px;
          --radius-btn: 14px;
          --shadow-card: 0 2px 16px rgba(0,0,0,0.07);
          --shadow-btn: 0 4px 20px rgba(26,107,58,0.28);
        }

        /* Page shell */
        .rp-shell {
          min-height: 100dvh;
          background: var(--surface);
          font-family: 'DM Sans', 'Helvetica Neue', sans-serif;
          display: flex;
          flex-direction: column;
        }

        /* Header */
        .rp-header {
          padding: 20px 20px 0;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .rp-header-icon {
          width: 44px; height: 44px;
          background: var(--accent);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .rp-header-title {
          font-size: 22px;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: -0.5px;
          line-height: 1.2;
        }
        .rp-header-sub {
          font-size: 13px;
          color: var(--ink-3);
          margin-top: 1px;
          font-weight: 400;
        }

        /* Progress strip */
        .rp-progress {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 20px 20px 4px;
        }
        .rp-step {
          display: flex;
          align-items: center;
          gap: 6px;
          flex: 1;
        }
        .rp-step-dot {
          width: 22px; height: 22px;
          border-radius: 50%;
          border: 2px solid var(--border);
          background: var(--card);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px;
          font-weight: 700;
          color: var(--ink-3);
          flex-shrink: 0;
          transition: all 0.25s;
        }
        .rp-step-dot.done {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
        }
        .rp-step-label {
          font-size: 11px;
          font-weight: 500;
          color: var(--ink-3);
          white-space: nowrap;
        }
        .rp-step-label.done { color: var(--accent); }
        .rp-step-line {
          height: 2px;
          flex: 1;
          background: var(--border);
          border-radius: 2px;
          transition: background 0.3s;
        }
        .rp-step-line.done { background: var(--accent); }

        /* Content scroll area */
        .rp-content {
          flex: 1;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          overflow-y: auto;
        }

        /* Section card */
        .rp-card {
          background: var(--card);
          border-radius: var(--radius-card);
          border: 1.5px solid var(--border);
          overflow: hidden;
          box-shadow: var(--shadow-card);
        }
        .rp-card-header {
          padding: 14px 18px 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid var(--border);
        }
        .rp-card-num {
          width: 24px; height: 24px;
          border-radius: 8px;
          background: var(--accent-light);
          color: var(--accent);
          font-size: 12px;
          font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .rp-card-num.done {
          background: var(--accent);
          color: #fff;
        }
        .rp-card-label {
          font-size: 14px;
          font-weight: 600;
          color: var(--ink);
          letter-spacing: -0.2px;
        }
        .rp-card-check {
          margin-left: auto;
          color: var(--accent);
          font-size: 16px;
          opacity: 0;
          transition: opacity 0.25s;
        }
        .rp-card-check.visible { opacity: 1; }

        /* Photo zone */
        .rp-photo-zone {
          display: block;
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          background: #f9f9f7;
          cursor: pointer;
          overflow: hidden;
          transition: background 0.2s;
        }
        .rp-photo-zone:active { background: #f0f0ec; }
        .rp-photo-preview {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
        }
        .rp-photo-badge {
          position: absolute;
          bottom: 12px; right: 12px;
          background: rgba(0,0,0,0.55);
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
          backdrop-filter: blur(6px);
        }
        .rp-photo-empty {
          width: 100%; height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: var(--ink-3);
        }
        .rp-photo-hint {
          font-size: 15px;
          font-weight: 600;
          color: var(--ink-2);
          margin-top: 4px;
        }
        .rp-photo-sub {
          font-size: 12px;
          color: var(--ink-3);
        }
        .rp-hidden-input { display: none; }

        /* Ward picker wrapper */
        .rp-ward-wrap {
          padding: 14px 18px;
        }
        .rp-ward-wrap select {
          width: 100%;
          padding: 13px 16px;
          border-radius: 12px;
          border: 1.5px solid var(--border);
          background: var(--surface);
          font-size: 15px;
          color: var(--ink);
          font-family: inherit;
          font-weight: 500;
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238a8a8a' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .rp-ward-wrap select:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-light);
        }

        /* Status banner */
        .rp-status {
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 13px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 10px;
          animation: slideUp 0.25s ease;
        }
        .rp-status.info  { background: var(--amber-light); color: var(--amber); }
        .rp-status.error { background: var(--red-light); color: var(--red); }
        .rp-status.success { background: var(--accent-light); color: var(--accent); }

        /* Footer CTA */
        .rp-footer {
          padding: 12px 20px 28px;
          background: var(--surface);
        }
        .rp-submit {
          width: 100%;
          padding: 17px;
          border-radius: var(--radius-btn);
          border: none;
          font-size: 16px;
          font-weight: 700;
          font-family: inherit;
          letter-spacing: -0.2px;
          cursor: pointer;
          transition: all 0.22s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .rp-submit.active {
          background: var(--accent);
          color: #fff;
          box-shadow: var(--shadow-btn);
        }
        .rp-submit.active:active {
          background: var(--accent-hover);
          transform: scale(0.985);
        }
        .rp-submit.inactive {
          background: #ebebeb;
          color: #b0b0b0;
          cursor: not-allowed;
        }
        .rp-submit.loading {
          background: var(--accent);
          color: #fff;
          opacity: 0.75;
          cursor: not-allowed;
        }

        .rp-spinner {
          width: 18px; height: 18px;
          border: 2.5px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.75s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Success overlay */
        .rp-success-overlay {
          position: fixed; inset: 0;
          background: rgba(10,10,10,0.55);
          display: flex; align-items: center; justify-content: center;
          z-index: 100;
          animation: fadeIn 0.2s ease;
          padding: 32px;
        }
        .rp-success-card {
          background: var(--card);
          border-radius: 24px;
          padding: 36px 28px;
          text-align: center;
          max-width: 320px;
          width: 100%;
          animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .rp-success-icon {
          width: 64px; height: 64px;
          background: var(--accent-light);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px;
          font-size: 28px;
        }
        .rp-success-title {
          font-size: 20px; font-weight: 700;
          color: var(--ink); letter-spacing: -0.4px;
          margin-bottom: 8px;
        }
        .rp-success-body {
          font-size: 14px; color: var(--ink-3); line-height: 1.5;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div className="rp-shell">
        {/* Header */}
        <header className="rp-header">
          <div className="rp-header-icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
          </div>
          <div>
            <div className="rp-header-title">Report Waste</div>
            <div className="rp-header-sub">Jabalpur Municipal Corporation</div>
          </div>
        </header>

        {/* Progress */}
        <div className="rp-progress">
          <div className="rp-step">
            <div className={`rp-step-dot ${step1Done ? "done" : ""}`}>
              {step1Done ? "✓" : "1"}
            </div>
            <span className={`rp-step-label ${step1Done ? "done" : ""}`}>
              Photo
            </span>
          </div>
          <div className={`rp-step-line ${step1Done ? "done" : ""}`} />
          <div className="rp-step">
            <div className={`rp-step-dot ${step2Done ? "done" : ""}`}>
              {step2Done ? "✓" : "2"}
            </div>
            <span className={`rp-step-label ${step2Done ? "done" : ""}`}>
              Ward
            </span>
          </div>
          <div
            className={`rp-step-line ${step1Done && step2Done ? "done" : ""}`}
          />
          <div className="rp-step">
            <div className={`rp-step-dot ${done ? "done" : ""}`}>
              {done ? "✓" : "3"}
            </div>
            <span className={`rp-step-label ${done ? "done" : ""}`}>
              Submit
            </span>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="rp-content">
          {/* Step 1 — Photo */}
          <div className="rp-card">
            <div className="rp-card-header">
              <div className={`rp-card-num ${step1Done ? "done" : ""}`}>
                {step1Done ? "✓" : "1"}
              </div>
              <span className="rp-card-label">Capture the waste</span>
              <span className={`rp-card-check ${step1Done ? "visible" : ""}`}>
                ✓
              </span>
            </div>
            <CameraCapture image={image} setImage={setImage} />
          </div>

          {/* Step 2 — Ward */}
          <div className="rp-card">
            <div className="rp-card-header">
              <div className={`rp-card-num ${step2Done ? "done" : ""}`}>
                {step2Done ? "✓" : "2"}
              </div>
              <span className="rp-card-label">Select your ward</span>
              <span className={`rp-card-check ${step2Done ? "visible" : ""}`}>
                ✓
              </span>
            </div>
            <div className="rp-ward-wrap">
              <select
                value={ward?.value ?? ""}
                onChange={(e) => {
                  const found = JABALPUR_WARDS.find(
                    (w) => String(w.value) === e.target.value,
                  );
                  setWard(found || null);
                }}
              >
                <option value="" disabled>
                  Choose ward number…
                </option>
                {JABALPUR_WARDS.map((w) => (
                  <option key={w.value} value={w.value}>
                    {w.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status */}
          {status && (
            <div className={`rp-status ${status.type}`}>
              <span>
                {status.type === "success" && "✅"}
                {status.type === "error" && "⚠️"}
                {status.type === "info" && "📍"}
              </span>
              {status.msg}
            </div>
          )}
        </div>

        {/* Sticky CTA */}
        <div className="rp-footer">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`rp-submit ${loading ? "loading" : canSubmit ? "active" : "inactive"}`}
          >
            {loading ? (
              <>
                <div className="rp-spinner" /> Processing…
              </>
            ) : (
              "Submit Report"
            )}
          </button>
        </div>
      </div>

      {/* Success overlay */}
      {done && (
        <div className="rp-success-overlay">
          <div className="rp-success-card">
            <div className="rp-success-icon">🌿</div>
            <div className="rp-success-title">Report Submitted!</div>
            <p className="rp-success-body">
              Your report has been sent to the municipal team.
              <br />
              Thank you for keeping Jabalpur clean.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
