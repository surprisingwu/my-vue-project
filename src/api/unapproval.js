import axios from 'axios'

export function getUnapproval(pageNum) {
   return axios.get('../../list.json')
    .then((res) => {
        return Promise.resolve(res.data)
    })
}