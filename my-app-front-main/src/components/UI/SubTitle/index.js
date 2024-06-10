import styles from "./index.module.scss";

const Index = ({ text, color }) => {
    return (
        <div className={`${styles.wrapper} text__${color}`}>
            <h2>{text}</h2>
        </div>
    );
}

export default Index;
