import axios from 'axios';

export default class PostService {
  static async getAll(limit = 10, page = 1) {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts',
      {
        params: {
          //Чтобы axios сам подставил параметры в строку запроса
          _limit: limit,
          _page: page,
        },
      }
    );
    return response;
  }

  static async getById(id) {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts/' + id
    );
    return response;
  }
}
