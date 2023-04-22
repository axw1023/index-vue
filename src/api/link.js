import axios from 'axios';

const BASE_URL = 'http://localhost:9002';

export function fetchLinkList() {
  return axios.get(`${BASE_URL}/subject/list`);
}
