export const metadata = {
  title: 'Jamie Witt - Other',
};

export default function Other() {
  return (
    <div className="min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8">Other</h1>

        <div className="flex flex-wrap gap-4">
          <a
            href="https://airtable.com/appLOnv4jbzJ8doEm/pag2zNBeOVMjIDvPl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Airtable
          </a>
        </div>
      </main>
    </div>
  );
}
