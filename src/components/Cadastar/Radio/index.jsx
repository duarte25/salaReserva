import Styles from './styles.module.css'

export default function Radio({ text, handleOnChange, ...props }) {
    return (
        <label className={Styles.label}>
            <input  {...props}
                onChange={handleOnChange}
                className={Styles.inputbordas}
                required
            />
            <h2>{text}</h2>
        </label>
    )
}