import { Injectable } from '@nestjs/common';
import { stringify } from 'querystring';
import { DatabaseService } from 'src/database/database.service';

type SubscriptionsType = {
  name: string,
  statusId: string,
  procent: string,
  below?: string,
}

@Injectable()
export class DashboardService {

  constructor(private readonly database: DatabaseService) {}

  async FetchSubscriptions(query: SubscriptionsType) {

    const subName                 =   query.name;
    const statusId  : number      =   Number(query.statusId);
    const procent   : number      =   Number(query.procent);
    const below                   =   query.below === 'true';


    let sql = `select sub.id, sub.name,sub.licensePrice, sub.numberoflicenses, sub.usagePercent, s.name as status from subscriptions sub join statuses s on s.id = sub.statusid where 1 = 1 `;


    const params: any[] = [];

    if(subName) {
        sql += ` and sub.name like ? `
        params.push(`%${subName}%`)
    }

    
    if(statusId)  {
        sql += ` and sub.statusId = ? `
        params.push(statusId)
    }


    if(!Number.isNaN(procent)) {
        if(below) {
            sql += ` AND sub.usagePercent <= ?`;
        } else {
            sql += ` AND sub.usagePercent >= ?`;
        }

        params.push(procent)
    }

    const rows = await this.database.query(sql, params);

    console.log(rows)

    console.log(sql)
    console.log(params)


    console.log(typeof(statusId))
    console.log(typeof(procent))
    console.log(typeof(below))
    console.log(procent)    
    console.log(statusId)
    console.log(below)

    return rows
  }

}
