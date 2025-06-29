import { AlertTriangle, CheckCircle2 } from "lucide-react";

// Mapeo de estados de las hojas a español
const LEAF_STATUS = {
  healthy_leaf: "Hoja Sana",
  gray_leaf_spot: "Mancha Gris",
  // Agregar más estados según sea necesario
};

// Función para formatear el tiempo de inferencia
const formatInferenceTime = (ms) => {
  return ms < 1 ? `${(ms * 1000).toFixed(2)} µs` : `${ms.toFixed(2)} ms`;
};

export function ResultDisplay({ result, isLoading }) {
  if (isLoading) {
    return (
      <div className="mt-8 p-6 bg-blue-900/30 backdrop-blur-sm rounded-xl border border-blue-200/20 animate-pulse">
        <div className="h-6 w-48 bg-blue-800/50 rounded mb-4"></div>
        <div className="space-y-4">
          <div className="h-4 bg-blue-800/30 rounded w-3/4"></div>
          <div className="h-4 bg-blue-800/30 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!result || !result.detections || result.detections.length === 0)
    return null;

  const detection = result.detections[0];
  const isHealthy = detection.name === "healthy_leaf";
  const confidence = (detection.confidence * 100).toFixed(2);

  return (
    <div className="relative mt-8 p-6 bg-blue-900/30 backdrop-blur-sm rounded-xl border border-blue-200/20">
      <div className={`absolute -top-3 -right-3 text-white p-2 rounded-full shadow-lg ${isHealthy ? 'bg-green-500/90' : 'bg-red-500/90 animate-pulse'}`}>
        {isHealthy ? (
          <CheckCircle2 className="h-6 w-6" />
        ) : (
          <AlertTriangle className="h-6 w-6" />
        )}
      </div>
      <h3 className="text-xl font-semibold text-blue-100 mb-6">
        Resultados del Análisis
        <span
          className={`ml-3 px-3 py-1 rounded-full text-sm font-medium ${
            isHealthy
              ? "bg-green-500/50 text-green-100"
              : "bg-red-500/70 text-white"
          }`}
        >
          {isHealthy ? "Sana" : "Enferma"}
        </span>
      </h3>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-blue-900/40 p-4 rounded-lg">
            <h4 className="font-medium text-blue-100 mb-3">
              Detalles de la detección
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-blue-200">Estado:</span>
                <span
                  className={`font-medium ${
                    isHealthy ? "text-green-300" : "text-yellow-300"
                  }`}
                >
                  {LEAF_STATUS[detection.name] || detection.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Confianza:</span>
                <span className="text-blue-100 font-medium">{confidence}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Tamaño de imagen:</span>
                <span className="text-blue-100 font-medium">
                  {result.image_shape?.[0]}x{result.image_shape?.[1]} px
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-900/40 p-4 rounded-lg">
            <h4 className="font-medium text-blue-100 mb-3">
              Tiempos de procesamiento
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-blue-200">Preprocesamiento:</span>
                <span className="text-blue-100">
                  {formatInferenceTime(result.inference_time_ms?.preprocess)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Inferencia:</span>
                <span className="text-blue-100">
                  {formatInferenceTime(result.inference_time_ms?.inference)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-200">Postprocesamiento:</span>
                <span className="text-blue-100">
                  {formatInferenceTime(result.inference_time_ms?.postprocess)}
                </span>
              </div>
              <div className="flex justify-between pt-2 mt-2 border-t border-blue-800/50">
                <span className="text-blue-200 font-medium">Total:</span>
                <span className="text-blue-100 font-medium">
                  {formatInferenceTime(
                    (result.inference_time_ms?.preprocess || 0) +
                      (result.inference_time_ms?.inference || 0) +
                      (result.inference_time_ms?.postprocess || 0)
                  )}
                </span>
              </div>
            </div>
          </div>
          {!isHealthy && (
            <div className="bg-blue-900/40 p-4 rounded-lg col-span-2">
              <h4 className="font-medium text-blue-100 mb-3">
                Recomendaciones
              </h4>
              <ul className="space-y-2">
                <ul className="list-disc list-inside space-y-1 text-yellow-100">
                  <li>
                    Monitorear el cultivo cada 3 días para detectar nuevos
                    síntomas
                  </li>
                  <li>
                    Considerar la aplicación de fungicidas si más del 10% de las
                    hojas están afectadas
                  </li>
                  <li>Eliminar y destruir las hojas gravemente afectadas</li>
                  <li>Mantener un buen drenaje en el área de cultivo</li>
                </ul>
              </ul>
            </div>
          )}
        </div>

        {result.message && (
          <div className="mt-4 p-4 bg-blue-800/30 rounded-lg border border-blue-700/50">
            <p className="text-blue-100 italic">
              <span className="font-medium">Nota:</span> {result.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
