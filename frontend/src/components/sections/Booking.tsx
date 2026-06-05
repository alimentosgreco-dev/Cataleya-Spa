"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Loader2,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { allTreatmentOptions } from "@/data/treatments";
import { TIME_SLOTS } from "@/data/booking";
import { siteConfig } from "@/data/navigation";
import { useBookingForm } from "@/hooks/useBookingForm";
import { api } from "@/lib/api";
import { ApiError } from "@/lib/api-error";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { FloatingGradient } from "@/components/ui/FloatingGradient";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function getCalendarDays(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const days: (Date | null)[] = [];
  for (let i = 0; i < first.getDay(); i++) days.push(null);
  for (let d = 1; d <= last.getDate(); d++) {
    days.push(new Date(year, month, d));
  }
  return days;
}

function formatDateISO(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function Booking() {
  const { form, errors, loading, update, submit } = useBookingForm();
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const calendarDays = useMemo(
    () => getCalendarDays(viewYear, viewMonth),
    [viewYear, viewMonth]
  );

  const fetchSlots = useCallback(async (fecha: string) => {
    setLoadingSlots(true);
    try {
      const { slots } = await api.getAvailability(fecha);
      setAvailableSlots(slots);
    } catch (err) {
      setAvailableSlots([]);
      const message =
        err instanceof ApiError
          ? err.message
          : "No se pudieron cargar los horarios disponibles";
      toast.error(message);
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (form.date) {
      fetchSlots(form.date);
    } else {
      setAvailableSlots([]);
    }
  }, [form.date, fetchSlots]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await submit();
    if (!result.ok && Object.keys(errors).length) {
      toast.error("Revisa los campos del formulario");
    } else if (!result.ok) {
      toast.error(errors.treatmentId ?? "Error al crear la reserva");
    }
  };

  return (
    <section
      id="reservar"
      className="relative py-20 md:py-28 overflow-hidden bg-gray-light/50 dark:bg-black-soft/30"
      aria-labelledby="booking-heading"
    >
      <FloatingGradient className="top-10 right-0" color="purple" />
      <FloatingGradient className="bottom-0 left-0" color="olive" size="sm" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Reserva tu momento"
            title="Agenda tu cita"
            subtitle="Selecciona fecha, horario y tratamiento. Paga de forma segura con Mercado Pago."
          />
        </Reveal>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid gap-8 lg:grid-cols-5">
            <Reveal className="lg:col-span-2" delay={0.1}>
              <GlassCard className="h-full">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 font-semibold">
                    <Calendar className="h-5 w-5 text-purple" aria-hidden />
                    Fecha y hora
                  </h3>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        if (viewMonth === 0) {
                          setViewMonth(11);
                          setViewYear((y) => y - 1);
                        } else setViewMonth((m) => m - 1);
                      }}
                      className="rounded-lg p-2 hover:bg-purple/10 focus-visible:ring-2 focus-visible:ring-purple"
                      aria-label="Mes anterior"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (viewMonth === 11) {
                          setViewMonth(0);
                          setViewYear((y) => y + 1);
                        } else setViewMonth((m) => m + 1);
                      }}
                      className="rounded-lg p-2 hover:bg-purple/10 focus-visible:ring-2 focus-visible:ring-purple"
                      aria-label="Mes siguiente"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <p className="mb-4 text-center font-medium">
                  {MONTHS[viewMonth]} {viewYear}
                </p>

                <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-text">
                  {WEEKDAYS.map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>

                <div
                  className="grid grid-cols-7 gap-1"
                  role="grid"
                  aria-label="Calendario de citas"
                >
                  {calendarDays.map((day, i) => {
                    if (!day) return <div key={`empty-${i}`} />;
                    const iso = formatDateISO(day);
                    const todayStart = new Date(
                      today.getFullYear(),
                      today.getMonth(),
                      today.getDate()
                    );
                    const isPast = day < todayStart;
                    const isSelected = form.date === iso;
                    const isSunday = day.getDay() === 0;

                    return (
                      <button
                        key={iso}
                        type="button"
                        disabled={isPast || isSunday}
                        onClick={() => {
                          update("date", iso);
                          update("time", "");
                        }}
                        className={cn(
                          "aspect-square rounded-xl text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple",
                          isSelected &&
                            "bg-purple text-white shadow-lg shadow-purple/30",
                          !isSelected &&
                            !isPast &&
                            !isSunday &&
                            "hover:bg-purple/10",
                          (isPast || isSunday) && "opacity-30 cursor-not-allowed"
                        )}
                        aria-pressed={isSelected}
                        aria-label={day.toLocaleDateString("es-MX")}
                      >
                        {day.getDate()}
                      </button>
                    );
                  })}
                </div>
                {errors.date && (
                  <p className="mt-2 text-sm text-red-500" role="alert">
                    {errors.date}
                  </p>
                )}

                <div className="mt-8">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                    <Clock className="h-4 w-4 text-olive" aria-hidden />
                    Horarios disponibles
                  </h4>
                  {!form.date ? (
                    <p className="text-sm text-gray-text">
                      Selecciona una fecha primero
                    </p>
                  ) : loadingSlots ? (
                    <p className="flex items-center gap-2 text-sm text-gray-text">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Cargando horarios...
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {TIME_SLOTS.map((slot) => {
                        const available = availableSlots.includes(slot);
                        const isSelected = form.time === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            disabled={!available}
                            onClick={() => update("time", slot)}
                            className={cn(
                              "rounded-xl px-2 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple",
                              isSelected &&
                                "bg-olive text-white shadow-md",
                              !isSelected &&
                                available &&
                                "glass hover:bg-olive/10",
                              !available &&
                                "opacity-40 line-through cursor-not-allowed"
                            )}
                            aria-pressed={isSelected}
                            aria-disabled={!available}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  )}
                  {errors.time && (
                    <p className="mt-2 text-sm text-red-500" role="alert">
                      {errors.time}
                    </p>
                  )}
                </div>
              </GlassCard>
            </Reveal>

            <Reveal className="lg:col-span-3" delay={0.2}>
              <GlassCard className="h-full">
                <h3 className="mb-6 font-semibold" id="booking-heading">
                  Tus datos
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Nombre completo"
                    id="fullName"
                    value={form.fullName}
                    onChange={(v) => update("fullName", v)}
                    error={errors.fullName}
                    required
                    className="sm:col-span-2"
                  />
                  <Field
                    label="Teléfono"
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(v) => update("phone", v)}
                    error={errors.phone}
                    required
                  />
                  <Field
                    label="Correo electrónico"
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(v) => update("email", v)}
                    error={errors.email}
                    required
                  />
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="treatmentId"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Tratamiento deseado *
                    </label>
                    <select
                      id="treatmentId"
                      value={form.treatmentId}
                      onChange={(e) => update("treatmentId", e.target.value)}
                      className={cn(
                        "w-full rounded-2xl border border-purple/15 bg-background px-4 py-3 text-sm transition-colors focus:border-purple focus:outline-none focus:ring-2 focus:ring-purple/20",
                        errors.treatmentId && "border-red-400"
                      )}
                      aria-invalid={!!errors.treatmentId}
                      required
                    >
                      <option value="">Selecciona un tratamiento</option>
                      {allTreatmentOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.treatmentId && (
                      <p className="mt-1 text-sm text-red-500" role="alert">
                        {errors.treatmentId}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="comments" className="mb-1.5 block text-sm font-medium">
                      Comentarios adicionales
                    </label>
                    <textarea
                      id="comments"
                      rows={3}
                      value={form.comments}
                      onChange={(e) => update("comments", e.target.value)}
                      placeholder="Alergias, preferencias o notas especiales..."
                      className="w-full resize-none rounded-2xl border border-purple/15 bg-background px-4 py-3 text-sm focus:border-purple focus:outline-none focus:ring-2 focus:ring-purple/20"
                    />
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button
                    type="submit"
                    size="lg"
                    shine
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Redirigiendo a Mercado Pago...
                      </>
                    ) : (
                      "Reservar y Pagar"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() =>
                      window.open(
                        `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hola, me gustaría agendar una cita.")}`,
                        "_blank"
                      )
                    }
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp
                  </Button>
                </div>
                <p className="mt-4 text-xs text-gray-text text-center">
                  Pago seguro procesado por Mercado Pago · Horarios 10:00 – 17:00
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  error,
  type = "text",
  required,
  className,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label} {required && "*"}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-invalid={!!error}
        className={cn(
          "w-full rounded-2xl border border-purple/15 bg-background px-4 py-3 text-sm focus:border-purple focus:outline-none focus:ring-2 focus:ring-purple/20",
          error && "border-red-400"
        )}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1 text-sm text-red-500"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
