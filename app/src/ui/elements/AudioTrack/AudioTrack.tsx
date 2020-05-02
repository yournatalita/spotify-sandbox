import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import classNames from 'classnames';

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

const AudioTrack = ({ duration, playedPosition, onChange }: AudioTrackProps): JSX.Element => {
  const [changing, setChanging] = useState(false);
  const [changingPositionManually, setChangingPositionManually] = useState(false);
  const [playedWidth, setPlayedWidth] = useState(
    duration - playedPosition > 100 ? ((playedPosition / duration) * 100).toFixed(3) : 0
  );

  useEffect(() => {
    if (!changing) {
      setPlayedWidth(
        duration - playedPosition > 100 ? ((playedPosition / duration) * 100).toFixed(3) : 0
      );
    }
  }, [playedPosition, duration, changing]);

  return (
    <div className={styles.root}>
      <div className={styles.trackContainer}>
        {!!duration && <div className={styles.timeMoved}>{renderTime(playedPosition)}</div>}
        <div
          className={classNames(styles.track, changingPositionManually ? styles.trackChanging : '')}
        >
          <Slider
            defaultValue={Number(playedWidth)}
            value={Number(playedWidth)}
            step={0.1}
            onChange={(position): void => {
              setChangingPositionManually(true);
              setPlayedWidth(position);
              setChanging(true);
            }}
            onAfterChange={(position): void => {
              setChangingPositionManually(false);
              const targetPosition = Number((duration * (position / 100)).toFixed(0));
              onChange(targetPosition);

              setTimeout(() => {
                setChanging(false);
              }, 1000);
            }}
          />
        </div>
        {!!duration && <div className={styles.timeAll}>{duration && renderTime(duration)}</div>}
      </div>
    </div>
  );
};

export default AudioTrack;
