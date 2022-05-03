import { Component, OnInit } from '@angular/core';
import { foundItems } from './foundItems';

@Component({
  selector: 'app-found-items',
  templateUrl: './found-items.component.html',
  styleUrls: ['./found-items.component.scss'],
})
export class FoundItemsComponent implements OnInit {
  foundItems = foundItems;
  constructor() {}

  ngOnInit(): void {}
}
