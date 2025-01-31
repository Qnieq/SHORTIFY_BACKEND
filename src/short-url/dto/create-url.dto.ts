import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateUrlDto {
  @IsString()
  originalUrl: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}