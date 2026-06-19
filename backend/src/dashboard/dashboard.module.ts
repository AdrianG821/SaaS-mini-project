import { Module } from '@nestjs/common';
import { DashBoardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';


@Module({
  imports: [],
  controllers: [DashBoardController],
  providers: [DashboardService],
})
export class DashboardModule {}
