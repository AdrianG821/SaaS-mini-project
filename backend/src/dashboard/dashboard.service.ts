import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

    const subName                 =   query.name ?? "";
    const statusId  : number      =   Number(query.statusId);
    const procent   : number      =   Number(query.procent) * 10;
    const below                   =   query.below === 'true';


    let sql = `select sub.id, sub.name,sub.licensePrice, sub.numberoflicenses, sub.usagePercent, s.name as status from subscriptions sub join statuses s on s.id = sub.statusid where 1 = 1 `;


    const params: any[] = [];

    const trimmedSubName = subName.trim();

    if(trimmedSubName !== "") {
        sql += ` and sub.name like ? `
        params.push(`%${trimmedSubName}%`)
    }

    
    if(statusId !== 0 && !Number.isNaN(statusId))  {
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


    return rows
  }


  async getCategories(){
    const sql = "select id, name from categories"

    const rows = await this.database.query(sql)

    // console.log(rows)

    return rows
  }

  async getDepartments() {
    const sql = "select id, name from departments"

    const rows = await this.database.query(sql)

    // console.log(rows)

    return rows
  }

  async getSubscription(id: number) {

    const sql = `select name, licensePrice , dueDate, numberOfLicenses, categoryId , departmentId , description, usagePercent from subscriptions where id = ${id}`

    const rows = await this.database.query(sql)
    // console.log(rows);

    return rows;
  }

  async getStatuses() {

    const sql = `select id, name from statuses`

    const rows = await this.database.query(sql)

    return rows
  }

  async CancelSubscription(id: number) {
    const params: any[] = [];
    const updateParams: any[] = [];

    let sql1 = `select id from subscriptions `

    sql1 += `where id = ? `

    if(isNaN(id)) throw new BadRequestException(`${id} is not a number`)

    params.push(id)

    const exists = await this.database.query(sql1, params)

    if(exists.length === 0) throw new NotFoundException("Subscription not found")

    let sql2 = `update subscriptions set statusId = (select id from statuses where name like '%cancel%') `

    sql2 += ` where id = ? `;
    
    updateParams.push(id)

    const affectedRows = await this.database.execute(sql2, updateParams)

    // console.log(affectedRows)

    if(affectedRows.affectedRows === 0) return "Cancel not succesfull, subscription missing"

    return "OK"
  }
}
