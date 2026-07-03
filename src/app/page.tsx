export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] items-center text-center">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
          In progress
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
           Generated with Cursor, Windsurf and Next.js (manual only when needed)
        </p>
      </main>
    </div>
  );
}
