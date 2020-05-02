import React, { ComponentType, useEffect } from 'react';
import { connect } from 'react-redux';
import { get } from 'idb-keyval';

import MainLayout from '../ui/containers/MainLayout/MainLayout';
import Sidebar from '../ui/containers/Sidebar/Sidebar';
import Player from '../ui/containers/Player/Player';

import { DispatchProps, StateProps } from './main.d';
import { operationsPersonalization } from '../store/models/Personalization';

const getTermDB = (key: string): Promise<string> => {
  return get(key);
};

const Main: ComponentType<DispatchProps & StateProps> = ({ getPersonalization }) => {
  useEffect(() => {
    let termArtist = '';
    let termTracks = '';

    getTermDB('ArtistsLists_term')
      .then((value): void => {
        termArtist = value || 'short_term';
      })
      .finally(() => {
        getPersonalization({
          url: '/api/personalization',
          method: 'get',
          params: {
            typePath: 'artists',
            limit: 30,
            offset: 0,
            time_range: termArtist || 'short_term'
          }
        });
      });

    getTermDB('TracksLists_term')
      .then(value => {
        termTracks = value || 'short_term';
      })
      .finally(() => {
        getPersonalization({
          url: '/api/personalization',
          method: 'get',
          params: {
            typePath: 'tracks',
            limit: 30,
            offset: 0,
            time_range: termTracks || 'short_term'
          }
        });
      });
  }, [getPersonalization]);

  return (
    <main className="Main">
      <div className={'Main__Sidebar'}>
        <Sidebar />
      </div>
      <div className={'Main__MainLayout'}>
        <MainLayout />
      </div>
      <div className={'Main__Player'}>
        <Player />
      </div>
    </main>
  );
};

const mapStateToProps = (state: StateProps): StateProps => {
  return {
    router: state.router
  };
};

const mapDispatchToProps = {
  ...operationsPersonalization
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
