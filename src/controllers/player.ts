import axios from 'axios';

import { TPlayer } from './player.d';

export const play = ({ accessToken, req, res, data }: TPlayer): void => {
  const { deviceId } = data;

  axios
    .put(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, data, {
      headers: { Authorization: 'Bearer ' + accessToken },
      params: { device_id: deviceId }
    })
    .then(response => {
      const { data } = response;

      res.status(200).send(data);
    })
    .catch(error => {
      // TODO: remove debugging
      console.log('fail', error.response.status, error.response.data);

      res.status(error.response.status).send(error);
    });
};

export const getState = ({ accessToken, req, res, data }: TPlayer): void => {
  axios
    .get(`https://api.spotify.com/v1/me/player`, {
      headers: { Authorization: 'Bearer ' + accessToken },
    })
    .then(response => {
      const { data } = response;

      res.status(200).send(data);
    })
    .catch(error => {
      // TODO: remove debugging
      console.log('fail', error);

      res.status(error.response.status).send(error);
    });
};

export const getRecentlyPlayed = ({ accessToken, req, res, params }: TPlayer): void => {
  axios
    .get(`https://api.spotify.com/v1/me/player/recently-played`, {
      headers: { Authorization: 'Bearer ' + accessToken },
    })
    .then(response => {
      const { data } = response;

      res.status(200).send(data);
    })
    .catch(error => {
      // TODO: remove debugging
      console.log('fail', error.response);

      res.status(error.response.status).send(error.response);
    });
};
