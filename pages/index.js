import axios from 'axios';
import Head from 'next/head';
import React, { useState } from 'react';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@mui/material/Typography';
import styles from '../styles/Home.module.css';
import SearchBar from "material-ui-search-bar";
import { Modal } from 'react-responsive-modal';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Image from 'next/image';

const apiUrl = 'https://hakki-api.herokuapp.com/professores';

const useStyles = makeStyles(theme => ({
  arrow: {
    "&:before": {
      border: "2px solid #f5f5f5"
    },
    color: "#f5f5f5",
  },
  tooltip: {
    backgroundColor: "black",
    color: "red"
  }
}));

Home.getInitialProps = async () => {
  const response = await axios.get(apiUrl);
  return { data: response.data };
}

export default function Home({ data }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [postRes, setPostRes] = useState("");
  const [professores, setProfessores] = useState(data);
  let [page, setPage] = useState(1);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setName("");
    setPostRes("");
  };

  let toolTipClasses = useStyles();

  return (
    <div className={styles.container}>
      <Head>
        <title>Hakki</title>
        <meta name="description" content="Obtenha avaliações dos professores de suas proximas matérias e envie também suas avaliações." />
        <link rel="icon" href="/icon.png" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Hakki</h1>
        <h1 className={styles.subtitle}>학기</h1> 
        <SearchBar
          placeholder="Buscar nome..."
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
        <p className={styles.cadastrar} onClick={() => {onOpenModal()}}>Cadastrar nome</p>
        <Modal open={open} onClose={onCloseModal} center> 
          <div className={styles.modal}>
            <div className={styles.modalTitle}>
              <h2>Cadastrar nome</h2>
            </div>  
            <div className={styles.modalBody}>
              <div className={styles.inputSend}>
                <div className={styles.textFieldArea}><TextField id="standard-basic" label="Nome completo" variant="standard" value={name} onChange={(e) => {setName(e.target.value)}} fullWidth/></div>
                <Tooltip classes={{ arrow: toolTipClasses.arrow, tooltip: toolTipClasses.tooltip }} disableFocusListener disableTouchListener title="Cadastrar" placement="right" arrow><div className={styles.sendButton}><input type="submit" value="+" className={styles.btn} onClick={() => {setPostRes(""); postName(name, setPostRes)}}/></div></Tooltip > 
              </div>
              <div className={styles.response}>
                {postRes !== "" ? postRes == 201 ? renderSucess(): renderFail(postRes) : <p></p>}
              </div>             
            </div>
          </div>
        </Modal>
        {SearchResult(professores, data, page, setPage)}
      </main>
      <div className={styles.bottomContainer}>
        <div className={styles.extensionImg}>
          <Image src="/extension.png" width={330} height={100} layout="responsive" className="card-img-top" alt="..."/>
        </div>
      </div>
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

function postName(name, setPostRes) {
  axios.post(apiUrl, {
    nome: name
  }).then(res => {
    setPostRes(res.status);
  }).catch(err => {
    setPostRes(err.response.status);
  });
}

function SearchResult(professores, data, page, setPage) {
  let pageCount = Math.ceil(professores.length / 5);
  let professoresPag = professores.slice((page - 1) * 5, page * 5);

  if(professores.length == 0) {
    return (<p className={styles.startString}>Nenhum nome encontrado.</p>)
  } else if(professores.length == data.length) {
    return null
  } else {
    return (
      <div className={styles.resultBox}>
        {professoresPag.map(professor => (
          <div className={styles.professorBox} key={professor.id}>
            <div className={styles.mainInfo}>
              <p className={styles.name}>{professor.nome}</p>
              <p className={styles.values}>
                {professor.mediaQualidade == null ? <p>X</p> : professor.mediaQualidade >= 7 ? <p className={styles.goodAvg}>{professor.mediaQualidade}</p> :professor.mediaQualidade >= 5 ? <p className={styles.neutralAvg}>{professor.mediaQualidade}</p> : <p className={styles.chaoticAvg}>{professor.mediaQualidade}</p>}
                {professor.mediaFacilitacao == null ? <p>X</p> : professor.mediaFacilitacao >= 7 ? <p className={styles.goodAvg}>{professor.mediaFacilitacao}</p> :professor.mediaFacilitacao >= 5 ? <p className={styles.neutralAvg}>{professor.mediaFacilitacao}</p> : <p className={styles.chaoticAvg}>{professor.mediaFacilitacao}</p>}
                {professor.mediaQualidade == null  ? <p>X</p> : ((professor.mediaQualidade + professor.mediaFacilitacao) / 2) >= 7 ? <p className={styles.goodAvg}>{((professor.mediaQualidade + professor.mediaFacilitacao) / 2)}</p> :((professor.mediaQualidade + professor.mediaFacilitacao) / 2) >= 5 ? <p className={styles.neutralAvg}>{((professor.mediaQualidade + professor.mediaFacilitacao) / 2)}</p> : <p className={styles.chaoticAvg}>{((professor.mediaQualidade + professor.mediaFacilitacao) / 2)}</p>}
              </p>
            </div>
            <p className={styles.reviewInfo}>Avaliações: {professor.reviews.length}</p>
          </div>
        ))}
         <div className={styles.paginate}>
         <Pagination count={pageCount} page={page} onChange={(event, value) => {
            setPage(value);
          }}/>
         </div>
      </div>
    )
  }
}

function renderSucess(){
  return (
    <div className={styles.alert}>
        <Alert severity="success" variant='outlined'>
          Nome cadastrado com sucesso!
        </Alert>        
    </div>
  )
}

function renderFail(res){
  if(res == 400) {
    return (
      <div className={styles.alert}>
        <Alert severity="error" variant='outlined'>Nome já cadastrado.</Alert>
      </div>
    )
  } else if(res == 500) {
    return (
      <div className={styles.alert}>
        <Alert severity="error" variant='outlined'>Nome inválido! Copie e cole aqui o nome completo, assim como aparece no SIGAA.</Alert>
      </div>
    )
  } else {
    return (
      <div className={styles.alert}>
        <Alert severity="warning" variant='outlined'>Erro no servidor.</Alert>
      </div>
    )
  }
}