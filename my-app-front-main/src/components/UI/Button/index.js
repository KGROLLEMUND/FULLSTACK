import styles from "./index.module.scss";


const Index = ({handleClick, text, }) => {
    return (
        <button className={styles.btn} onClick={handleClick}>
            {text}
        </button>
    );
}

export default Index;
