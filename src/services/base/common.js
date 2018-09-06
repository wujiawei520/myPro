import request from "./request";

class CommonWebService {
  static async getSomeData(model) {
    const response = await request.post("common/getData", model);
    console.log(response);
    return response.data.data;
  }
}

export default CommonWebService;
