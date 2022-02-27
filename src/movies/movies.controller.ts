import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

//name of the controller control entry point
@Controller('movies')
export class MoviesController {
  //access to service
  constructor(private readonly moviesService: MoviesService) {}

  //will get "url/movies/"
  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  //search is under the :id, matching to id
  @Get('/search')
  search(@Query() searchData) {
    const { title } = searchData;
    return `We are searching for a movie with a title:${title}`;
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData) {
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch('/:id')
  patch(@Param('id') movieId: string, @Body() updatedData) {
    return { updatedMovie: movieId, ...updatedData };
  }
}
