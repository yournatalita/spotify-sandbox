import React, { useState, ComponentType } from 'react';
import { connect } from 'react-redux';

import YouTube from 'react-youtube';
import { usePalette } from 'react-palette';
import hexRgb from 'hex-rgb';
import classNames from 'classnames';

import { ArtistStateProps, DispatchProps, StateProps } from './Artist.d';
import { StoreInterface } from '../../../store/index.d';
import { operationsVideo } from '../../../store/models/Video/index';
import { operationsPlayer } from '../../../store/models/Player/index';

import styles from './Artist.module.scss';

const VIDEO_PLAYER_DURATION = 60;

const getRgb = (hex?: string): string | undefined => {
  if (hex) {
    const array = hexRgb(hex, { format: 'array' });
    return `${array[0]}, ${array[1]}, ${array[2]}`;
  }

  return undefined;
};

const Artist: ComponentType<ArtistStateProps & DispatchProps & StateProps> = ({
  artist,
  video,
  getTopVideo,
  removeTopVideo,
  pause,
  deviceId,
  onHover
}) => {
  const { genres, id, images, name, popularity } = artist;
  const [expanded, setExpanded] = useState(false);
  const [videoPlayed, setVideoPlayed] = useState(false);
  const [playerTiming, setPlayerTiming] = useState({
    start: 0,
    end: 0
  });

  const { data } = usePalette(images[0].url);
  const topVideo = video && video.top;
  const topVideoId =
    topVideo &&
    topVideo.sources &&
    topVideo.sources.find((item: any) => item.source === 'youtube') &&
    topVideo.sources.find((item: any) => item.source === 'youtube').source_data;
  const songTitle = video && video.top && video.top.song_title;
  const year = video && video.top && video.top.year;

  const darkVibrant = {
    '--darkVibrant':
      getRgb(data.darkVibrant) ||
      getRgb(data.darkMuted) ||
      getRgb(data.muted) ||
      getRgb(data.vibrant)
  } as React.CSSProperties;
  const lightVibrant = {
    '--lightVibrant':
      getRgb(data.lightVibrant) ||
      getRgb(data.lightMuted) ||
      getRgb(data.muted) ||
      getRgb(data.vibrant)
  } as React.CSSProperties;

  return (
    <>
      {data && lightVibrant && (
        <div
          className={classNames(
            styles.root,
            expanded && styles.hovered,
            expanded &&
              topVideoId &&
              playerTiming.start !== playerTiming.end &&
              styles.videoPlaying,
            videoPlayed && topVideoId && styles.videoShowing
          )}
          style={lightVibrant}
          onMouseEnter={(): void => {
            if (getTopVideo) {
              getTopVideo({
                url: '/api/video',
                method: 'get',
                params: { q: name }
              });
            }

            onHover();
            setExpanded(true);
          }}
          onMouseLeave={(): void => {
            if (removeTopVideo) removeTopVideo();
            setVideoPlayed(false);
            onHover();
            setExpanded(false);
          }}
        >
          <div className={styles.wrapper} style={darkVibrant}>
            <div className={styles.imageIcon}>
              <img
                className={styles.image}
                alt={name}
                title={name}
                src={images[1].url}
                srcSet={`${images[1].url}, ${images[0].url} 2x`}
              />
            </div>
            <div className={styles.name}>{name}</div>
            <div className={styles.songTitle}>
              {topVideoId && expanded && songTitle}{' '}
              {topVideoId && expanded && year && <span>({year})</span>}
            </div>
            {popularity > 80 && <div className={styles.hot}>trending</div>}
            <ul className={styles.genres}>
              {genres.map(
                (genre: string, index: number): JSX.Element => {
                  return (
                    <li key={`${id}_${genre}`} className={styles.itemGenre}>
                      {genre}
                      {index < genres.length - 1 && ','}
                    </li>
                  );
                }
              )}
            </ul>
          </div>
          <div className={styles.background}>
            {topVideoId && expanded && (
              <div className={classNames(styles.video)}>
                <span className={styles.videoOverflow} />
                <YouTube
                  className={classNames(styles.ytWrapper)}
                  videoId={topVideoId}
                  opts={{
                    height: '100%',
                    width: '100%',
                    playerVars: {
                      controls: 0,
                      disablekb: 0,
                      modestbranding: 1,
                      rel: 0,
                      showinfo: 0,
                      start: playerTiming.start,
                      end: playerTiming.end,
                      autoplay: playerTiming.start !== playerTiming.end ? 1 : 0
                    }
                  }}
                  onReady={event => {
                    const duration = event.target.getDuration();
                    const videoQuarter = duration / 4;
                    const start = videoQuarter;
                    const end =
                      videoQuarter + VIDEO_PLAYER_DURATION > duration
                        ? duration
                        : videoQuarter + VIDEO_PLAYER_DURATION;

                    setPlayerTiming({ start, end });
                  }}
                  onError={(): void => {
                    if (removeTopVideo) removeTopVideo();
                    setVideoPlayed(false);
                  }}
                  onPlay={(): void => {
                    setVideoPlayed(true);

                    if (pause && deviceId) {
                      pause({
                        data: {
                          deviceId
                        }
                      });
                    }
                  }}
                  onEnd={(): void => {
                    setVideoPlayed(false);
                    if (removeTopVideo) removeTopVideo();
                  }}
                />
              </div>
            )}
            <img
              className={styles.backgroundImage}
              alt={name}
              title={name}
              src={images[1].url}
              srcSet={`${images[1].url}, ${images[0].url} 2x`}
            />
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: StoreInterface): StateProps => {
  return {
    video: state.video,
    player: state.player,
    deviceId: state.global && state.global.deviceId
  };
};

const mapDispatchToProps: DispatchProps = {
  ...operationsVideo,
  ...operationsPlayer
};

export default connect(mapStateToProps, mapDispatchToProps)(Artist);
