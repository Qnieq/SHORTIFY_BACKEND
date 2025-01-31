import { Controller, Post, Get, Param, Body, Delete, Res, NotFoundException, Req } from '@nestjs/common';
import { Request } from 'express';
import { Response } from 'express';
import { ShortUrlService } from './short-url.service';
import { CreateUrlDto } from './dto/create-url.dto';

@Controller('shorten')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) { }

  // Создание короткой ссылки
  @Post()
  async shortenUrl(@Body() createUrlDto: CreateUrlDto) {
    return this.shortUrlService.shortenUrl(createUrlDto);
  }

  // Переадресация по короткому URL, просто возвращаем хэш для редиректа на клиенте
  // @Get(':shortUrl')
  // async redirectToOriginal(@Param('shortUrl') shortUrl: string) {
  //   const originalUrl = await this.shortUrlService.redirectToOriginal(shortUrl);
  //   return { redirect: originalUrl };
  // }

  // Это переадрессация прямо через сервер
  @Get(':shortUrl')
  async redirectToOriginal(
    @Param('shortUrl') shortUrl: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const ipAddress = req.headers['x-forwarded-for']?.toString().split(',')[0] || req.ip;
      const originalUrl = await this.shortUrlService.redirectToOriginal(shortUrl, ipAddress);
      res.redirect(302, originalUrl);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).send('Short URL not found');
      } else {
        res.status(410).send('Short URL has expired');
      }
    }
  }

  // Получение информации о ссылке
  @Get('info/:shortUrl')
  async getUrlInfo(@Param('shortUrl') shortUrl: string) {
    return this.shortUrlService.getUrlInfo(shortUrl);
  }

  // Удаление короткой ссылки
  @Delete('delete/:shortUrl')
  async deleteUrl(@Param('shortUrl') shortUrl: string) {
    await this.shortUrlService.deleteUrl(shortUrl);
    return { message: 'Short URL deleted successfully' };
  }

  // Получение аналитики по короткой ссылке
  @Get('analytics/:shortUrl')
  async getAnalytics(@Param('shortUrl') shortUrl: string) {
    return this.shortUrlService.getAnalytics(shortUrl);
  }
}
