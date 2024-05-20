import Image from "next/image";
import Link from "next/link";

export const AuthenticatedHeader = () => {
    return (
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
    )
}