import { Injectable } from '@angular/core';
import { CharacterService } from '@services/character/character.service';
import { FilterType } from '@models/common.inferface';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(private characterService: CharacterService) {}

  filteredCharacters(filterType: keyof FilterType) {}
}
