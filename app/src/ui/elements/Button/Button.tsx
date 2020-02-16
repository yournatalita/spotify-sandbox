import * as React from 'react';
import { IButtonProps } from './Button.d';

import classNames from 'classnames';
import styles from './Button.module.scss';

const Button = ({ text, themes = ['green', 'uppercase'] }: IButtonProps): JSX.Element => {
  return (
    <button
      className={classNames(
        styles.root,
        themes.reduce(
          (classes: string, theme: string) => (classes += `${styles[`theme-${theme}`]} `),
          ''
        )
      )}
    >
      {text}
    </button>
  );
};

export default Button;
