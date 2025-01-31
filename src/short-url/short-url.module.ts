import { Module } from '@nestjs/common';
import { ShortUrlService } from './short-url.service';
import { ShortUrlController } from './short-url.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ShortUrlController],
  providers: [ShortUrlService, PrismaService],
})
export class ShortUrlModule {}
