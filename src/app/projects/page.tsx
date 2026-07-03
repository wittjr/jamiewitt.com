export const metadata = {
  title: 'Jamie Witt - Projects',
};

export default function Projects() {
  return (
    <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8">Projects</h1>
        
        <div className="space-y-12">
          <section className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-2">Game Used Hockey Memorabilia</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              Tracking my hockey stuff
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <a 
                href="https://heavyuse.us"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                View Live Project
              </a>
              <a 
                href="https://github.com/wittjr/gameworn" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                View Source Code
              </a>
            </div>
          </section>

          <section className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-2">Movie Tracker</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              A tool to track movies I&apos;m interested in seeing
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <a 
                href="https://tinyurl.com/the-marquee"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                View Live Project
              </a>
              <a 
                href="https://github.com/wittjr/the-marquee" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                View Source Code
              </a>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
} 