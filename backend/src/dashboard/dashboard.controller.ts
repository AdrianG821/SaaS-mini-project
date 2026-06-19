import { Controller, Get, Query } from '@nestjs/common';
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


}
