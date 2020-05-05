import React, { ComponentType, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import useTimeout from 'use-timeout';

import ArtistHeader from '../../components/ArtistHeader/ArtistHeader';

import { operationsArtists } from '../../../store/models/Artists/index';
import { operationsVideo } from '../../../store/models/Video/index';
import { operationsSearch } from '../../../store/models/Search/index';

import { StoreInterface } from '../../../store/index.d';
import { DispatchProps, StateProps } from './ArtistPage.d';

import styles from './ArtistPage.module.scss';

const ArtistPage: ComponentType<DispatchProps & StateProps> = ({
  getArtist,
  clearArtist,
  removeTopVideo,
  getTopVideo,
  searchVideoTrack,
  router,
  artist,
  video
}) => {
  const [triedVideoGetTimes, setTriedVideoGetTimes] = useState(0);
  const [timeoutDelay, setTimeoutDelay] = useState<number | null>(null);
  const pathname = router?.location?.pathname;
  const id = pathname?.substring(pathname.lastIndexOf('/') + 1);

  useEffect(() => {
    if (id && pathname?.includes('artist') && (!artist || artist.id !== id)) {
      getArtist(id);
      setTimeoutDelay(null);
    } else if (!pathname?.includes('artist') || (artist && artist.id !== id)) {
      clearArtist();
      setTimeoutDelay(null);
      if (removeTopVideo) removeTopVideo();
    }
  }, [getArtist, pathname, artist, id, clearArtist, removeTopVideo]);

  useEffect(() => {
    return () => {
      clearArtist();
      setTimeoutDelay(null);
      if (removeTopVideo) removeTopVideo();
    };
  }, [clearArtist, setTimeoutDelay, removeTopVideo]);

  useEffect(() => {
    if (artist?.name && artist?.id === id) {
      getTopVideo({ q: artist?.name, id: artist?.id });
      setTriedVideoGetTimes(triedVideoGetTimes + 1);
    }
  }, [artist]);

  useTimeout(() => {
    if (video?.top && searchVideoTrack && artist) {
      searchVideoTrack({ id, q: `artist:${artist.name} track:${video.top.song_title}` });
    }
  }, timeoutDelay);

  return (
    <div className={styles.root}>
      {artist && (
        <div className={styles.container}>
          {artist && (
            <ArtistHeader
              artist={artist}
              video={video}
              onVideoPlay={() => {
                setTimeoutDelay(2000);
              }}
              onVideoError={() => {
                if (removeTopVideo) removeTopVideo();

                if (triedVideoGetTimes < 3) {
                  getTopVideo({ q: artist?.name, id: artist?.id });
                  setTriedVideoGetTimes(triedVideoGetTimes + 1);
                }
              }}
              onVideoStop={() => {
                if (removeTopVideo) removeTopVideo();
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: StoreInterface): StateProps => {
  return {
    artist: state.artists && state.artists.artist,
    router: state.router,
    video: state.video
  };
};

const mapDispatchToProps = {
  ...operationsArtists,
  ...operationsVideo,
  ...operationsSearch
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage);
