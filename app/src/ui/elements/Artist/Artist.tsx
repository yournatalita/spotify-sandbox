import * as React from 'react';
import { usePalette } from 'react-palette'

import { ArtistsProps } from './Artist.d';
import styles from './Artist.module.scss';

const Artist = ({ genres, id, images, name, popularity, href }: ArtistsProps): JSX.Element => {
  const { data } = usePalette(images[0].url);
  // TODO: remove debugging
  console.log({ genres, id, images, name, popularity, href });

  return (
    <div className={styles.root} style={{ backgroundColor: data.lightVibrant }}>
      <div className={styles.wrapper}>
        <div className={styles.imageIcon}>
          <img
            className={styles.image}
            alt={name}
            title={name}
            src={images[1].url}
            srcSet={`${images[1].url}, ${images[0].url} 2x`}
          />
        </div>
        <div className={styles.name}>{name}</div>
      </div>
    </div>
  );
};

export default Artist;
