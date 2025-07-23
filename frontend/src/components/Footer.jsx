import unirLogo from '../assets/UNIR_Logo.png';

export function Footer() {
  return (
    <footer className="py-6 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <p className="text-blue-100 text-sm mb-3">Proyecto de grado - Maestría en Inteligencia Artificial</p>
          <div className="bg-white p-3 rounded-lg shadow-inner">
            <img 
              src={unirLogo}
              alt="Universidad Internacional de La Rioja" 
              className="h-10 opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
          <p className="mt-3 text-blue-200 text-xs">
            © {new Date().getFullYear()} - Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
