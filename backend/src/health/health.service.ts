import { Injectable } from '@nestjs/common';
import { stringify } from 'querystring';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class HealthService {

  constructor(private readonly database: DatabaseService) {}

  async checkConnection() {
    const result = await this.database.query<{ test: number }>('SELECT 1 AS test');

    console.log(result);

    return  {
        status: "ok",
        message: "Connection is workin",
        result: result
    } ; 
  }

}
