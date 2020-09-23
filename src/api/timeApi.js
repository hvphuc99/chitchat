import axios from "axios";

const timeApi = {
  getCurrentUnixTime: () => {
    return new Promise((resolve, reject) => {
      axios.get("https://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh").then((res) => {
        const { unixtime } = res.data;
        resolve(unixtime); 
      })
    })
  }
}

export default timeApi;