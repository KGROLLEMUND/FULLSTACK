"use client"; // Ajoutez cette ligne en haut du fichier

import { useState } from "react";
import Hero from "@/components/UI/Hero";
import Modal from "@/components/UI/Modal";
import FormDevis from "@/components/UI/FormDevis";
import BackgroundHero from "../../public/background_hero.jpg";


export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Hero
        image={BackgroundHero.src}
        buttonLink="/"
        buttonText="Générer votre Devis"
        onButtonClick={handleOpenModal}
      />
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <FormDevis onClose={handleCloseModal} />
        </Modal>
      )}
    </>
  );
}
