import axios from 'axios';
import { Dispatch } from 'redux';
import * as actions from './actions';
import * as videoActions from '../Video/actions';

import { SearchParams } from './index.d';

const search = (params: SearchParams) => (dispatch: Dispatch): void => {
  axios({
    url: '/api/search',
    method: 'get',
    params
  })
    .then(response => {
      const { data } = response;

      dispatch(actions.getArtistAction(data));
    })
    .catch(e => {
      console.error(e);
    });
};

const searchVideoTrack = (params: SearchParams) => (dispatch: Dispatch): void => {
  axios({
    url: '/api/search',
    method: 'get',
    params: {
      ...params,
      type: 'track',
      count: 1
    }
  })
    .then(response => {
      const { data } = response;

      dispatch(videoActions.getTopVideoTrack(data));
    })
    .catch(e => {
      console.error(e);
    });
};

export { search, searchVideoTrack };
