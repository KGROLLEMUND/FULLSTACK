'use client';
import { useEffect, useState } from "react";
import TitleMain from "@/components/UI/TitleMain";
import SubTitle from "@/components/UI/SubTitle";
import Link from "next/link";
import styles from "./index.module.scss";

const Hero = ({ subtitle, title, image, buttonLink, buttonText, onButtonClick }) => {
  const [heroHeight, setHeroHeight] = useState(0);

  const adjustSize = () => { 
    const windowHeight = window.innerHeight;
    const headerHeight = document.querySelector("header").offsetHeight;
    setHeroHeight(windowHeight - headerHeight);
  }

  useEffect(() => {
    adjustSize();
    window.addEventListener("resize", () => {
      adjustSize();
    });
  }, []);

  return (
    <div className={styles.wrapper} style={{ height: `${heroHeight}px`}}>
      <div className={styles.content}>
        <TitleMain title="Générer votre devis" color="white"/ >
        <SubTitle text="pour un événement en quelques clics" color="white" />
        <button className="btn btn__primary" onClick={onButtonClick}>
          {buttonText}
        </button>
      </div>
      <div className={styles.overlay}></div>
      <div className={styles.frame}>
        <img src={image} alt="Wonderfull app" />
      </div>
    </div>
  );
}

export default Hero;
