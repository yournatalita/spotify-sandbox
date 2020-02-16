import * as React from 'react';
import { ReactComponent as LogoWhite } from '../../../assets/icons/spotify-logo-white.svg';
import classNames from 'classnames';

import { TSpotifyLogo } from './SpotifyLogo.d';

import styles from './SpotifyLogo.module.scss';

const Start = ({ type }: TSpotifyLogo): JSX.Element => {
  return (
    <div className={classNames(styles.root, styles[type])}>{type === 'white' && <LogoWhite />}</div>
  );
};

export default Start;
