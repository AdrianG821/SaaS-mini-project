import { Injectable } from '@nestjs/common';
import { stringify } from 'querystring';

@Injectable()
export class HealthService {


  async checkConnection() {
    return  {
        status: "ok",
        message: "Connection is workin"
    } ; 
  }

}
