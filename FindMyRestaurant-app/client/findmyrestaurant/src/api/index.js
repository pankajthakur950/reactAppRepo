import axios from 'axios';
const graphQLUrl = axios.create({
  baseURL: 'http://localhost:3003'
});

const postData = async query => {
  const response = await graphQLUrl.post("/graphql", { query });
  return response.data;
};

export default postData;