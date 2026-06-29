import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { stringify } from 'querystring';
import { DatabaseService } from 'src/database/database.service';
import { SubscriptionType } from './dashboard.controller';

type SubscriptionsType = {
  name: string,
  statusId: string,
  procent: string,
  below?: string,
}

type StatusResponse = {
  statusId: number,
  name: string
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

    let sql1 = `select sub.statusId as statusId, s.name as name from subscriptions sub join statuses s on s.id = sub.statusId `

    sql1 += ` where sub.id = ? `

    if(isNaN(id)) throw new BadRequestException(`${id} is not a number`)

    params.push(id)

    const exists = await this.database.query(sql1, params)

    if(exists.length === 0) throw new NotFoundException("Subscription not found")

    if(exists[0].name === "Canceled") {
      const updateParams: any[] = [];
      let sql2 = `update subscriptions set statusId = (select id from statuses where name like '%RENEWAL SOON%') `

      sql2 += ` where id = ? `;
      
      updateParams.push(id)

      const affectedRows = await this.database.execute(sql2, updateParams)

      // console.log(affectedRows)

      if(affectedRows.affectedRows === 0) return "Renewal not succesfull, subscription missing"

      return "OK"
    } else {
      const updateParams: any[] = [];
      let sql2 = `update subscriptions set statusId = (select id from statuses where name like '%cancel%') `

      sql2 += ` where id = ? `;
      
      updateParams.push(id)

      const affectedRows = await this.database.execute(sql2, updateParams)

      // console.log(affectedRows)

      if(affectedRows.affectedRows === 0) return "Cancel not succesfull, subscription missing"

      return "OK"
    }

  }

  async CreateSubscription(sub: SubscriptionType){
    const params    : any[] = [];
    const name              = sub.name
    const dueDate           = sub.dueDate
    const categoryId        = sub.categoryId
    const licensePrice      = sub.licensePrice
    const numberOfLicenses  = sub.numberOfLicenses
    const departmentId      = sub.departmentId
    const statusId          = sub.status
    const usagePercent      = sub.usagePercent
    const description       = sub.description
    const userId            = sub.userId

    if(sub.mode === "create") {
      let sql = "insert into subscriptions(name,dueDate,categoryId,licensePrice,numberOfLicenses,departmentId,statusId,usagePercent, description, userId) values (?,?,?,?,?,?,?,?,?,?)"

      params.push(name)
      params.push(dueDate)
      params.push(categoryId)
      params.push(licensePrice)
      params.push(numberOfLicenses)
      params.push(departmentId)
      params.push(statusId)
      params.push(usagePercent)
      params.push(description)
      params.push(userId)

      const affectedRows = await this.database.execute(sql, params)

      if(affectedRows.affectedRows === 0) throw new InternalServerErrorException("Subscription not created")

      return "ok"
    } else if(sub.mode === "update"){
      let sql = "update subscriptions set name = ?,dueDate = ?,categoryId = ?,licensePrice = ?,numberOfLicenses = ?,departmentId = ?,statusId = ?,usagePercent = ?, description = ?, userId = ? where id = ?"
      
      params.push(name)
      params.push(dueDate)
      params.push(categoryId)
      params.push(licensePrice)
      params.push(numberOfLicenses)
      params.push(departmentId)
      params.push(statusId)
      params.push(usagePercent)
      params.push(description)
      params.push(userId)
      params.push(sub.id)

      
      const affectedRows = await this.database.execute(sql, params)

      if(affectedRows.affectedRows === 0) throw new InternalServerErrorException("Subscription not updated")

      return "ok"

    }

  }
 
}
