import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`movie with id ${id} not found`);
    }
    return movie;
  }

  deleteOne(id: number): boolean {
    const movie = this.getOne(id);
    if (!movie) {
      throw new NotFoundException(`movie with id ${id} not found`);
    }
    this.movies = this.movies.filter((movie) => movie.id !== id);
    return true;
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  //이름에 상관없이, arg의 순서에 따라 결정
  update(id: number, updatedData: UpdateMovieDto) {
    const movie = this.getOne(id);
    if (!movie) {
      throw new NotFoundException(`movie with id ${id} not found`);
    }
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updatedData });
  }
}
