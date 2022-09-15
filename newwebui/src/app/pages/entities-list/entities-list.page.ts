import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entities-list',
  templateUrl: './entities-list.page.html',
  styleUrls: ['./entities-list.page.scss'],
})
export class EntitiesListPage implements OnInit {
  subjects;
  constructor(
    private router:Router
  ) { }

  ngOnInit() {
    this.subjects=[
      {
        img:'assets/imgs/rating.png',
        name:'customers'
      },
      {
        img:'assets/imgs/estate-agent.png',
        name:'agents'
      },
      {
        img:'assets/imgs/scrutiny.png',
        name:'inspectors'
      },
      {
        img:'assets/imgs/workers.png',
        name:'contractors'
      },
    ]
  }
  goToSubject(value){
    this.router.navigateByUrl("/entities/"+value)
    value='';
  }

}
