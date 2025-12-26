export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Velkommen til Sjøhjelp</h1>
        <p className="text-lg text-foreground/80">
          Båtredning i Høyanger, Vestland - Se brukere på sjøen og få hjelp i nødsituasjoner
        </p>
      </div>
      
      {/* Map placeholder */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="aspect-video bg-secondary/20 rounded flex items-center justify-center border-2 border-primary/20">
          <div className="text-center">
            <p className="text-xl font-semibold text-foreground mb-2">📍 Kartvisning</p>
            <p className="text-sm text-foreground/60">Høyanger, Vestland, Norge</p>
            <p className="text-xs text-foreground/40 mt-2">Kart kommer snart</p>
          </div>
        </div>
      </div>
    </div>
  );
}
