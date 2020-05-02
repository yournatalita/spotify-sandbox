import axios from 'axios';
import { Dispatch } from 'redux';

import * as actions from './actions';

const getArtist = (id: string) => (dispatch: Dispatch): void => {
  axios({
    url: '/api/artist',
    method: 'get',
    params: {
      id
    }
  })
    .then(response => {
      const { data } = response;

      dispatch(actions.getArtistAction(data));
    })
    .catch(e => {
      console.error(e);
    });
};

export { getArtist };
