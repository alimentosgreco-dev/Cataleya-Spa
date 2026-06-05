import Link from "next/link";
import { XCircle } from "lucide-react";
export default function ErrorPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-20 bg-gray-light/50 dark:bg-black-soft/30">
      <div className="gradient-border max-w-lg w-full p-8 md:p-12 text-center">
        <XCircle className="mx-auto h-20 w-20 text-red-500" />
        <h1 className="mt-6 font-display text-3xl font-semibold">
          Tu pago no pudo ser procesado
        </h1>
        <p className="mt-4 text-gray-text">
          No se realizó el cargo. Puedes intentar reservar nuevamente o
          contactarnos por WhatsApp.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/#reservar"
            className="inline-flex items-center justify-center rounded-full bg-purple px-8 py-4 text-lg font-medium text-white shadow-lg hover:bg-purple-dark transition-colors"
          >
            Intentar nuevamente
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border-2 border-purple px-8 py-4 text-lg font-medium text-purple hover:bg-purple hover:text-white transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
