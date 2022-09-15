// @ts-check
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable'
import { EngineService } from 'src/app/services/engine.service'
/**
 * @ignore
 */
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  /**
   * Name Columnc
   * @param {Object}
   */
  @Input() columns: any
  /**
   * If is proposal
   * @param {Boolean}
   */
  @Input() isProp: boolean
  /**
   * if is inspection
   * @param {Boolean}
   */
  @Input() isInsp: boolean
  /**
   * if is work order
   * @param {Boolean}
   */
  @Input() haveCont: boolean
  /**
   * Rows data
   * @param {Object}
   */
  @Input() listRows: any
  /**
   * Data selected
   * @param {Array}
   */
  @Output() itemSelect = new EventEmitter<any>()
  /**
   * table
   * @param {Object}
   */
  @ViewChild('tables') table: any
  /**
   * Table rows
   * @type {Array}
   */
  rows: Array<any> = []
  /**
   * Row selected
   * @type {Array}
   */
  selected: Array<any> = []
  /**
   * @param ColumnMode
   */
  ColumnMode = ColumnMode
  /**
   * @param SelectionType
   */
  SelectionType = SelectionType
  /**
   * @type {{}}
   */
  expanded: any = {}
  /**
   * @type {{}}
   */
  timeout: any
  /**
   * Languages
   * @type {Array<string>}
   */
  langs: string[] = []
  /**
   * If have contract
   * @type {Boolean}
   */
  haveContract: boolean = false
  /**
   * If is proposal
   * @type {Boolean}
   */
  isProposal: boolean = false
  /**
   * If is inspection
   * @type {Boolean}
   */
  isInspection: boolean = false
  /**
   * this is some tools
   * @param router router
   * @param translate translate tool
   * @param engineService service
   */
  constructor(
    private router: Router,
    public translate: TranslateService,
    private engineService: EngineService
  ) {}
  /**
   * @type {{id:number, workOrder:number}}
   */
  public proposalId = {
    id: '',
    workOrder: '',
  }
  /**
   * @type {{id:number, workOrderId:number}}
   */
  public inspectionId = {
    id: '',
    workOrderId: '',
  }
  /**
   * init
   */
  ngOnInit() {
    this.rows = this.listRows
    if (this.isProp == true) {
      this.isProposal = this.isProp
    } else {
      this.isProposal = false
    }
    if (this.isInsp == true) {
      this.isInspection = this.isInsp
    } else {
      this.isInspection = false
    }
    if (this.haveCont == true) {
      this.haveContract = this.haveCont
    } else {
      this.haveContract = false
    }
  }
  /**
   *
   * @param changes simplechanges
   */
  ngOnChanges(changes: SimpleChanges) {
    this.listRows = changes.listRows.currentValue
    this.rows = this.listRows
    this.selected = []
  }
  /**
   * Change language
   * @param event select language
   */
  changeLanguage(event) {
    this.translate.use(event.detail.value)
  }
  /**
   * Data selected
   * @param param0 data selected
   */
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length)
    this.selected.push(...selected)
    this.itemSelect.emit(this.selected)
  }
  /**
   *
   * @param event
   */
  onActivate(event) {
  }
  add() {
    /**
     * Add new items
     * @property {Array}
     */
    this.selected.push(this.rows[1], this.rows[3])
  }

  update() {
    /**
     * update data selected
     * @property {Array}
     */
    this.selected = [this.rows[1], this.rows[3]]
  }

  remove() {
    /**
     * Deleted selected items
     * @property {Array}
     */
    this.selected = []
  }
  /**
   * Style rows
   * @param row
   * @returns
   */
  displayCheck(row: { name: string }) {
    return row.name !== 'Ethel Price'
  }
  /**
   * Pagination
   * @param event
   */
  onPage(event: any) {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
    }, 100)
  }
  /**
   * fill rows
   * @param row
   */
  toggleExpanRow(row: any) {
    this.table.rowDetail.toggleExpandRow(row)
  }
  /**
   * Toggle detail
   * @param event
   */
  onDetailToggle(event: any) {
  }
  /**
   * filter
   * @param event
   */
  updateFilter(event: { target: { value: string } }) {
    const val = event.target.value.toLowerCase()
    const temp = this.listRows.filter(function (d) {
      return d.nametoLowerCase().indexOf(val) !== -1 || !val
    })
    this.rows = temp
  }
  /**
   * Redirects the page to the report form
   * @param row
   */
  fillReport(row: { id: string }) {
    this.inspectionId.workOrderId = row.id
    this.engineService.postInspections(this.inspectionId).subscribe((r) => {
      this.inspectionId.id = r.id
      this.router.navigate(['work-orders/inspections/fillReport/', this.inspectionId.id])
    })
  }
  /**
   * Redirects the page to the proposal form
   * @param row
   */
  fillProposal(row: { id: string }) {
    this.proposalId.workOrder = row.id
    this.engineService.postProposal(this.proposalId).subscribe((r) => {
      this.proposalId.id = r.id
      this.router.navigate(['work-orders/proposals/fillProposal', this.proposalId.id])
    })
  }
}
