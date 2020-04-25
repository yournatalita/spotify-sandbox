import React from 'react';
import { connect } from 'react-redux';

import { MainProps } from '../../../pages/main.d';
import { TrackDispatchProps, TrackProps } from './Track.d';

import { ReactComponent as IconPlay } from '../../../assets/icons/play.svg';
// import { ReactComponent as IconStop } from '../../../assets/icons/stop.svg';

import { operationsGlobal } from '../../../store/models/Global';
import { operationsPlayer } from '../../../store/models/Player';

import Tooltip from '../../elements/Tooltip/Tooltip';
import Button from '../../elements/Button/Button';

import styles from './Track.module.scss';

const playTrack = ({ track, play, deviceId }: Partial<TrackProps>) => {
  const { uri } = track || {};

  if (play && track && uri) {
    play(
      {
        data: {
          uris: [uri],
          deviceId
        }
      },
      track
    );
  }
};

const Track = ({ track, play, setPlayedTrackId, deviceId }: TrackProps): JSX.Element => {
  const { id, name, artists, album, explicit } = track;

  return (
    <div className={styles.root}>
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
            onClick={() => {
              setPlayedTrackId(id);
              playTrack({ track, deviceId, play });
            }}
          >
            <span className={styles.tooltipTrigger}>
              <Tooltip
                position="top"
                theme={'dark'}
                offset={'0,10'}
                delay={[1000, 0]}
                content="Play the track"
                trigger="mouseenter focus"
              >
                <IconPlay />
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
                delay={[1000, 0]}
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
    deviceId: state && state.global ? state.global.deviceId : undefined
  };
};

const mapDispatchToProps = {
  ...operationsGlobal,
  ...operationsPlayer
};

export default connect(mapStateToProps, mapDispatchToProps)(Track);
