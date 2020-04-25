import axios from 'axios';
import { TPersonalization } from './personalization.d';


export const getPersonalization = ({
  accessToken,
  req,
  res,
  options,
  params
}: TPersonalization): void => {
  const { typePath } = options;
  const { limit, offset, time_range } = params;
  axios
    .get(`https://api.spotify.com/v1/me/top/${typePath}`, {
      headers: { Authorization: 'Bearer ' + accessToken },
      params: { limit, offset, time_range }
    })
    .then(response => {
      const { data } = response;

      res.status(200).send(data);
    })
    .catch(error => {
      // TODO: remove debugging
      console.log('fail', error.response.status, error.response.data);

      res.status(error.rsesponse.status).send();
    });
};
