import { Component, OnInit } from '@angular/core';
import { Character } from '@models/characters.interface';
import { PageEvent } from '@angular/material/paginator';
import { CharacterService } from '@services/character/character.service';
import { FavoriteService } from '@services/favorite/favorite.service';
import { debounceTime, distinctUntilChanged, merge, mergeMap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  characters: Character[] = [];
  constructor(private characterService: CharacterService, private favoriteService: FavoriteService) {}
  ngOnInit(): void {
    this.characterService.fetchCharacters({});
    this.characterService.isLoading$.subscribe();
    merge(
      this.characterService.characters$,
      this.characterService.filteredCharacters$,
      this.characterService.searchTerm$.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        mergeMap(value => this.characterService.searchCharacter(value))
      )
    ).subscribe(data => {
      this.characters = data;
    });
  }
  changePage(event: PageEvent) {
    this.characterService.fetchCharacters({ page: event.pageIndex + 1 });
  }
  addFavorite(character: Character) {
    this.favoriteService.onAddFavorite(character);
    window.localStorage.setItem('favorites', JSON.stringify(this.favoriteService.favorites));
  }
  get pageSize() {
    return this.characterService.getPageSize;
  }
  get isLoading() {
    return this.characterService.isLoading$;
  }
  get getTotalPagesLength() {
    return this.characterService.getTotalPagesCount;
  }
  get getCharacters() {
    return this.characterService.getCharacters;
  }
  hasFavorites(character: Character) {
    return this.favoriteService.hasFavorites(character);
  }
}
