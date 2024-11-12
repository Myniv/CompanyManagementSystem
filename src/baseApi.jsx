import axios from "axios";

export default axios.create({
  baseURL: `http://localhost:5184/api`,
});
