import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { StoreModule } from 'src/store/store.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ReportsController } from './report.controller';

@Module({
  imports: [StoreModule, PrismaModule],

  providers: [ReportService],

  controllers: [ReportsController],
  exports: [ReportService],
})
export class ReportModule {}
