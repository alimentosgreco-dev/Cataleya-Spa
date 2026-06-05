"use client";

import { useCallback, useState } from "react";
import { api } from "@/lib/api";
import { ApiError } from "@/lib/api-error";

export interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  treatmentId: string;
  date: string;
  time: string;
  comments: string;
}

const initial: BookingFormData = {
  fullName: "",
  phone: "",
  email: "",
  treatmentId: "",
  date: "",
  time: "",
  comments: "",
};

export type BookingErrors = Partial<Record<keyof BookingFormData, string>>;

function validate(data: BookingFormData): BookingErrors {
  const errors: BookingErrors = {};
  if (!data.fullName.trim() || data.fullName.length < 3) {
    errors.fullName = "Ingresa tu nombre completo";
  }
  if (!/^[\d\s+()-]{10,}$/.test(data.phone.replace(/\s/g, ""))) {
    errors.phone = "Teléfono inválido";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Correo electrónico inválido";
  }
  if (!data.treatmentId) errors.treatmentId = "Selecciona un tratamiento";
  if (!data.date) errors.date = "Selecciona una fecha";
  if (!data.time) errors.time = "Selecciona un horario";
  return errors;
}

export function useBookingForm() {
  const [form, setForm] = useState<BookingFormData>(initial);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [loading, setLoading] = useState(false);

  const update = useCallback(
    <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    []
  );

  const reset = useCallback(() => {
    setForm(initial);
    setErrors({});
  }, []);

  const submit = useCallback(async (): Promise<{
    ok: boolean;
    initPoint?: string;
  }> => {
    const validation = validate(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return { ok: false };
    }

    setLoading(true);
    try {
      const result = await api.createReservation({
        nombre: form.fullName.trim(),
        correo: form.email.trim(),
        telefono: form.phone.trim(),
        tratamientoId: form.treatmentId,
        fecha: form.date,
        hora: form.time,
        comentarios: form.comments.trim() || undefined,
      });

      const initPoint = result.payment.init_point;
      if (initPoint) {
        window.location.href = initPoint;
      }
      return { ok: true, initPoint };
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "No se pudo procesar la reserva. Intenta de nuevo.";
      setErrors({ treatmentId: message });
      return { ok: false };
    } finally {
      setLoading(false);
    }
  }, [form]);

  return { form, errors, loading, update, submit, reset, setForm };
}
