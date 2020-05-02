import axios from 'axios';

import { TArtist } from './artists.d';

export const getArtist = ({ accessToken, req, res, params }: TArtist): void => {
  const { id } = params;

  axios
    .get(`https://api.spotify.com/v1/artists/${id}`, {
      headers: { Authorization: 'Bearer ' + accessToken }
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
