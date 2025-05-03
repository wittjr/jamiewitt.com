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
            <iframe 
              className="airtable-embed" 
              src="https://airtable.com/embed/appfOwJhH4dGNsIPq/shr6u0Rb5EPZNgv9u" 
              frameBorder="0" 
              width="100%" 
              height="533" 
              style={{ background: "transparent", border: "0px solid #ccc" }}
            ></iframe>
          </section>
          
        </div>
      </main>
    </div>
  );
} 