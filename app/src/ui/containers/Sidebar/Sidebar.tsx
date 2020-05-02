import * as React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { ReactComponent as IconDisk } from '../../../assets/icons/disk.svg';

import styles from './Sidebar.module.scss';
import stylesLink from '../../elements/UILink/UILink.module.scss';

const Sidebar = (): JSX.Element => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.main}>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <NavLink
                className={classNames(stylesLink.root, stylesLink['theme-grayButton'], styles.link)}
                to={'/main'}
                activeClassName={styles.active}
              >
                <IconDisk className={styles.icon} />
                My library
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
