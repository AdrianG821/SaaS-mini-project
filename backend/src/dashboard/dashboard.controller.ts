import { Controller, Get, Param, Put, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

type SubscriptionsType = {
  name: string,
  statusId: string,
  procent: string,
  below: string,
}


@Controller('dashboard')
export class DashBoardController {
  constructor(private readonly dashboard: DashboardService) {}

  @Get('fetch_subscriptions')
  async getConnection(@Query() query: SubscriptionsType){

    const data = await this.dashboard.FetchSubscriptions(query);

    // console.log(query);

    return  data;
  }

  @Get('get_categories')
  async getCategories(){

    const data = await this.dashboard.getCategories();

    // console.log(query);

    return  data;
  }

  @Get('get_departments')
  async getDepartments(){

    const data = await this.dashboard.getDepartments();

    // console.log(query);

    return  data;
  }


  @Get('get_subscription/:id')
  async getSubscription(@Param('id') id: number){

    const data = await this.dashboard.getSubscription(id);

    // console.log(id);

    return  data[0];
  }

  @Get('get_statuses')
  async getStatuses(){

    const data = await this.dashboard.getStatuses();

    // console.log(query);

    return  data;
  }

  @Put('cancel_subscription/:id')
  async CancelSubscription(@Param('id') id: number){

    const data = await this.dashboard.CancelSubscription(id);

    // console.log(query);

    return  data;
  }

}
