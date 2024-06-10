"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TitleMain from "@/components/UI/TitleMain";
import { LOGIN_USER } from "@/graphql/mutations";
import { fetchGraphQl } from "@/services/fetchGraphql.api";
import styles from "./index.module.scss";


const Page = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    mail: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    // Reset error state
    setError("");

    // Validation des entrées
    if (!form.mail || !form.password) {
      setError("Tous les champs sont obligatoires");
      return;
    }

    try {
      const variables = {
        email: form.mail,
        password: form.password,
      };
      console.log("variables: ", variables);

      const response = await fetchGraphQl(LOGIN_USER, variables);
      console.log("response: ", response);
      if (response.data.login.token) {
        // Stocker le token dans les cookies/local storage
        document.cookie = `token=${response.data.login.token}; path=/;`;

        // Redirection après succès
        router.push("/account/profil");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Erreur de connexion. Veuillez réessayer.");
    }
  };

  const handleRegisterRedirect = () => {
    window.location.href = "/auth/register";
  };

  return (
    <div className={styles.wrapper}>
      <TitleMain title="Login" color="primary" />
      <form
        className={styles.formContainer}
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
      >
        {error && <p className={styles.error}>{error}</p>}
        <label htmlFor="mail">Email :</label>
        <input
          id="mail"
          name="mail"
          type="email"
          placeholder="Email"
          value={form.mail}
          onChange={handleChange}
          className={styles.input}
        />
        <label htmlFor="password">Password :</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={form.password}
          name="password"
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.buttonPrimary} >
          Login
        </button>
      </form>
      <div className={styles.registerLink}>
        <p>Don't have an account?</p>
        <button
          onClick={handleRegisterRedirect}
          className={styles.buttonSecondary}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Page;
