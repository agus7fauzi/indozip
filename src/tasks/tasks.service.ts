import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ScrapersService } from '../scrapers/scrapers.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private scrapersService: ScrapersService,
  ) {}

  @Cron('* * * * * *')
  async handleCron() {
    this.logger.debug('[*] Update postal code data');
    try {
      await this.scrapersService.getIndoZipcode();
    } catch (e) {
      this.logger.debug(e);
    }
  }
}
