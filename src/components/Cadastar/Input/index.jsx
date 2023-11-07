import Styles from './styles.module.css'

export default function Input({ text, handleOnChange, ...props }) {
    return (
        <label className={Styles.label}>
            <h2>{text}</h2>
            <input  {...props}
                onChange={handleOnChange}
                className={Styles.inputbordas}
                required
            />
        </label>
    )
}