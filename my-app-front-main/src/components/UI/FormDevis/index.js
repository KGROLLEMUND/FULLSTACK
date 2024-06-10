"use client"; // Ajoutez cette ligne en haut du fichier
import { useState } from "react";
import jsPDF from "jspdf";
import styles from "./index.module.scss";

const FormDevis = ({ onClose }) => {
  const [formData, setFormData] = useState({
    eventType: "",
    service: "",
    guestCount: "",
    date: "",
  });
  const [showGuestCount, setShowGuestCount] = useState(false);
  const [missingFields, setMissingFields] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "service") {
      if (value.includes("traiteur")) {
        setShowGuestCount(true);
      } else {
        setShowGuestCount(false);
      }
    }
  };

  const calculateTotalAmount = () => {
    const prices = {
      traiteur: 50,
      dj: 200,
      decoration: 1000,
      locationSalle: 500,
      photographie: 300,
    };

    let montantTotal = formData.guestCount * prices.traiteur;

    if (prices[formData.service]) {
      montantTotal += prices[formData.service];
    }

    const eventDate = new Date(formData.date);
    const eventMonth = eventDate.getMonth();
    if (eventMonth >= 4 && eventMonth <= 9) {
      montantTotal *= 1.5;
    }

    return montantTotal;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const missing = [];

    // Vérifier les champs manquants
    if (!formData.eventType) missing.push("Type d'événement");
    if (!formData.service) missing.push("Service");
    if (!formData.date) missing.push("Date");
    if (showGuestCount && !formData.guestCount) missing.push("Nombre d'invités");

    // S'il y a des champs manquants, mettre à jour l'état et ne pas générer le PDF
    if (missing.length > 0) {
      setMissingFields(missing);
      return;
    }

    // Générer le PDF si tous les champs sont remplis
    const montantTotal = calculateTotalAmount();
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Devis pour ${formData.eventType}`, 10, 10);
    doc.setFontSize(12);
    doc.text(`Nombre d'invités: ${formData.guestCount}`, 10, 20);
    doc.text(`Date: ${formData.date}`, 10, 30);
    doc.text(`Service: ${formData.service}`, 10, 40);
    doc.text(`Montant total: ${montantTotal} €`, 10, 50);
    doc.setLineWidth(0.5);
    doc.line(10, 45, 200, 45);
    doc.save("devis.pdf");
    onClose();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Type d'événement:
        <input
          type="text"
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
        />
      </label>
      <label>
        Services:
        <select name="service" value={formData.service} onChange={handleChange}>
          <option value="">Choisir un service</option>
          <option value="traiteur">Traiteur</option>
          <option value="dj">DJ/Musique</option>
          <option value="decoration">Décoration</option>
          <option value="locationSalle">Location de salle</option>
          <option value="photographie">Photographie</option>
        </select>
      </label>
      {showGuestCount && (
        <label>
          Nombre d'invités:
          <input
            type="number"
            name="guestCount"
            value={formData.guestCount}
            onChange={handleChange}
          />
        </label>
      )}
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </label>
      {missingFields.length > 0 && (
        <div className={styles.error}>
          Champ(s) manquant(s): {missingFields.join(", ")}
        </div>
      )}
      <button type="submit">Générer votre devis en format PDF</button>
    </form>
  );
};

export default FormDevis;
