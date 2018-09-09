import { fromEvent } from "graphcool-lib";

const createHash = itemCount => {
  let hashDigits = [];
  // dividend is a unique integer (number of links)
  let dividend = itemCount + 1;
  let remainder = 0;
  while (dividend > 0) {
    remainder = dividend % 62;
    dividend = Math.floor(dividend / 62);
    hashDigits.unshift(remainder);
  }
  console.log(hashDigits);
  const alphabetArray = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.split(
    ""
  );
  // Convert hashDigits to base62 representation
  let hashString = "";
  let i = 0;
  while (hashDigits.length > i) {
    hashString += alphabetArray[hashDigits[i]];
    i++;
  }
  return hashString;
};
module.exports = async event => {
  const { id } = event.data.Link.node;

  const graphcool = fromEvent(event);
  const api = graphcool.api("simple/v1");

  //  Get the link count.
  const getLinkCountQuery = `
      query GetLinkCountQuery {
          links: _allLinksMeta {
              count
          }
      }`;

  const linkCountQueryResult = await api.request(getLinkCountQuery);
  const linkCount = linkCountQueryResult.links.count;

  //  Get the hash.
  const hash = createHash(linkCount);

  //  Update the link with a hash.
  const updateLinkMutation = `
      mutation ($id: ID!, $hash: String!) {
          updateLink(id: $id, hash: $hash) {
              id  
          } 
      }`;

  const variables = { id, hash };
  await api.request(updateLinkMutation, variables);

  return {
    data: {
      success: true
    }
  };
};
