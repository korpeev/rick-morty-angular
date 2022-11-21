import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilterService } from '@services/filter/filter.service';
import { FilterTypes } from '@models/common.inferface';
import { CharacterService } from '@services/character/character.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy {
  filterType: FilterTypes = {
    gender: 'All',
    status: 'All',
  };
  orderType: string = 'asc';

  constructor(private filterService: FilterService, private characterService: CharacterService) {}

  ngOnInit(): void {}
  changeFilterType() {
    this.filterService.filterType = this.filterType;
    this.filterService.filterBy();
  }
  orderBy(value: string) {
    this.characterService.orderBy(value);
  }
  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.characterService.searchTerm$.next(searchTerm);
  }
  resetFilter() {
    this.filterType = {
      gender: 'All',
      status: 'All',
    };
    this.orderType = 'asc';
    this.characterService.getCharacters.next(this.characterService.characters$.value);
  }
  ngOnDestroy() {
    this.characterService.setFiltering = false;
  }
}
