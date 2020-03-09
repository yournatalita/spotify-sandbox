import * as React from 'react';

import ArtistsLists from '../../containers/ArtistsLists/ArtistsLists';

import { MainLayoutProps } from './MainLayout.d';
import styles from './MainLayout.module.scss';
import { connect } from 'react-redux';

const MainLayout = ({ personalization }: MainLayoutProps): JSX.Element => {
  const { artists } = personalization || {};

  return (
    <div className={styles.root}>
      <div className={styles.artistsWrapper}>
        <div className={styles.container}>
          <h2 className={styles.header}>Your Top Artists</h2>
        </div>
        <div className={styles.artistsContainer}>
          {artists && artists.checkedRange && <ArtistsLists />}
        </div>
      </div>
      <div className={styles.tracksWrapper} />
    </div>
  );
};

const mapStateToProps = ({ personalization }: MainLayoutProps) => {
  return { personalization };
};

export default connect(mapStateToProps)(MainLayout);
