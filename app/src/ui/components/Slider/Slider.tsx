import * as React from 'react';
import Swiper from 'react-id-swiper';

import { SliderProps } from './Slider.d';
import styles from './Slider.module.scss';

const Slider = ({ params, children }: SliderProps): JSX.Element => {
  return (
    <div className={styles.root}>
      <Swiper {...params}>{children}</Swiper>
    </div>
  );
};

export default Slider;
