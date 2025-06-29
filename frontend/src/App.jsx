import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useImageUpload } from "@/hooks/useImageUpload";
import { Header } from "./components/Header";
import { ImageUploader } from "./components/ImageUploader";
import { ActionButtons } from "./components/ActionButtons";
import { ResultDisplay } from "./components/ResultDisplay";
import { Footer } from "./components/Footer";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [useHealthyMock, setUseHealthyMock] = useState(false);
  const [result, setResult] = useState(null);

  const toggleMockType = () => {
    setUseHealthyMock(!useHealthyMock);
    setResult(null);
    if (selectedImage) {
      resetImage();
    }
  };
  
  const {
    selectedImage,
    preview,
    isDragging,
    fileInputRef,
    handleFileInputChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    triggerFileInput,
    resetImage
  } = useImageUpload();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) return;

    console.log('Iniciando análisis...');
    setIsLoading(true);

    // Simulamos un retraso de red de 1.5 segundos
    console.log('Simulando procesamiento...');
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // Mocks para pruebas
      const mockResponses = {
        healthy: {
          image_shape: [640, 640],
          inference_time_ms: {
            preprocess: 22.1,
            inference: 98.3,
            postprocess: 0.04
          },
          detections: [
            {
              name: 'healthy_leaf',
              class_id: 1,
              confidence: 0.97
            }
          ]
        },
        diseased: {
          image_shape: [640, 640],
          inference_time_ms: {
            preprocess: 25.4,
            inference: 115.8,
            postprocess: 0.05
          },
          detections: [
            {
              name: 'gray_leaf_spot',
              class_id: 0,
              confidence: 0.92
            }
          ]
        }
      };

      // Usamos el mock correspondiente según el estado
      const mockResponse = useHealthyMock ? mockResponses.healthy : mockResponses.diseased;

      // Simulamos una respuesta exitosa
      setResult(mockResponse);
      
    } catch (error) {
      console.error("Error:", error);
      // Mostrar un mensaje de error simulado
      setResult({
        status: 'error',
        message: 'Error al procesar la imagen. Por favor, intente de nuevo.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    resetImage();
    setResult(null);
  };

  const handleAnalyze = async () => {
    console.log('Iniciando análisis...');
    await handleSubmit({ preventDefault: () => {} });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-400 to-blue-700">
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <Header />

          <div className="w-full flex flex-col items-center justify-center bg-blue-900/80 backdrop-blur-sm shadow-xl border border-blue-800/50 rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-800/10 to-blue-600/10" />
            <div className="p-6">
              <div className="w-full max-w-2xl">
                <ImageUploader 
                  preview={preview}
                  isDragging={isDragging}
                  fileInputRef={fileInputRef}
                  handleFileInputChange={handleFileInputChange}
                  handleDragOver={handleDragOver}
                  handleDragLeave={handleDragLeave}
                  handleDrop={handleDrop}
                  triggerFileInput={triggerFileInput}
                />
              </div>
            </div>
          </div>
          
          <ActionButtons 
            selectedImage={selectedImage}
            isLoading={isLoading}
            onReset={resetImage}
            onAnalyze={handleSubmit}
            onToggleMockType={toggleMockType}
            useHealthyMock={useHealthyMock}
          />

          <ResultDisplay result={result} isLoading={isLoading} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
