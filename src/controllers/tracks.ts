import axios from 'axios';

import { TTracks } from './tracks.d';

export const getTrackById = ({
  accessToken,
  params
}: TTracks): Promise<any> => {
  return new Promise((resolve, reject) => {
    const { id } = params;

    axios
      .get(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: { Authorization: 'Bearer ' + accessToken },
        params: { id }
      })
      .then(response => {
        const { data } = response;

        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
