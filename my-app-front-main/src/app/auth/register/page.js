"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TitleMain from "@/components/UI/TitleMain";
import styles from "./index.module.scss";

const Page = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    mail: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleRedirectToLogin = () => {
    router.push("/auth/login");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data?.success) {
        router.push("/account/profil");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <TitleMain title="Register" color="primary" />
      <form
        className={styles.formContainer}
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
      >
        <label htmlFor="firstName">FirstName :</label>
        <input
          id="firstName"
          className={styles.inputcontainer}
          name="firstName"
          placeholder="FirstName"
          type="text"
          value={form.firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">LastName :</label>
        <input
          id="lastName"
          className={styles.inputcontainer}
          name="lastName"
          placeholder="LastName"
          type="text"
          value={form.lastName}
          onChange={handleChange}
        />
        <label htmlFor="mail">Email :</label>
        <input
          id="mail"
          className={styles.inputcontainer}
          name="mail"
          placeholder="Email"
          type="email"
          value={form.mail}
          onChange={handleChange}
        />
        <label htmlFor="password">Password :</label>
        <input
          id="password"
          className={styles.inputcontainer}
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <button className={styles.buttonPrimary} type="submit">
          Register
        </button>
      </form>
      <button onClick={handleRedirectToLogin} className={styles.buttonSecondary}>
        Go to Login
      </button>
    </div>
  );
};

export default Page;
