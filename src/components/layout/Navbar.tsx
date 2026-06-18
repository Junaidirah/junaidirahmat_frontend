import Link from 'next/link';
import Image from 'next/image';

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-gradient-to-r from-[#1c4f62] to-[#0c2d3e] shadow-md relative">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />
      <div className="relative pl-[6.5rem] pr-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/navbar.png"
              alt="FTL"
              width={80}
              height={28}
              className="object-contain h-7 w-auto"
              priority
            />
            <span className="text-white text-lg font-light tracking-wide">iMeeting</span>
          </Link>

          {/* Right side: bell + user */}
          <div className="flex items-center gap-4">
            {/* Bell */}
            <button className="text-white/80 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            {/* User */}
            <button className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity mr-[6.5rem]">
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/30 flex-shrink-0">
                <Image
                  src="/profile.png"
                  alt="John Doe"
                  width={36}
                  height={36}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-sm font-medium hidden sm:block">John Doe</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
      </div>
    </nav>
  );
}
