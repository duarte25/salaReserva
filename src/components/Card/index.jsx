import Link from "next/link"
import Styles from "./styles.module.css"

export default function Card({ id, descricao, solicitante, category, dataFim, dataInicio }) {

    return (

        <div className={Styles.card}>

            <Link href={`/salas/${id}`}>
                <ul>
                    <li>{descricao}</li>

                    <li>{solicitante}</li>

                    <li>{category.name}</li>

                    <li>{dataFim}</li>

                    <li>{dataInicio}</li>

                </ul>
            </Link>
        </div>
    )
}