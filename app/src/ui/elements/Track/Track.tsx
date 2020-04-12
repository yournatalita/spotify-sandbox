import * as React from 'react';

import { TTrack } from './Track.d';

import { ReactComponent as IconPlay } from '../../../assets/icons/play.svg';
import Button from '../Button/Button';

import styles from './Track.module.scss';

const Track = ({ track }: TTrack): JSX.Element => {
  const { name, artists, album, explicit } = track;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.image}>
          <img
            className={styles.img}
            src={album.images[1].url}
            title={album.name}
            alt={album.name}
          />
          {explicit && <span className={styles.explicit}>E</span>}
          <Button
            externalStyles={{
              root: styles.play
            }}
            type="button"
            title={'play'}
          >
            <IconPlay />
          </Button>
        </div>
        <div className={styles.info}>
          <div className={styles.name}>{name}</div>
          <div className={styles.artists}>
            {artists.map((artist, index) => {
              return (
                <span key={artist.id}>
                  <span className={styles.artist}>{artist.name}</span>
                  {index < artists.length - 1 && ', '}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
