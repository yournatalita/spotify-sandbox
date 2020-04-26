import axios from 'axios';
import { Dispatch } from 'redux';
import { IRequest } from '../declarations';

import { TTrack } from './index.d';

import * as actions from './actions';

const play = (options: IRequest, track: TTrack) => (dispatch: Dispatch) => {
  const { params, data } = options;

  axios({
    url: 'api/play',
    method: 'put',
    params,
    data
  })
    .then(() => {
      dispatch(actions.playAction(track));
    })
    .catch(e => {
      console.error(e);
    });
};

const getState = () => (): void => {
  axios({
    url: '/api/player/state',
    method: 'get'
  })
    .then(response => {
      // TODO: remove debugging
      console.log(response.data);
    })
    .catch(e => {
      console.error(e);
    });
};

const getRecent = () => (dispatch: Dispatch): void => {
  axios({
    url: '/api/player/recent',
    method: 'get'
  })
    .then(response => {
      const { data } = response;
      const { items } = data;

      dispatch(actions.getRecentAction(items[0].track));
    })
    .catch(e => {
      console.error(e);
    });
};

export { play, getState, getRecent };
