import { IsNumber, IsString, IsOptional, IsIn, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReportDto {
  @Type(() => Number) // This transforms string to number from form-data
  @IsNumber()
  latitude: number; // Type as number, not string

  @Type(() => Number) // This transforms string to number from form-data
  @IsNumber()
  longitude: number; // Type as number, not string

  @IsString()
  @IsOptional()
  description?: string;
  @IsInt()
  wardNumber: number;
}
