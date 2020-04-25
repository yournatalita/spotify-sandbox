import React from 'react';
import classNames from 'classnames';
import { RadioProps } from './Radio.d';
import styles from './Radio.module.scss';

const Radio = ({
  label = '',
  themes = [],
  value = '',
  name = '',
  onChange,
  checked = false,
  disabled = false,
  children
}: RadioProps): JSX.Element => {
  return (
    <label
      className={classNames(
        styles.root,
        themes.reduce(
          (classes: string, theme: string) => (classes += `${styles[`theme-${theme}`]} `),
          ' '
        ),
        {
          [styles.disabled]: disabled,
          [styles.checked]: checked
        }
      )}
    >
      <input
        className={styles.input}
        value={value}
        name={name}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
        type="radio"
      />
      <span className={styles.text}>{label || children}</span>
    </label>
  );
};

export default Radio;
