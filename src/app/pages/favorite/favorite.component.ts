import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '@services/favorite/favorite.service';
import { Character } from '@models/characters.interface';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {}
  hasFavorite(character: Character) {
    return this.favoriteService.hasFavorites(character);
  }
  addFavorite(character: Character) {
    this.favoriteService.onAddFavorite(character);
  }
  get favorites() {
    return this.favoriteService.getFavorites;
  }
}
