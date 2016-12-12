import _ from 'lodash';

const localStorageApi = {
  addItemToCollection: (collectionName, data) => {
    const id = _.uniqueId(+(new Date()));
    const item = {...data, id};

    // read the collection from localStorage and add a new item to it
    const collection = localStorageApi.fetchCollection(collectionName);
    collection.push(item);
    localStorage.setItem(collectionName, JSON.stringify(collection));

    return item;
  },

  updateItemInCollection: (collectionName, data) => {
    const collection = localStorageApi.fetchCollection(collectionName);
    const itemIndex = _.findIndex(collection, {id: data.id});
    if (itemIndex >= 0) {
      collection[itemIndex] = {...collection[itemIndex], ...data};
      localStorage.setItem(collectionName, JSON.stringify(collection));
      return collection[itemIndex];
    }
    return null;
  },

  fetchCollection: (collectionName, query) => {
    const collectionStrData = localStorage.getItem(collectionName);
    const collection = JSON.parse(collectionStrData) || [];
    return query ? _.filter(collection, query) : collection;
  },

  fetchById: (collectionName, id) => {
    const collection = localStorageApi.fetchCollection(collectionName);
    return _.find(collection, {id});
  },
};

export default localStorageApi;
