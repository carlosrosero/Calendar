import _ from 'lodash';
import {normalize} from 'normalizr';
import localStorageApi from './localStorage';

const api = {
  buildEndpoint: (endpoint) => `react-calendar-app/${endpoint}`,
  // created a new entity
  post: ({endpoint, data, schema}) => {
    // TOOD: throw instead of reject?
    if (!_.isString(endpoint)) {
      return Promise.reject({error: 'endpoint must be specified'});
    }
    if (!_.isPlainObject(data)) {
      return Promise.reject({error: 'data must be a plain object'});
    }

    const prefixedEndpoint = api.buildEndpoint(endpoint);
    const newItem = localStorageApi.addItemToCollection(prefixedEndpoint, data);

    return Promise.resolve({response: normalize(newItem, schema)});
  },

  get: ({endpoint, schema, query}) => {
    if (!_.isString(endpoint)) {
      return Promise.reject({error: 'endpoint must be specified'});
    }

    const prefixedEndpoint = api.buildEndpoint(endpoint);
    const collection = localStorageApi.fetchCollection(prefixedEndpoint);

    return Promise.resolve({response: normalize(collection, schema)});
  },
};

export default api;
