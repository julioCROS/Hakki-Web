import axios from 'axios';
import { useState } from 'react';
import Head from 'next/head';
import styles from '../../styles/Docente.module.css';
import { makeStyles } from "@material-ui/core/styles";

import Title from '../../components/Title';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Reviews from '../../components/Reviews';

const apiUrl_professores = 'https://hakki-api.herokuapp.com/professores';

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
  const toolTipClasses = useStyles();  

  if(data.length === 0) {
    return (
      <div className={styles.main}>
        <Title />
        <p className={styles.noDataFound}>Professor não encontrado.</p>
        <a href="../"><p className={styles.backString}>Voltar ao inicio.</p></a>
      </div>
    );
  }
  else {
    return(
      <div className={styles.main}>
      <Head>
        <title>Hakki - {normalizeName(professor.nome)}</title>
        <meta name="description" content="Obtenha avaliações dos professores de suas proximas matérias e envie também suas avaliações." />
        <link rel="icon" href="/logo.ico" />
      </Head>
        <Title />
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.mainInfo}>
              {professor.nome}
              <div className={styles.secondInfo}>
                <div className={styles.reviewsInfo}><b>Avaliações:</b> {professor.reviews.length}</div>
                <div className={styles.cadastrar}>Cadastrar avaliação</div>
              </div>
            </div>
            <div className={styles.averages}>
              <div className={styles.values}>
              <Tooltip classes={{ arrow: toolTipClasses.arrow, tooltip: toolTipClasses.tooltip }} disableFocusListener disableTouchListener title="Qualidade" placement="top" arrow>{professor.mediaQualidade == null ? <p>X</p> : professor.mediaQualidade >= 7 ? <p className={styles.goodAvg}>{professor.mediaQualidade}</p> :professor.mediaQualidade >= 5 ? <p className={styles.neutralAvg}>{professor.mediaQualidade}</p> : <p className={styles.chaoticAvg}>{professor.mediaQualidade}</p>}</Tooltip >
              <Tooltip classes={{ arrow: toolTipClasses.arrow, tooltip: toolTipClasses.tooltip }} disableFocusListener disableTouchListener title="Facilidade" placement="top" arrow>{professor.mediaFacilitacao == null ? <p>X</p> : professor.mediaFacilitacao >= 7 ? <p className={styles.goodAvg}>{professor.mediaFacilitacao}</p> :professor.mediaFacilitacao >= 5 ? <p className={styles.neutralAvg}>{professor.mediaFacilitacao}</p> : <p className={styles.chaoticAvg}>{professor.mediaFacilitacao}</p>}</Tooltip >
              <Tooltip classes={{ arrow: toolTipClasses.arrow, tooltip: toolTipClasses.tooltip }} disableFocusListener disableTouchListener title="Média" placement="top" arrow>{professor.mediaQualidade == null  ? <p>X</p> : ((professor.mediaQualidade + professor.mediaFacilitacao) / 2) >= 7 ? <p className={styles.goodAvg}>{((professor.mediaQualidade + professor.mediaFacilitacao) / 2)}</p> :((professor.mediaQualidade + professor.mediaFacilitacao) / 2) >= 5 ? <p className={styles.neutralAvg}>{((professor.mediaQualidade + professor.mediaFacilitacao) / 2)}</p> : <p className={styles.chaoticAvg}>{((professor.mediaQualidade + professor.mediaFacilitacao) / 2)}</p>}</Tooltip >
              </div>
            </div>
          </div>
          <Reviews data={professor.reviews} />
        </div>
      </div>
    )
  }
}

function normalizeName(name) {
  let normalizedName = name.toLowerCase();
  normalizedName = normalizedName.replace(/\s\S/g, function(l) {
    return l.toUpperCase();
  });
  normalizedName = normalizedName[0].toUpperCase() + normalizedName.slice(1);
  return normalizedName;
}