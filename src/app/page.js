'use client'
import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import { CgMathPlus } from "react-icons/cg";
import CardTarefa from "@/components/cardtarefa";

export default function Home() {
  const [inputTarefa, setInputTarefa] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = "http://54.242.213.93:25000/api/todos";

  const getAllTarefas = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setTarefas(data);
    } catch (error) {
      console.error("Falha ao buscar tarefas:", error);
    } finally {
      setLoading(false);
    }
  };

  const adicionarTarefa = async () => {
    if (inputTarefa.trim().length === 0) {
      return alert("É necessário dar um nome a tarefa!");
    }
    const data = { "descricao": inputTarefa, "estaFeita": false };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Erro ao adicionar tarefa');

      const tarefaAdicionada = await response.json();
      setTarefas([...tarefas, tarefaAdicionada]);
      setInputTarefa("");
    } catch (error) {
      console.error(error);
    } finally {
      await getAllTarefas();
    }
  };

  const deletarTarefa = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erro ao deletar tarefa');

      setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
    } catch (error) {
      console.error("Falha ao deletar tarefa:", error);
    }
  };

  const atualizarStatusTarefa = async (tarefaParaAtualizar) => {
    const dadosParaEnviar = {
      ...tarefaParaAtualizar,
      estaFeita: !tarefaParaAtualizar.estaFeita
    };

    try {
      const response = await fetch(`${url}/${tarefaParaAtualizar.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosParaEnviar)
      });

      if (!response.ok) throw new Error('Erro ao atualizar tarefa');

      setTarefas(tarefas.map(t =>
        t.id === tarefaParaAtualizar.id ? { ...t, estaFeita: !t.estaFeita } : t
      ));

    } catch (error) {
      console.error("Falha ao atualizar tarefa:", error);
    }
  };

  useEffect(() => {
    getAllTarefas();
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <div className={styles.caixaTodo}>
          <h1 className={styles.h1}>TODO List</h1>
          <div className={styles.caixaDeInput}>
            <input
              className={styles.input}
              value={inputTarefa}
              onChange={(e) => setInputTarefa(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && adicionarTarefa()}
            />
            <button className={styles.button} onClick={adicionarTarefa}>
              <CgMathPlus className={styles.iconAdd} />
            </button>
          </div>
          <ul className={styles.ul}>
            {loading ? <p>Carregando...</p> : (
              tarefas.map((tarefa) => (
                <li className={styles.li} key={tarefa.id}>
                  <CardTarefa
                    tarefa={tarefa}
                    onDelete={deletarTarefa}
                    onToggleStatus={atualizarStatusTarefa}
                  />
                </li>
              ))
            )}
          </ul>
        </div>
      </section>
    </main>
  );
}