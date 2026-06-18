'use client';

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import CurrencyInput from 'react-currency-input-field';

import { bookingFormSchema, type BookingFormData } from '@/lib/validations/booking';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { unitService } from '@/services/unitService';
import { meetingRoomService } from '@/services/meetingRoomService';
import { consumptionService } from '@/services/consumptionService';
import { bookingService } from '@/services/bookingService';
import type { Unit } from '@/types/unit';
import type { MeetingRoom } from '@/types/meetingRoom';
import type { Consumption } from '@/types/consumption';

const TIME_OPTIONS = [
  '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00',
].map((t) => ({ value: t, label: t }));

export interface BookingFormProps {
  initialData?: BookingFormData;
  bookingId?: number;
}

export function BookingForm({ initialData, bookingId }: BookingFormProps) {
  const router = useRouter();
  const isEditMode = !!initialData && !!bookingId;

  const [units, setUnits] = useState<Unit[]>([]);
  const [rooms, setRooms] = useState<MeetingRoom[]>([]);
  const [consumptions, setConsumptions] = useState<Consumption[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: initialData ?? {
      unitId: '',
      meetingRoomId: '',
      meetingDate: '',
      startTime: '',
      endTime: '',
      participantCount: 0,
      consumptionIds: [],
      consumptionCost: '0',
    },
  });

  const selectedRoomId = watch('meetingRoomId');
  const consumptionIds = watch('consumptionIds');
  const selectedRoom = rooms.find((r) => String(r.id) === selectedRoomId);

  useEffect(() => {
    const load = async () => {
      try {
        const [unitsRes, roomsRes, consumptionsRes] = await Promise.all([
          unitService.getAll({ limit: 100 }),
          meetingRoomService.getAll({ limit: 100, isActive: true }),
          consumptionService.getAll(),
        ]);
        setUnits(unitsRes.data ?? []);
        setRooms(roomsRes.data ?? []);
        setConsumptions(consumptionsRes.data ?? []);
      } catch {
        toast.error('Gagal memuat data', { description: 'Tidak dapat mengambil data dari server.' });
      } finally {
        setIsLoadingOptions(false);
      }
    };
    load();
  }, []);

  const handleConsumptionChange = (id: number, checked: boolean) => {
    const current = consumptionIds ?? [];
    setValue(
      'consumptionIds',
      checked ? [...current, id] : current.filter((cId) => cId !== id),
      { shouldDirty: true }
    );
  };

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        unitId: Number(data.unitId),
        meetingRoomId: Number(data.meetingRoomId),
        meetingDate: data.meetingDate,
        startTime: data.startTime,
        endTime: data.endTime,
        participantCount: data.participantCount,
        consumptionIds: data.consumptionIds ?? [],
        consumptionCost: Number(data.consumptionCost?.replace(/\D/g, '') ?? 0),
      };

      if (isEditMode) {
        await bookingService.update(bookingId, payload);
        toast.success('Update Berhasil', {
          description: `Data pemesanan untuk tanggal ${data.meetingDate} berhasil diperbarui.`,
        });
      } else {
        await bookingService.create(payload);
        toast.success('Pemesanan Berhasil', {
          description: `Ruangan berhasil dipesan untuk tanggal ${data.meetingDate}.`,
        });
        reset();
      }

      router.push('/');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        'Terjadi kesalahan pada sistem.';
      toast.error(isEditMode ? 'Gagal memperbarui' : 'Gagal memesan ruangan', {
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const unitOptions = units.map((u) => ({ value: String(u.id), label: u.name }));
  const roomOptions = rooms.map((r) => ({ value: String(r.id), label: `${r.name} (${r.capacity} orang)` }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* SECTION: Informasi Ruang Meeting */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-base font-semibold mb-6 text-slate-800">Informasi Ruang Meeting</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Unit"
            placeholder={isLoadingOptions ? 'Memuat...' : 'Pilih Unit'}
            options={unitOptions}
            error={errors.unitId?.message}
            disabled={isLoadingOptions}
            {...register('unitId')}
          />
          <Select
            label="Pilihan Ruangan Meeting"
            placeholder={isLoadingOptions ? 'Memuat...' : 'Pilih Ruangan Meeting'}
            options={roomOptions}
            error={errors.meetingRoomId?.message}
            disabled={isLoadingOptions}
            {...register('meetingRoomId')}
          />
        </div>

        <div className="mt-6 md:w-1/2">
          <label className="text-sm font-medium text-slate-700 block mb-1.5">Kapasitas Ruangan</label>
          <input
            readOnly
            value={selectedRoom ? `${selectedRoom.capacity} Orang` : ''}
            placeholder="Kapasitas Ruangan"
            className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-500 cursor-not-allowed"
          />
        </div>
      </div>

      {/* SECTION: Informasi Rapat */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-base font-semibold mb-6 text-slate-800">Informasi Rapat</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Input
            type="date"
            label="Tanggal Rapat"
            error={errors.meetingDate?.message}
            {...register('meetingDate')}
          />
          <Select
            label="Waktu Mulai"
            placeholder="Pilih Waktu Mulai"
            options={TIME_OPTIONS}
            error={errors.startTime?.message}
            {...register('startTime')}
          />
          <Select
            label="Waktu Selesai"
            placeholder="Pilih Waktu Selesai"
            options={TIME_OPTIONS}
            error={errors.endTime?.message}
            {...register('endTime')}
          />
        </div>

        <div className="md:w-1/3 mb-6">
          <Input
            type="number"
            label="Jumlah Peserta"
            min={1}
            placeholder="Masukan Jumlah Peserta"
            error={errors.participantCount?.message}
            {...register('participantCount', { valueAsNumber: true })}
          />
        </div>

        {/* Jenis Konsumsi */}
        <div className="mb-6">
          <label className="text-sm font-medium text-slate-700 block mb-3">Jenis Konsumsi</label>
          <div className="flex flex-col gap-2">
            {isLoadingOptions ? (
              <p className="text-sm text-slate-400">Memuat...</p>
            ) : (
              consumptions.map((c) => (
                <Checkbox
                  key={c.id}
                  id={`consumption-${c.id}`}
                  label={c.name}
                  checked={(consumptionIds ?? []).includes(c.id)}
                  onChange={(e) => handleConsumptionChange(c.id, e.target.checked)}
                />
              ))
            )}
          </div>
        </div>

        {/* Nominal Konsumsi */}
        <div className="md:w-1/2">
          <label className="text-sm font-medium text-slate-700 block mb-1.5">Nominal Konsumsi</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-slate-300 bg-[#2d7a9c] text-white text-sm font-medium">
              Rp
            </span>
            <Controller
              name="consumptionCost"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CurrencyInput
                  id="consumptionCost"
                  className={`flex-1 h-10 rounded-r-md border border-slate-300 bg-white py-2 px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2d7a9c] transition-colors ${
                    errors.consumptionCost ? 'border-red-500 focus:ring-red-500' : ''
                  }`}
                  placeholder="0"
                  allowDecimals={false}
                  groupSeparator="."
                  decimalSeparator=","
                  onValueChange={(val) => onChange(val ?? '0')}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                />
              )}
            />
          </div>
          {errors.consumptionCost && (
            <p className="text-sm font-medium text-red-500 mt-1">{errors.consumptionCost.message}</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="danger"
          onClick={() => router.push('/')}
          disabled={isSubmitting}
        >
          Batal
        </Button>
        <Button type="submit" isLoading={isSubmitting} disabled={isEditMode && !isDirty}>
          {isEditMode ? 'Perbarui Pemesanan' : 'Simpan'}
        </Button>
      </div>
    </form>
  );
}
