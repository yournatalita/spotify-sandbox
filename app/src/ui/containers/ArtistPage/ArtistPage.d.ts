import { Router } from '../../../store/index.d';

export type DispatchProps = {
  getArtist: (id: string) => void;
};

export type StateProps = {
  artist?: SpotifyApi.ArtistObjectFull;
  router?: Router;
};
