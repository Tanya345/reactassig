import React, { useState, createContext } from 'react'
import bgImage from './bgImage.png';
import styles from './scss/App.module.scss';
import './scss/Global.scss'
import Form from './components/Form';
import D3_BarChart from './components/D3_BarChart';

export const MyContext = createContext([])
function App() {

  const [isSubmit, setIsSubmit] = useState(false)

  return (
    <MyContext.Provider value={{ isSubmit, setIsSubmit }}>
      <div className={styles.App}>
        {!isSubmit ?
          <>
            <div className={styles.App__imgDiv}>
              <img src={bgImage} alt="img" className={styles.App__img} />
              <div className={styles.App__childDiv}>
                <h2>Choose a date range</h2>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem commodi accusamus deserunt minus temporibus sunt velit similique ab?</p>
              </div>
            </div>
            <Form />
          </> : <D3_BarChart width={600} height={400} />}

      </div>
    </MyContext.Provider>
  );
}

export default App;