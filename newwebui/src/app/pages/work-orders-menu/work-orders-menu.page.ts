import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-orders-menu',
  templateUrl: './work-orders-menu.page.html',
  styleUrls: ['./work-orders-menu.page.scss'],
})
export class WorkOrdersMenuPage implements OnInit {
  subjects;
  constructor(
    private router:Router
  ) { }

  ngOnInit() {
    this.subjects=[
      {
        img:'assets/imgs/rating.png',
        name:'list'
      },
      {
        img:'assets/imgs/agreement.png',
        name:'proposals'
      },
      {
        img:'assets/imgs/inspection.png',
        name:'inspections'
      } 
    ]
  }
  goToSubject(value){
    this.router.navigateByUrl("/work-orders/"+value)
    value='';
  }

}
