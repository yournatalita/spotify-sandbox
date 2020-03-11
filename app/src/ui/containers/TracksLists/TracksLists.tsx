import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { ReactComponent as ArrowLeft } from '../../../assets/icons/arrow-left.svg';

import Button from '../../elements/Button/Button';
import Slider, { getStyles as getStylesSlider } from '../../components/Slider/Slider';

import { MainProps } from '../../../pages/main.d';
import { TracksListsProps, TSliderRenderProps } from './TracksLists.d';
import styles from './TracksLists.module.scss';
import { operationsPersonalization } from '../../../store/models/Personalization';

// const getTracksTerm = ({ getPersonalization, term }: ChangeTermEvent) => {
//   getPersonalization &&
//     getPersonalization({
//       url: '/api/personalization',
//       method: 'get',
//       params: {
//         typePath: 'tracks',
//         limit: 30,
//         offset: 0,
//         time_range: term
//       }
//     });
// };

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

const TracksLists = (props: TracksListsProps): JSX.Element => {
  const { tracks } = props;
  const { checkedRange } = tracks || {};
  const { items } = tracks[checkedRange] || {};

  console.log([items[0]]);
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
              items.map((track: any) => (
                <div key={track.id} className={styles.item}>
                </div>
              ))}
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
