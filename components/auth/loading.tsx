import Image from "next/image";

export const Loading = () => {
    return (
        <div className="h-full w-full flex flex-col gap-y-4
        justify-center items-center">
            <Image src="/lotus-flower.svg"
            alt="Lotus"
            width={120}
            height={120}
            className="animate-pulse duration-500"/>
        </div>
    )
}