import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { NoticiasService } from '../../services/noticias.service';










@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];

  /**
   *
   */
  constructor( private _noticiasService: NoticiasService) {
  }

  ngOnInit(): void {
  this.getNoticias();
  }

  getNoticias( event? ) {
    this._noticiasService.getHeadLines().subscribe( resp => {
      console.log('resp :', resp);
      if ( resp.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }
      this.noticias.push( ...resp.articles );
      if ( event ) {
        event.target.complete();
      }
    });
  }

  loadData( event ) {
    this.getNoticias( event );
  }
}
