import { TUser } from './user.d';
import request from 'request';

export const getUser = ({ accessToken, req, res }: TUser) => {
  request.get(
    {
      url: 'https://api.spotify.com/v1/me',
      headers: { Authorization: 'Bearer ' + accessToken },
      json: true
    },
    (error, response, body) => {
      res.status(200).send(body);
    }
  );
};
