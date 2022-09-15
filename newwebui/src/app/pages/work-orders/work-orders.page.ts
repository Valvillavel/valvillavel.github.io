import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { EngineService } from 'src/app/services/engine.service'

@Component({
  selector: 'app-work-orders',
  templateUrl: './work-orders.page.html',
  styleUrls: ['./work-orders.page.scss'],
})
export class WorkOrdersPage implements OnInit {
  /**
   * if work order has a proposal
   * @type {Boolean}
   */
  prop = false
  /**
   * if work order has a inspection
   * @type {Boolean}
   */
  insp = false
  /**
   *
   * @type {Boolean}
   */
  contract = true
  /**
   * all the column Names in the table
   * @type {Array}
   */
  columns = []
  /**
   * Entity data
   * @type {Object}
   */
  type: any
  /**
   * list of all the entities
   * @type {Array}
   */
  list: any
  /**
   * if an error exist after get operation in API
   * @type {Boolean}
   */
  error = false
  /**
   * Entities selected in checkbox
   * @type {Array}
   */
  entitiesSelected: any = []
  /**
   * Languages available to change
   * @type {Array <String>}
   */
  langs: string[] = []
  constructor(
    public rutaActiva: ActivatedRoute,
    public engineService: EngineService,
    private router: Router,
    private translate: TranslateService
  ) {}
  /**
   * variables loaded when the page init
   * @property {Function}
   */
  ngOnInit() {
    this.langs = this.translate.getLangs()
    this.type = this.rutaActiva.snapshot.params.type
    if(this.type==='inspections'){
      this.insp=true
    }
    if(this.type==='proposals'){
      this.prop=true
    }
    this.loadDataEntities()
    this.columns = [
      'Customer',
      'Agent',
      'Address',
      'Property description',
      'Inspection date',
    ]
  }
  /**
   * Update the page when enter again
   */
  ionViewWillEnter() {
    this.loadDataEntities()
  }
  /**
   * Change language
   * @param event
   */
  changeLanguage(event) {
    this.translate.use(event.detail.value)
  }
  /**
   * load data of each work order
   */
  loadDataEntities() {
    this.engineService.getWorkOrder().subscribe(
      (entities) => {
        this.list = entities
        this.list.map((order) => {
          order['customer'] = order.customer?.name
          order['customerId'] = order.customer?.id
          order['agent'] = order.agent?.name
          order['agentId'] = order.agent?.id
        })
        this.error = false
      },
      () => {
        this.error = true
        this.list = []
      }
    )
  }
  /**
   * to get the data selected in the table
   * @param dataSelected
   */
  getEntitySelected(dataSelected) {
    this.entitiesSelected = dataSelected
  }
  /**
   * delete the data selected in the checkbox and update the page
   */
  deleteData() {
    this.entitiesSelected?.map((entity) => {
      this.engineService.deleteWorkOrder(entity.id).subscribe((res) => {
        this.entitiesSelected = []
        this.ionViewWillEnter()
      })
    })
  }
  /**
   * open the edit form of the selected entity
   */
  openEditForm() {
    let navigationExtras: NavigationExtras = {
      state: {
        entity: this.entitiesSelected[this.entitiesSelected.length - 1],
      },
    }
    this.router.navigateByUrl('/work-orders/list/edit', navigationExtras)
  }
}
