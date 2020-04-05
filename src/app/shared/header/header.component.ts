import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/shared/header.service';
import { Router } from '@angular/router';
import { BreadcrumbsService, LoginService } from 'src/app/services/services.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route:Router, public breadcrumbsService:BreadcrumbsService,
    public loginService: LoginService) { }

  ngOnInit() {
    
  }


  logout(){
    localStorage.removeItem('usuario');
    this.breadcrumbsService.usuario = null;
    this.route.navigate(['/login']);

  }

}
