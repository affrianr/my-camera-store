"use client";
import { useSearchParams } from "next/navigation";

export default function ErrorHandler() {
  const searchParams = useSearchParams();

  const error = searchParams.get("error");

  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  return (
    <>{error && <h1 className="animate-pulse text-red-500">{error}</h1>}</>
  );
}
