/**
  This helper provides CRUD methods to work with localStorage as with remove API

  All the methods (except 'delete') accept `schema` and return Promise.
  More about schemas: https://github.com/paularmstrong/normalizr
*/
import _ from 'lodash';
import {normalize} from 'normalizr';
import localStorageApi from './localStorage';

const api = {
  _buildEndpoint: (endpoint) => `apedyashev-react-calendar-app/${endpoint}`,
  _checkEndpoint: (endpoint) => {
    if (!_.isString(endpoint)) {
      throw new Error('endpoint must be specified');
    }
  },

  // created a new entity
  post: ({endpoint, data, schema}) => {
    api._checkEndpoint(endpoint);
    if (!_.isPlainObject(data)) {
      throw new Error('data must be a plain object');
    }

    const prefixedEndpoint = api._buildEndpoint(endpoint);
    const newItem = localStorageApi.addItemToCollection(prefixedEndpoint, data);

    return Promise.resolve({response: normalize(newItem, schema)});
  },

  // update existing entity
  put: ({endpoint, data, schema}) => {
    api._checkEndpoint(endpoint);
    if (!_.isPlainObject(data) || !data.id) {
      throw new Error('data must be a plain object and have the id field');
    }

    const prefixedEndpoint = api._buildEndpoint(endpoint);
    const item = localStorageApi.updateItemInCollection(prefixedEndpoint, data);
    if (!item) {
      return Promise.reject({error: `Item ${data.id} not found in ${endpoint}`});
    }

    return Promise.resolve({response: normalize(item, schema)});
  },

  // read the data
  get: ({endpoint, schema, query}) => {
    api._checkEndpoint(endpoint);

    const prefixedEndpoint = api._buildEndpoint(endpoint);
    const dataFromLs = localStorageApi.fetchCollection(prefixedEndpoint, query);
    if (!dataFromLs) {
      const error = query ? `Nothing found in ${endpoint} for ${JSON.stringify(query)} query` :
        `Nothing found in ${endpoint}`;
      return Promise.reject({error});
    }

    return Promise.resolve({response: normalize(dataFromLs, schema)});
  },

  // delete an entity by ID
  delete: ({endpoint, id}) => {
    api._checkEndpoint(endpoint);

    const prefixedEndpoint = api._buildEndpoint(endpoint);
    const isDeleted = localStorageApi.delete(prefixedEndpoint, id);

    return isDeleted ? Promise.resolve({response: {id}}) : Promise.reject({error: `Item ${id} was not found in ${endpoint}`});
  },
};

export default api;
