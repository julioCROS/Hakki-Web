import { useState } from 'react';
import styles from './Styles.module.css';
import { makeStyles } from "@material-ui/core/styles";

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';

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

export default function Reviews ({ data }) {
  const [page, setPage] = useState(1);
  let pageCount = Math.ceil(data.length / 8);
  let reviewsPag = data.slice((page - 1) * 8, page * 8);

  const toolTipClasses = useStyles();    
  return (
    <>
      <div className={styles.container}>
        {reviewsPag.map((review, index) => (
          <div className={styles.review} key={index}>
            <div className={styles.text}>
              {review.comentario}
            </div>
            <div className={styles.averagesAndDate}>
              <div className={styles.date}>
                {formatDate(review.data)}
              </div>
              <div className={styles.values}>
              <Tooltip classes={{ arrow: toolTipClasses.arrow, tooltip: toolTipClasses.tooltip }} disableFocusListener disableTouchListener title="Qualidade" placement="left" arrow>{review.notaQualidade >= 7 ? <p className={styles.goodAvg}>{review.notaQualidade}</p> :review.notaQualidade >= 5 ? <p className={styles.neutralAvg}>{review.notaQualidade}</p> : <p className={styles.chaoticAvg}>{review.notaQualidade}</p>}</Tooltip >
              <Tooltip classes={{ arrow: toolTipClasses.arrow, tooltip: toolTipClasses.tooltip }} disableFocusListener disableTouchListener title="Facilidade" placement="right" arrow>{review.notaFacilitacao >= 7 ? <p className={styles.goodAvg}>{review.notaFacilitacao}</p> : review.notaFacilitacao >= 5 ? <p className={styles.neutralAvg}>{review.notaFacilitacao}</p> : <p className={styles.chaoticAvg}>{review.notaFacilitacao}</p>}</Tooltip >
              </div>
            </div>
          </div>
          ))}
      </div>
      <div className={styles.paginate}>
      <Pagination count={pageCount} page={page} onChange={(event, value) => {
        setPage(value);
      }}/>
      </div>
    </>
  );
}

function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR');
}
