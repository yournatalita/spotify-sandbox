import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { set } from 'idb-keyval';

import { ReactComponent as ArrowLeft } from '../../../assets/icons/arrow-left.svg';

import Button from '../../elements/Button/Button';
import Slider, { getStyles as getStylesSlider } from '../../components/Slider/Slider';

import { MainProps } from '../../../pages/main.d';
import { TracksListsProps, TSliderRenderProps, TTrack, ChangeTermEvent } from './TracksLists.d';
import styles from './TracksLists.module.scss';
import { operationsPersonalization } from '../../../store/models/Personalization';
import Track from '../../components/Track/Track';
import Radio from '../../elements/Radio/Radio';

const getTracksTerm = ({ getPersonalization, term }: ChangeTermEvent) => {
  getPersonalization &&
    getPersonalization({
      url: '/api/personalization',
      method: 'get',
      params: {
        typePath: 'tracks',
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

const PREFIX = 'TracksLists';

const setTermDB = (term: string): void => {
  set(`${PREFIX}_term`, term);
};

const TracksLists = (props: TracksListsProps): JSX.Element => {
  const { tracks, getPersonalization, setRangeChosenTracks } = props;
  const { checkedRange } = tracks || {};
  const { items } = tracks[checkedRange] || {};

  return (
    <div className={styles.root}>
      <div className={styles.filter}>
        <div className={styles.filterItem}>
          <Radio
            name={'tracks'}
            value={'short_term'}
            checked={checkedRange === 'short_term'}
            themes={['underlined', 'uppercase', 'whiteText']}
            onChange={(): void => {
              if (!tracks['short_term']) {
                getTracksTerm({ getPersonalization, ...{ term: 'short_term' } });
              } else if (setRangeChosenTracks) {
                setRangeChosenTracks('short_term');
              }

              setTermDB('short_term');
            }}
          >
            <span>Recent</span>
          </Radio>
        </div>
        <div className={styles.filterItem}>
          <Radio
            name={'tracks'}
            value={'medium_term'}
            checked={checkedRange === 'medium_term'}
            themes={['underlined', 'uppercase', 'whiteText']}
            onChange={(): void => {
              if (!tracks['medium_term']) {
                getTracksTerm({ getPersonalization, ...{ term: 'medium_term' } });
              } else if (setRangeChosenTracks) {
                setRangeChosenTracks('medium_term');
              }

              setTermDB('medium_term');
            }}
          >
            <span>6 months</span>
          </Radio>
        </div>
        <div className={styles.filterItem}>
          <Radio
            name={'tracks'}
            value={'long_term'}
            checked={checkedRange === 'long_term'}
            themes={['underlined', 'uppercase', 'whiteText']}
            onChange={(): void => {
              if (!tracks['long_term']) {
                getTracksTerm({ getPersonalization, ...{ term: 'long_term' } });
              } else if (setRangeChosenTracks) {
                setRangeChosenTracks('long_term');
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
              slidesPerView: 'auto',
              slidesOffsetBefore: 40,
              slidesOffsetAfter: 60,
              slidesPerColumnFill: 'column',
              slidesPerColumn: 2,
              spaceBetween: 20,
              freeMode: true,
              mousewheel: true,
              rebuildOnUpdate: true,
              navigation: {
                nextEl: '.js-swiper-next',
                prevEl: '.js-swiper-prev'
              },
              renderPrevButton: (renderProps: TSliderRenderProps): JSX.Element =>
                getArrow(renderProps, 'prev'),
              renderNextButton: (renderProps: TSliderRenderProps): JSX.Element =>
                getArrow(renderProps, 'next')
            }}
          >
            {items &&
              items.length &&
              items.map((track: TTrack) => {
                return (
                  <div key={track.id} className={styles.item}>
                    <Track track={track} />
                  </div>
                );
              })}
          </Slider>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: MainProps): TracksListsProps => {
  return {
    tracks: state && state.personalization ? state.personalization.tracks : {}
  };
};

const mapDispatchToProps = {
  ...operationsPersonalization
};

export default connect(mapStateToProps, mapDispatchToProps)(TracksLists);
