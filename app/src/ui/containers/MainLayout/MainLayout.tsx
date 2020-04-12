import * as React from 'react';

import ArtistsLists from '../ArtistsLists/ArtistsLists';
import TracksLists from '../TracksLists/TracksLists';

import { MainLayoutProps } from './MainLayout.d';
import styles from './MainLayout.module.scss';
import { connect } from 'react-redux';

const MainLayout = ({ personalization }: MainLayoutProps): JSX.Element => {
  const { artists, tracks } = personalization || {};

  return (
    <div className={styles.root}>
      {artists && artists.checkedRange && (
        <div className={styles.artistsWrapper}>
          <div className={styles.container}>
            <h2 className={styles.header}>Your Top Artists</h2>
          </div>
          <div className={styles.artistsContainer}>
            <ArtistsLists />
          </div>
        </div>
      )}
      {tracks && tracks.checkedRange && (
        <div className={styles.tracksWrapper}>
          <div className={styles.container}>
            <h2 className={styles.header}>Your Top Tracks</h2>
          </div>
          <div className={styles.artistsContainer}>
            <TracksLists />
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ personalization }: MainLayoutProps) => {
  return { personalization };
};

export default connect(mapStateToProps)(MainLayout);
