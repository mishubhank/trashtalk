import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreModule } from './store/store.module';
import { ReportModule } from './report/report.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
//  import { ReportsController } from './report/report.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes env variables available everywhere
      envFilePath: '.env', // Path to your .env file
    }),
    StoreModule,
    ReportModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
