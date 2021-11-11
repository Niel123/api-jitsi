import { FETCH_STORES} from './types';

export const fetchStores = () => dispatch => {
  fetch('/api/store')
    .then(res => res.json())
    .then(results =>
      dispatch({
        type: FETCH_STORES,
        payload: results
      })
    );
};


