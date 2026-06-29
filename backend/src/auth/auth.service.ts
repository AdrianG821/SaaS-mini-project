import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { stringify } from 'querystring';
import { DatabaseService } from 'src/database/database.service';
import { LoginParamsType, RegisterParamsType } from './auth.controller';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {

  constructor(private readonly database: DatabaseService) {}

  async LoginFunction(data: LoginParamsType) {
    const params: any[]   =   []
    const username        =   data.username.trim()
    const password        =   data.password.trim()


    if(username !== '' && username.length > 5){
      params.push(username)
    } else throw new BadRequestException("The username is not valid")

    if(params.length < 1) throw new UnauthorizedException("Password box is empty")

    const sql = 'select username, password, roleId from users where username = ?'

    const rows = await this.database.query(sql,params)

    if(rows.length === 0) throw new UnauthorizedException("Account doesn't exist!")

    const user = rows[0]

    if(await bcrypt.compare(password, user.password)) {
      return { 
        message: "login succesful",
        user: {
          id: user.id,
          username: user.username,
          roleId: user.roleId
        }
      }
    } else throw new UnauthorizedException("Password is wrong!")


  }
 

  async RegisterFunction(data: RegisterParamsType) {
    const params: any[]       =   []
    const queryParams:any[]   =   []
    const username            =   data.username.trim()
    const password            =   data.password.trim()
    const roleId              =   data.roleId
    
    const sql1 = 'select id,username from users where username = ?'

    if(username !== '' && username.length >= 5){
      params.push(username)
    } else throw new BadRequestException("The username is not valid")

    if(password !== '' && password.length > 5) {
      const passwordHash = await bcrypt.hash(password, 10);
      params.push(passwordHash)
    } else throw new BadRequestException("Password is too short!")
    if(roleId !== 0){
      params.push(roleId)
    } else throw new BadRequestException("Please select a role!")

    queryParams.push(username)

    const exists = await this.database.query(sql1, queryParams)
    if(exists.length !== 0) throw new ConflictException("Account already exists!")


    const sql2 = 'insert into users(username,password, roleId) values (?,?, ?)'

    const affectedRows = await this.database.execute(sql2,params)

    if(affectedRows.affectedRows === 0) throw new InternalServerErrorException("Account was not created!")

    return { message: "Account created!" }


  }
}
