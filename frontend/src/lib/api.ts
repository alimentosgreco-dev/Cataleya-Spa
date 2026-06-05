import { ApiError } from "./api-error";

/** URL del API en el navegador (proxy same-origin) o en servidor (directo al backend). */
export function getApiBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");
  }
  if (typeof window !== "undefined") {
    return "/api-proxy";
  }
  return (
    process.env.BACKEND_INTERNAL_URL?.replace(/\/$/, "") ??
    "http://127.0.0.1:4000/api"
  );
}

export { ApiError };

async function request<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const base = getApiBaseUrl();
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;

  let res: Response;
  try {
    res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
  } catch {
    throw new ApiError(
      "No se pudo conectar con el servidor. Verifica que el backend esté activo (npm run dev:api).",
      0
    );
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(
      (data as { error?: string }).error ?? "Error en la solicitud",
      res.status,
      (data as { details?: unknown }).details
    );
  }

  return data as T;
}

export interface AvailabilityResponse {
  fecha: string;
  slots: string[];
}

export interface CreateReservationResponse {
  reserva: {
    id: string;
    fecha: string;
    hora: string;
    estado: string;
    cliente: { id: string; nombre: string; correo: string };
    tratamiento: { id: string; nombre: string; precio: number };
  };
  payment: {
    preference_id: string | number;
    init_point: string;
  };
}

export interface ReservationDetail {
  id: string;
  fecha: string;
  hora: string;
  estado: string;
  cliente: { nombre: string; correo: string; telefono: string };
  tratamiento: { id: string; nombre: string; precio: number };
  pago: { estado: string; monto: number } | null;
}

export const api = {
  getAvailability: (fecha: string) =>
    request<AvailabilityResponse>(
      `/availability?fecha=${encodeURIComponent(fecha)}`
    ),

  createReservation: (body: {
    nombre: string;
    correo: string;
    telefono: string;
    tratamientoId: string;
    fecha: string;
    hora: string;
    comentarios?: string;
  }) =>
    request<CreateReservationResponse>("/reservations", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  getReservation: (id: string) =>
    request<ReservationDetail>(`/reservations/${id}`),
};
