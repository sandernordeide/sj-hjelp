"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      router.push("/app");
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <p className="text-xl text-foreground">Omdirigerer...</p>
    </div>
  );
}