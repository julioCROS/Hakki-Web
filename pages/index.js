import axios from 'axios';
import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Title from '../components/Title';
import SearchBar from 'material-ui-search-bar';
import Modal from '../components/Modal';
import SearchResult from '../components/SearchResult';
import Extension from '../components/Extension';

const apiUrl = 'https://hakki-api.herokuapp.com/professores';

Home.getInitialProps = async () => {
  const response = await axios.get(apiUrl);
  return { data: response.data };
}

export default function Home({ data }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [professores, setProfessores] = useState(data);
  const [page, setPage] = useState(1);

  const onOpenModal = () => setOpen(true);

  return (
    <div className={styles.container}>
      <Head>
        <title>Hakki</title>
        <meta name="description" content="Obtenha avaliações dos professores de suas proximas matérias e envie também suas avaliações." />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <main className={styles.main}>
        <Title />
        <SearchBar
          style={{
            fontFamily: 'Ubuntu, sans-serif',
            boxShadow: '1px 1px 2px #0202022a',
            borderRadius: '10px',
          }}
          placeholder="Buscar professor..."
          value={search}
          onChange={(newValue) => {
            setSearch(newValue);
            setProfessores(searchQuery(newValue, data));
            setPage(1);
          }}
          onCancelSearch={() => {
            setSearch("");
            setProfessores(data);
            setPage(1);
          }}
        />       
        <p className={styles.cadastrar} onClick={() => {onOpenModal()}}>Cadastrar professor</p>
        <Modal open={open} setOpen={setOpen} />
        <SearchResult professores={professores} data={data} page={page} setPage={setPage} />
      </main>
      <Extension />
    </div>
  )
}

function searchQuery(e, data) {
  e = e.toLowerCase();
  let res = data.filter(professor => professor.nome.toLowerCase().includes(e));
  res.sort((a, b) => {
    if (a.nome < b.nome) return -1;
    if (a.nome > b.nome) return 1;
    return 0;
  });
  return res;
}