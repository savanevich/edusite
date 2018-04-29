import { Component, OnInit } from '@angular/core';
import { CONFIG } from '../../../../config/config';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public staticUrl = CONFIG.STATIC_URL;

  constructor() { }

  ngOnInit() {
  }

}
