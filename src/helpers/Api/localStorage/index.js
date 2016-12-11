import _ from 'lodash';

const localStorageApi = {
  addItemToCollection: (collectionName, data) => {
    const id = _.uniqueId(+(new Date()));
    const item = {...data, id};

    // read the cillection from localStorage and add a new item to it
    const collectionStrData = localStorage.getItem(collectionName);
    const collection = JSON.parse(collectionStrData) || [];
    collection.push(item);
    localStorage.setItem(collectionName, JSON.stringify(collection));

    return item;
  },

  fetchCollection: (collectionName) => {
    const collectionStrData = localStorage.getItem(collectionName);
    const collection = JSON.parse(collectionStrData) || [];
    return collection;
  },
};

export default localStorageApi;
