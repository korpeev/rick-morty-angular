import { Injectable } from '@angular/core';
import { CharacterService } from '@services/character/character.service';
import { FilterTypes } from '@models/common.inferface';
import { Character } from '@models/characters.interface';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  filterType: FilterTypes = {
    gender: 'All',
    status: 'All',
  };
  constructor(private characterService: CharacterService) {}
  filterBy() {
    this.characterService.setFiltering = true;
    const types = Object.entries(this.filterType);
    const newFilteredItems = types.reduce<Character[]>((acc, [key, value]) => {
      if (types.every(([key, value]) => value === 'All')) return acc;
      return acc.filter(item => item[key as keyof Pick<Character, 'gender' | 'status'>] === value || value === 'All');
    }, this.characterService.characters$.value);
    this.characterService.filteredCharacters$.next(newFilteredItems);
  }
}
