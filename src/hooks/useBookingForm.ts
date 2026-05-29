"use client";

import { useCallback, useState } from "react";
import { isSlotAvailable } from "@/data/booking";

export interface BookingFormData {
  fullName: string;
  age: string;
  phone: string;
  email: string;
  treatmentId: string;
  date: string;
  time: string;
  comments: string;
}

const initial: BookingFormData = {
  fullName: "",
  age: "",
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
  const age = parseInt(data.age, 10);
  if (!data.age || isNaN(age) || age < 16 || age > 99) {
    errors.age = "Edad válida entre 16 y 99";
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
  if (data.date && data.time) {
    const d = new Date(data.date + "T12:00:00");
    if (!isSlotAvailable(d, data.time)) {
      errors.time = "Este horario ya no está disponible";
    }
  }
  return errors;
}

export function useBookingForm() {
  const [form, setForm] = useState<BookingFormData>(initial);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

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
    setConfirmed(false);
  }, []);

  const submit = useCallback(async (): Promise<boolean> => {
    const validation = validate(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return false;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setConfirmed(true);
    return true;
  }, [form]);

  return { form, errors, loading, confirmed, update, submit, reset, setForm };
}
