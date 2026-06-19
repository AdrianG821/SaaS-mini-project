import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/healts.module';
import { DatabaseModule } from './database/database.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [HealthModule,DatabaseModule,DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
