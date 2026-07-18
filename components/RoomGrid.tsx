import RoomCard from "./RoomCard";
import type { RoomMeta } from "@/lib/types";

export default function RoomGrid({ rooms }: { rooms: RoomMeta[] }) {
  if (rooms.length === 0) {
    return (
      <p className="text-sm text-ink-muted">
        Belum ada kamar. Tambahkan file markdown di folder{" "}
        <code>/data/rooms</code>.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room) => (
        <RoomCard key={room.slug} room={room} />
      ))}
    </div>
  );
}
