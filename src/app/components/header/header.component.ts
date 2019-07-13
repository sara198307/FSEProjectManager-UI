import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  changeClass(event) {
    var navList = document.getElementsByClassName('nav-item');
    Array.from(navList).forEach((el) => {
      el.classList.remove('active');
    });
    event.target.parentNode.classList.add('active');
  }

}
