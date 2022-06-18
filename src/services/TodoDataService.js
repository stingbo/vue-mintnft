import http from "../http-common";

class TodoDataService {
  getAll() {
    return http.get("/api/tes");
  }

  get(id) {
    return http.get(`/api/tes/${id}`);
  }

  create(data) {
    return http.post("/api/tes", data);
  }

  update(id, data) {
    return http.put(`/api/tes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/api/tes/${id}`);
  }

  deleteAll() {
    return http.delete(`/api/tes`);
  }

  findByTitle(title) {
    return http.get(`/api/tes?title=${title}`);
  }
}

export default new TodoDataService();
