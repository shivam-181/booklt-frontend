// app/result/page.tsx
"use client";

// We need to wrap our page in <Suspense> to use useSearchParams
// So, we'll create the "real" page component first.
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";

function ResultPageContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const message = searchParams.get("message");

  const isSuccess = status === "success";

  return (
    <main className="container mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
        {isSuccess ? (
          <>
            {/* Success Icon (a simple CSS checkmark) */}
            <div className="mx-auto mb-4 h-16 w-16 rotate-45 transform rounded-full bg-brand-success p-3">
              <div className="h-full w-full border-b-8 border-l-8 border-white"></div>
            </div>
            <h1 className="text-3xl font-bold text-brand-dark">
              Booking Successful!
            </h1>
            <p className="mt-4 text-brand-secondary">
              Thank you! Your booking has been confirmed. A confirmation email
              has been sent to your address.
            </p>
          </>
        ) : (
          <>
            {/* Failure Icon (a simple CSS 'X') */}
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-danger text-5xl font-extrabold text-white">
              &times;
            </div>
            <h1 className="text-3xl font-bold text-brand-dark">
              Booking Failed
            </h1>
            <p className="mt-4 text-brand-secondary">
              Unfortunately, we couldn&apos;t complete your booking.
            </p>
            {/* Show the specific error message from the backend */}
            {message && (
              <p className="mt-2 rounded-md bg-red-50 p-3 text-sm font-medium text-brand-danger">
                {decodeURIComponent(message)}
              </p>
            )}
          </>
        )}

        <div className="mt-8">
          <Link href="/">
            <Button>{isSuccess ? "Book Another Trip" : "Try Again"}</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

// --- This is the new, required pattern for using useSearchParams ---
// We must wrap our client component in a <Suspense> boundary.
import { Suspense } from "react";

export default function ResultPage() {
  return (
    <Suspense fallback={<div>Loading result...</div>}>
      <ResultPageContent />
    </Suspense>
  );
}
