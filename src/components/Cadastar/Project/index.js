import Input from "@/components/Cadastar/Input";
import React, { useState, useEffect } from 'react';
import Styles from "./styles.module.css";
import Buttom from "@/components/Cadastar/Buttom";
import Select from "@/components/Cadastar/Select";
import Textarea from "../TextArea";
import Radio from "../Radio";
import Message from "@/components/Cadastar/Mensagem";

export default function Form({ projectData }) {
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:3000/categories', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const submit = async (e) => {
        e.preventDefault();

        const updatedProject = { ...project };

        if (!isFormReady()) {
            setMessage({ type: 'error', text: 'Preencha todos os campos e aceite os termos.' });
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/salas", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(updatedProject)
            });
            setMessage({ type: 'success', text: 'Agendamento realizado com sucesso!' });
            setTimeout(() => {
                window.location.reload();
            }, 3000);
            const data = await response.json();
            setProject(data);
        } catch (error) {
            console.error("Error submitting form:", error);
            setMessage({ type: 'error', text: 'Ocorreu um erro ao enviar o formulário.' });
        }
    };

    const handleChange = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value });
    };

    const handleCategory = (e) => {
        setProject({
            ...project,
            category: {
                id: e.target.value,
                name: e.target.selectedIndex >= 0 ? e.target.options[e.target.selectedIndex].text : '',
            },
        });
    };

    const isFormReady = () => {
        return (
            project.descricao.trim() !== '' &&
            project.solicitante.trim() !== '' &&
            project.dataInicio.trim() !== '' &&
            project.dataFim.trim() !== ''
        );
    };

    return (
        <>
            <form onSubmit={submit} className={Styles.formulario}>
                <h2 className={Styles.titulo}>Reservar sala</h2>

                {message && (
                    <Message type={message.type} text={message.text} />)}

                <Textarea
                    type="text"
                    text="Descrição"
                    name="descricao"
                    placeholder="Descrição"
                    handleOnChange={handleChange}
                    value={project.descricao}
                />

                <Input
                    type="text"
                    text="Solicitante"
                    name="solicitante"
                    placeholder="Solicitante"
                    handleOnChange={handleChange}
                    value={project.solicitante}
                />

                <Select
                    name="category_id"
                    text="Sala"
                    options={categories}
                    handleOnChange={handleCategory}
                    value={project.category ? project.category.id : ''}
                />

                <Input
                    type="datetime-local"
                    text="Inicio"
                    name="dataInicio"
                    placeholder="Data Inicio"
                    handleOnChange={handleChange}
                    value={project.dataInicio}
                />

                <Input
                    type="datetime-local"
                    text="Fim"
                    name="dataFim"
                    placeholder="Data Fim"
                    handleOnChange={handleChange}
                    value={project.dataFim}
                />

                <Radio
                    type="checkbox"
                    text="concordo com os termos?"
                    handleOnChange={handleChange}
                />

                <div className={Styles.buttom}>
                    <Buttom />
                </div>
            </form>
        </>
    )
}