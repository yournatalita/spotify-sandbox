import axios from 'axios';

import { TPlayer } from './player.d';

export const play = ({
  accessToken,
  req,
  res,
  params,
  data
}: TPlayer): void => {
  const { deviceId } = data;

  axios
    .put(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, data, {
      headers: { Authorization: 'Bearer ' + accessToken },
      params: { device_id: deviceId },
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
