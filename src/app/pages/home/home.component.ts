import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  perfil: any;
  
  constructor() { }

  ngOnInit() {
    if(JSON.parse(localStorage.getItem('usuario'))){
      this.perfil = JSON.parse(localStorage.getItem('usuario'));
    }
  }

}
