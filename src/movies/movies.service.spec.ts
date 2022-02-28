import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;
  const createMovie = () => {
    service.create({
      title: 'Test Movie',
      genres: ['test'],
      year: 2000,
    });
    service.create({
      title: 'Test Movie2',
      genres: ['test2'],
      year: 2020,
    });
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    createMovie();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be 4', () => {
    expect(2 + 2).toEqual(4);
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      const id = 999;
      try {
        service.getOne(id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`movie with id ${id} not found`);
      }
    });
  });

  describe('deleteOne', () => {
    it('delete a movie', () => {
      const beforeDelete = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();

      expect(afterDelete.length).toEqual(beforeDelete.length - 1);
      expect(afterDelete.find((movie) => movie.id === 1)).toBeUndefined();
    });
    it('should throw NotFoundException', () => {
      const id = 999;
      try {
        service.deleteOne(id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`movie with id ${id} not found`);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      createMovie();
      const afterCreate = service.getAll().length;
      expect(beforeCreate + 2).toEqual(afterCreate);
    });
  });

  describe('update', () => {
    const id = 1;
    it('should update a movie', () => {
      service.update(id, { title: 'updated test' });
      const movie = service.getOne(id);
      expect(movie.title).toEqual('updated test');
    });

    it('should throw NotFoundException', () => {
      const id = 999;
      try {
        service.update(id, { title: 'updated test' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`movie with id ${id} not found`);
      }
    });
  });
});
