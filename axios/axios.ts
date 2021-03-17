import axios from 'axios';

export default axios.create({
  baseURL: `https://staging.deliverbae.com`,
});

//This will not show in git.
