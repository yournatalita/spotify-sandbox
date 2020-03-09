import React from 'react';
import { connect } from 'react-redux';

import Artist from '../../elements/Artist/Artist';
import Slider from '../../components/Slider/Slider';
import Radio from '../../elements/Radio/Radio';

import { MainProps } from '../../../pages/main.d';
import { ArtistsListProps, ChangeTermEvent } from './ArtistsLists.d';
import styles from './ArtistsLists.module.scss';
import { operationsPersonalization } from '../../../store/models/Personalization';

const getArtistsTerm = ({ getPersonalization, term }: ChangeTermEvent) => {
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
  const { artists, getPersonalization, setRangeChosenArtists } = props;
  const { checkedRange } = artists || {};
  const { items } = artists[checkedRange] || {};

  return (
    <div className={styles.root}>
      <div className={styles.filter}>
        <div className={styles.filterItem}>
          <Radio
            name={'artists'}
            value={'short_term'}
            checked={checkedRange === 'short_term'}
            themes={['underlined', 'uppercase', 'whiteText']}
            onChange={(): void => {
              if (!artists['short_term']) {
                getArtistsTerm({ getPersonalization, ...{ term: 'short_term' } });
              } else if (setRangeChosenArtists) {
                setRangeChosenArtists('short_term');
              }
            }}
          >
            <span>Recent</span>
          </Radio>
        </div>
        <div className={styles.filterItem}>
          <Radio
            name={'artists'}
            value={'medium_term'}
            checked={checkedRange === 'medium_term'}
            themes={['underlined', 'uppercase', 'whiteText']}
            onChange={(): void => {
              if (!artists['medium_term']) {
                getArtistsTerm({ getPersonalization, ...{ term: 'medium_term' } });
              } else if (setRangeChosenArtists) {
                setRangeChosenArtists('medium_term');
              }
            }}
          >
            <span>6 months</span>
          </Radio>
        </div>
        <div className={styles.filterItem}>
          <Radio
            name={'artists'}
            value={'long_term'}
            checked={checkedRange === 'long_term'}
            themes={['underlined', 'uppercase', 'whiteText']}
            onChange={(): void => {
              if (!artists['long_term']) {
                getArtistsTerm({ getPersonalization, ...{ term: 'long_term' } });
              } else if (setRangeChosenArtists) {
                setRangeChosenArtists('long_term');
              }
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
