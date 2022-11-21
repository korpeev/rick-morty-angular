import { Injectable } from '@angular/core';
import { ApiService } from '@services/api.service';
import { Character } from '@models/characters.interface';
import { Pagination, Params, Response } from '@models/common.inferface';
import { HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  isLoading$ = new BehaviorSubject(false);
  characters$ = new BehaviorSubject<Character[]>([]);
  filteredCharacters$ = new BehaviorSubject<Character[]>([]);
  isFiltering: boolean = false;
  pagination$: Pagination = {} as Pagination;
  searchTerm$ = new Subject<string>();
  currentPageIndex: number = 1;
  constructor(private apiService: ApiService) {}

  fetchCharacters(params: Params) {
    this.currentPageIndex = params.page || 1;
    const addedParams = new HttpParams().set('page', params.page || 1).set('name', params.name || '');
    this.isLoading$.next(true);
    this.apiService.getData<Response<Character>>('character', addedParams).subscribe(data => {
      this.characters$.next(data.results);
      this.pagination$ = data.info;
      this.isLoading$.next(false);
    });
  }
  searchCharacter(value: string) {
    this.fetchCharacters({ name: value, page: this.currentPageIndex });
    return this.getCharacters.pipe(
      map(characters => characters.filter(character => character.name.toLowerCase().includes(value.toLowerCase())))
    );
  }
  orderBy(value: string) {
    const orderedItems = this.getCharacters.value
      .slice()
      .sort((a, b) => (value === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
    this.getCharacters.next(orderedItems);
  }
  get getCharacters() {
    return this.isFiltering ? this.filteredCharacters$ : this.characters$;
  }
  set setFiltering(value: boolean) {
    this.isFiltering = value;
  }
  get getPageSize() {
    return Math.floor(this.pagination$.count / this.pagination$.pages);
  }
  get getTotalPagesCount() {
    return this.pagination$.count;
  }
}
