import { Component, OnInit } from '@angular/core';

import { CONFIG } from '../../../config/config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public staticUrl = CONFIG.STATIC_URL;

  constructor() { }

  ngOnInit() {
  }

}
