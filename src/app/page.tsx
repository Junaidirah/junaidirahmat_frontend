'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Edit2, Trash2, ChevronLeft } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { bookingService } from '@/services/bookingService';
import { formatTime, formatDate, formatCurrency } from '@/lib/utils';
import type { Booking } from '@/types/booking';
import type { PaginationMeta } from '@/types/api';

const LIMIT = 10;

export default function Home() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBookings = useCallback(async (currentPage: number) => {
    setIsLoading(true);
    try {
      const res = await bookingService.getAll({ page: currentPage, limit: LIMIT });
      setBookings(res.data ?? []);
      setMeta(res.meta ?? null);
    } catch {
      toast.error('Gagal memuat data', { description: 'Tidak dapat mengambil daftar pemesanan.' });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings(page);
  }, [page, fetchBookings]);

  const handleDeleteClick = (id: number) => {
    setBookingToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!bookingToDelete) return;
    setIsDeleting(true);
    try {
      await bookingService.delete(bookingToDelete);
      toast.success('Berhasil Dihapus', { description: 'Data pemesanan ruangan telah dihapus.' });
      fetchBookings(page);
    } catch {
      toast.error('Gagal menghapus', { description: 'Terjadi kesalahan sistem.' });
    } finally {
      setIsDeleting(false);
      setDeleteModalOpen(false);
      setBookingToDelete(null);
    }
  };

  const totalPages = meta?.totalPages ?? 1;
  const pageNumbers = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1);

  return (
    <div className="flex flex-col space-y-4">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          <button className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#2d7a9c] text-white hover:bg-[#24677f] transition-colors flex-shrink-0 mt-0.5">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Ruang Meeting</h1>
            <p className="text-sm text-slate-500 mt-0.5">Ruang Meeting</p>
          </div>
        </div>
        <Link href="/bookings/new">
          <Button>
            <span className="mr-1 text-base leading-none">+</span> Pesan Ruangan
          </Button>
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr className="bg-white">
                {['Unit', 'Ruang Meeting', 'Kapasitas', 'Tanggal Rapat', 'Waktu', 'Jumlah Peserta', 'Jenis Konsumsi', 'Nominal', 'Aksi'].map(
                  (h) => (
                    <th
                      key={h}
                      className={`px-5 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider ${h === 'Aksi' ? 'text-right' : 'text-left'}`}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={9} className="px-5 py-10 text-center text-slate-400 text-sm">
                    Memuat data...
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-10 text-center text-slate-400 text-sm">
                    Tidak ada data pemesanan.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 text-sm font-semibold text-slate-800 uppercase">
                      {booking.unit.name}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">{booking.meetingRoom.name}</td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {booking.meetingRoom.capacity} Orang
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {formatDate(booking.meetingDate)}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {formatTime(booking.startTime)} s/d {formatTime(booking.endTime)}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {booking.participantCount} Orang
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {booking.bookingConsumptions.map((bc) => bc.consumption.name).join(', ') || '-'}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {Number(booking.consumptionCost) > 0
                        ? `Rp ${formatCurrency(booking.consumptionCost)}`
                        : '-'}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/bookings/${booking.id}/edit`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-[#2d7a9c] hover:text-[#24677f] px-2"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(booking.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            {meta ? (
              <>
                Showing{' '}
                <span className="font-semibold">
                  {(page - 1) * LIMIT + 1}–{Math.min(page * LIMIT, meta.total)}
                </span>{' '}
                of <span className="font-semibold">{meta.total}</span>
              </>
            ) : (
              ' '
            )}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-md transition-colors flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Back
            </button>
            {pageNumbers.map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 text-sm rounded-md transition-colors ${
                  p === page
                    ? 'bg-[#2d7a9c] text-white font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-md transition-colors flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next <ChevronLeft className="w-3.5 h-3.5 rotate-180" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Konfirmasi Hapus">
        <div className="space-y-4">
          <p className="text-slate-600 text-sm">
            Apakah Anda yakin ingin menghapus data pemesanan ini? Tindakan ini tidak dapat dibatalkan.
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteModalOpen(false)}
              disabled={isDeleting}
            >
              Batal
            </Button>
            <Button variant="danger" onClick={confirmDelete} isLoading={isDeleting}>
              Ya, Hapus
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
