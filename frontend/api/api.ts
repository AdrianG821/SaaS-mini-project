import axios from "axios";


export const api = axios.create({
  baseURL: 'http://127.0.0.1:3000'
})

type HealthResponse = {
  status: string,
  message: string
};


export async function checkHealth(): Promise<HealthResponse>{
  try{

      const {data} = await api.get<HealthResponse>('/health/check')
  
      console.log(data);
      return data;
  } catch(e:any) {
    console.log(e);
    return {status: "not ok", message: "Connection is down"};
  }
}