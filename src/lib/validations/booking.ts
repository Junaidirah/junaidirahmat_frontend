import { z } from 'zod';

export const bookingFormSchema = z
  .object({
    unitId: z.string().min(1, 'Unit harus dipilih'),
    meetingRoomId: z.string().min(1, 'Ruang meeting harus dipilih'),
    meetingDate: z.string().min(1, 'Tanggal harus diisi'),
    startTime: z.string().min(1, 'Waktu mulai harus diisi'),
    endTime: z.string().min(1, 'Waktu selesai harus diisi'),
    participantCount: z.number().min(1, 'Jumlah peserta minimal 1'),
    consumptionIds: z.array(z.number()),
    consumptionCost: z.string(),
  })
  .refine(
    (data) => !data.startTime || !data.endTime || data.startTime < data.endTime,
    { message: 'Waktu selesai harus lebih besar dari waktu mulai', path: ['endTime'] }
  );

export type BookingFormData = z.infer<typeof bookingFormSchema>;
