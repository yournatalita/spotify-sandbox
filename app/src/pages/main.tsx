import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import MainLayout from '../ui/containers/MainLayout/MainLayout';

import { MainProps } from './main.d';
import { operationsPersonalization } from '../store/models/Personalization';

const Main = ({ getPersonalization }: MainProps): JSX.Element => {
  useEffect(() => {
    getPersonalization({
      url: '/api/personalization',
      method: 'get',
      params: {
        typePath: 'artists',
        limit: 30,
        offset: 0,
        time_range: 'short_term'
      }
    });
    getPersonalization({
      url: '/api/personalization',
      method: 'get',
      params: {
        typePath: 'tracks',
        limit: 30,
        offset: 0,
        time_range: 'short_term'
      }
    });
  }, [getPersonalization]);

  return <MainLayout />;
};

const mapStateToProps = (state: MainProps): MainProps => state;

const mapDispatchToProps = {
  ...operationsPersonalization
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
