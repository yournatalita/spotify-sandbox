import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { set } from 'idb-keyval';

import { ReactComponent as ArrowLeft } from '../../../assets/icons/arrow-left.svg';
import { SwiperInstance } from 'react-id-swiper';

import Artist from '../Artist/Artist';
import Button from '../../elements/Button/Button';
import Slider, { getStyles as getStylesSlider } from '../../components/Slider/Slider';
import Radio from '../../elements/Radio/Radio';

import { MainProps } from '../../../pages/main.d';
import {
  ArtistsListProps,
  ChangeTermEvent,
  TSliderRenderProps,
  ArtistsProps
} from './ArtistsLists.d';
import styles from './ArtistsLists.module.scss';

import { operationsPersonalization } from '../../../store/models/Personalization';
import { operationsVideo } from '../../../store/models/Video/index';

const PREFIX = 'ArtistsLists';

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

const getArrow = (_value: TSliderRenderProps, type: string): JSX.Element => {
  const stylesSlider = getStylesSlider();

  return (
    <div
      className={classNames(
        stylesSlider.buttonWrapper,
        type === 'next' ? stylesSlider.buttonWrapperNext : stylesSlider.buttonWrapperPrev
      )}
    >
      <Button
        themes={['blackArrow', `blackArrow-${type}`]}
        title={type === 'next' ? 'Вперёд' : 'Назад'}
        mix={type === 'next' ? 'js-swiper-next' : 'js-swiper-prev'}
      >
        <ArrowLeft />
      </Button>
    </div>
  );
};

const setTermDB = (term: string): void => {
  set(`${PREFIX}_term`, term);
};

const ArtistsLists = (props: ArtistsListProps): JSX.Element => {
  const { artists, getPersonalization, setRangeChosenArtists } = props;
  const { checkedRange } = artists || {};
  const { items } = (artists && artists[checkedRange || '']) || {};
  let swiperInstance: SwiperInstance;

  const getSlides = (): JSX.Element[] | undefined => {
    if (items && items.length > 0) {
      return items.map((artist: ArtistsProps) => (
        <div key={artist.id} className={styles.item}>
          <Artist
            artist={artist}
            onHover={(): void => {
              if (swiperInstance) swiperInstance.update();
            }}
          />
        </div>
      ));
    }

    return undefined;
  };

  return (
    <>
      {artists && (
        <div className={styles.root}>
          <div className={styles.filter}>
            <div className={styles.filterItem}>
              <Radio
                name={'artists'}
                value={'short_term'}
                checked={checkedRange === 'short_term'}
                themes={['grayButton']}
                onChange={(): void => {
                  if (!artists['short_term']) {
                    getArtistsTerm({ getPersonalization, ...{ term: 'short_term' } });
                  } else if (setRangeChosenArtists) {
                    setRangeChosenArtists('short_term');
                  }

                  setTermDB('short_term');
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
                themes={['grayButton']}
                onChange={(): void => {
                  if (!artists['medium_term']) {
                    getArtistsTerm({ getPersonalization, ...{ term: 'medium_term' } });
                  } else if (setRangeChosenArtists) {
                    setRangeChosenArtists('medium_term');
                  }

                  setTermDB('medium_term');
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
                themes={['grayButton']}
                onChange={(): void => {
                  if (!artists['long_term']) {
                    getArtistsTerm({ getPersonalization, ...{ term: 'long_term' } });
                  } else if (setRangeChosenArtists) {
                    setRangeChosenArtists('long_term');
                  }

                  setTermDB('long_term');
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
                  rebuildOnUpdate: true,
                  navigation: {
                    nextEl: '.js-swiper-next',
                    prevEl: '.js-swiper-prev'
                  },
                  getSwiper: (swiper): void => {
                    swiperInstance = swiper;
                  },
                  renderPrevButton: (renderProps: TSliderRenderProps): JSX.Element =>
                    getArrow(renderProps, 'prev'),
                  renderNextButton: (renderProps: TSliderRenderProps): JSX.Element =>
                    getArrow(renderProps, 'next')
                }}
              >
                {getSlides()}
              </Slider>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: MainProps): ArtistsListProps => {
  return {
    artists: state && state.personalization && state.personalization.artists
  };
};

const mapDispatchToProps = {
  ...operationsPersonalization,
  ...operationsVideo
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistsLists);
