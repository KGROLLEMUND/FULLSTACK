"use client"
import { useEffect, useState } from "react";
import TitleMain from "@/components/UI/TitleMain";
import { getUser } from "@/lib/dal";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Récupérer les données de l'utilisateur
        const userData = await getUser();
        console.log("userData:", userData);

        // Mettre à jour l'état de l'utilisateur
        setUser(userData);
      } catch (error) {
        // Gérer les erreurs de récupération des données de l'utilisateur
        console.error("Erreur lors de la récupération des données de l'utilisateur:", error);
      }
    };

    // Appeler la fonction de récupération des données de l'utilisateur
    fetchUserData();
  }, []);

  return (
    <div>
      <TitleMain title="Profil" />
      {user ? (
        <>
          <p>FirstName: {user.firstName}</p>
          <p>LastName: {user.lastName}</p>
          <p>Mail: {user.mail}</p>
        </>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
}
