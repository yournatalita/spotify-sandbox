import * as React from 'react';

import Button from '../../elements/Button/Button';
import styles from './Sidebar.module.scss';

const Sidebar = (): JSX.Element => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h2 className={styles.title}>New playlist</h2>
        <div className={styles.footer}>
          <Button>Save to Spotify</Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
