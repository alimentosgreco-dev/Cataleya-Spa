import type { ReservationDetail } from "./api";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  `${(process.env.BACKEND_INTERNAL_URL ?? "http://127.0.0.1:4000").replace(/\/$/, "")}/api`;

export async function fetchReservation(
  id: string
): Promise<ReservationDetail | null> {
  try {
    const res = await fetch(`${API_URL}/reservations/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as ReservationDetail;
  } catch {
    return null;
  }
}
