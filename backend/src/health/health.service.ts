import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {

  checkConnection() {
    return  {
        status: "ok",
        message: "Connection is workin!"
    } ; 
  }

}
