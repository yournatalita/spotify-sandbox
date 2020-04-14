import React, { useState } from 'react';

import { TTrack } from './Track.d';
import { ReactComponent as IconPlay } from '../../../assets/icons/play.svg';
import { ReactComponent as IconNoMusic } from '../../../assets/icons/no-music.svg';

import Tooltip from '../../elements/Tooltip/Tooltip';
import Button from '../../elements/Button/Button';

import styles from './Track.module.scss';

const Track = ({ track }: TTrack): JSX.Element => {
  const [hovered, setHovered] = useState(false);
  const { name, artists, album, explicit, preview_url } = track;

  return (
    <div
      className={styles.root}
      onMouseEnter={(): void => {
        setHovered(true);
      }}
      onMouseLeave={(): void => {
        setHovered(false);
      }}
    >
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
                root: styles.play
              }}
              themes={['black']}
              type="button"
            >
              <IconPlay />
            </Button>
            {preview_url && hovered && (
              <audio
                src={preview_url}
                autoPlay={true}
                onPlay={e => {
                  console.log(e.currentTarget.duration);
                }}
                onTimeUpdate={e => {
                  console.log(e.currentTarget.currentTime);
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
