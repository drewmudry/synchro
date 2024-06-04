import Link from 'next/link';
import Header from './_components/header';

export default function Home() {
  return (
    <div className="bg-[#F5EBDE] min-h-screen">
      <Header />

      <main className="container mx-auto px-8 py-16">
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-[#661438] mb-4">Boards</h2>
          <p className="text-xl text-[#813D58] mb-8">
            Collaborative whiteboard app for seamless teamwork.
          </p>
          <Link href="/about-boards" className="bg-[#661438] text-[#F5EBDE] px-6 py-3 rounded-md">
            Learn More
          </Link>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-bold text-[#661438] mb-4">Tasks</h2>
          <p className="text-xl text-[#813D58] mb-8">
            Efficient task tracking app to boost productivity.
          </p>
          <Link href="/about-tasks" className="bg-[#661438] text-[#F5EBDE] px-6 py-3 rounded-md">
            Learn More
          </Link>
        </section>

        <section>
          <h2 className="text-4xl font-bold text-[#661438] mb-4">Notes</h2>
          <p className="text-xl text-[#813D58] mb-8">
            Powerful note-taking app to organize your thoughts.
          </p>
          <Link href="/about-notes" className="bg-[#661438] text-[#F5EBDE] px-6 py-3 rounded-md">
            Learn More
          </Link>
        </section>
      </main>
    </div>
  );
}