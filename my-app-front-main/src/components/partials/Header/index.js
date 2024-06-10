"use client";
import { useEffect, useState } from "react";
import Logo from "@/components/UI/Logo";
import styles from "./index.module.scss";

const Index = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsFixed(window.scrollY > 150);
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const handleLoginClick = () => {
    window.location.href = "/auth/login";
  };

  const handleProfileClick = () => {
    window.location.href = "/account/profile";
  };

  return (
    <>
      <header className={`${styles.header__main} ${isFixed ? styles.fixed : ""}`}>
        <div className={styles.header__center}>
          <Logo />
        </div>
        <div className={styles.header__right}>
          <button onClick={handleLoginClick} className={styles.loginButton}>
            Connexion
          </button>
          <button onClick={handleProfileClick} className={styles.profileButton}>
            Profil
          </button>
        </div>
      </header>
    </>
  );
};

export default Index;
