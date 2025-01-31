import { Injectable, NotFoundException, GoneException } from '@nestjs/common';
import { nanoid } from 'nanoid'; 
import { CreateUrlDto } from './dto/create-url.dto';
import { Click } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ShortUrlService {
  constructor(private prisma: PrismaService) {}

  // Создание короткой ссылки
  async shortenUrl(createUrlDto: CreateUrlDto) {
    const { originalUrl, expiresAt } = createUrlDto;
    const shortUrl = nanoid(6); // Генерация короткого URL длиной 6 символов

    // Проверка на уникальность короткой ссылки
    const existingUrl = await this.prisma.url.findUnique({
      where: { shortUrl },
    });

    if (existingUrl) {
      throw new Error('Generated short URL is already taken');
    }

    const newUrl = await this.prisma.url.create({
      data: {
        originalUrl,
        shortUrl,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });

    return { shortUrl: newUrl.shortUrl };
  }

  // Переадресация на оригинальный URL
  async redirectToOriginal(shortUrl: string, ipAddress: string) {
    const url = await this.prisma.url.findUnique({
      where: { shortUrl },
    });

    if (!url) {
      throw new NotFoundException('Short URL not found');
    }

    // Проверка на истечение срока действия ссылки
    if (url.expiresAt && new Date() > new Date(url.expiresAt)) {
      throw new GoneException('Short URL has expired');
    }

    // Увеличение счетчика кликов
    await this.prisma.url.update({
      where: { shortUrl },
      data: { clickCount: { increment: 1 } },
    });

    await this.prisma.click.create({
      data: {
        urlId: url.id,
        ipAddress,
      },
    });

    return url.originalUrl;
  }

  // Получение информации о короткой ссылке
  async getUrlInfo(shortUrl: string) {
    const url = await this.prisma.url.findUnique({
      where: { shortUrl },
      include: { clicks: true },
    });

    if (!url) {
      throw new NotFoundException('Short URL not found');
    }

    return {
      originalUrl: url.originalUrl,
      createdAt: url.createdAt,
      clickCount: url.clickCount,
    };
  }

  // Удаление короткой ссылки
  async deleteUrl(shortUrl: string) {
    const url = await this.prisma.url.findUnique({
      where: { shortUrl },
    });

    if (!url) {
      throw new NotFoundException('Short URL not found');
    }

    await this.prisma.url.delete({
      where: { shortUrl },
    });
  }

  // Получение аналитики по короткой ссылке
  async getAnalytics(shortUrl: string) {
    const url = await this.prisma.url.findUnique({
      where: { shortUrl },
      include: { clicks: true },
    });

    if (!url) {
      throw new NotFoundException('Short URL not found');
    }

    const last5Ips = url.clicks.slice(0, 5).map((click: Click) => click.ipAddress);

    return {
      clickCount: url.clickCount,
      last5Ips,
    };
  }
}
