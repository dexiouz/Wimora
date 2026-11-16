import type { Braider, Service } from "@/data/braiders";
import { createContext, useContext, useState, type ReactNode } from "react";

export type Booking = {
  braider: Braider;
  service: Service;
  slot: string;
  customerName: string;
  phone: string;
};

type BookingContextValue = {
  booking: Booking | null;
  saveBooking: (booking: Booking) => void;
  clearBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<Booking | null>(null);
  return (
    <BookingContext.Provider
      value={{
        booking,
        saveBooking: setBooking,
        clearBooking: () => setBooking(null),
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context)
    throw new Error("useBooking must be used within BookingProvider");
  return context;
}
