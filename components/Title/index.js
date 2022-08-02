import styles from './Styles.module.css';

export default function Title(){
  return (
      <div className={styles.container}>
        <a href="https:\\hakki.vercel.app/"><h1 className={styles.title}>Hakki</h1></a>
        <a href="https:\\hakki.vercel.app/"><h1 className={styles.subtitle}>학기</h1></a>
      </div>
  )
}