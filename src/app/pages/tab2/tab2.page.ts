import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {


  /**
   *
   */
  constructor( private _noticiasService: NoticiasService) {
  }

  @ViewChild(IonSegment) segment: IonSegment;
  categorias = ['business', 'general', 'health', 'science', 'sports', 'technology', ];
  noticias: Article[] = [];

  ngOnInit(): void {
    this.segment.value = this.categorias[0];
    this.cargarNoticia(this.categorias[0]);
  }

  cambioCategoria( event  ) {
    // ya que aqui cambia la categoria, se reinicia el arreglo porque se le hace push a la data.
    this.noticias = [];
    this.cargarNoticia(event.detail.value);

  }

  cargarNoticia( categoria: string, event? ) {

    this._noticiasService.getTopHeadlinesCategoria(categoria).subscribe( resp => {
      this.noticias.push(...resp.articles );
      if (event) {
        event.target.complete();
      }
    });

  }

  loadData( event ) {
    this.cargarNoticia(this.segment.value, event);
  }

}
