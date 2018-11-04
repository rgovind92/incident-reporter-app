import axios from 'axios';
import config from '../config';
import {
  requestStart,
  requestEnd,
  requestError,
  requestNetworkError
} from '../actions';

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const processResponse = (response, dispatch) => { 
  dispatch(requestEnd());

  if (response instanceof Error) {
    return response;
  }
  else if (response.data) {
    if (response.data.errors) {
      const errors = response.data.errors;

      if (errors.ERROR) {
        // Work with only one error for now:
        dispatch(requestError(errors.ERROR[0]));
        return Promise.reject(errors.ERROR);
      }
    }
  }

  return response.data.results[0];
};

const handleNetworkError = (error, dispatch) => {  
  dispatch(requestEnd());
  dispatch(requestNetworkError(error.response));
};

const normalizeURL = url =>
  url[url.length - 1] === '/'
    ? url
    : url + '/';

export default ({ endpoint, body, dispatch }) => {
  dispatch(requestStart());

  const headers = { 'Content-Type': 'application/json' };
  headers[config.identityTokenKey] = config.identityTokenValue || config.anonymousToken;

  if (config.exclude && config.exclude.indexOf('sampleresponses') === -1) {
    return new Promise(function(resolve) {
      setTimeout(() => {
        resolve(processResponse(config.sampleresponses[
          endpoint.slice(endpoint.lastIndexOf('/')  + 1)
        ](body),
        dispatch));
      }, config.mockLatency);
    })
      .catch(errors => handleNetworkError(errors, dispatch));
  }
  else {
    return axios
      .post(normalizeURL(config.iCargoURL) + endpoint, body, { headers })
      .then(response => processResponse(response, dispatch))
      .catch(response => handleNetworkError(response, dispatch));
  }
};
