import { Consumption } from './consumption';

export interface BookingConsumption {
  id: number;
  bookingId: number;
  consumptionId: number;
  createdAt: string;
  consumption: Consumption;
}

export interface Booking {
  id: number;
  unitId: number;
  meetingRoomId: number;
  meetingDate: string;
  startTime: string;
  endTime: string;
  participantCount: number;
  consumptionCost: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  unit: { id: number; name: string };
  meetingRoom: { id: number; name: string; capacity: number };
  bookingConsumptions: BookingConsumption[];
}

export interface CreateBookingPayload {
  unitId: number;
  meetingRoomId: number;
  meetingDate: string;
  startTime: string;
  endTime: string;
  participantCount: number;
  consumptionCost: number;
  consumptionIds: number[];
}

export type UpdateBookingPayload = Partial<CreateBookingPayload>;
