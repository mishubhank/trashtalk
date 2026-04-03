import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create_report.dto';

import { StorageClass } from '@aws-sdk/client-s3';
import { StoreService } from 'src/store/store.service';

import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { report } from 'process';

//import { PrismaClient } from 'generated/prisma/client';
//const prisma = new PrismaClient();
// const storeService = new StoreService();
@Injectable()
export class ReportService {
  constructor(
    private readonly storeService: StoreService,
    private readonly prisma: PrismaService,
  ) {}

  async create(
    file: Express.Multer.File,
    ip: string,
    createReportDto: CreateReportDto,
  ) {
    const { latitude, longitude, description, wardNumber } = createReportDto;
    // const storeService = new StoreService();

    const imageURl = await this.storeService.uploadFile(file);
    // const imageURl = 'https://example.com/fake-trash-image.jpg';

    console.log('lat', createReportDto.latitude);
    console.log('long', createReportDto.longitude);
    const report = await this.prisma.trashReport.create({
      data: {
        latitude: createReportDto.latitude,
        longitude: createReportDto.longitude,
        description: createReportDto.description,
        imageUrl: imageURl,
        ipHash: ip,
        wardNumber: createReportDto.wardNumber,
      },
    });

    return report;
  }
  //23.194272753925734,
  // src/reports/reports.service.ts
  async getAreaName(lat: number, lng: number): Promise<string> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${23.194272753925734}&lon=${79.91329849364638}`,
      );
      const data = await response.json();
      const addr = data.address;
      console.log(' addresss', addr);
      // Nominatim returns a 'address' object with suburb, city, or neighborhood
      return (
        addr.road ||
        addr.suburb ||
        addr.neighbourhood ||
        addr.city_district ||
        addr.residential ||
        addr.county ||
        'Jabalpur (General Area)'
      );
    } catch (error) {
      return 'Unknown Area';
    }
  }

  async findAll() {
    return this.prisma.trashReport.findMany({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        imageUrl: true,
        wardNumber: true,
        latitude: true,
        longitude: true,
        description: true,
        createdAt: true,
      },
    });
  }

  // src/reports/reports.service.ts
  async getAreaStats() {
    const stats = await this.prisma.trashReport.groupBy({
      by: ['wardNumber'], // ← was 'areaName'
      _count: { id: true },
      where: { status: 'PENDING' },
      orderBy: { _count: { id: 'desc' } },
    });

    const statsWithImages = await Promise.all(
      stats.map(async (stat) => {
        const latestReport = await this.prisma.trashReport.findFirst({
          where: { wardNumber: stat.wardNumber, status: 'PENDING' },
          orderBy: { createdAt: 'desc' },
          select: { imageUrl: true },
        });

        return {
          wardNumber: stat.wardNumber,
          _count: stat._count,
          latestImage: latestReport?.imageUrl || null,
        };
      }),
    );

    return statsWithImages;
  }

  async findbyId(id: string) {
    return this.prisma.trashReport.findUnique({
      where: { id },
    });
  }
}
