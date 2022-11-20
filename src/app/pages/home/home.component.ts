import { Component, OnInit } from '@angular/core';
import { Character } from '@models/characters.interface';
import { PageEvent } from '@angular/material/paginator';
import { CharacterService } from '@services/character/character.service';
import { FavoriteService } from '@services/favorite/favorite.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private characterService: CharacterService, private favoriteService: FavoriteService) {}
  ngOnInit(): void {
    this.characterService.fetchCharacters();
    this.characterService.isLoading$.subscribe(data => {
      this.isLoading = data;
    });
  }
  changePage(event: PageEvent) {
    this.characterService.fetchCharacters(event.pageIndex + 1);
  }
  addFavorite(character: Character) {
    this.favoriteService.onAddFavorite(character);
    window.localStorage.setItem('favorites', JSON.stringify(this.favoriteService.favorites));
  }
  get pageSize() {
    return this.characterService.getPageSize;
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
