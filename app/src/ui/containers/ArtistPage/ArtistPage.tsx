import React, { ComponentType, useEffect } from 'react';
import { connect } from 'react-redux';

import { operationsArtists } from '../../../store/models/Artists/index';

import { StoreInterface } from '../../../store/index.d';
import { DispatchProps, StateProps } from './ArtistPage.d';

import styles from './ArtistPage.module.scss';

const ArtistPage: ComponentType<DispatchProps & StateProps> = ({ getArtist, router, artist }) => {
  const { images, name } = artist || {};
  const pathname = router?.location?.pathname;
  const id = pathname?.substring(pathname.lastIndexOf('/') + 1);

  useEffect(() => {
    if (id && pathname?.includes('artist')) {
      getArtist(id);
    }
  }, [getArtist, pathname, id]);

  return (
    <div className={styles.root}>
      {artist && (
        <div className={styles.container}>
          <header className={styles.header}>
            <div className={styles.image}>
              {images && <img className={styles.img} src={images[0].url} alt={name} />}
            </div>
          </header>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: StoreInterface): StateProps => {
  return {
    artist: state.artists && state.artists.artist,
    router: state.router
  };
};

const mapDispatchToProps = {
  ...operationsArtists
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage);
