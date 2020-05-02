import React, { ComponentType } from 'react';
import { connect } from 'react-redux';

import ArtistPage from '../ui/containers/ArtistPage/ArtistPage';
import Sidebar from '../ui/containers/Sidebar/Sidebar';
import Player from '../ui/containers/Player/Player';

import { DispatchProps, StateProps } from './artist.d';
import { operationsPersonalization } from '../store/models/Personalization';

const Artist: ComponentType<DispatchProps & StateProps> = () => {
  return (
    <main className="Main">
      <div className={'Main__Sidebar'}>
        <Sidebar />
      </div>
      <div className={'Main__MainLayout'}>
        <ArtistPage />
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

export default connect(mapStateToProps, mapDispatchToProps)(Artist);
