"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import articlesService from "@/services/devis.api.js";
import styles from "./index.module.scss";

const Index = () => {

    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (search.length > 3) {
            articlesService.searchArticles(search)
                .then(res => {
                    setResults(res.results);
                })
                .catch(err => console.log(err))
        }
    }, [search]);

    return (
        <div className={styles.wrapper}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_4_10)">
                    <path d="M2.75 9.16667C2.75 10.0093 2.91597 10.8437 3.23844 11.6222C3.56091 12.4007 4.03356 13.1081 4.6294 13.7039C5.22524 14.2998 5.93261 14.7724 6.71111 15.0949C7.48962 15.4174 8.32402 15.5833 9.16667 15.5833C10.0093 15.5833 10.8437 15.4174 11.6222 15.0949C12.4007 14.7724 13.1081 14.2998 13.7039 13.7039C14.2998 13.1081 14.7724 12.4007 15.0949 11.6222C15.4174 10.8437 15.5833 10.0093 15.5833 9.16667C15.5833 8.32402 15.4174 7.48962 15.0949 6.71111C14.7724 5.93261 14.2998 5.22524 13.7039 4.6294C13.1081 4.03356 12.4007 3.56091 11.6222 3.23844C10.8437 2.91597 10.0093 2.75 9.16667 2.75C8.32402 2.75 7.48962 2.91597 6.71111 3.23844C5.93261 3.56091 5.22524 4.03356 4.6294 4.6294C4.03356 5.22524 3.56091 5.93261 3.23844 6.71111C2.91597 7.48962 2.75 8.32402 2.75 9.16667Z" stroke="#2C3E50" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17 17L14 14" stroke="#2C3E50" strokeWidth="1.75" strokeLinejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_4_10">
                        <rect width="22" height="22" fill="white" />
                    </clipPath>
                </defs>
            </svg>
            <input
                type="text"
                placeholder="Search"
                value={search}
                name="search"
                autoComplete="off"
                onChange={(e) => setSearch(e.target.value)}
            />
            {
                search.length > 3 && (
                    <div className={styles.results}>
                        {
                            results && results.length > 0 ? results.map((result) => {
                                return (
                                    <Link
                                        onClick={()=>setSearch('')}
                                        href={`/blog/${result.id}`} key={result.id}>
                                        <p>{result.title}</p>
                                    </Link>
                                )
                            }) : (
                                <p>No results</p>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}

export default Index;
