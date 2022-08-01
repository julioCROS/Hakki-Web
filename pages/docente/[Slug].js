import axios from 'axios';
import { useState } from 'react';
import styles from '../../styles/Docente.module.css';

import Title from '../../components/Title';

const apiUrl_professores = 'https://hakki-api.herokuapp.com/professores';
const apiUrl_reviews = 'https://hakki-api.herokuapp.com/reviews';

Docente.getInitialProps = async (context) => {
  const { req, query, res, asPath, pathname } = context;
  if (req) {
    let name  = req.url.split('/')[2];
    const response = await axios.get(apiUrl_professores + "/nome/" + name);
    return { data: response.data };
  }
}
  

export default function Docente({ data }) { 
  const [professor, setProfessor] = useState(data);

  if(data.length === 0) {
    return (
      <div className={styles.main}>
        <Title />
        <p className={styles.noDataFound}>Professor não encontrado.</p>
      </div>
    );
  }
  else {
    return(
      <div className={styles.main}>
        <Title />
        <p className={styles.noDataFound}>{professor.nome}</p>
      </div>
    )
  }
}