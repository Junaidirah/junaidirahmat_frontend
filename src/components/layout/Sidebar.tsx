import Link from 'next/link';

export function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 z-40 w-16 h-screen pt-16 pb-4 bg-white border-r border-slate-200">
      <div className="flex flex-col items-center gap-2 w-full px-2 pt-20">
        <Link
          href="/"
          title="Dashboard"
          className="flex items-center justify-center w-10 h-10 rounded-lg text-[#2d7a9c] bg-[#e8f4f8] hover:bg-[#d1eaf2] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.47 3.841a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.061l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 101.061 1.06l8.69-8.689z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.432z" />
          </svg>
        </Link>

        <Link
          href="/profile"
          title="Profile"
          className="flex items-center justify-center w-10 h-10 rounded-lg text-slate-400 hover:text-[#2d7a9c] hover:bg-[#e8f4f8] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </aside>
  );
}
