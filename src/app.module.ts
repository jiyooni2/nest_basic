import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';

//decorator
@Module({
  imports: [],
  controllers: [MoviesController],
  providers: [MoviesService],
})
//모든것의 루트 모듈
export class AppModule {}
