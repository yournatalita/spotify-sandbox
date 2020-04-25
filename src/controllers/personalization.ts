import * as tracksController from './tracks';
import { TPersonalization } from './personalization.d';
import { TrackProps } from '../controllers/tracks.d';
import axios from 'axios';

const relinkTracks = (accessToken: string, track: TrackProps): TrackProps => {
  const { preview_url, id } = track;

  if (track && preview_url) {
    return track;
  }

  // TODO: remove debugging
  console.log(accessToken);

  tracksController
    .getTrackById({ accessToken, params: { id, market: '' } })
    .then(data => {
      // TODO: remove debugging
      console.log(data.name, preview_url !== null);
      return data;
    })
    .catch(() => {
      return track;
    });
};

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

      if (typePath === 'tracks') {
        const { items } = data;
        let newItems = [];

        items.forEach((track: TrackProps) => {
          newItems.push(relinkTracks(accessToken, track));
        });
      }

      res.status(200).send(data);
    })
    .catch(error => {
      // TODO: remove debugging
      console.log('fail', error.response.status, error.response.data);

      res.status(error.response.status).send();
    });
};
