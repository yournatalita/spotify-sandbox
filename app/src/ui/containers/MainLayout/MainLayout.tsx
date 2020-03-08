import * as React from 'react';

import ArtistsLists from '../../components/ArtistsLists/ArtistsLists';

import { MainLayoutProps } from './MainLayout.d';
import styles from './MainLayout.module.scss';
import { connect } from 'react-redux';

const MainLayout = ({ personalization = {} }: MainLayoutProps): JSX.Element => {
  const { artists, tracks } = personalization;
  // TODO: remove debugging
  console.log({ artists, tracks });
  return (
    <div className={styles.root}>
      <div className={styles.artistsWrapper}>
        <ArtistsLists artists={artists} />
      </div>
      <div className={styles.tracksWrapper} />
    </div>
  );
};

const mapStateToProps = ({ personalization }: MainLayoutProps) => {
  return { personalization };
};

export default connect(mapStateToProps)(MainLayout);
