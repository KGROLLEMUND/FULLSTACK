'use client';
import { useState, useEffect } from "react";
import styles from "./index.module.scss";

const Index = ({images, width}) => {


    const [translateValue, setTranslateValue] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);

    const getPrevSlide = () => {
        if(currentSlide > 0) {
            setTranslateValue(translateValue + width);
            setCurrentSlide(currentSlide - 1);
        }
    }

    const getNextSlide = () => {
        if (images.length > currentSlide + 1) {
            setCurrentSlide(currentSlide + 1);
            setTranslateValue(translateValue - width);
        }
    }

    return (
        <div className={styles.wrapper}
            style={{width:`${width}px`}}
        >
            <button
                disabled={currentSlide == 0}
                className={`${styles.btn__nav} ${styles.btn__left}`} onClick={(() => { getPrevSlide() })}>
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 16.7881L13.5 20.7184C13.5 20.9352 13.4357 21.147 13.3152 21.3272C13.1948 21.5074 13.0236 21.6479 12.8234 21.7308C12.6232 21.8137 12.4028 21.8354 12.1902 21.7932C11.9777 21.7509 11.7824 21.6465 11.6291 21.4933L4.41077 14.275C4.20529 14.0694 4.08987 13.7907 4.08987 13.5001C4.08987 13.2095 4.20529 12.9307 4.41077 12.7252L11.6291 5.50684C11.7824 5.35361 11.9777 5.24926 12.1902 5.20699C12.4028 5.16472 12.6232 5.18642 12.8234 5.26936C13.0236 5.3523 13.1948 5.49274 13.3152 5.67293C13.4357 5.85313 13.5 6.06499 13.5 6.28172L13.5 10.212L16.7881 10.212L16.7881 16.7881L13.5 16.7881Z" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M23.3642 16.7883L23.3642 10.2122" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20.0761 16.7883L20.0761 10.2122" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <div className={styles.slider__wrapper}>
                <div className={styles.slider} style={{ transform: `translateX(${translateValue}px)` }}>
                    {
                        images.map((image, index) => {
                            return (
                                <div data-index={index} key={index} className={styles.slide} style={{width: `${width}px`}}>
                                    <img src={image} alt="image" />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <button
                disabled={currentSlide == images.length-1}
                className={`${styles.btn__nav} ${styles.btn__right}`} onClick={() => getNextSlide()}>
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_12_83)">
                        <path d="M13.5 10.2121V6.28182C13.5001 6.06508 13.5644 5.85322 13.6848 5.67303C13.8052 5.49283 13.9764 5.35239 14.1766 5.26945C14.3769 5.18652 14.5972 5.16481 14.8098 5.20708C15.0224 5.24935 15.2176 5.3537 15.3709 5.50693L22.5893 12.7253C22.7947 12.9308 22.9102 13.2095 22.9102 13.5002C22.9102 13.7908 22.7947 14.0695 22.5893 14.275L15.3709 21.4934C15.2176 21.6466 15.0224 21.751 14.8098 21.7933C14.5972 21.8355 14.3769 21.8138 14.1766 21.7309C13.9764 21.6479 13.8052 21.5075 13.6848 21.3273C13.5644 21.1471 13.5001 20.9353 13.5 20.7185V16.7882H10.212V10.2121H13.5Z" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3.63589 10.2119V16.788" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.92392 10.2119V16.788" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_12_83">
                            <rect width="26.3043" height="26.3043" fill="white" transform="translate(0.347839 0.3479)" />
                        </clipPath>
                    </defs>
                </svg>
            </button>
            <div className={styles.navigation__dots}>
                <ul className={styles.dots__list}>
                    {
                        images.map((dot, index) => (
                            <li
                                key={index}
                                onClick={
                                    () => {
                                        setCurrentSlide(index);
                                        setTranslateValue(index * -width)
                                    }
                                }
                                className={`${styles.dot__item} ${currentSlide == index && styles.active}`}>
                                <button
                                ></button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default Index;
