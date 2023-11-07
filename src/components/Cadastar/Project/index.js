import Input from "@/components/Cadastar/Input"
import React, { useState, useRef, useEffect } from 'react';
import Styles from "./styles.module.css"
import Buttom from "@/components/Cadastar/Buttom";
import Select from "@/components/Cadastar/Select";
import Textarea from "../TextArea";
import Radio from "../Radio";

export default function Form(projectData) {

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    const submit = async (e) => {
        e.preventDefault()

        const updatedProject = {
            ...project
        };
        await fetch("http://localhost:3000/salas", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProject)
        }).then((resp) => resp.json())
            .then((data) => {
                setProject(data)
            })
            .catch(err => console.log(err))
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
        console.log(project)
    }

    fetch('http://localhost:3000/categories', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch(err => console.log(err))

    function handleCategory(e) {
        setProject({
            ...project,
            category: {
                id: e.target.value,
                name: e.target.selectedIndex >= 0 ? e.target.options[e.target.selectedIndex].text : '',
            },
        })
    }

    return (
        <>
            <form onSubmit={submit} className={Styles.formulario}>
                <h2 className={Styles.titulo}>Reservar sala</h2>

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
                    type="datetime"
                    text="Inicio"
                    name="dataInicio"
                    placeholder="Data Inicio"
                    handleOnChange={handleChange}
                    value={project.dataInicio}
                />

                <Input
                    type="datetime"
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