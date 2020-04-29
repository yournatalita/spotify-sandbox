import axios from 'axios';
import { Dispatch } from 'redux';
import { IRequest } from '../declarations';

import { TPlayerState } from './index.d';

import * as actions from './actions';
import * as globalActions from '../Global/actions';

const play = (options: IRequest) => () => {
  const { params, data } = options;

  axios({
    url: 'api/play',
    method: 'put',
    params,
    data
  }).catch(e => {
    console.error(e);
  });
};

const pause = (options: IRequest) => () => {
  const { params, data } = options;

  axios({
    url: 'api/pause',
    method: 'put',
    params,
    data
  }).catch(e => {
    console.error(e);
  });
};

const playNext = (options: IRequest) => () => {
  const { params, data } = options;

  axios({
    url: 'api/play/next',
    method: 'post',
    params,
    data
  }).catch(e => {
    console.error(e);
  });
};

const playPrev = (options: IRequest) => () => {
  const { params, data } = options;

  axios({
    url: 'api/play/prev',
    method: 'post',
    params,
    data
  }).catch(e => {
    console.error(e);
  });
};

const setState = (state: TPlayerState) => (dispatch: Dispatch) => {
  const { track_window, paused } = state;
  dispatch(actions.setStateAction(state));
  const id = !paused ? track_window.current_track.id || undefined : '';

  dispatch(
    globalActions.setPlayedTrackIdAction({
      playedTrackId: id
    })
  );
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

export { play, getState, getRecent, pause, setState, playNext, playPrev };
