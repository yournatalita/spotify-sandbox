import * as React from 'react';

import Artist from '../../elements/Artist/Artist';
import Slider from '../Slider/Slider';

import { ArtistsListProps } from './ArtistsLists.d';
import styles from './ArtistsLists.module.scss';

const ArtistsLists = (props: ArtistsListProps): JSX.Element => {
  const { artists } = props;
  const { items } = artists || {};
  return (
    <div className={styles.root}>
      <div className={styles.list}>
        {items && items.length && (
          <Slider
            params={{
              direction: 'horizontal',
              slidesPerView: 'auto',
              spaceBetween: 20,
              freeMode: true,
              mousewheel: true
            }}
          >
            {items &&
              items.length &&
              items.map((artist: any) => (
                <div key={artist.id} className={styles.item}>
                  <Artist {...artist} />
                </div>
              ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default ArtistsLists;
