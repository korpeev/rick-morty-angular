import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '@models/characters.interface';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  favorite = new BehaviorSubject<Character>({} as Character);
  favorites: Character[] = [];
  constructor() {}

  onAddFavorite(favorite: Character) {
    this.favorite.next(favorite);
    this.favorite
      .subscribe(character => {
        if (this.hasFavorites(favorite)) {
          this.favorites = this.getFavorites.filter(item => item.id !== character.id);
          window.localStorage.setItem('favorites', JSON.stringify(this.favorites));
          return;
        }
        this.favorites.push(favorite);
      })
      .unsubscribe();
  }
  hasFavorites(favorite: Character) {
    return this.getFavorites.some(character => character.id === favorite.id);
  }
  get favoritesCount() {
    return this.getFavorites.length;
  }
  get getFavorites() {
    const favorites = JSON.parse(window.localStorage.getItem('favorites') as string) as Character[];
    return this.favorites.length ? this.favorites : favorites || [];
  }
}
