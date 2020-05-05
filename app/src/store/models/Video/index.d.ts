import { Personalization, VideoBlockInterface } from '../../index.d';

export type TReducerReturn = {
  type: string;
  payload: Personalization;
};

export interface VideoReducerState {
  top: VideoBlockInterface | null;
}

export interface Video {
  id: string;
  artistSpotifyId?: string;
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

export type TopVideoData = {
  q: string;
  id?: string;
};
