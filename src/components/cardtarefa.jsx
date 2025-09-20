'use client'
import styles from "./cardtarefa.module.css";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";

export default function CardTarefa({ tarefa, onDelete, onToggleStatus }) {


    if (!tarefa) return null;

    return (
        <main className={`${styles.main} ${tarefa.estaFeita ? styles.feita : ''}`}>
            <input
                className={styles.checkbox}
                type="checkbox"
                checked={tarefa.estaFeita}
                onChange={() => onToggleStatus(tarefa)}
            />
            <span className={styles.span}>
                {tarefa.descricao}
            </span>
            <FaTrashAlt
                onClick={() => onDelete(tarefa.id)}
                className={styles.iconeLixeira}
            />
        </main>
    )
}