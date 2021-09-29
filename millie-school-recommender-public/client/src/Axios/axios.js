import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' 
    ? `https://millie-school-recommender-api.herokuapp.com/`
    : `http://localhost:3001/`;

export const axiosAPI = axios.create({
    baseURL: baseURL
})