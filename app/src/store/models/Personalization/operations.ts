import axios from 'axios';
import { Dispatch } from 'redux';

import { IRequest } from '../declarations.d';

import * as actions from './actions';

const getPersonalization = (options: IRequest) => (dispatch: Dispatch) => {
  axios(options)
    .then(response => {
      const { data } = response;
      if (data && data.items && data.items[0].type === 'artist') {
        dispatch(actions.getPersonalizationArtists(data));
      } else {
        dispatch(actions.getPersonalizationTracks(data));
      }
    })
    .catch(e => {
      console.error(e);
    });
};

export { getPersonalization };
