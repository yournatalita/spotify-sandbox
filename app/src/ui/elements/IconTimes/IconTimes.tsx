import React from 'react';

import { TIconTimesProps } from './IconTimes.d';
import classNames from 'classnames';
import styles from './IconTimes.module.scss';

const IconTimes = ({ mix = '' }: TIconTimesProps): JSX.Element => {
  return <span className={classNames(styles.root, mix)}>&times;</span>;
};

export default IconTimes;
