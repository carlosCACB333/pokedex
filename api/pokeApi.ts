import axios from "axios";

const ax = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export default ax;
