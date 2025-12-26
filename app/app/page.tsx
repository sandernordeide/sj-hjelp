"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MapWrapper from "@/components/MapWrapper";

interface UserData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  boatName?: string;
  boatType?: string;
}

export default function AppPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [centerTrigger, setCenterTrigger] = useState(0);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    // Get user data
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Use default Høyanger location if geolocation fails
          setLocation({
            lat: 61.212322,
            lng: 6.076083,
          });
          setLoading(false);
        }
      );
    } else {
      // Use default location if geolocation not supported
      setLocation({
        lat: 61.212322,
        lng: 6.076083,
      });
      setLoading(false);
    }
  }, [router]);

  if (loading || !user || !location) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl text-foreground">Laster...</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          God tur, {user.firstName}
        </h1>
        <p className="text-lg text-foreground/80 mb-2">
          Vi er med deg på båtturen, og følger din posisjon
        </p>
        <p className="text-foreground/70">
          <strong>Din lokasjon er:</strong>{" "}
          <button
            onClick={() => setCenterTrigger(prev => prev + 1)}
            className="text-primary hover:text-primary-hover underline font-semibold"
          >
            {location.lat.toFixed(3)}, {location.lng.toFixed(3)}
          </button>
        </p>
      </div>

      {/* Map */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <MapWrapper centerTrigger={centerTrigger} />
      </div>
    </div>
  );
}
