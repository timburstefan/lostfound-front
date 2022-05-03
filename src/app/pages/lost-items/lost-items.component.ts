import { Component, OnInit } from '@angular/core';
import { foundItems } from '../found-items/foundItems';

@Component({
  selector: 'app-lost-items',
  templateUrl: './lost-items.component.html',
  styleUrls: ['./lost-items.component.scss'],
})
export class LostItemsComponent implements OnInit {
  lostItems = foundItems;
  constructor() {}

  ngOnInit(): void {}
}
