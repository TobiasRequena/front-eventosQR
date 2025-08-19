import { useState } from "react";
import { User, Mail, Phone, Calendar, Briefcase, CheckCircle, RotateCcw, Loader2 } from "lucide-react";

export const ParticipantInfo = ({ data, onNewScan }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleAttendance = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch("https://asistencia-aeox.onrender.com/asistencia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          participanteId: data.participanteId,
          eventoId: data.evento.id,
          estado: "asistio",
        }),
      });

      if (!response.ok) throw new Error("Error al registrar asistencia");

      setIsSubmitted(true);
      console.log("Asistencia registrada:", data);
    } catch {
      setError("Error al registrar la asistencia. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="card submitted">
        <div className="card-content text-center">
          <div className="icon-circle">
            <CheckCircle size={32} className="text-primary" />
          </div>
          <h3>¡Asistencia Registrada!</h3>
          <p>{data.nombre} ha sido marcado como presente</p>
          <button className="card-button" onClick={onNewScan}>
            <RotateCcw size={16} className="mr-2" />
            Escanear Otro QR
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="participant-info">
      <div className="card">
        <div className="card-header">
          <User size={20} className="text-primary mr-2" />
          Información del Participante
        </div>
        <div className="card-content">
          <div className="personal-info">
            <h3>{data.nombre}</h3>
            <div className="info-line">
              <Mail size={16} className="mr-1" /> {data.email}
            </div>
            <div className="info-line">
              <Phone size={16} className="mr-1" /> {data.telefono}
            </div>
          </div>

          <div className="section">
            <div className="section-header">
              <Calendar size={16} className="text-primary mr-1" /> Evento
            </div>
            <div className="section-content">{data?.evento?.nombre}</div>
          </div>

          <div className="section">
            <div className="section-header">
              <Briefcase size={16} className="text-primary mr-1" /> Taller
            </div>
            <div className="section-content">
              <strong>{data?.taller?.nombre}</strong>
              <p className="text-muted">{data.taller?.descripcion}</p>
            </div>
          </div>

          <div className="badge-container">
            <span className="badge">{isSubmitted ? "Confirmado" : "Pendiente de Confirmación"}</span>
          </div>
        </div>
      </div>

      {error && <div className="alert">{error}</div>}

      <div className="action-buttons">
        <button className="card-button outline" onClick={onNewScan}>
          <RotateCcw size={16} className="mr-2" />
          Nuevo Escaneo
        </button>
        <button className="card-button" onClick={handleAttendance} disabled={isSubmitting}>
          {isSubmitting ? <Loader2 size={16} className="mr-2 animate-spin" /> : <CheckCircle size={16} className="mr-2" />}
          {isSubmitting ? "Registrando..." : "Asistió"}
        </button>
      </div>
    </div>
  );
};
