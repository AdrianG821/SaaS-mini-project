import { Controller, Get, Param, Query } from '@nestjs/common';
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
  getConnection(@Query() query: SubscriptionsType){

    const data = this.dashboard.FetchSubscriptions(query);

    // console.log(query);

    return  data;
  }

  @Get('get_categories')
  getCategories(){

    const data = this.dashboard.getCategories();

    // console.log(query);

    return  data;
  }

  @Get('get_departments')
  getDepartments(){

    const data = this.dashboard.getDepartments();

    // console.log(query);

    return  data;
  }


  @Get('get_subscription/:id')
  getSubscription(@Param('id') id: number){

    const data = this.dashboard.getSubscription(id);

    console.log(id);

    return  data;
  }


}
