// app/checkout/CheckoutWrapper.tsx
"use client"; // This must be a client component

import { Suspense } from "react";
import CheckoutContent from "./page"; // We will rename the function in page.tsx to CheckoutContent

// The actual page logic is now wrapped in a Suspense boundary
// to prevent the useSearchParams() hook from running on the server.
export default function CheckoutWrapper() {
  return (
    <Suspense fallback={<div>Loading checkout details...</div>}>
      {/* We are exporting the renamed function here */}
      <CheckoutContent />
    </Suspense>
  );
}
