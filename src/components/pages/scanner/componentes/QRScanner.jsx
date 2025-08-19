import { useState, useRef, useEffect } from "react";
import { Camera, Upload, X } from "lucide-react";
import './qrscanner.css';
import jsQR from "jsqr";

export const QRScanner = ({ onScanSuccess, onClose }) => {
  const [isUsingCamera, setIsUsingCamera] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState(null);

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let stream;
    if (isUsingCamera) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((s) => {
          stream = s;
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch((err) => {
          console.error("Error al acceder a la cámara:", err);
          setError("No se pudo acceder a la cámara. Permisos denegados o dispositivo no disponible.");
        });
    }

    // Cleanup: detener la cámara al salir
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isUsingCamera]);

	const readQRFromCanvas = (canvas) => {
		const ctx = canvas.getContext("2d");
		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

		const code = jsQR(imageData.data, imageData.width, imageData.height);

		if (code) {
			console.log("QR leído:", code.data);
			setData(code.data);
			return code.data;
		} else {
			console.log("No se detectó ningún QR");
			return null;
		}
	};

	const captureImage = () => {
		if (!videoRef.current) return;
		const video = videoRef.current;
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

		const result = readQRFromCanvas(canvas);
		console.log("QR capturado (video):", result); // ✅ log del QR

		if (result) {
			onScanSuccess(result);
		} else {
			alert("No se detectó ningún QR. Intenta otra vez.");
		}
	};

	const handleFileUpload = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (ev) => {
			const img = new Image();
			img.onload = () => {
				const canvas = canvasRef.current;
				const ctx = canvas.getContext("2d");
				canvas.width = img.width;
				canvas.height = img.height;
				ctx.drawImage(img, 0, 0);

				const result = readQRFromCanvas(canvas);
				console.log("QR capturado (imagen):", result); // ✅ log del QR

				if (result) {
					onScanSuccess(result); // llamalo solo si hay QR
				} else {
					alert("No se detectó ningún QR en la imagen");
				}
			};
			img.src = ev.target.result;
		};
		reader.readAsDataURL(file);
	};

  return (
    <div className="card w-full">
      {/* Header */}
      <div className="card-header flex-row">
        <h3 className="card-title">Escanear Código QR</h3>
        <button className="card-close" onClick={onClose}>
          <X />
        </button>
      </div>

      {/* Content */}
      <div className="card-content">
        {/* Selector de método */}
        <div className="method-selector">
          <button
            className={`method-button ${isUsingCamera ? "default" : "outline"}`}
            onClick={() => setIsUsingCamera(true)}
          >
            <Camera size={16} /> Cámara
          </button>
          <button
            className={`method-button ${!isUsingCamera ? "default" : "outline"}`}
            onClick={() => setIsUsingCamera(false)}
          >
            <Upload size={16} /> Subir Imagen
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="alert">
            ⚠️ <span>{error}</span>
          </div>
        )}

        {/* Cámara */}
        {isUsingCamera ? (
          <div className="camera-section">
            <div className="camera-box">
              <video ref={videoRef} autoPlay playsInline muted className="video" />
              <div className="camera-overlay">
                <div className="corner top-left"></div>
                <div className="corner top-right"></div>
                <div className="corner bottom-left"></div>
                <div className="corner bottom-right"></div>
              </div>
            </div>
            <button className="capture-button" onClick={captureImage} disabled={isLoading}>
              {isLoading ? "Procesando..." : "Capturar QR"}
            </button>
          </div>
        ) : (
          <div className="upload-section">
            <div
              className="upload-box"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={32} />
              <p>Haz clic para seleccionar una imagen</p>
              <p className="small-text">PNG, JPG hasta 10MB</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};
