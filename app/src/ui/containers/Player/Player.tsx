import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';

// @ts-ignore
import makeAsyncScriptLoader from 'react-async-script';

import TrackInfo from '../../elements/TrackInfo/TrackInfo';
import Button from '../../elements/Button/Button';

import { ReactComponent as IconPlay } from '../../../assets/icons/play.svg';
import { ReactComponent as IconStop } from '../../../assets/icons/stop.svg';

import { operationsGlobal } from '../../../store/models/Global';
import { operationsPlayer } from '../../../store/models/Player';

import styles from './Player.module.scss';

import { MainProps } from '../../../pages/main.d';
import { StateProps, DispatchProps, SpotifyPlayerProps } from './Player.d';
import { TrackProps } from '../Track/Track.d';

const setPlayerListeners = (
  playerSpotify: SpotifyPlayerProps,
  dispatchProps: DispatchProps
): void => {
  const { setDeviceId, getRecent, setState } = dispatchProps;

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
    setState(state);
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

const playTrack = (
  { track, play, deviceId }: Partial<TrackProps>,
  state: Spotify.PlaybackState
): void => {
  const { uri } = track || {};

  if (play && track && uri) {
    play({
      data: {
        uris: [uri],
        deviceId,
        position_ms: state && state.paused ? state.position : 0
      }
    });
  }
};

const pauseTrack = ({ pause, deviceId }: Partial<TrackProps>) => {
  if (pause && deviceId) {
    pause({
      data: {
        deviceId
      }
    });
  }
};

const playNextTrack = ({ playNext, deviceId}: Partial<TrackProps>) => {
  if (playNext && deviceId) {
    playNext({
      data: {
        deviceId
      }
    });
  }
};

const playPrevTrack = ({ playPrev, deviceId }: Partial<TrackProps>) => {
  if (playPrev && deviceId) {
    playPrev({
      data: {
        deviceId
      }
    });
  }
};
const Player: FunctionComponent<StateProps & DispatchProps> = props => {
  const {
    getToken,
    setDeviceId,
    player,
    getState,
    setState,
    getRecent,
    global,
    play,
    playPrev,
    playNext,
    pause
  } = props;
  const { playedTrackId, deviceId } = global || {};
  const { track, state } = player || {};
  let playerSpotify: SpotifyPlayerProps;

  if (getToken && !(window as any).onSpotifyWebPlaybackSDKReady) {
    getToken().then((token: string) => {
      initWebPlayback(playerSpotify, token, { setDeviceId, getState, getRecent, setState });
    });
  }

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.artist}>{track && <TrackInfo {...track} />}</div>
        </div>
        <div className={styles.center}>
          <div className={styles.player}>
            <div className={styles.prevContainer}>
              <Button
                externalStyles={{
                  root: styles.stepPrev
                }}
                themes={['black']}
                type="button"
                onClick={(): void => {
                  playPrevTrack({ deviceId, playPrev });
                }}
              >
                <IconPlay />
              </Button>
            </div>
            <div className={styles.playContainer}>
              <Button
                externalStyles={{
                  root: styles.play
                }}
                themes={['black']}
                type="button"
                onClick={(): void => {
                  if (!playedTrackId) {
                    playTrack({ track, deviceId, play }, state);
                  } else {
                    pauseTrack({ track, deviceId, pause });
                  }
                }}
              >
                {playedTrackId && <IconStop />}
                {!playedTrackId && <IconPlay />}
              </Button>
            </div>
            <div className={styles.nextContainer}>
              <Button
                externalStyles={{
                  root: styles.stepNext
                }}
                themes={['black']}
                type="button"
                onClick={(): void => {
                  playNextTrack({ deviceId, playNext });
                }}
              >
                <IconPlay />
              </Button>
            </div>
          </div>
          <div className={styles.track}></div>
        </div>
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
