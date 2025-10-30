import { Experience } from "@/lib/types";
import Image from "next/image"; // Import the Next.js Image component
import Link from "next/link"; // Import the Next.js Link component

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    // We wrap the entire card in a <Link> to make it clickable
    <Link
      href={`/experience/${experience._id}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      <div className="relative h-48 w-full overflow-hidden">
        {/*
          Using next/image for automatic optimization, resizing,
          and lazy loading. This is a huge performance win.
        */}
        <Image
          src={experience.imageUrl}
          alt={experience.title}
          fill // This replaces layout="fill"
          className="object-cover transition-transform duration-300 group-hover:scale-105" // This replaces objectFit="cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-brand-dark">
          {experience.title}
        </h3>
        <p className="mt-2 text-sm text-brand-secondary">
          From{" "}
          <span className="text-base font-bold text-brand-dark">
            ${experience.price}
          </span>
          <span className=""> / person</span>
        </p>
      </div>
    </Link>
  );
}
