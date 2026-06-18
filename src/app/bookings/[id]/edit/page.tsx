'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import { BookingForm } from '@/components/bookings/BookingForm';
import { bookingService } from '@/services/bookingService';
import type { BookingFormData } from '@/lib/validations/booking';
import { formatTime } from '@/lib/utils';

export default function EditBookingPage() {
  const params = useParams();
  const id = Number(params.id);

  const [initialData, setInitialData] = useState<BookingFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await bookingService.getById(id);
        const booking = res.data;

        setInitialData({
          unitId: String(booking.unitId),
          meetingRoomId: String(booking.meetingRoomId),
          meetingDate: booking.meetingDate.split('T')[0],
          startTime: formatTime(booking.startTime),
          endTime: formatTime(booking.endTime),
          participantCount: booking.participantCount,
          consumptionIds: booking.bookingConsumptions.map((bc) => bc.consumptionId),
          consumptionCost: String(Math.round(Number(booking.consumptionCost))),
        });
      } catch {
        toast.error('Gagal memuat data', { description: 'Data pemesanan tidak ditemukan.' });
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [id]);

  return (
    <div className="flex flex-col space-y-4 max-w-4xl mx-auto pb-10">
      <div className="flex items-start gap-3">
        <Link
          href="/"
          className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#2d7a9c] text-white hover:bg-[#24677f] transition-colors flex-shrink-0 mt-0.5"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Ruang Meeting</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            <Link href="/" className="hover:underline">Ruang Meeting</Link>
            {' '}›{' '}
            <span className="text-slate-700">Edit Pesanan</span>
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-xl p-10 text-center text-slate-400 text-sm shadow-sm border border-slate-200">
          Memuat data pemesanan...
        </div>
      ) : initialData ? (
        <BookingForm initialData={initialData} bookingId={id} />
      ) : (
        <div className="bg-white rounded-xl p-10 text-center text-red-400 text-sm shadow-sm border border-slate-200">
          Data pemesanan tidak ditemukan.
        </div>
      )}
    </div>
  );
}
