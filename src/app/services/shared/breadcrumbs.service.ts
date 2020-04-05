import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {

  menu:any[] = [];

  usuario:any = null;

  constructor() { }
}
