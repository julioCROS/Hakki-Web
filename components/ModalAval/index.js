import axios from 'axios';
import { useState } from 'react';
import styles from './Styles.module.css';

import { Modal } from 'react-responsive-modal';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

const apiUrl = 'https://hakki-api.herokuapp.com/reviews';

export default function ModalAval({ open, setOpen, professor_id }) {
  const [qualidade, setQualidade] = useState(0);
  const [facilidade, setFacilidade] = useState(0);
  const [comentario, setComentario] = useState("");
  const [postRes, setPostRes] = useState("");

  function onCloseModal() {
    setQualidade(0);
    setFacilidade(0);
    setComentario("");
    setPostRes("");
    setOpen(false);
  }

  return (
    <Modal open={open} onClose={onCloseModal} center>
      <div className={styles.modal}>
        <div className={styles.modalTitle}>
          <h2>Cadastrar avaliação</h2>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.inputSend}>
            <div className={styles.nota}><TextField id="standard-basic" label="Qualidade (0 - 10)" variant="standard" value={qualidade} onChange={(e) => {setQualidade(e.target.value)}} fullWidth/></div>
            <div className={styles.nota}><TextField id="standard-basic" label="Facilidade (0 - 10)" variant="standard" value={facilidade} onChange={(e) => {setFacilidade(e.target.value)}} fullWidth/></div>
          </div>
          <div className={styles.textBox}><TextField id="standard-basic" label="Comentário (Max. 250 char.)" variant="standard" value={comentario} onChange={(e) => {setComentario(e.target.value)}} fullWidth/></div>
          <div ><input type="submit" value="Enviar avaliação" className={styles.btn} onClick={() => {setPostRes(""); postAval(professor_id, qualidade, facilidade, comentario, setPostRes)}}/></div>
          <div className={styles.response}>
            {postRes !== "" ? postRes == 201 ? renderSucess(): renderFail(postRes) : <p></p>}
          </div>
        </div>
      </div>
    </Modal>
  )
}

function postAval(professor, qualidade, facilidade, comentario, setPostRes) {
  axios.post(apiUrl, {
    professor: professor,
    notaQualidade: Number(qualidade),
    notaFacilitacao: Number(facilidade),
    comentario: comentario
  }).then(res => {
    setPostRes(res.status);
  }).catch(err => {
    setPostRes(err.response.status);
  })
}

function renderSucess() {
  return (
    <div className={styles.alert}>
      <Alert severity="success" variant='outlined'>
        Avaliação enviada com sucesso!
      </Alert>
    </div>
  )
}

function renderFail(postRes) {
  if (postRes == 400) {
    return (
      <div className={styles.alert}>
        <Alert severity="error" variant='outlined'>
          Erro ao enviar avaliação!
        </Alert>
      </div>
    )
  } else if (postRes == 401) {
    return (
      <div className={styles.alert}>
        <Alert severity="error" variant='outlined'>
          Você não pode avaliar!
        </Alert>
      </div>
    )
  } else if (postRes == 500) {
    return (
      <div className={styles.alert}>
        <Alert severity="error" variant='outlined'>
          Erro ao enviar avaliação! Revise os dados.
        </Alert>
      </div>
    )
  }
}

