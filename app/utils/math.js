import React from 'react';
import uuidv4 from '../utils/uuidv4';

export const InjectArray = function(items, item) {
  let newItems = items.slice()

  for(let i=0; i < items.length-1; i++) {
    let newItem = React.cloneElement(item, {key: uuidv4()});
    newItems.splice(i * 2 + 1, 0, newItem)
  }

  return newItems;
}
