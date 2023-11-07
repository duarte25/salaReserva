import Styles from './styles.module.css'

export default function Textarea({ text, handleOnChange, ...props }) {
    return (
        <label className={Styles.label}>
            <h2>{text}</h2>
            <textarea  {...props}
                onChange={handleOnChange} 
                className={Styles.inputbordas}
                required
            />
        </label>
    )
}