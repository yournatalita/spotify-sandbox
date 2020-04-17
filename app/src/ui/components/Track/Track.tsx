import React from 'react';
import { usePalette } from 'react-palette';
import hexRgb from 'hex-rgb';

import { TTrack } from './Track.d';
import { ReactComponent as IconPlay } from '../../../assets/icons/play.svg';
import { ReactComponent as IconNoMusic } from '../../../assets/icons/no-music.svg';
import { ReactComponent as IconStop } from '../../../assets/icons/stop.svg';

import Audio from '../../elements/Audio/Audio';
import Tooltip from '../../elements/Tooltip/Tooltip';
import Button from '../../elements/Button/Button';

import styles from './Track.module.scss';

const getRgb = (hex?: string): string | undefined => {
  if (hex) {
    const array = hexRgb(hex, { format: 'array' });
    return `${array[0]}, ${array[1]}, ${array[2]}`;
  }

  return undefined;
};

const Track = ({ track, onPlay, onPause, playedTrackId }: TTrack): JSX.Element => {
  const { id, name, artists, album, explicit, preview_url } = track;
  let audioRef: HTMLAudioElement | null = null;

  const dataColors = usePalette(album.images[1].url).data;
  const darkMuted = {
    '--darkMuted':
      getRgb(dataColors.darkMuted) ||
      getRgb(dataColors.muted) ||
      getRgb(dataColors.darkVibrant) ||
      getRgb(dataColors.vibrant)
  } as React.CSSProperties;
  const lightMuted = {
    '--lightMuted':
      getRgb(dataColors.lightMuted) ||
      getRgb(dataColors.lightVibrant) ||
      getRgb(dataColors.muted) ||
      getRgb(dataColors.vibrant)
  } as React.CSSProperties;

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
              root: styles.plus
            }}
            themes={['black']}
            type="button"
          >
            <span className={styles.tooltipTrigger}>
              <Tooltip
                position="top"
                theme={'dark'}
                offset={'0,10'}
                delay={[200, 0]}
                content="Add to Playlist"
                trigger="mouseenter focus"
              >
                <span>+</span>
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
        </div>
      </div>
      <div className={styles.audioContainer}>
        {preview_url && (
          <div className={styles.preview}>
            <Button
              externalStyles={{
                root: playedTrackId === id ? styles.playActive : styles.play
              }}
              themes={['black']}
              type="button"
              onClick={(): void => {
                if (audioRef && playedTrackId !== id) {
                  audioRef.play().then(() => {
                    onPlay(id);
                  });
                } else if (audioRef) {
                  audioRef.pause();
                  onPause();
                }
              }}
            >
              {playedTrackId !== id && <IconPlay />}
              {playedTrackId === id && <IconStop />}
            </Button>
            {preview_url && (
              <Audio
                src={preview_url}
                autoPlay={false}
                onRefInit={(audio): void => {
                  audioRef = audio;
                }}
                cssColors={{
                  darkMuted,
                  lightMuted
                }}
              />
            )}
          </div>
        )}
        {!preview_url && (
          <Tooltip
            position="right"
            theme={'dark'}
            offset={'0,20'}
            distance={0}
            delay={[200, 0]}
            content="No preview available"
            trigger="mouseenter focus"
          >
            <div className={styles.noPreview}>
              <span className={styles.noPreviewIcon}>
                <IconNoMusic />
              </span>
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default Track;
