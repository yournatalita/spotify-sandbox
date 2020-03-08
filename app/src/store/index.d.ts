import { BrowserHistoryBuildOptions } from 'history';
// @ts-ignore
import { SpotifyApi } from '@types/spotify-api';

type Router = {
  location?: BrowserHistoryBuildOptions;
  action?: string;
}

export interface Personalization {
  artists?: SpotifyApi.CursorBasedPagingObject<SpotifyApi.ArtistObjectFull>;
  tracks?: SpotifyApi.CursorBasedPagingObject<SpotifyApi.TrackObjectFull>;
}

export interface StoreInterface {
  router?: Router;
  personalization?: Personalization;
}
