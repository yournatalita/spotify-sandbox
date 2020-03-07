import * as React from 'react';

import { MainLayoutProps } from './MainLayout.d';
import styles from './MainLayout.module.scss';
import { connect } from 'react-redux';

const MainLayout = ({ personalization }: MainLayoutProps): JSX.Element => {
  // TODO: remove debugging
  console.log(personalization);
  return <div className={styles.root}>{}</div>;
};

const mapStateToProps = ({ personalization }: MainLayoutProps) => {
  return personalization;
};

export default connect(mapStateToProps)(MainLayout);
