import {Request, Response} from "express";

type Query = {
  q?: string;
  id?: string | number;
}

type TVideo = {
  req?: Request;
  res?: Response;
  params?: Query;
};

export interface VideoInterface {
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
