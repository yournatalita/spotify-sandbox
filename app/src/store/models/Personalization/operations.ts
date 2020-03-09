import axios from 'axios';
import { Dispatch } from 'redux';

import { IRequest } from '../declarations.d';

import * as actions from './actions';

const getPersonalization = (options: IRequest) => (dispatch: Dispatch) => {
  axios(options)
    .then(response => {
      const { data } = response;
      if (data && data.items && data.items[0].type === 'artist') {
        dispatch(
          actions.getPersonalizationArtists({
            [options.params.time_range]: { ...data, timeRange: options.params.time_range },
            checkedRange: options.params.time_range
          })
        );
      } else {
        dispatch(
          actions.getPersonalizationTracks({
            [options.params.time_range]: { ...data, timeRange: options.params.time_range },
            checkedRange: options.params.time_range
          })
        );
      }
    })
    .catch(e => {
      console.error(e);
    });
};

const setRangeChosenArtists = (range: string) => (dispatch: Dispatch) => {
  dispatch(actions.setArtistsChosen(range));
};

export { getPersonalization, setRangeChosenArtists };
