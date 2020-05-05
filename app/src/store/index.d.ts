import { Location } from 'history';

/// <reference types="spotify-api" />

export type Router = {
  location?: Location;
  action?: string;
};

export interface PersonalizationItem<T> {
  short_term?: SpotifyApi.CursorBasedPagingObject<T>;
  short_term?: SpotifyApi.CursorBasedPagingObject<T>;
  medium_term?: SpotifyApi.CursorBasedPagingObject<T>;
  checkedRange: string;
}

export interface DataPropsPersonalization {
  artists?: PersinalizationItem<SpotifyApi.ArtistObjectFull>;
  tracks?: PersinalizationItem<SpotifyApi.TrackObjectFull>;
}

export interface Personalization extends DataPropsPersonalization {
  type?: string;
}

interface VideoBlockInterface {
  id: string;
  artistSpotifyId?: string;
  production_status: string;
  song_title: string;
  song_slug: string;
  sources: {
    source: string;
    source_slug: string;
    source_data: string;
    is_primary: boolean;
  }[];
  url: string;
  multiple_versions: boolean;
  version_name: string | null;
  version_number: number;
  is_imvdb_pick: boolean;
  aspect_ratio: string | null;
  year: number;
  verified_credits: boolean;
  image: {};
  artists: {
    name: string;
    slug: string;
    url: string;
    discogs_id: number;
  }[];
  track?: SpotifyApi.TrackObjectFull;
}

export interface Video {
  top?: VideoBlockInterface | null;
  loaded?: boolean;
}

export interface Global {
  playedTrackId?: string;
  deviceId?: string;
}

export interface Player {
  track?: SpotifyApi.SingleTrackResponse;
  state?: Spotify.PlaybackState;
}

export interface Artists {
  artist?: SpotifyApi.ArtistObjectFull;
}

export interface Search {

}

export interface StoreInterface {
  router?: Router;
  personalization?: Personalization;
  video?: Video;
  global?: Global;
  player?: PLayer;
  artists?: Artists;
  search?: Search;
}
