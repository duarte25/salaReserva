import { useEffect, useState } from 'react'
import axios from "axios"
import Card from '@/components/Card'
import Styles from "./styles.module.css"

export default function ListCard() {

    const [eventos, setEventos] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/salas')
            .then(resultado => setEventos(resultado.data))
    }, [])

    function formatoData(data) {
        const dataForm = new Date(data)
        const dia = dataForm.getDate().toString().padStart(2, '0')
        const mes = (dataForm.getMonth() + 1).toString().padStart(2, '0')
        const ano = dataForm.getFullYear()
        const hora = dataForm.getHours().toString().padStart(2, '0')
        const minuto = dataForm.getMinutes().toString().padStart(2, '0')
        const segundo = dataForm.getSeconds().toString().padStart(2, '0')

        return `${dia}/${mes}/${ano} às ${hora}:${minuto}:${segundo}`
    }

    return (
        <>
            <div className={Styles.container}>
                <h1>Reservas realizadas:</h1>

                <div className={Styles.lisTitulo}>
                    <ul>
                        <li>Descrição</li>
                        <li>Solicitante</li>
                        <li>Sala</li>
                        <li>Início</li>
                        <li>Fim</li>
                    </ul>
                </div>
                <div className={Styles.listCard}>
                    {eventos.map(e => (
                        <Card
                            key={e.id}
                            id={e.id}
                            descricao={e.descricao}
                            solicitante={e.solicitante}
                            category={e.category}
                            dataInicio={formatoData(e.dataInicio)}
                            dataFim={formatoData(e.dataFim)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}