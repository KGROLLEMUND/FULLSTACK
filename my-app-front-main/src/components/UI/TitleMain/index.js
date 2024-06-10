import styles from "./index.module.scss";

const Index = ({title, color, withUnderline}) => {
    return (
        // <div className={`${styles.wrapper} ${styles[color]}`}>
        <div className={`${styles.wrapper} text__${color} ${withUnderline && styles.underlined}`}>
            <h2>{title}</h2>
        </div>
    );
}

export default Index;
