"use client";

import { useState } from "react";
import { CreateTripForm } from "@/modules/trips/components/create-trip-form";
import { LiveBoard } from "@/modules/trips/components/live-board";
import { TripLifecycle } from "@/modules/trips/components/trip-lifecycle";
import { useTrips } from "@/modules/trips/hooks/useTrips";

export default function TripsPage() {
  const { data: trips = [], isLoading } = useTrips();
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);

  const selectedTrip = trips.find((t) => t.id === selectedTripId);

  // Parse numeric ID from string like "TR001" → 1
  const tripNumericId = selectedTrip
    ? Number(selectedTrip.id.replace(/^TR/, ""))
    : undefined;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div>
        <TripLifecycle
          selectedTripId={selectedTripId}
          currentStatus={selectedTrip?.status}
          tripNumericId={tripNumericId}
        />
        <CreateTripForm />
      </div>
      <LiveBoard
        trips={trips}
        isLoading={isLoading}
        selectedTripId={selectedTripId}
        onSelectTrip={setSelectedTripId}
      />
    </div>
  );
}
