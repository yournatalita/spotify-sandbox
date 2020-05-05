import axios from 'axios';

import {
  ArtistObjectSimplified,
  SearchParams,
  SpotifySearchAnswer,
  TrackObjectFull,
  TSearch
} from './search.d';

const getOneValueById = (
  data: SpotifySearchAnswer,
  { type, id }: SearchParams
): TrackObjectFull | null => {
  if (type === 'track') {
    const { tracks } = data;

    if (tracks) {
      return tracks.items.find(
        (item): ArtistObjectSimplified => {
          const artists = item.artists;
          return artists.find(artist => artist.id === id);
        }
      );
    }
  }

  return null;
};

export const search = ({ accessToken, req, res, params }: TSearch): void => {
  const { q, type, id, count } = params || {};

  axios
    .get(`https://api.spotify.com/v1/search?q=${q}&type=${type}`, {
      headers: { Authorization: 'Bearer ' + accessToken }
    })
    .then(response => {
      const { data } = response;

      if (id && count && Number(count) === 1) {
        res.status(200).send(getOneValueById(data, { type, id, q }));
      } else {
        res.status(200).send(data);
      }
    })
    .catch(error => {
      // TODO: remove debugging
      console.log('fail', error.response.status, error.response.data);

      res.status(error.response.status).send(error);
    });
};
