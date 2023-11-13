import styles from './styles.module.css';

export default function Message({type, text}) {
    return (
        <div className={`${styles.message} ${styles[type]}`}>
            <h2>{text}</h2>
        </div>
    )
}