import React, { useEffect } from 'react';
import styles from './Spinner.module.css'; // Импорт стилей как модулей

const Spinner: React.FC = () => {
  useEffect(()=>{
    console.log("Spinner useEffect =");
  },[])
  
  return (
    <div className={styles['spinner-overlay']}>
      <div className={styles['spinner-container']}>
        <div className={styles.spinner}></div>
      </div>
    </div>
  );
};

export default Spinner;
