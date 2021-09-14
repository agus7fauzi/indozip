import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScrapersService } from './scrapers.service';
import { CreateScraperDto } from './dto/create-scraper.dto';
import { UpdateScraperDto } from './dto/update-scraper.dto';

@Controller('scrapers')
export class ScrapersController {
  constructor(private readonly scrapersService: ScrapersService) {}

  @Post()
  create(@Body() createScraperDto: CreateScraperDto) {
    return this.scrapersService.create(createScraperDto);
  }

  @Get()
  findAll() {
    return this.scrapersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scrapersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScraperDto: UpdateScraperDto) {
    return this.scrapersService.update(+id, updateScraperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scrapersService.remove(+id);
  }
}
