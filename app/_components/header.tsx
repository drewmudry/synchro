// app/_components/Header.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-4">
      <Link href="/">
        <button className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={936}
            height={204}
            className="w-auto h-auto"
          />
        </button>
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/dashboard" className="text-[#661438] hover:text-[#AE808B]">
              Sign In
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-[#661438] hover:text-[#AE808B]">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}