import Link from 'next/link';
import Image from 'next/image';

export const AuthenticatedHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <Link href="/">
        <button className="flex items-center">
          <Image
            src="/lotus-flower.svg"
            alt="Logo"
            width={32}
            height={32}
            className="mr-2"
          />
          <span className="font-helvetica text-lg text-[#661438]">Synchro</span>
        </button>
      </Link>
    </div>
  );
};