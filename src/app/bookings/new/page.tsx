import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { BookingForm } from '@/components/bookings/BookingForm';

export default function NewBookingPage() {
  return (
    <div className="flex flex-col space-y-4 max-w-4xl mx-auto pb-10">
      {/* Page Header */}
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
            <span className="text-slate-700">Pesan Ruangan</span>
          </p>
        </div>
      </div>

      <BookingForm />
    </div>
  );
}
