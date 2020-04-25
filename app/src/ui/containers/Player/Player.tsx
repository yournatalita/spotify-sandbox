import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';

// @ts-ignore
import makeAsyncScriptLoader from 'react-async-script';

import { operationsGlobal } from '../../../store/models/Global';

import styles from './Player.module.scss';

import { MainProps } from '../../../pages/main.d';
import { StateProps, DispatchProps, SpotifyPlayerProps } from './Player.d';

const setPlayerListeners = (player: SpotifyPlayerProps): void => {
  player.addListener('initialization_error', ({ message }) => {
    console.error(message);
  });
  player.addListener('authentication_error', ({ message }) => {
    console.error(message);
  });
  player.addListener('account_error', ({ message }) => {
    console.error(message);
  });
  player.addListener('playback_error', ({ message }) => {
    console.error(message);
  });
  player.addListener('player_state_changed', state => {
    console.log(state);
  });
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
  });
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });
};

const initWebPlayback = (player: SpotifyPlayerProps, token: string): void => {
  (window as any).onSpotifyWebPlaybackSDKReady = (): void => {
    player = new (window as any).Spotify.Player({
      name: 'Spotify Sandbox Test',
      getOAuthToken: (cb: (token: string) => void): void => {
        cb(token);
      }
    });

    setPlayerListeners(player);

    player.connect();
  };
};

const Player: FunctionComponent<StateProps & DispatchProps> = props => {
  const { getToken } = props;
  let player: SpotifyPlayerProps;

  if (getToken) {
    getToken().then((token: string) => {
      initWebPlayback(player, token);
    });
  }

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>Player</div>
    </div>
  );
};

const mapStateToProps = (state: MainProps): StateProps => {
  return {
    global: state && state.global
  };
};

const mapDispatchToProps: DispatchProps = {
  ...operationsGlobal
};

export default makeAsyncScriptLoader('https://sdk.scdn.co/spotify-player.js')(
  connect(mapStateToProps, mapDispatchToProps)(Player)
);
