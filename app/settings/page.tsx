"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  boatName?: string;
  boatType?: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<UserData>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    boatName: "",
    boatType: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setFormData(userData);
    }
    setLoading(false);
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Update user data in localStorage
    localStorage.setItem("user", JSON.stringify(formData));
    setUser(formData);
    
    setSaving(false);
    // Redirect to app page after saving
    router.push("/app");
  };

  if (loading) {
    return (
      <div className="px-4 py-16 text-center">
        <p className="text-xl text-foreground">Laster...</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Mine innstillinger</h1>
        <p className="text-foreground/70">Administrer din profil og båtinformasjon</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Personlig informasjon</h2>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                  Fornavn
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                  Etternavn
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Telefonnummer
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  E-post
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Boat Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Båtinformasjon</h2>
            
            <div>
              <label htmlFor="boatName" className="block text-sm font-medium text-foreground mb-2">
                Båtnavn
              </label>
              <input
                type="text"
                id="boatName"
                name="boatName"
                value={formData.boatName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="boatType" className="block text-sm font-medium text-foreground mb-2">
                Båttype
              </label>
              <select
                id="boatType"
                name="boatType"
                value={formData.boatType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Velg båttype</option>
                <option value="sailboat">Seilbåt</option>
                <option value="motorboat">Motorbåt</option>
                <option value="rib">RIB</option>
                <option value="kayak">Kajakk</option>
                <option value="other">Annet</option>
              </select>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Lagrer..." : "Lagre endringer"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/app")}
              className="px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg transition-colors"
            >
              Avbryt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
