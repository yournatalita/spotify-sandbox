import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';

// @ts-ignore
import makeAsyncScriptLoader from 'react-async-script';

import TrackInfo from '../../elements/TrackInfo/TrackInfo';
import { operationsGlobal } from '../../../store/models/Global';
import { operationsPlayer } from '../../../store/models/Player';

import styles from './Player.module.scss';

import { MainProps } from '../../../pages/main.d';
import { StateProps, DispatchProps, SpotifyPlayerProps } from './Player.d';

const setPlayerListeners = (
  playerSpotify: SpotifyPlayerProps,
  dispatchProps: DispatchProps
): void => {
  const { setDeviceId, getRecent } = dispatchProps;

  playerSpotify.addListener('initialization_error', ({ message }) => {
    console.error(message);
  });
  playerSpotify.addListener('authentication_error', ({ message }) => {
    console.error(message);
  });
  playerSpotify.addListener('account_error', ({ message }) => {
    console.error(message);
  });
  playerSpotify.addListener('playback_error', ({ message }) => {
    console.error(message);
  });
  playerSpotify.addListener('player_state_changed', state => {
    console.log(state);
  });
  playerSpotify.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);

    setDeviceId(device_id);
    getRecent();
  });
  playerSpotify.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });
};

const initWebPlayback = (
  playerSpotify: SpotifyPlayerProps,
  token: string,
  dispatchProps: DispatchProps
): void => {
  (window as any).onSpotifyWebPlaybackSDKReady = (): void => {
    playerSpotify = new (window as any).Spotify.Player({
      name: 'Spotify Sandbox Test',
      getOAuthToken: (cb: (token: string) => void): void => {
        cb(token);
      }
    });

    setPlayerListeners(playerSpotify, dispatchProps);

    playerSpotify.connect();
  };
};

const Player: FunctionComponent<StateProps & DispatchProps> = props => {
  const { getToken, setDeviceId, setPlayedTrackId, player, getState, getRecent } = props;
  const { track } = player || {};
  let playerSpotify: SpotifyPlayerProps;

  if (getToken) {
    getToken().then((token: string) => {
      initWebPlayback(playerSpotify, token, { setDeviceId, setPlayedTrackId, getState, getRecent });
    });
  }

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.artist}>{track && <TrackInfo {...track} />}</div>
        </div>
        <div className={styles.center}></div>
        <div className={styles.right}></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: MainProps): StateProps => {
  return {
    global: state && state.global,
    player: state && state.player
  };
};

const mapDispatchToProps: DispatchProps = {
  ...operationsGlobal,
  ...operationsPlayer
};

export default makeAsyncScriptLoader('https://sdk.scdn.co/spotify-player.js')(
  connect(mapStateToProps, mapDispatchToProps)(Player)
);
