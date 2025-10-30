// app/experience/[id]/ExperienceClient.tsx
"use client"; // This is our new Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Experience, Slot } from "@/lib/types";
import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";

// This component will receive the experience data as a prop
interface ExperienceClientProps {
  experience: Experience;
}

export default function ExperienceClient({
  experience,
}: ExperienceClientProps) {
  // We use state to track which slot is selected
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const router = useRouter(); // We'll use this later (for a different approach)

  // We can derive the final price based on selection (for later)
  const finalPrice = experience.price;

  return (
    <>
      {/* Hero Image */}
      <div className="relative h-64 w-full overflow-hidden rounded-lg shadow-lg md:h-96">
        <Image
          src={experience.imageUrl}
          alt={experience.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Header */}
      <div className="mt-8 flex flex-col justify-between md:flex-row md:items-center">
        <h1 className="text-3xl font-bold text-brand-dark md:text-4xl">
          {experience.title}
        </h1>
        <div className="mt-2 text-2xl font-bold text-brand-dark md:mt-0">
          ${experience.price}
          <span className="text-base font-normal text-brand-secondary">
            {" "}
            / person
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="mt-6 border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold text-brand-dark">
          About this experience
        </h2>
        <p className="mt-4 text-brand-secondary">{experience.description}</p>
      </div>

      {/* --- INTERACTIVE SLOT SELECTOR --- */}
      <div className="mt-6 border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold text-brand-dark">Select a date</h2>
        <div className="mt-4 flex flex-col gap-3">
          {experience.slots.map((slot) => {
            const isSoldOut = slot.availableSpots <= 0;
            const isSelected = selectedSlot?._id === slot._id;

            return (
              <button
                key={slot._id}
                disabled={isSoldOut}
                onClick={() => setSelectedSlot(slot)} // <-- NEW: Set state on click
                className={`
                  flex justify-between rounded-md border p-4 text-left transition-all
                  ${
                    isSoldOut
                      ? "border-gray-200 bg-gray-100 text-gray-400 line-through"
                      : "border-gray-300 bg-white hover:border-brand-primary"
                  }
                  ${
                    isSelected
                      ? "ring-2 ring-brand-primary" // <-- NEW: Highlight selected
                      : ""
                  }
                `}
              >
                <div>
                  <span className="font-medium text-brand-dark">
                    {new Date(slot.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="ml-4 text-sm font-medium text-brand-success">
                    {new Date(slot.date).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </div>
                <div className="font-medium">
                  {isSoldOut ? (
                    <span className="text-brand-danger">Sold Out</span>
                  ) : (
                    <span className="text-brand-secondary">
                      {slot.availableSpots} spots left
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* --- UPDATED BOOK NOW BUTTON --- */}
      <div className="mt-8 border-t border-gray-200 pt-6 text-right">
        {/*
          We'll pass all the data the checkout page needs via URL Query Params.
          We use a simple <Link> component wrapped around our Button.
        */}
        <Link
          href={{
            pathname: "/checkout",
            query: {
              expId: experience._id,
              expTitle: experience.title,
              expPrice: experience.price,
              slotId: selectedSlot?._id,
              slotDate: selectedSlot?.date,
            },
          }}
          // This handy trick disables the link by making it "un-clickable"
          // and relies on the Button's 'disabled' state for visuals.
          aria-disabled={!selectedSlot}
          className={!selectedSlot ? "pointer-events-none" : ""}
        >
          <Button size="large" disabled={!selectedSlot}>
            Book Now
          </Button>
        </Link>
      </div>
    </>
  );
}
