
import { Controller, Get, Param, Post, Put, Query , Body} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

export type LoginParamsType = {
  username: string,
  password: string
}
export type RegisterParamsType = {
  username: string,
  password: string,
  roleId: number
}

@Controller('login')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login_account')
  async LoginFunction(@Body() params: LoginParamsType) {
    const data = await this.auth.LoginFunction(params);

    console.log(data);

    return data

  }

  @Post('register_account')
  async RegisterFunction(@Body() params:RegisterParamsType) {
    const data = await this.auth.RegisterFunction(params);

    console.log(data);

    return data

  }


}
