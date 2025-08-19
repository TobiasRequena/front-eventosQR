import { QrCode } from 'lucide-react';
import { useState } from 'react';
import './scanner.css';
import { QRScanner } from './componentes/QRScanner';
import { ParticipantInfo } from './componentes/ParticipantInfo';

export const Scanner = () => {
  const [scannedData, setScannedData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

const handleScanSuccess = (data) => {
  try {
    const parsedData = JSON.parse(data); // <-- parsea el JSON
    setScannedData(parsedData);
    setIsScanning(false);
  } catch (err) {
    console.error("Error al parsear QR:", err);
  }
};


  const handleNewScan = () => {
    setScannedData(null)
    setIsScanning(true)
  }

  return (
    <div className="scanner-page">
      <div className="title">
        <QrCode size={70} strokeWidth={2.25} />
        <h1>Verificación de Asistencia</h1>
        <p>Escanea el código QR para verificar la asistencia</p>
      </div>

      {!isScanning && !scannedData && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Comenzar Escaneo</h3>
          </div>
          <div className="card-content">
            <p className="card-text">
              Presiona el botón para iniciar el escaneo de códigos QR
            </p>
            <button
              className="card-button"
              onClick={() => setIsScanning(true)}
            >
              Iniciar Escaneo
            </button>
          </div>
        </div>
      )}

			{isScanning && (
        <QRScanner
          onScanSuccess={handleScanSuccess}
          onClose={() => setIsScanning(false)}
        />
      )}

      {scannedData &&
        <ParticipantInfo 
          data={scannedData} 
          onNewScan={handleNewScan} 
        />
      }
    </div>
  );
};
