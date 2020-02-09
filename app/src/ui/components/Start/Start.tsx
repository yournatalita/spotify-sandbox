import * as React from 'react';
import { TStartProps } from './Start.d';

import styles from './Start.module.scss';

const Start = ({ text }: TStartProps): JSX.Element => {
  return (
    <div className={styles.root}>
      Login with Spotify
      <br/>
      {text}
    </div>
  );
};

export default Start;
