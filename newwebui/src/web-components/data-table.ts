import { LitElement, html, css } from 'lit';
import { customElement, property  } from 'lit/decorators.js';
import '@swimlane/ngx-datatable';

@customElement('data-table')
export class DataTable extends LitElement{
  
  static styles = css`
  @media screen and (max-width: 800px) {
    .desktop-hidden {
      display: initial;
    }
    .mobile-hidden {
      display: none;
    }
  }
  @media screen and (min-width: 800px) {
    .desktop-hidden {
      display: none;
    }
    .mobile-hidden {
      display: initial;
    }
  }
  .input-search{
    width:100%;
    align-self: right;
    border-radius: 5px;
    width: 20%;
  }  
  `;
  @property({ type: Array }) 
  ids: Array<any>;
  @property({ type: Array }) 
  rows: Array<any>;
  @property({ type: Array }) 
  columns: Array<any>;

  render() {

    return html`
    
    <div>
      <div style="text-align: end;">
        <ion-item class="input-search">
          <ion-label position="stacked">Search:</ion-label>
          <ion-input placeholder="Type to filter the name column..." (keyup)="updateFilter($event)" ></ion-input>
        </ion-item>
      </div>
       <div style="float:left;width:95%">

       <ngx-datatable
          style="width: 95%"
          class="bootstrap"
          [rows]="rows"
          [columnMode]="ColumnMode.force"
          [headerHeight]="'auto'"
          [footerHeight]="'auto'"
          [rowHeight]="'auto'"
          [limit]="5"
          [selected]="selected"
          [selectionType]="SelectionType.checkbox"
          [selectAllRowsOnPage]="false"
          [displayCheck]="displayCheck"
            [scrollbarH]="true"
          (activate)="onActivate($event)"
          (select)="onSelect($event)"
        >
          <ngx-datatable-column
          style="margin: 5px;"
            [width]="30"
            [sortable]="false"
            [canAutoResize]="false"
            [draggable]="true"
            [resizeable]="false"
            [headerCheckboxable]="true"
            [checkboxable]="true"
          >
          ${this.print()}
          </ngx-datatable-column>
          ${this.columns.map(column=> html`
          <ngx-datatable-column name="{{${column.name}}}" >${column.name}</ngx-datatable-column>`)}

        
        </ngx-datatable>
         
          
      </div> 
    </div> `;
  }
  print(){
  }

}