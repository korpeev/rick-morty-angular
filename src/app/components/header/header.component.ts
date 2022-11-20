import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteService } from '@services/favorite/favorite.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {}

  async goTo(path: string) {
    await this.router.navigate([path]);
  }
  get favoritesCount() {
    return this.favoriteService.favoritesCount;
  }
}
