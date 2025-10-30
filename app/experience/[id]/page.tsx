// app/experience/[id]/page.tsx
import { getExperienceById } from "@/services/apiService";
import { notFound } from "next/navigation";
import ExperienceClient from "./ExperienceClient"; // <-- NEW: Import our client component

interface DetailPageProps {
  params: {
    id: string;
  };
}

// This page.tsx STAYS a Server Component.
// It fetches the data and then passes it to the client component.
export default async function ExperienceDetailPage({
  params,
}: DetailPageProps) {
  const { id } = await params;
  let experience;

  try {
    experience = await getExperienceById(id);
  } catch (err) {
    if (err instanceof Error && err.message === "Experience not found") {
      notFound();
    }
    // For other errors, we can show a generic error message
    return (
      <main className="container mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-md border border-brand-danger bg-red-50 p-4 text-center text-brand-danger">
          Failed to load experience data. Please try again later.
        </div>
      </main>
    );
  }

  // If no experience (should be caught by 'notFound' but good to have)
  if (!experience) {
    notFound();
  }

  // Render the page wrapper
  return (
    <main className="container mx-auto max-w-4xl px-4 py-12">
      {/*
        Render our new INTERACTIVE client component
        and pass the server-fetched data to it as a prop.
      */}
      <ExperienceClient experience={experience} />
    </main>
  );
}
