import styles from './Styles.module.css';
import Image from 'next/image';

export default function ExtensionContainer(){
  return(
    <div className={styles.container}>
      <div className={styles.extension}>
        <a href="https://chrome.google.com/webstore/detail/hakki/cfeknhlenfklocphhgfgnjagagdfpdkc?hl=pt-br" target="_blank"><Image src="/extension.png" width={330} height={100} layout="responsive" className="card-img-top" alt="..."/></a>
      </div>
    </div>
  )
}