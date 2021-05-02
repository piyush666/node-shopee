import { Collection } from "mongoose";

export function commonQuery(collection, query) {
  if (query.sort) {
    var sortType = query.sortType == "asc" ? 1 : -1;
    collection.sort([[query.sort, sortType]]);
  }
  if (query.skip) {
    collection.skip(parseInt(query.skip));
  }
  if (query.limit) {
    collection.limit(parseInt(query.limit));
  }
  return collection;
}
