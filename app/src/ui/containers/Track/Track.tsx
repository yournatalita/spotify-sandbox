import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { MainProps } from '../../../pages/main.d';
import { TrackDispatchProps, TrackProps, PlayerProps } from './Track.d';

import { ReactComponent as IconPlay } from '../../../assets/icons/play.svg';
import { ReactComponent as IconStop } from '../../../assets/icons/stop.svg';

import { operationsGlobal } from '../../../store/models/Global';
import { operationsPlayer } from '../../../store/models/Player';

import Tooltip from '../../elements/Tooltip/Tooltip';
import Button from '../../elements/Button/Button';

import styles from './Track.module.scss';

const playTrack = (
  { track, play, deviceId }: Partial<TrackProps>,
  player: PlayerProps,
  listUris: string[]
) => {
  const { uri, id } = track || {};
  const { state } = player || {};
  const playerTrackId = player && player.track && player.track.id;

  if (play && track && uri) {
    play({
      data: {
        uris: listUris,
        deviceId,
        offset: {
          uri
        },
        position_ms: state && state.position && playerTrackId === id ? state.position : 0
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

const Track = ({
  track,
  play,
  player,
  pause,
  playedTrackId,
  deviceId,
  listUris
}: TrackProps): JSX.Element => {
  const { id, name, artists, album, explicit } = track;

  return (
    <div className={classNames(styles.root, playedTrackId === id && styles.played)}>
      <div className={styles.container}>
        <div className={styles.image}>
          <img
            className={styles.img}
            src={album.images[1].url}
            title={album.name}
            alt={album.name}
          />
          {explicit && <span className={styles.explicit}>E</span>}
          <Button
            externalStyles={{
              root: styles.play
            }}
            themes={['black']}
            type="button"
            onClick={(): void => {
              if (!playedTrackId || playedTrackId !== id) {
                playTrack({ track, deviceId, play }, player, listUris);
              } else {
                pauseTrack({ track, pause, deviceId });
              }
            }}
          >
            <span className={styles.tooltipTrigger}>
              <Tooltip
                position="top"
                theme={'dark'}
                offset={'0,10'}
                delay={[5000, 0]}
                content={playedTrackId !== id ? 'Play' : 'Pause'}
                trigger="mouseenter focus"
              >
                <>
                  {(!playedTrackId || playedTrackId !== id) && <IconPlay />}
                  {playedTrackId && playedTrackId === id && <IconStop />}
                </>
              </Tooltip>
            </span>
          </Button>
        </div>
        <div className={styles.info}>
          <div className={styles.name}>{name}</div>
          <div className={styles.artists}>
            {artists.map((artist, index) => {
              return (
                <span key={artist.id}>
                  <span className={styles.artist}>{artist.name}</span>
                  {index < artists.length - 1 && ', '}
                </span>
              );
            })}
          </div>
          <Button
            externalStyles={{
              root: styles.plus
            }}
            themes={['']}
            type="button"
          >
            <span className={styles.tooltipTrigger}>
              <Tooltip
                position="top"
                theme={'dark'}
                offset={'0,10'}
                delay={[2000, 0]}
                content="Add to playlist"
                trigger="mouseenter focus"
              >
                <span>+</span>
              </Tooltip>
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: MainProps): TrackDispatchProps => {
  return {
    playedTrackId: state && state.global ? state.global.playedTrackId : undefined,
    deviceId: state && state.global ? state.global.deviceId : undefined,
    player: state && state.player ? state.player : undefined
  };
};

const mapDispatchToProps = {
  ...operationsGlobal,
  ...operationsPlayer
};

export default connect(mapStateToProps, mapDispatchToProps)(Track);
