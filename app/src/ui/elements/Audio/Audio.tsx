import React, { useState } from 'react';
import { AudioProps } from './Audio.d';

import classNames from 'classnames';
import styles from './Audio.module.scss';

const renderTime = (duration: number): JSX.Element => {
  const timeInSecs = Math.floor(duration);

  if (timeInSecs >= 60) {
    const mins = Math.floor(timeInSecs / 60);
    const diff = timeInSecs - mins * 60;
    const seconds = diff > 9 ? diff : `0${diff}`;
    return (
      <span>
        {mins}:{seconds}
      </span>
    );
  } else if (timeInSecs < 10) {
    return <span>0:0{timeInSecs}</span>;
  }

  return <span>0:{timeInSecs}</span>;
};

const Audio = ({
  externalStyles,
  src,
  onRefInit,
  onPause,
  cssColors,
  ...rest
}: AudioProps): JSX.Element => {
  const [playedPosition, setPlayedPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  return (
    <div
      className={classNames(styles.root, externalStyles && externalStyles.root)}
      style={cssColors?.lightMuted}
    >
      <audio
        src={src}
        ref={(audio): void => {
          onRefInit(audio);
        }}
        className={classNames(styles.audio, externalStyles && externalStyles.audio)}
        onLoadedMetadataCapture={(event): void => {
          setDuration(event.currentTarget.duration);
        }}
        onTimeUpdate={(e): void => {
          setPlayedPosition(e.currentTarget.currentTime);
        }}
        onEnded={(): void => {
          setPlayedPosition(0);
          if (onPause) onPause();
        }}
        {...rest}
      />
      {duration && (
        <div className={classNames(styles.track)} style={cssColors?.darkMuted}>
          <div
            className={styles.trackProgress}
            style={{
              width: `${((playedPosition / duration) * 100).toFixed(3)}%`
            }}
          />
          <div className={styles.time}>{renderTime(duration - playedPosition)}</div>
        </div>
      )}
    </div>
  );
};

export default Audio;
