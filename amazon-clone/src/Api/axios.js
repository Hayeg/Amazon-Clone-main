import axios from "axios"
const axiosInstance = axios.create({

  // local instance of firebase function
  // baseURL:"http://127.0.0.1:5001/clone-2d8f9/us-central1/api",


  // deployed version of firebase function
  // baseURL:"https://api-e2n56gc5qq-uc.a.run.app/",


  // deployed version of amazon on render.com
  baseURL:"https://amazon-api-deploy-h49r.onrender.com/",
  

});
export { axiosInstance };