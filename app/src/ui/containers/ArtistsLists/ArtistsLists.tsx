import React from 'react';
import { connect } from 'react-redux';

import Artist from '../../elements/Artist/Artist';
import Slider from '../../components/Slider/Slider';
import Radio from '../../elements/Radio/Radio';

import { MainProps } from '../../../pages/main.d';
import { ArtistsListProps, ChangeTermEvent } from './ArtistsLists.d';
import styles from './ArtistsLists.module.scss';
import { operationsPersonalization } from '../../../store/models/Personalization';

const changeArtistsTerm = ({ getPersonalization, term }: ChangeTermEvent) => {
  getPersonalization &&
    getPersonalization({
      url: '/api/personalization',
      method: 'get',
      params: {
        typePath: 'artists',
        limit: 30,
        offset: 0,
        time_range: term
      }
    });
};

const ArtistsLists = (props: ArtistsListProps): JSX.Element => {
  const { artists, getPersonalization } = props;
  const { items, timeRange } = artists || {};

  return (
    <div className={styles.root}>
      <div className={styles.filter}>
        <div className={styles.filterItem}>
          <Radio
            name={'artists'}
            value={'short_term'}
            checked={timeRange === 'short_term'}
            themes={['underlined', 'uppercase', 'whiteText']}
            onChange={(): void => {
              changeArtistsTerm({ getPersonalization, ...{ term: 'short_term' } });
            }}
          >
            <span>Recent</span>
          </Radio>
        </div>
        <div className={styles.filterItem}>
          <Radio
            name={'artists'}
            value={'medium_term'}
            checked={timeRange === 'medium_term'}
            themes={['underlined', 'uppercase', 'whiteText']}
            onChange={(): void => {
              changeArtistsTerm({ getPersonalization, ...{ term: 'medium_term' } });
            }}
          >
            <span>6 months</span>
          </Radio>
        </div>
        <div className={styles.filterItem}>
          <Radio
            name={'artists'}
            value={'long_term'}
            checked={timeRange === 'long_term'}
            themes={['underlined', 'uppercase', 'whiteText']}
            onChange={(): void => {
              changeArtistsTerm({ getPersonalization, ...{ term: 'long_term' } });
            }}
          >
            <span>Past year</span>
          </Radio>
        </div>
      </div>
      <div className={styles.list}>
        {items && items.length && (
          <Slider
            params={{
              direction: 'horizontal',
              slidesPerView: 'auto',
              spaceBetween: 20,
              freeMode: true,
              mousewheel: true,
              rebuildOnUpdate: true
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

const mapStateToProps = (state: MainProps): ArtistsListProps => {
  return {
    artists: state && state.personalization ? state.personalization.artists : {}
  };
};

const mapDispatchToProps = {
  ...operationsPersonalization
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsLists);
