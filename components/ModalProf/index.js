import axios from 'axios';
import { useState } from 'react';
import styles from './Styles.module.css';
import { makeStyles } from "@material-ui/core/styles";

import { Modal } from 'react-responsive-modal';
import TextField from '@mui/material/TextField';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';

const apiUrl = 'https://hakki-api.herokuapp.com/professores';

const useStyles = makeStyles(theme => ({
  arrow: {
    "&:before": {
      border: "2px solid #c9c9c9"
    },
    color: "#c9c9c9",
  },
  tooltip: {
    backgroundColor: "#c9c9c9",
    color: "black",
    fontSize: "15px",
    margin: "10px",
    padding: "10px",
    paddingLeft: "25px",
    paddingRight: "25px",
    fontFamily: "Ubuntu",
    fontWeight: "bold",
  }
}));


export default function ModalProf({ open, setOpen, setSearch }) {
  const [name, setName] = useState("");
  const [postRes, setPostRes] = useState("");
  
  const toolTipClasses = useStyles();

  function onCloseModal() {
    setName("");
    setPostRes("");
    setOpen(false);
    setSearch("");
  }

  return(
    <Modal open={open} onClose={onCloseModal} center> 
      <div className={styles.modal}>
        <div className={styles.modalTitle}>
          <h2>Cadastrar professor</h2>
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
  )
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

function renderSucess(){
  return (
    <div className={styles.alert}>
        <Alert severity="success" variant='outlined'>
          Professor cadastrado com sucesso!
        </Alert>        
    </div>
  )
}

function renderFail(res){
  if(res == 400) {
    return (
      <div className={styles.alert}>
        <Alert severity="error" variant='outlined'>Professor já cadastrado.</Alert>
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
        <Alert severity="warning" variant='outlined'>Erro no servidor! Tente novamente.</Alert>
      </div>
    )
  }
}