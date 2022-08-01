import styles from './Styles.module.css';

export default function Title(){
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hakki</h1>
      <h1 className={styles.subtitle}>학기</h1> 
    </div>
  )
}