export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © 2025 Sjøhjelp - Båtredning for Høyanger, Vestland
            </p>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="/emergency" className="hover:text-secondary transition-colors">
              Nødnummer: 112
            </a>
            <a href="/contact" className="hover:text-secondary transition-colors">
              Kontakt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
