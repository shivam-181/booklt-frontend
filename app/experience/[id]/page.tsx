// app/experience/[id]/page.tsx
import { getExperienceById } from "@/services/apiService";
import { notFound } from "next/navigation";
import ExperienceClient from "./ExperienceClient";

// --- The component signature is changed to fix the Type Conflict ---
export default async function ExperienceDetailPage({
  params,
}: {
  params: { id: string }; // We define the required params inline
}) {
  const { id } = await params;
  let experience;

  try {
    experience = await getExperienceById(id);
  } catch (err) {
    if (err instanceof Error && err.message === "Experience not found") {
      notFound();
    }
    // For other errors (like Server Error 500)
    return (
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-md border border-brand-danger bg-red-50 p-4 text-center text-brand-danger">
          Failed to load experience data. Please check the backend console.
        </div>
      </main>
    );
  }

  if (!experience) {
    notFound();
  }

  // Render the page wrapper
  return (
    <main className="container mx-auto max-w-4xl px-4 py-12">
      {/*
        Render our INTERACTIVE client component
        and pass the server-fetched data to it as a prop.
      */}
      <ExperienceClient experience={experience} />
    </main>
  );
}
