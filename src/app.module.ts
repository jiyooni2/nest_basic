import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

//decorator
@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [],
})
//모든것의 루트 모듈
export class AppModule {}
