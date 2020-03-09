import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import MainLayout from '../ui/containers/MainLayout/MainLayout';
import Sidebar from '../ui/containers/Sidebar/Sidebar';

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

  return (
    <div className="Main">
      <div className={'Main__Sidebar'}>
        <Sidebar />
      </div>
      <div className={'Main__MainLayout'}>
        <MainLayout />
      </div>
    </div>
  );
};

const mapStateToProps = (state: MainProps): MainProps => state;

const mapDispatchToProps = {
  ...operationsPersonalization
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
