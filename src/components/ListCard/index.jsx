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

    function formatarData(data) {
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`
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
                            id={e.id}
                            descricao={e.descricao}
                            solicitante={e.solicitante}
                            category={e.category}
                            dataInicio={formatarData(e.dataInicio)}
                            dataFim={formatarData(e.dataFim)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}