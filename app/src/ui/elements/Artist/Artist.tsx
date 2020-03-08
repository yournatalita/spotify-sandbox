import * as React from 'react';
import { usePalette } from 'react-palette';

import { ArtistsProps } from './Artist.d';
import styles from './Artist.module.scss';

const Artist = ({ genres, id, images, name, popularity, href }: ArtistsProps): JSX.Element => {
  const { data } = usePalette(images[0].url);
  const darkVibrant = { '--darkVibrant': data.darkVibrant } as React.CSSProperties;
  const lightVibrant = { '--lightVibrant': data.lightVibrant } as React.CSSProperties;

  return (
    <>
      {data && data.lightVibrant && (
        <div className={styles.root} style={lightVibrant}>
          <a href={href} className={styles.wrapper} style={darkVibrant}>
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
            {popularity > 80 && <div className={styles.hot}>trending</div>}
            <ul className={styles.genres}>
              {genres.map(
                (genre: string, index: number): JSX.Element => {
                  return (
                    <li key={`${id}_${genre}`} className={styles.itemGenre}>
                      {genre}
                      {index < genres.length - 1 && ','}
                    </li>
                  );
                }
              )}
            </ul>
          </a>
        </div>
      )}
    </>
  );
};

export default Artist;
