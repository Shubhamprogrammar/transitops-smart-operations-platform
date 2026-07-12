"use client";

import { CreateTripForm } from "@/modules/trips/components/create-trip-form";
import { LiveBoard } from "@/modules/trips/components/live-board";
import { TripLifecycle } from "@/modules/trips/components/trip-lifecycle";
import { useTrips } from "@/modules/trips/hooks/useTrips";

export default function TripsPage() {
  const { data: trips = [], isLoading } = useTrips();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div>
        <TripLifecycle />
        <CreateTripForm />
      </div>
      <LiveBoard trips={trips} isLoading={isLoading} />
    </div>
  );
}
