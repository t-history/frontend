import { FC, useEffect, useState } from 'react';

import styles from './Header.module.scss';

interface IData {
  wait: number;
  completed?: number;
  failed?: number;  
}

const Header: FC = () => {
  const [data, setData] = useState<IData | null>(null);

  useEffect(() => {
    const source = new EventSource('/api/queue/sse');

    source.onmessage = (event) => {
      console.log('sse');
      const newData = JSON.parse(event.data);
      setData(newData);
    };
    return () => {
      source.close();
    };
  }, []);    

  return <div className={styles.layout}>
    {data &&
      <div className={styles.wait}>
        {data.wait} - {data.completed} - {data.failed}
      </div>
    }
  </div>
};

export default Header;