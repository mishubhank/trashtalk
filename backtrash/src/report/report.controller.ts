// reports.controller.ts
import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Ip,
  Req,
  Get,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create_report.dto';
import { Request } from 'express';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createReport(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
    @Ip() ip: string,
  ) {
    console.log('=== REQUEST BODY ===');
    console.log('req.body:', req.body);
    console.log('==================');

    // Extract data from req.body
    const createReportDto: CreateReportDto = {
      latitude: parseFloat(req.body.latitude),
      longitude: parseFloat(req.body.longitude),
      description: req.body.description,
      wardNumber: parseInt(req.body.wardNumber),
    };

    return this.reportService.create(file, ip, createReportDto);
  }

  @Get('find-all')
  findAll() {
    return this.reportService.findAll();
  }
  @Get('stats/by-area')
  async getAreaStats() {
    return this.reportService.getAreaStats();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.reportService.findbyId(id);
  }
}
