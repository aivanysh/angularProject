import { Component, OnInit } from '@angular/core';
import {FCTSDashBoard} from '../../../environments/environment';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html'
})
export class SideNavigationComponent implements OnInit {
  basehref:String=FCTSDashBoard.BaseHref;
  constructor() { }

  ngOnInit() {
  }

}
