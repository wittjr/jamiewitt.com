export const metadata = {
  title: 'Jamie Witt - About Me',
};

export default function About() {
  return (
    <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8">About Me</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Background</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              I&apos;m a tech guy that likes building things, hockey and movies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Connect</h2>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/wittjamie/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/wittjr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                GitHub
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 