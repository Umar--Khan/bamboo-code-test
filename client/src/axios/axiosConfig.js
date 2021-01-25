import axios from "axios";
import { baseURL } from "../const/";

const instance = axios.create({
  baseURL,
});

export default instance;
