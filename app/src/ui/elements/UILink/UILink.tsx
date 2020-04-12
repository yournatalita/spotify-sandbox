import * as React from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';

import { UILinkProps } from './UILink.d';

import styles from './UILink.module.scss';
import stylesButton from '../../elements/Button/Button.module.scss';

const getClasses = ({ role, themes }: UILinkProps) => {
  return !role || role !== 'button'
    ? classNames(
        styles.root,
        themes.reduce(
          (classes: string, theme: string) => (classes += `${styles[`theme-${theme}`]} `),
          ''
        )
      )
    : classNames(
        stylesButton.root,
        themes.reduce(
          (classes: string, theme: string) => (classes += `${stylesButton[`theme-${theme}`]} `),
          ''
        )
      );
};

const ExternalLink = ({
  themes,
  role,
  children,
  href,
  target = '_blank'
}: UILinkProps): JSX.Element => {
  const classes = getClasses({ role, themes });

  return (
    <a target={target} className={classes} href={href}>
      {children}
    </a>
  );
};

const UILink = ({
  external,
  role,
  themes,
  href,
  to,
  children,
  ...rest
}: UILinkProps): JSX.Element => {
  const classes = getClasses({ role, themes });

  if (external) {
    return (
      <ExternalLink themes={themes} href={href} role={role} {...rest}>
        {children}
      </ExternalLink>
    );
  }

  return (
    <Link to={to || href || '/'} className={classes}>
      {children}
    </Link>
  );
};

export default UILink;
