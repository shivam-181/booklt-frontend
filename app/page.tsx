// app/page.tsx
import { getExperiences } from "@/services/apiService";
import ExperienceCard from "@/components/ExperienceCard";
import { Experience } from "@/lib/types";
/**
 * This is a Server Component!
 * Next.js 13+ (App Router) makes components async by default.
 * This component will run on the SERVER, fetch data,
 * and send the fully-rendered HTML to the client.
 */
export default async function HomePage() {
  // 1. Fetch data on the server
  let experiences: Experience[] = [];
  let error = null;
  try {
    // This assumes you copied your 'services' folder over
    experiences = await getExperiences();
  } catch (err) {
    error = "Could not fetch experiences. Please try again later.";
  }

  return (
    <main className="container mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold text-brand-dark">
        Explore Experiences
      </h1>

      {/* 2. Handle the error state */}
      {error && (
        <div className="rounded-md border border-brand-danger bg-red-50 p-4 text-brand-danger">
          {error}
        </div>
      )}

      {/* 3. Handle the loading/empty state (if no error) */}
      {!error && experiences.length === 0 && (
        <p className="text-brand-secondary">No experiences found.</p>
      )}

      {/* 4. Render the grid of experiences */}
      {!error && experiences.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* This assumes you copied your 'components' folder over */}
          {experiences.map((exp) => (
            <ExperienceCard key={exp._id} experience={exp} />
          ))}
        </div>
      )}
    </main>
  );
}
