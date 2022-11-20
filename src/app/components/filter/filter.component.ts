import { Component, OnInit } from '@angular/core';
import { FilterService } from '@services/filter/filter.service';
import { FilterType } from '@models/common.inferface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  filterType: FilterType = {
    gender: 'All',
    status: 'All',
  };
  constructor(private filterService: FilterService) {}

  ngOnInit(): void {}
  changFilterType() {
    console.log('asd');
    this.filterService.filteredCharacters(this.filterType);
  }
}
