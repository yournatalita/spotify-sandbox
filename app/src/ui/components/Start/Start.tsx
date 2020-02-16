import * as React from 'react';
import Button from '../../elements/Button/Button';
import SpotifyLogo from '../../elements/SpotifyLogo/SpotifyLogo';
import UILink from '../../elements/UILink/UILink';

import styles from './Start.module.scss';

const Start = (): JSX.Element => {
  return (
    <div className={styles.root}>
      <div className={'container'}>
        <div className={styles.loginBar}>
          <div className={styles.logo}>
            <SpotifyLogo type={'white'} />
          </div>
          <div className={styles.text}>
            To use this application please login with your Spotify account.
          </div>
          <div className={styles.bottom}>
            <div className={styles.button}>
              <Button text={'Login with Spotify'} />
            </div>
            <div className={styles.optionalText}>
              <span className={styles.labelText}>Don{"'"}t have an account yet?</span>
              <UILink
                themes={['white', 'underline', 'uppercase']}
                href={
                  'https://accounts.spotify.com/ru/login/?_locale=en&continue=https:%2F%2Fwww.spotify.com%2Fru-ru%2Faccount%2Foverview%2F'
                }
              >
                SignUp
              </UILink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
