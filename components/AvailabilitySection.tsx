"use client";

import { useState } from "react";
import AvailabilityCalendar from "./AvailabilityCalendar";
import AvailabilityForm from "./AvailabilityForm";

interface AvailabilitySectionProps {
  waNumber: string;
  roomTitle: string;
  unavailableDates: string[];
}

export default function AvailabilitySection({
  waNumber,
  roomTitle,
  unavailableDates,
}: AvailabilitySectionProps) {
  const [checkIn, setCheckIn] = useState("");

  return (
    <div className="space-y-4">
      <AvailabilityCalendar
        unavailableDates={unavailableDates}
        selectedDate={checkIn || undefined}
        onSelectDate={(date) => setCheckIn(date)}
      />
      <AvailabilityForm
        waNumber={waNumber}
        roomTitle={roomTitle}
        checkIn={checkIn}
        onCheckInChange={setCheckIn}
      />
    </div>
  );
}
