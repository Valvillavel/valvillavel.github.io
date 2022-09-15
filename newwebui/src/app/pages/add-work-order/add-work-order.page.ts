// @ts-check
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EngineService } from 'src/app/services/engine.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { jsPDF } from 'jspdf';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { TranslateService } from '@ngx-translate/core';
import { IonicSelectableComponent } from 'ionic-selectable';
/**
 * @ignore
 */
@Component({
  selector: 'app-add-work-order',
  templateUrl: './add-work-order.page.html',
  styleUrls: ['./add-work-order.page.scss'],
})
export class AddWorkOrderPage implements OnInit {
  /**
   * @public
   * @type {ClassicEditor}
   */
  public Editor: ClassicEditor = ClassicEditor
  /**
   * @property {Object}
   */
  @ViewChild('myEditor', { static: false }) myEditor: any
  /**
   * Entity data
   * @type {Object}
   */
  entity: any
  /**
   * All entitys data
   * @type {Array}
   */
  customersId: any[] = []
  /**
   * All entitys data
   * @type {Array}
   */
  agentsId: any[] = []
  /**
   * If is edit form
   * @type {Boolean}
   */
  edit: boolean = false
  /**
   * Entity data
   * @type {Object}
   */
  entityData: any
  /**
   * All languages
   * @type {Array<String>}
   */
  langs: string[] = []
  agentSelected:any;
  customerSelected:any;
  /**
   * this is some tools
   * @param formBuilder {FormBuilder}
   * @param router {Router}
   * @param engineService {EngineService}
   * @param translate {TranslateService}
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private engineService: EngineService,
    private translate: TranslateService
  ) {}
  /**
   * Register form
   * @property {Object}
   */
  workOrderForm = this.formBuilder.group({
    customer: ['', Validators.required],
    agent: [''],
    address: [''],
    propertyDescription: [''],
    inspectionDate: [''],
    contractSigned: [false],
    contractLocation: [''],
  })
  /**
   * init
   * @property {Function}
   */
  ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.entityData = this.router.getCurrentNavigation().extras.state.entity
      this.edit = true
      this.agentSelected=this.entityData?.agent;
      this.customerSelected=this.entityData?.customer;
      this.updateWorkOrderData()
    }
    this.entity = 'Work Orders'
    this.loadCustomers()
    this.loadAgents()
  }
  /**
   * Change Languages
   * @param event
   */
  changeLanguage(event) {
    this.translate.use(event.detail.value)
  }
  /**
   * Customer data request
   * @property {Function}
   */
  loadCustomers() {
    this.engineService.getEntities('customers').subscribe((customers) => {
      this.customersId = customers
    })
  }
  customerChange(event: {
    component: IonicSelectableComponent,
    value: any
  }){
    this.workOrderForm.get('customer').setValue(event.value.id)
  }
  /**
   * Agent data request
   * @property {Function}
   */
  loadAgents() {
    this.engineService.getEntities('agents').subscribe((agents) => {
      this.agentsId = agents
    })
    this.workOrderForm.get('contractSigned').setValue(false)
  }
  agentChange(event: {component: IonicSelectableComponent, value: any}){
    this.workOrderForm.get('agent').setValue(event.value.id)
  }
  /**
   * Save work Order data
   * @param workOrder {Object}
   * @param formDirective {FormGroupDirective}
   */
  saveWorkOrder(workOrder: any, formDirective: FormGroupDirective) {
    this.engineService.postWorkOrder(workOrder).subscribe((r) => {
      formDirective.resetForm()
      this.router.navigate(['/work-orders'])
    })
  }
  /**
   * Update work order data
   * @property {Function}
   */
  updateWorkOrderData() {
    this.workOrderForm.get('customer').setValue(this.entityData?.customer)
    this.workOrderForm.get('agent').setValue(this.entityData?.agent)
    this.workOrderForm.get('address').setValue(this.entityData?.address)
    this.workOrderForm
      .get('propertyDescription')
      .setValue(this.entityData?.propertyDescription)
    this.workOrderForm
      .get('inspectionDate')
      .setValue(this.entityData?.inspectionDate.split('T')[0])
    this.workOrderForm
      .get('contractSigned')
      .setValue(this.entityData?.contractSigned === '0' ? false : true)
  }
  /**
   * Update work order data in the service
   * @param workOrder {Object}
   * @param formDirective {FormGroupDirective}
   */
  updateWorkOrder(workOrder: any, formDirective: FormGroupDirective) {
    this.engineService
      .updateWorkOrder(this.entityData.id, workOrder)
      .subscribe((r) => {
        formDirective.resetForm()
        this.router.navigate(['/work-orders'])
      })
  }
  /**
   * Change data
   * @param param0 {ChangeEvent}
   */
  onChange({ editor }: ChangeEvent) {
    const data = editor.getData()
    this.myEditor.data = data
  }
  /**
   * Contract
   * @property {Function}
   */
  previewContract() {
    var doc = new jsPDF('p', 'pt', 'a4')
    doc.html(this.myEditor.data, {
      callback: (doc) => {
        doc.setProperties({
          title: 'Report',
        })
        doc.output('dataurlnewwindow')
      },
      margin: 20,
      width: 550,
      windowWidth: 900,
    })
  }
}
