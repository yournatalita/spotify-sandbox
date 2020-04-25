import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { MainProps } from '../../../pages/main.d';
import { TrackDispatchProps, TrackProps } from './Track.d';

import { ReactComponent as IconPlay } from '../../../assets/icons/play.svg';
// import { ReactComponent as IconStop } from '../../../assets/icons/stop.svg';

import { operationsGlobal } from '../../../store/models/Global';

import Tooltip from '../../elements/Tooltip/Tooltip';
import Button from '../../elements/Button/Button';

import styles from './Track.module.scss';

const Track = ({ track, playedTrackId, setPlayedTrackId }: TrackProps): JSX.Element => {
  const { id, name, artists, album, explicit } = track;
  const [played, setPlayed] = useState(playedTrackId === id);

  useEffect(() => {
    if (played && playedTrackId && playedTrackId !== id) {
      setPlayedTrackId('');
      setPlayed(false);
    }
  }, [playedTrackId, id, setPlayedTrackId, played, setPlayed]);

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
    playedTrackId: state && state.global ? state.global.playedTrackId : undefined
  };
};

const mapDispatchToProps = {
  ...operationsGlobal
};

export default connect(mapStateToProps, mapDispatchToProps)(Track);
