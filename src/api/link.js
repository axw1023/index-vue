import axios from 'axios';

const BASE_URL = 'http://localhost:9002';

export function fetchSubjectList() {
  return axios.get(`${BASE_URL}/subject/list`);
}

export function fetchLinkList(params) {
  return axios.get(`${BASE_URL}/link/list`, {
    params: {
      fnSubjectId: params.fnSubjectId,
    },
  });
}
