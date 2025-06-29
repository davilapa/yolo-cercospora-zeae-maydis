import { UploadCloud } from "lucide-react";

export function ImageUploader({ 
  preview, 
  isDragging, 
  fileInputRef, 
  handleFileInputChange, 
  handleDragOver, 
  handleDragLeave, 
  handleDrop, 
  triggerFileInput 
}) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <input
        id="image"
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        ref={fileInputRef}
        className="hidden"
      />
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && triggerFileInput()}
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-10 cursor-pointer transition-all duration-300 ease-out relative overflow-hidden z-10 ${
          isDragging 
            ? 'border-blue-500 bg-blue-50 -translate-y-0.5 shadow-[0_10px_25px_-5px_rgba(59,130,246,0.1),0_8px_10px_-6px_rgba(59,130,246,0.1)]' 
            : 'border-blue-200 bg-slate-50 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)]'
        }`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          triggerFileInput();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleDragOver(e);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleDragLeave(e);
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleDrop(e);
        }}
      >
        {preview ? (
          <div className="relative w-full">
            <img
              src={preview}
              alt="Vista previa"
              className="max-h-64 mx-auto rounded-md"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <UploadCloud
              style={{
                width: "4rem",
                height: "4rem",
                color: isDragging ? "#3b82f6" : "#9ca3af",
                marginBottom: "0.75rem",
                animation: isDragging 
                  ? "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" 
                  : "none"
              }}
            />
            <span 
              style={{
                color: isDragging ? "#2563eb" : "#374151",
                fontWeight: 500,
                marginBottom: "0.25rem",
                fontSize: "1.125rem",
                lineHeight: "1.75rem",
              }}
            >
              {isDragging ? "Suelta la imagen aquí" : "Arrastra una imagen aquí"}
            </span>
            <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
              o haz clic para seleccionar un archivo
            </p>
            <p style={{ color: "#9ca3af", fontSize: "0.75rem", marginTop: "0.5rem" }}>
              Formatos soportados: JPG, PNG (máx. 5MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
