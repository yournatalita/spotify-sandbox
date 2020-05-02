import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import styles from './TrackInfo.module.scss';
import stylesLink from '../UILink/UILink.module.scss';

import { TTrackInfo } from './TrackInfo.d';

const TrackInfo = (props: TTrackInfo) => {
  const { album, name, artists } = props;
  return (
    <div className={styles.root}>
      <div className={styles.albumArt}>
        <img src={album.images[0].url} alt={album.name} className={styles.img} />
      </div>
      <div className={styles.info}>
        <span className={styles.songName}>{name}</span>
        <span className={styles.artists}>
          {artists.map((artist, index) => {
            return (
              <span key={artist.id}>
                <Link
                  to={`/artist/${artist.id}`}
                  className={classNames(stylesLink.root, stylesLink['theme-defaultUnderline'])}
                >
                  {artist.name}
                </Link>
                {index < artists.length - 1 && ', '}
              </span>
            );
          })}
        </span>
      </div>
    </div>
  );
};

export default TrackInfo;
