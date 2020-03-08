import * as React from 'react';
import { ButtonProps } from './Button.d';

import classNames from 'classnames';
import styles from './Button.module.scss';

const Button = ({ text, themes = ['green', 'uppercase'], children }: ButtonProps): JSX.Element => {
  return (
    <button
      className={classNames(
        styles.root,
        themes.reduce(
          (classes: string, theme: string) => (classes += `${styles[`theme-${theme}`]} `),
          ' '
        ),
        'js-focus-visible'
      )}
    >
      {text || children}
    </button>
  );
};

export default Button;
