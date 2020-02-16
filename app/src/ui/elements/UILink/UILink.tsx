import * as React from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';

import { IUILinkProps } from './UILink.d';

import styles from './UILink.module.scss';

const ExternalLink = ({ themes, children, href, target = '_blank' }: IUILinkProps): JSX.Element => {
  return (
    <a
      target={target}
      className={classNames(
        styles.root,
        themes.reduce(
          (classes: string, theme: string) => (classes += `${styles[`theme-${theme}`]} `),
          ''
        )
      )}
      href={href}
    >
      {children}
    </a>
  );
};

const UILink = ({ external, themes, href, to, children }: IUILinkProps): JSX.Element => {
  if (external) {
    return (
      <ExternalLink themes={themes} href={href}>
        {children}
      </ExternalLink>
    );
  }

  return (
    <Link
      to={to || href || '/'}
      className={classNames(
        styles.root,
        themes.reduce(
          (classes: string, theme: string) => (classes += `${styles[`theme-${theme}`]} `),
          ''
        )
      )}
    >
      {children}
    </Link>
  );
};

export default UILink;
