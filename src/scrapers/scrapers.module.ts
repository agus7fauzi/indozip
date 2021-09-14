import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScrapersService } from './scrapers.service';
import { ScrapersController } from './scrapers.controller';

@Module({
  imports: [HttpModule],
  controllers: [ScrapersController],
  providers: [ScrapersService],
  exports: [ScrapersService]
})
export class ScrapersModule {}
