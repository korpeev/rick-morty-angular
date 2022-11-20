import { Injectable } from '@angular/core';
import { ApiService } from '@services/api.service';
import { Character } from '@models/characters.interface';
import { Pagination, Response } from '@models/common.inferface';
import { HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  isLoading$ = new BehaviorSubject(false);
  characters$ = new BehaviorSubject<Character[]>([]);
  pagination$: Pagination = {} as Pagination;
  constructor(private apiService: ApiService) {}

  fetchCharacters(page?: number) {
    const params = new HttpParams().set('page', page || 1);
    this.isLoading$.next(true);
    this.apiService.getData<Response<Character>>('character', params).subscribe(data => {
      this.characters$.next(data.results);
      this.pagination$ = data.info;
      this.isLoading$.next(false);
    });
  }
  get getCharacters() {
    return this.characters$;
  }
  get getPageSize() {
    return Math.floor(this.pagination$.count / this.pagination$.pages);
  }
  get getTotalPagesCount() {
    return this.pagination$.count;
  }
}
