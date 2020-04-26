import React from 'react';

import styles from './TrackInfo.module.scss';

import { TTrackInfo } from './TrackInfo.d';

const TrackInfo = (props: TTrackInfo) => {
  const { album, name, artists } = props;
  return (
    <div className={styles.root}>
      <div className={styles.albumArt}>
        <img src={album.images[0].url} alt={album.name} className={styles.img} />
      </div>
      <div className={styles.info}>
        <div className={styles.songName}>{name}</div>
        <div className={styles.artists}>
          {artists.map((artist, index) => {
            if (index !== artists.length - 1) {
              return `${artist.name}, `;
            }

            return artist.name;
          })}
        </div>
      </div>
    </div>
  );
};

export default TrackInfo;
