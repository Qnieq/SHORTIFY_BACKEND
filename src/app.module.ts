import { Module } from '@nestjs/common';
import { ShortUrlModule } from './short-url/short-url.module';

@Module({
  imports: [ShortUrlModule]
})
export class AppModule {}
