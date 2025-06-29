# Detección de Cercospora Zeae Maydis con YOLOv11

Proyecto de IA para la detección temprana de la enfermedad Cercospora Zeae Maydis en hojas de maíz utilizando el modelo YOLOv11.

## 📋 Descripción

Este proyecto implementa un sistema de detección de la enfermedad Cercospora Zeae Maydis, una de las enfermedades más comunes que afectan a los cultivos de maíz. Utiliza un modelo YOLOv11 entrenado para identificar y localizar la enfermedad en imágenes de hojas de maíz.

## 🏗️ Estructura del Proyecto

```
.
├── backend/           # API y lógica del servidor
│   ├── app/          # Código fuente de la aplicación
│   ├── models/       # Modelos de IA
│   └── requirements.txt  # Dependencias de Python
│
├── dataset/          # Conjunto de datos de entrenamiento y validación
│   ├── train/        # Imágenes de entrenamiento
│   ├── val/          # Imágenes de validación
│   └── README.md     # Documentación del dataset
│
├── frontend/         # Aplicación web React
│   ├── public/       # Archivos estáticos
│   ├── src/          # Código fuente de la aplicación
│   └── README.md     # Documentación del frontend
│
├── notebooks/        # Jupyter notebooks para análisis y experimentación
├── scripts/          # Scripts útiles para el proyecto
└── README.md         # Este archivo
```

## 🚀 Comenzando

### Requisitos Previos

- Python 3.8+
- Node.js 16+
- npm o yarn
- Git

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/yolo-cercospora-zeae-maydis.git
   cd yolo-cercospora-zeae-maydis
   ```

2. Configura el entorno de backend:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Configura el frontend:
   ```bash
   cd ../frontend
   npm install
   ```

## 🛠️ Uso

### Iniciar el backend

```bash
cd backend
uvicorn app.main:app --reload
```

### Iniciar el frontend

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📊 Dataset

El conjunto de datos se encuentra en la carpeta `dataset/` y contiene imágenes etiquetadas de hojas de maíz sanas y con síntomas de Cercospora Zeae Maydis.

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, lee nuestras [pautas de contribución](CONTRIBUTING.md) antes de enviar un pull request.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📧 Contacto

Para consultas o colaboraciones, por favor abre un issue en el repositorio.

---

Desarrollado con ❤️ para la agricultura de precisión
