// src/lib/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function uploadReport(formData: FormData) {
  const response = await fetch(`${BASE_URL}/reports`, {
    method: "POST",
    body: formData,
    // Note: Don't set Content-Type header manually when sending FormData
  });

  if (!response.ok) {
    throw new Error("Failed to upload report");
  }

  return response.json();
}
