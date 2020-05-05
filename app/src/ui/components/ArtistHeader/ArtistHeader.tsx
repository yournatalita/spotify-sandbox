import React, { useState, useEffect } from 'react';
import hexRgb from 'hex-rgb';
import classNames from 'classnames';
import { usePalette } from 'react-palette';
import YouTube from 'react-youtube';

import { ArtistProps } from './ArtistHeader.d';

import Track from '../../containers/Track/Track';

import styles from './ArtistHeader.module.scss';

const VIDEO_PLAYER_DURATION = 150;

const getRgb = (hex?: string): string | undefined => {
  if (hex) {
    const array = hexRgb(hex, { format: 'array' });
    return `${array[0]}, ${array[1]}, ${array[2]}`;
  }

  return undefined;
};

const ArtistHeader = ({
  artist,
  video,
  onVideoError,
  onVideoStop,
  onVideoPlay
}: ArtistProps): JSX.Element => {
  const [videoTiming, setVideoTiming] = useState({ start: 0, end: 0 });
  const [videoPlayed, setVideoPlayed] = useState(false);

  const { images, name, genres, popularity, followers, id } = artist;
  const { artistSpotifyId, track } = video?.top || {};

  const topVideoId =
    video && video.top?.sources?.find((item: any) => item.source === 'youtube')?.source_data;
  const colors = usePalette(images[0].url).data;

  useEffect(() => {
    if (!artist || !video?.loaded || artist.id !== artistSpotifyId) {
      setVideoPlayed(false);
    }
  }, [artist, video, artistSpotifyId]);

  const darkVibrant = {
    '--darkVibrant':
      getRgb(colors.darkVibrant) ||
      getRgb(colors.darkMuted) ||
      getRgb(colors.muted) ||
      getRgb(colors.vibrant)
  } as React.CSSProperties;
  const lightVibrant = {
    '--lightVibrant':
      getRgb(colors.lightVibrant) ||
      getRgb(colors.lightMuted) ||
      getRgb(colors.muted) ||
      getRgb(colors.vibrant)
  } as React.CSSProperties;

  return (
    <>
      {lightVibrant && (
        <div
          className={classNames(styles.root, videoPlayed ? styles.isPlaying : '')}
          style={lightVibrant}
        >
          <div className={styles.wrapper}>
            <img src={images[0].url} alt={name} className={styles.background} />
            {video && artistSpotifyId === id && (
              <div className={styles.video}>
                <YouTube
                  className={classNames(styles.ytWrapper)}
                  videoId={topVideoId}
                  opts={{
                    height: '100%',
                    width: '100%',
                    playerVars: {
                      controls: 0,
                      playsinline: 1,
                      disablekb: 0,
                      modestbranding: 1,
                      rel: 0,
                      showinfo: 0,
                      start: videoTiming.start,
                      end: videoTiming.end,
                      autoplay: videoTiming.start === videoTiming.end ? 0 : 1
                    }
                  }}
                  onReady={(event): void => {
                    const { target } = event;
                    const duration = target.getDuration();
                    const start = duration / 5;
                    const end =
                      start + VIDEO_PLAYER_DURATION > duration
                        ? duration - 20
                        : start + VIDEO_PLAYER_DURATION;

                    target.mute();

                    setVideoTiming({ start, end });
                  }}
                  onError={(): void => {
                    setVideoTiming({ start: 0, end: 0 });
                    setVideoPlayed(false);
                    onVideoError();
                  }}
                  onPlay={(): void => {
                    setVideoPlayed(true);
                    onVideoPlay();
                  }}
                  onEnd={(): void => {
                    setVideoPlayed(false);
                    onVideoStop();
                  }}
                />
              </div>
            )}
            <div className={styles.gradient} />
            <div className={styles.container} style={darkVibrant}>
              <div className={styles.image}>
                <img src={images[0].url} alt={name} className={styles.img} />
              </div>
              <h1 className={styles.title}>{name}</h1>
              <div className={styles.genres}>
                <ul className={styles.genresList}>
                  {popularity && popularity > 80 && (
                    <li className={classNames(styles.trending, styles.genreItem)}>trending</li>
                  )}
                  {genres.map((genre, index) => {
                    return (
                      <li key={`${genre}${index}`} className={styles.genreItem}>
                        {genre}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={styles.followers}>
                {followers.total.toLocaleString('Ru')} followers
              </div>
              {track && artistSpotifyId === id && (
                <div className={styles.topTrack}>
                  <Track track={track} listUris={[track.uri]} themes={['transparent', 'inside']} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArtistHeader;
