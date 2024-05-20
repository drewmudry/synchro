import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white py-6 text-center">
        <img src="path/to/your/lotus-labs-logo.png" alt="Lotus Labs" className="inline-block h-12" />
      </header>
      <section className="bg-purple-800 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-6">The handiest way to organize teamwork</h1>
        <p className="text-xl mb-8">Lotus Labs is all about the team. Set goals and prioritize them, assign people to tasks, and get things done in time.</p>
        <div className="flex justify-center space-x-4">
          <Link href="/board">
            <Button size="sm" variant="purple100" className="text-black">
              App 1
            </Button>
          </Link>
          <Link href="/notes">
            <Button size="sm" variant="purple100" className="text-black">
              App 2
            </Button>
          </Link>
          <Link href="/tasks">
            <Button size="sm" variant="purple100" className="text-black">
              App 3
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
