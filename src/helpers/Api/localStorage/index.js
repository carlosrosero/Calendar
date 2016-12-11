import _ from 'lodash';

const localStorageApi = {
  addItemToCollection: (collectionName, item) => {
    item.id = _.uniqueId(+(new Date()));

    // read the cillection from localStorage and add a new item to it
    const collectionStrData = localStorage.getItem(collectionName);
    const collection = JSON.parse(collectionStrData) || [];
    collection.push(item);
    localStorage.setItem(collectionName, JSON.stringify(collection));

    return item;
  },
};

export default localStorageApi;
