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

export interface StoreInterface {
  router?: Router;
  personalization?: Personalization;
}
