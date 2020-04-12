import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { get } from 'idb-keyval';

import MainLayout from '../ui/containers/MainLayout/MainLayout';
import Sidebar from '../ui/containers/Sidebar/Sidebar';

import { MainProps } from './main.d';
import { operationsPersonalization } from '../store/models/Personalization';

const getTermDB = (key: string): Promise<string> => {
  return get(key);
};

const Main = ({ getPersonalization }: MainProps): JSX.Element => {
  useEffect(() => {
    let term = '';

    getTermDB('ArtistsLists_term')
      .then((value): void => {
        // TODO: remove debugging
        console.log('then', term, value);
        term = value || 'short_term';
      })
      .finally(() => {
        // TODO: remove debugging
        console.log(term);
        getPersonalization({
          url: '/api/personalization',
          method: 'get',
          params: {
            typePath: 'artists',
            limit: 30,
            offset: 0,
            time_range: term || 'short_term'
          }
        });
        getPersonalization({
          url: '/api/personalization',
          method: 'get',
          params: {
            typePath: 'tracks',
            limit: 30,
            offset: 0,
            time_range: term || 'short_term'
          }
        });
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
