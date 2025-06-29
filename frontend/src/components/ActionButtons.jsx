import { Button } from "@/components/ui/button";

export function ActionButtons({ 
  selectedImage, 
  isLoading, 
  onReset,
  onAnalyze,
  onToggleMockType,
  useHealthyMock
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          type="button"
          onClick={onAnalyze}
          disabled={!selectedImage || isLoading}
          className={`flex-1 transition-all duration-200 ${
            !selectedImage
              ? "bg-emerald-600/50 text-gray-100 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:cursor-pointer active:translate-y-0 active:shadow-md"
          } ${isLoading ? "opacity-90" : ""}`}
        >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Analizando...
          </>
        ) : (
          "Analizar Imagen"
        )}
      </Button>
     

        {/* {selectedImage && (
          <Button
            type="button"
            onClick={onToggleMockType}
            variant="outline"
            className="flex-1 bg-blue-900/30 hover:bg-blue-800/50 text-blue-100 border-blue-700/50 hover:border-blue-600/70"
          >
            {useHealthyMock ? "Usar hoja enferma" : "Usar hoja sana"}
          </Button>
        )} */}
      </div>

      {selectedImage && (
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          disabled={isLoading}
          className="w-full sm:w-auto hover:cursor-pointer hover:-translate-y-0.5 bg-rose-500 hover:bg-rose-600 text-white "
        >
          Limpiar
        </Button>
      )}
    </div>
  );
}
