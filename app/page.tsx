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
        <Link href="/users">
          Try Lotus Labs for free
        </Link>
      </section>
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-10">Key Features</h2>
        <div className="flex justify-center space-x-8">
          <div className="w-1/3">
            <img src="path/to/feature-icon-1.png" alt="Feature 1" className="inline-block h-20 mb-6" />
            <h3 className="text-xl font-bold mb-4">Feature 1</h3>
            <p className="text-base">Description of feature 1 goes here.</p>
          </div>
          <div className="w-1/3">
            <img src="path/to/feature-icon-2.png" alt="Feature 2" className="inline-block h-20 mb-6" />
            <h3 className="text-xl font-bold mb-4">Feature 2</h3>
            <p className="text-base">Description of feature 2 goes here.</p>
          </div>
          <div className="w-1/3">
            <img src="path/to/feature-icon-3.png" alt="Feature 3" className="inline-block h-20 mb-6" />
            <h3 className="text-xl font-bold mb-4">Feature 3</h3>
            <p className="text-base">Description of feature 3 goes here.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
