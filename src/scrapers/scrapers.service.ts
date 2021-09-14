import { Injectable } from '@nestjs/common';
import cheerio from 'cheerio';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { CreateScraperDto } from './dto/create-scraper.dto';
import { UpdateScraperDto } from './dto/update-scraper.dto';
import { lastValueFrom, throwError } from 'rxjs';

@Injectable()
export class ScrapersService {
  constructor(private httpService: HttpService) {}

  async getIndoZipcode() {
    const request = this.httpService.get('https://worldpostalcode.com/indonesia/')
      .pipe(map(response => response.data), catchError((e: any) => {
          console.log(e);
          return throwError(e);
        }));
    lastValueFrom(request)
      .then(data => {
        const $ = cheerio.load(data);
        $('div.regions > a').each((i, value) => {
          const provinceName = $(value).text();
          const provinceLink = $(value).attr('href');

          const request = this.httpService.get('https://worldpostalcode.com' + provinceLink)
            .pipe(map(response => response.data), catchError((e: any) => {
              console.log(e);
              return throwError(e);
            }));
          lastValueFrom(request)
            .then(data => {
              const $ = cheerio.load(data);

              $('div.regions > a').each((i, value) => {
                const cityName = $(value).text();
                const cityLink = $(value).attr('href');

                console.log(cityName);
                console.log(cityLink);
              });
            });
        });
      });
  }
  create(createScraperDto: CreateScraperDto) {
    return 'This action adds a new scraper';
  }

  findAll() {
    return `This action returns all scrapers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scraper`;
  }

  update(id: number, updateScraperDto: UpdateScraperDto) {
    return `This action updates a #${id} scraper`;
  }

  remove(id: number) {
    return `This action removes a #${id} scraper`;
  }
}
