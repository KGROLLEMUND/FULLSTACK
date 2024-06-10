import PostItem from "../PostItem/index";
import styles from "./index.module.css";

const Index = ({ articles }) => {
    return (
        <div className={styles.grid}>
            {
                articles?.map((article, index) => (
                    // on utilise le composant PostItem dans l'itération pour afficher chaque article
                    <PostItem key={article.id} article={article} position={index} />
                ))
            }
        </div>
    );
}

export default Index;
