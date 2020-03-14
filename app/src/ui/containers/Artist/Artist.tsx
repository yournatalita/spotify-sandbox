import React, { useState } from 'react';
import { connect } from 'react-redux';

import YouTube from 'react-youtube';
import { usePalette } from 'react-palette';
import classNames from 'classnames';

import { ArtistsProps, ArtistStateProps } from './Artist.d';
import { StoreInterface } from '../../../store/index.d';
import { operationsVideo } from '../../../store/models/Video/index';

import styles from './Artist.module.scss';

const Artist = ({
  genres,
  id,
  images,
  name,
  popularity,
  video,
  getTopVideo
}: ArtistsProps): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const [videoPlayed, setVideoPlayed] = useState(false);

  const { data } = usePalette(images[0].url);
  const topVideo = video && video.top;
  const topVideoId =
    topVideo &&
    topVideo.sources &&
    topVideo.sources.find((item: any) => item.source === 'youtube').source_data;

  const darkVibrant = {
    '--darkVibrant': data.darkVibrant || data.darkMuted || data.muted || data.vibrant
  } as React.CSSProperties;
  const lightVibrant = {
    '--lightVibrant': data.lightVibrant || data.lightMuted || data.muted || data.vibrant
  } as React.CSSProperties;

  return (
    <>
      {data && lightVibrant && (
        <div
          className={classNames(
            styles.root,
            expanded && styles.hovered,
            expanded && topVideoId && styles.videoShowing,
            videoPlayed && topVideoId && styles.videoPlayed
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
            setExpanded(true);
          }}
          onMouseLeave={(): void => {
            setVideoPlayed(false);
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
            {topVideoId && expanded && (
              <div className={styles.video}>
                <YouTube
                  className={styles.ytWrapper}
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
                      start: 20,
                      autoplay: 1
                    }
                  }}
                  onPlay={() => {
                    setVideoPlayed(true);
                  }}
                />
              </div>
            )}
          </div>
          <div className={styles.background}>
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

const mapStateToProps = (state: StoreInterface): ArtistStateProps => {
  return {
    video: state.video
  };
};

const mapDispatchToProps = {
  ...operationsVideo
};

export default connect(mapStateToProps, mapDispatchToProps)(Artist);
