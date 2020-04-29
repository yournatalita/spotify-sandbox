import React from 'react';

import { AudioTrackProps } from './AudioTrack.d';

import styles from './AudioTrack.module.scss';

const renderTime = (valueInMs: number): string => {
  const seconds = valueInMs / 1000;
  if (seconds < 61) {
    return Math.floor(seconds) > 9 ? `0:${Math.floor(seconds)}` : `0:0${Math.floor(seconds)}`;
  }

  const mins = Math.floor(seconds / 60);
  const secsAfterMins = seconds - mins * 60;

  return Math.floor(secsAfterMins) > 9
    ? `${mins}:${Math.floor(secsAfterMins)}`
    : `${mins}:0${Math.floor(secsAfterMins)}`;
};

const AudioTrack = ({ duration, playedPosition }: AudioTrackProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.trackContainer}>
        <div className={styles.timeMoved}>{renderTime(playedPosition)}</div>
        <div className={styles.track}>
          <span
            className={styles.trackMoved}
            style={{
              width:
                duration - playedPosition > 100
                  ? `${((playedPosition / duration) * 100).toFixed(3)}%`
                  : `0%`
            }}
          />
        </div>
        <div className={styles.timeAll}>{duration && renderTime(duration)}</div>
      </div>
    </div>
  );
};

export default AudioTrack;
