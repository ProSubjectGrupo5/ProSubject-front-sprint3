import { Component, OnInit, Input } from '@angular/core';
import { EspacioService } from "../../../services/espacio/espacio.service";
import { Router } from "@angular/router";
import { FileService } from 'src/app/services/services.index';
import { saveAs } from "file-saver";

@Component({
  selector: 'app-listado-espacios',
  templateUrl: './listado-espacios.component.html',
  styleUrls: ['./listado-espacios.component.css']
})
export class ListadoEspaciosComponent implements OnInit {

  @Input() espacios: any[];
  currentPage: number = 1;
  fichero;
  
  constructor(private espacioService: EspacioService,
    private fileService: FileService,
    private router:Router) { }

  ngOnInit(): void {
  }

  detalleEspacio(id:number){
    this.router.navigate(['detalles-espacio', id])
  }

  descargarPdf(){
    this.fileService.getFile(1).subscribe(res =>{
      this.fichero = res;
      this.fileService.downloadFile(this.fichero.id).subscribe(
        res => {
          saveAs(res , this.fichero.fileName)
        }
      )
    },
    error => console.log(error)
    )
  }

}
