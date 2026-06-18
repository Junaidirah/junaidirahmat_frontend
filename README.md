# FTL iMeeting - Meeting Room Booking Frontend

This is a Next.js (App Router) project built with React, Tailwind CSS v4, and TypeScript. It serves as the frontend for the FTL iMeeting system.

## Technologies Used
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Forms & Validation**: React Hook Form, Zod
- **API Requests**: Axios
- **Icons**: Lucide React
- **Notifications**: Sonner

## Development Run Guide

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup Environment Variables**
   Copy the example environment file and adjust if necessary.
   ```bash
   cp .env.example .env.local
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).

## Environment Guide

Create a `.env.local` file at the root of the project with the following variables:
- `NEXT_PUBLIC_API_URL`: The base URL for the backend API. Default is `http://localhost:8000/api/v1`.

> **Catatan:** Backend berjalan di port **8000**. Pastikan backend sudah running sebelum menjalankan frontend.