import { BrowserHistoryBuildOptions } from 'history';
// @ts-ignore
import { SpotifyApi } from '@types/spotify-api';

type Router = {
  location?: BrowserHistoryBuildOptions;
  action?: string;
}

type PersinalizationItem =  {
  short_term?: SpotifyApi.CursorBasedPagingObject<SpotifyApi.ArtistObjectFull>;
  long_term?: SpotifyApi.CursorBasedPagingObject<SpotifyApi.ArtistObjectFull>;
  medium_term?: SpotifyApi.CursorBasedPagingObject<SpotifyApi.ArtistObjectFull>;
}

export interface Personalization {
  artists?: SpotifyApi.CursorBasedPagingObject<SpotifyApi.ArtistObjectFull>;
  tracks?: SpotifyApi.CursorBasedPagingObject<SpotifyApi.TrackObjectFull>;
}

interface VideoBlockInterface {
  id: string;
  production_status: string;
  song_title: string;
  song_slug: string;
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
}

export interface Video {
  top?: VideoBlockInterface | null;
}

export interface StoreInterface {
  router?: Router;
  personalization?: Personalization;
  video?: Video;
}
