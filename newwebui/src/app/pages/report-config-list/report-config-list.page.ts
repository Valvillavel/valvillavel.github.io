import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-config-list',
  templateUrl: './report-config-list.page.html',
  styleUrls: ['./report-config-list.page.scss'],
})
export class ReportConfigListPage implements OnInit {
  subjects;
  constructor(
    private router:Router
  ) { }

  ngOnInit() {
    this.subjects=[
      {
        img:'assets/imgs/user-experience.png',
        name:'ambients'
      },
      {
        img:'assets/imgs/management.png',
        name:'systems'
      },
      {
        img:'assets/imgs/data.png',
        name:'subsystems'
      },
      {
        img:'assets/imgs/trolley.png',
        name:'items'
      },
    ]
  }
  goToSubject(value){
    this.router.navigateByUrl("/config/"+value)
    value='';
  }

}
