import Styles from './styles.module.css'

export default function Select({ text, name, options, handleOnChange, value }) {
    return (
        <label className={Styles.label}>
            <h2>{text}</h2>
            <select name={name}
                id={name}
                onChange={handleOnChange}
                value={value || ''}
                className={Styles.inputbordas}
            >
                <option> Selecione uma opção</option>
                {options.map((option) => (
                    <option valyue={option.id} key={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </label>
    )
}