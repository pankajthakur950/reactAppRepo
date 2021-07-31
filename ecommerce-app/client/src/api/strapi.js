import Strapi from "strapi-sdk-javascript/build/main";
import API_URL from "./strapi-config";
const strapi = new Strapi(API_URL);

export const postData = async query => {
  const response = await strapi.request("POST", "/graphql", {
    data: {
      query
    }
  });
  console.log(response.data);
  return response.data;
};
