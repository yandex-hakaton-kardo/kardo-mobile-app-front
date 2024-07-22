import { useState } from 'react';
import styles from './App.module.scss';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <div className={styles.card}>
        <button type="button" onClick={() => setCount(value => value + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className={styles.readTheDocs}>Click on the Vite and React logos to learn more</p>
    </>
  );
};

export default App;
