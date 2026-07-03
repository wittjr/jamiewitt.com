import postersData from './posters.json';

type Poster = { title: string; image: string };
const posters = postersData as Poster[];

export const metadata = {
  title: 'Jamie Witt - Stuff',
};

export default function Stuff() {
  return (
    <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-3xl mx-auto">

        <div className="space-y-8">

          <section className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold mb-8">Movie Posters</h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {posters.map((poster) => (
                <figure key={poster.image} className="flex flex-col">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={poster.image}
                    alt={poster.title}
                    loading="lazy"
                    className="w-full h-auto rounded-lg shadow-sm"
                  />
                  <figcaption className="mt-2 text-sm text-center text-gray-700 dark:text-gray-300">
                    {poster.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
