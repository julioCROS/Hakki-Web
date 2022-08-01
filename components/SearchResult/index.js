import styles from './Styles.module.css';
import Pagination from '@mui/material/Pagination';

export default function SearchResult({ professores, data, page, setPage }) {
  let pageCount = Math.ceil(professores.length / 5);
  let professoresPag = professores.slice((page - 1) * 5, page * 5);

  if(professores.length == 0) {
    return (<p className={styles.noDataFound}>Nenhum nome correspondente encontrado.</p>)
  } else if(professores.length == data.length) {
    return null
  } else {
    return (
      <div className={styles.resultBox}>
        {professoresPag.map(professor => (
          <a href={`/docente/${slugName(professor.nome)}`} key={professor._id} >
            <div className={styles.professorBox}>
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
          </a>
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

function slugName(name) {
  return name.toLowerCase().replace(/ /g, '-');
}