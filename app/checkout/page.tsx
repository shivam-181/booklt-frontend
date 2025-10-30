// app/checkout/page.tsx
"use client"; // <-- Still needs to be a Client Component

// We don't import Suspense here anymore
import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Button from "@/components/Button";
import { validatePromoCode, createBooking } from "@/services/apiService";
import CheckoutWrapper from "./CheckoutWrapper"; // <-- NEW: Import the wrapper

// --- We rename the main function to CheckoutContent ---
function CheckoutContent() {
  const router = useRouter(); // For redirecting
  const searchParams = useSearchParams(); // For reading URL params

  // --- 1. Read Data from URL ---
  const expId = searchParams.get("expId") || "";
  const expTitle = searchParams.get("expTitle") || "Experience";
  const expPrice = parseFloat(searchParams.get("expPrice") || "0");
  const slotDate = searchParams.get("slotDate") || "";

  // --- 2. Form State ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");

  // --- 3. UI/Price State ---
  const [discount, setDiscount] = useState(0); // Flat discount amount
  const [promoMessage, setPromoMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // --- 4. Calculate Final Price ---
  const finalPrice = useMemo(() => {
    const total = expPrice - discount;
    return total < 0 ? 0 : total;
  }, [expPrice, discount]);

  // --- 5. Handle Promo Code Validation ---
  const handleApplyPromo = async () => {
    if (!promoCode) return;
    setIsLoading(true);
    setPromoMessage("");
    try {
      const res = await validatePromoCode(promoCode);
      if (res.isValid) {
        if (res.discountType === "flat") {
          setDiscount(res.value || 0);
        } else if (res.discountType === "percent") {
          setDiscount((expPrice * (res.value || 0)) / 100);
        }
        setPromoMessage("Promo applied successfully!");
      } else {
        setDiscount(0);
        setPromoMessage(res.message || "Invalid promo code");
      }
    } catch (err) {
      setPromoMessage("Could not validate promo code.");
    }
    setIsLoading(false);
  };

  // --- 6. Handle Final Booking Submission ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Stop form from reloading page
    setFormError("");

    if (!name || !email) {
      setFormError("Name and Email are required.");
      return;
    }
    if (!expId || !slotDate) {
      setFormError(
        "Booking details are missing. Please go back and try again."
      );
      return;
    }

    setIsLoading(true);
    try {
      await createBooking({
        experienceId: expId,
        slotDate: slotDate,
        userName: name,
        userEmail: email,
        promoCode: discount > 0 ? promoCode : null,
        finalPrice: finalPrice,
      });

      // --- SUCCESS! ---
      router.push("/result?status=success");
    } catch (err) {
      // --- FAILURE! ---
      let errorMessage = "An unknown error occurred.";
      if (err instanceof Error) {
        errorMessage = err.message;
      }

      // Redirect to the result page with the failure status
      router.push(
        `/result?status=failure&message=${encodeURIComponent(errorMessage)}`
      );
    }
    // We leave the final setIsLoading(false) outside the try/catch if we didn't navigate
    // Since we navigate inside, we can remove it, but for safety in case of error before navigation:
    // setIsLoading(false); // Can be kept or removed since navigation happens inside try/catch
  };

  // --- REST OF THE UI (Form/Summary) ---
  return (
    <main className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold text-brand-dark">
        Confirm your booking
      </h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* --- LEFT SIDE: Form --- */}
        <div className="md:col-span-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-brand-dark">
              Your Information
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-brand-secondary"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name} // <-- Controlled component
                  onChange={(e) => setName(e.target.value)} // <-- Set state
                  placeholder="John Doe"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-brand-secondary"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email} // <-- Controlled component
                  onChange={(e) => setEmail(e.target.value)} // <-- Set state
                  placeholder="you@example.com"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary"
                />
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-brand-dark">
                  Promo Code
                </h2>
                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    id="promo"
                    value={promoCode} // <-- Controlled component
                    onChange={(e) => setPromoCode(e.target.value)} // <-- Set state
                    placeholder="e.g. SAVE10"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary"
                  />
                  <Button
                    type="button" // <-- Important: not "submit"
                    variant="secondary"
                    className="flex-shrink-0"
                    onClick={handleApplyPromo} // <-- Call validation
                    disabled={isLoading}
                  >
                    Apply
                  </Button>
                </div>
                {promoMessage && (
                  <p className="mt-2 text-sm text-brand-secondary">
                    {promoMessage}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* --- RIGHT SIDE: Summary --- */}
        <div className="md:col-span-1">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-brand-dark">
              Order Summary
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-brand-dark">{expTitle}</h3>
                <p className="text-sm text-brand-secondary">
                  {new Date(slotDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="space-y-2 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-brand-secondary">
                  <span>Base Price</span>
                  <span>${expPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-brand-secondary">
                  <span>Taxes & Fees</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-brand-secondary">
                  <span>Discount</span>
                  <span className="text-brand-success">
                    -${discount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between border-t border-gray-200 pt-4 text-xl font-bold text-brand-dark">
                <span>Total</span>
                <span>${finalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                type="submit"
                size="large"
                className="w-full"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Booking..." : "Confirm & Book"}
              </Button>
            </div>
            {formError && (
              <p className="mt-4 text-center text-sm text-brand-danger">
                {formError}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
// --- FINAL EXPORT ---
// This is the new, final export that wraps the content in Suspense
export default function CheckoutPage() {
  return <CheckoutWrapper />;
}
