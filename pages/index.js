import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Title from '../components/Title';
import SearchBar from 'material-ui-search-bar';
import ModalProf from '../components/ModalProf';
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
  const [professoresSearch, setProfessoresSearch] = useState(data);
  const [page, setPage] = useState(1);

  useEffect(() => {
    refreshData();
  }, [open]);

  const refreshData = async () => {
    const response = await axios.get(apiUrl);
    setProfessoresSearch(response.data);
  }

  const onOpenModal = () => setOpen(true);
  data = sortData(data);

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
            setProfessoresSearch(searchQuery(newValue, professoresSearch));
            setPage(1);
          }}
          onCancelSearch={() => {
            setSearch("");
            setProfessoresSearch(data);
            setPage(1);
          }}
        />
        <p className={styles.cadastrar} onClick={() => {onOpenModal()}}>Cadastrar professor</p>
        <ModalProf open={open} setOpen={setOpen} setSearch={setSearch}/>
        <SearchResult professoresSearch={professoresSearch} data={data} page={page} setPage={setPage} search={search} />
      </main>
      <Extension />
    </div>
  )
}

function searchQuery(e, data) {
  e = e.toLowerCase();
  let res = data.filter(professor => professor.nome.toLowerCase().includes(e));
  return res;
}

function sortData(data) {
  data.sort((a, b) => {
    if (a.nome < b.nome) {
      return -1;
    }
    if (a.nome > b.nome) {
      return 1;
    }
    return 0;
  }
  );
  return data;
}