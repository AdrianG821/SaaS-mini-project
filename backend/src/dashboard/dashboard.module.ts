import { Module } from '@nestjs/common';
import { DashBoardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [AuthModule],
  controllers: [DashBoardController],
  providers: [DashboardService],
})
export class DashboardModule {}
