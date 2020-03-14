// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const IMVDB_APP_KEY = 'ZS6iK4YJrOfv4WUASUgVHpDgRTNBr8WQyeT0hoXU';

import { TVideo, VideoInterface } from './videos.d';
import axios from 'axios';

const RANDOM_LAST = 10;

const randomInteger = (min: number, max: number) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const getVideoById = ({ req, res, params }: TVideo, video: VideoInterface): void => {
  const { id } = video;
  axios
    .get(`https://imvdb.com/api/v1/video/${id}`, {
      headers: { 'IMVDB-APP-KEY': IMVDB_APP_KEY },
      params: {
        include: 'sources'
      }
    })
    .then(response => {
      const { data } = response;

      res.status(200).send(data);
    })
    .catch(error => {
      // TODO: remove debugging
      console.log(error);
      res.status(error.response.status).send();
    });
};

const filterResultByArtist = (results: VideoInterface[], q: string): VideoInterface[] => {
  return results.filter((item: VideoInterface) => {
    let count = 0;

    if (item.artists) {
      item.artists.forEach(artist => {
        if (artist.name.toLowerCase() === q.toLowerCase()) {
          count = count + 1;
        }
      });
    }

    return count > 0;
  });
};

export const searchVideo = ({ req, res, params }: TVideo): void => {
  const { q } = params;
  const urlEncodedQuery = q.replace(' ', '+');

  axios
    .get(`http://imvdb.com/api/v1/search/videos`, {
      headers: { 'IMVDB-APP-KEY': IMVDB_APP_KEY },
      params: {
        q: urlEncodedQuery,
        include: 'sources'
      }
    })
    .then(response => {
      const { data } = response;
      const { results } = data || {};
      const resultOnlyThisArtist = filterResultByArtist(results, q);

      const compare = (current: VideoInterface, next: VideoInterface) => {
        if (current.year > next.year) {
          return -1;
        }

        if (current.year < next.year) {
          return 1;
        }

        return 0;
      };

      const sortedByYears =
        resultOnlyThisArtist && resultOnlyThisArtist.length
          ? resultOnlyThisArtist.sort(compare)
          : [];
      const targetIndex =
        RANDOM_LAST > sortedByYears.length - 1
          ? randomInteger(0, sortedByYears.length - 1)
          : randomInteger(0, RANDOM_LAST);

      if (sortedByYears.length) {
        getVideoById({ req, res }, sortedByYears[targetIndex]);
      } else {
        res.status(200).send(null);
      }
    })
    .catch(error => {
      // TODO: remove debugging
      console.log(error);
      res.status(error.response.status).send();
    });
};
