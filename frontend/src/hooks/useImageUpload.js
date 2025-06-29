import { useState, useCallback } from 'react';

export function useImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useState({ current: null })[0];

  const handleImageChange = useCallback((file) => {
    if (!file) return null;

    if (!file.type.match("image.*")) {
      alert("Por favor, selecciona un archivo de imagen válido");
      return null;
    }

    setSelectedImage(file);
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    
    return () => URL.revokeObjectURL(previewUrl);
  }, []);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    return handleImageChange(file);
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const relatedTarget = e.relatedTarget;
    const dropArea = fileInputRef.current?.parentElement;
    if (!dropArea?.contains(relatedTarget)) {
      setIsDragging(false);
    }
  }, [fileInputRef]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      return handleImageChange(files[0]);
    }
    return null;
  }, [handleImageChange]);

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, [fileInputRef]);

  const resetImage = useCallback(() => {
    setSelectedImage(null);
    setPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [fileInputRef]);

  return {
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
  };
}
