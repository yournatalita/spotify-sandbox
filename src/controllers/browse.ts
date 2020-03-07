import { TBrowse } from './browse.d';
import axios, { AxiosResponse } from 'axios';

const sendRecommendationRequest = ({ accessToken, res, params }: TBrowse): void => {
  axios
    .get('https://api.spotify.com/v1/recommendations', {
      headers: { Authorization: 'Bearer ' + accessToken }
    })
    .then(response => {
      const { data } = response;
    })
    .catch(response => {});
};


export const getRecommendationsGenres = ({ accessToken }: TBrowse): Promise<AxiosResponse> =>
  new Promise((resolve, reject) => {
    axios
      .get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
        headers: { Authorization: 'Bearer ' + accessToken }
      })
      .then(response => {
        resolve(response);
      })
      .catch(response => reject(response));
  });


export const getRecommendations = ({ accessToken, req, res }: TBrowse): void => {
  const { seed_artists, seed_tracks } = req.query || {};
  let { seed_genres } = req.query || {};

  if (!seed_artists || seed_genres || seed_tracks) {
    getRecommendationsGenres({ accessToken })
      .then(response => {
        const { status, data } = response;
        const { genres } = data || {};
        const params = { seed_artists, seed_genres, seed_tracks };

        if (genres) seed_genres = genres.join(',');

        sendRecommendationRequest({ accessToken, res, params });
      })
      .catch(response => {
        const { status, data } = response;

        res.status(status).send(data);
      });
  } else {
    const params = { seed_artists, seed_genres, seed_tracks };

    sendRecommendationRequest({ accessToken, res, params });
  }
};
