export const InjectArray = function(items, item) {
  let newItems = items.slice()

  for(let i=0; i < items.length-1; i++) {
    newItems.splice(i * 2 + 1, 0, item)
  }

  return newItems;
}
