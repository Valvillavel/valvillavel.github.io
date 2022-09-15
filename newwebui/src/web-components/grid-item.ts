// @ts-check
import { LitElement, html, css } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import './input-number';
import './side-selector';
  
@customElement('grid-item')
export class GridItem extends LitElement {
  static styles = css`
  :host{
    display:flex;
    flex-wrap: nowrap;
  }
  ion-button{
    --background: var(--button-color);
    border-radius: 5px;
    font-family:"Open Sans";
    font-size:8px;
    font-weight:600;
    box-shadow: var(--shadow-button);
    color:var(--font-color);
    width: 45px;
    height: 35px;
    left:80%;
    float: right;
  }
  .inputfile {
      width: 0.1px;
      height: 0.1px;
      opacity: 0;
      overflow: hidden;
      position: absolute;
      z-index: -1;
  }

  .inputfile + label {
      max-width: 70%;
      font-size: 20px;
      font-weight: 700;
      white-space: nowrap;
      cursor: pointer;
      display: inline-block;
      overflow: hidden;
      padding: 8px 1px;
  }
  .inputfile-6 + label {
    color: white;
  }

  .inputfile-6:focus + label,
  .inputfile-6.has-focus + label,
  .inputfile-6 + label:hover {
      color: #e8ecfa;
  }
  .btnSave ion-button{
    --background: var(--button-color);
    border-radius: 5px;
    font-family:"Open Sans";
    font-weight:600;
    box-shadow: var(--shadow-button);
    color:var(--font-color);
    float: right;
  }
  .btnSave ion-icon{
      font-size:20px;
      vertical-align: middle;
      margin-left: 3px;
  }
  .dropdown{
    display: flex;

  }
  .drop{
    width: 100%;
  }
  .drop ion-item{
    width: 100%;
  }
  .drop input-number{
    width: 50%;
  }
  `;
   /**
   * @namespace itemDrop
   * @property {object}  itemDrop             
   * @property {String}  itemDrop.proposal     
   * @property {String}  itemDrop.system  
   * @property {String}  itemDrop.ambient 
   * @property {object}  itemDrop.dataSelected    
   * @property {String}  itemDrop.dataSelected.name
   * @property {String}  itemDrop.dataSelected.material
   * @property {String}  itemDrop.dataSelected.steps
   * @property {String}  itemDrop.image
   */
  @property({type:Object})
  itemDrop = {
    proposal:"",
    system:'',
    ambient:'',
    dataSelected:{
      name:'',
      material:'',
      steps:'',
    },
    image:''
  };
  /**
   * @namespace itemvalue
   * @property {object}  itemvalue             
   * @property {String}  itemvalue.proposal     
   * @property {string}  itemvalue.system  
   * @property {string}  itemvalue.ambient 
   * @property {object}  itemvalue.dataSelected    
   * @property {string}  itemvalue.dataSelected.name
   * @property {string}  itemvalue.dataSelected.width
   * @property {string}  itemvalue.dataSelected.high
   * @property {string}  itemvalue.dataSelected.long
   * @property {string}  itemvalue.dataSelected.isFooting
   * @property {string}  itemvalue.dataSelected.isSumdump
   * @property {string}  itemvalue.dataSelected.choice
   * @property {string}  itemvalue.dataSelected.outletForSumpPump
   * @property {string}  itemvalue.dataSelected.moveHVAC
   * @property {string}  itemvalue.dataSelected.modifications
   * @property {string}  itemvalue.dataSelected.sides
   * @property {boolean}  itemvalue.dataSelected.isChecked
   */
  @property({type:Object})
  itemvalue = {
    proposal:'',
    system:'',
    ambient:'',
    dataSelected:{
      name:'',
      width:'',
      high:'',
      long:'',
      isFooting:'',
      isSumdump:'',
      choice: '',
      outletForSumpPump:'',
      moveHVAC:'',
      modifications:'',
      sides:'',
      isChecked:false,
    },
    
  };
  @property({ type: String }) 
  /**
   * proposal id
   * @type {string}
   */
  proposalId: string;
  @property({ type: String }) 
  /**
   * system
   * @type {string}
   */
  system: string;
  @property({ type: String }) 
  /**
   * system
   * @type {string}
   */
  ambient: string;
  @property({ type: String })
  /**
   * Name section
   * @type {string}
   */
  text: string;
  @property({ type: Array }) 
  /**
   * Options name
   * @type {Array}
   */
  option: Array<any>;
  @property({ type: Array }) 
  /**
   * Drop down option name
   * @type {Array}
   */
  dropdownoptions: Array<any>;
  @property({ type: Array }) 
  /**
   * checkbox options name
   * @type {string}
   */
  checkboxoptions: string;
  @property({ type: Array }) 
  /**
   * input name options
   * @type {Array}
   */
  inputnumberoptions: Array<any>;
  @property({ type: Array }) 
  /**
   * radio buttons name options
   * @type {Array}
   */
  radiobuttonoptions: Array<any>;
  @property({ type: Array }) 
  /**
   * sides options
   * @type {string}
   */
  sides: '';
  @property({ type: String }) 
  /**
   * type of selection
   * @type {string}
   */
  type: string;
  @property({ type: String }) 
  /**
   * list
   * @type {string}
   */
  list: string;
  @property({type: Boolean, reflect: true}) 
  /**
   * if is checked one option of checkbox
   * @type {Boolean}
   */
  ischeck: boolean = false;
  @property({ type: String }) 
  /**
   * input value
   * @type {String}
   */
  intvalue: String;
  @property({type: Boolean}) 
  /**
   * if is checked one option of side selector
   * @type {Boolean}
   */
  disable=false;
  @property({type: Boolean}) 
  /**
   * if is checked one option of side radio option
   * @type {Boolean}
   */
  disableRad=false;
  @property({type: Number}) 
  /**
   * Steps
   * @type {Number}
   */
  steps:'';
  @property({type:String}) 
  /**
   * dropdown selection
   * @type {Object}
   */
  dropsel:any;
  @property({ type:Object}) 
  /**
   * iamge
   * @type {Object}
   */
  ima='';
  @property({ type:String }) 
  /**
   * name of checkbox
   * @type {String}
   */
  out='With outlet for sump dump';
  @property({ type:String }) 
  /**
   * name of checkbox
   * @type {String}
   */
  mov='Move HVAC';
  @property({ type:String }) 
  /**
   * name of checkbox
   * @type {String}
   */
  mod='Modifications';
  @property({ type:String }) 
  /**
   * name of checkbox
   * @type {String}
   */
  foot='Footing drain';
  @property({ type:String }) 
  /**
   * name of checkbox
   * @type {String}
   */
  sump='Sump dump';
  @property({ type:String }) 
  /**
   * name of checkbox
   * @type {String}
   */
  rad='radio';

    render() {
    
      if(this.type==='checkbox' && this.text==='' && this.system==='HVAC/Electric'){
        return html`
        <div>
        <ion-list>
          <ion-item >
            <ion-label>Outlet for sump pump</ion-label>
            <ion-checkbox slot="start" value=${this.out} @click="${(e) => this.dataSelect(this.text, e,this.text,this.system,this.proposalId, this.ambient)}"></ion-checkbox>
          </ion-item>
          <ion-item >
            <ion-label>Move HVAC</ion-label>
            <ion-checkbox slot="start" value=${this.mov} @click="${(e) => this.dataSelect(this.text,e,this.text,this.system,this.proposalId, this.ambient)}"></ion-checkbox>
          </ion-item>
          <ion-item >
            <ion-label>Modifications</ion-label>
            <ion-checkbox slot="start" value=${this.mod} @click="${(e) => this.dataSelect(this.text,e,this.text,this.system,this.proposalId, this.ambient)}"></ion-checkbox>
          </ion-item>
        </ion-list>
    </div>`
      }

      if(this.type==='dropdown'){
      return html`
      <div class="drop">
        <div style="display: flex;">
          <ion-item>
            <ion-label >${this.text}</ion-label>
            <ion-select placeholder="Select One" @focus=${(e)=> this.selectedDropOption(e)}>
              ${this.dropdownoptions.map(
                opt => html`
                <ion-select-option key=${opt} value=${opt} 
                >${opt}</ion-select-option>`)}
          </ion-select >
          </ion-item>
          <input-number @steps=${this._stepsListener}></input-number>
          </ion-item>

          <ion-button >
            <input type="file" name="file-6" id="file-6" class="inputfile inputfile-6" @change=${(e) => this.loadImageFromDevice(e)} />
            <label for="file-6">
            <ion-icon slot="icon-only" name="camera-outline"></ion-icon>
            </label>
          </ion-button>
            <div class="btnSave" >
              <ion-button disabled="${this.disable}" @click=${() => this.saveProposal(this.text,this.system,this.proposalId, this.ambient)}><ion-icon name="checkmark-outline"></ion-icon></ion-button>
            </div>
            </div>
      </div>
      `}
      if(this.type==='checkbox' && this.list==undefined && this.text!==undefined && this.ischeck===false){
        return html`<div>
        <ion-item >
          <ion-label>${this.text}</ion-label>
            <ion-checkbox slot="start" @click="${() => this.ischeck = !this.ischeck}"></ion-checkbox>
        </ion-item>
      </div>`
      }else{
      return html`  
            <ion-item>
              <ion-label>${this.text}</ion-label>
              <ion-checkbox slot="start" checked @click="${() => this.ischeck = !this.ischeck}"></ion-checkbox>
            </ion-item>
            <ion-list>
            ${this.inputnumberoptions.map((input) => html`
            <ion-item >
              <ion-label>${input}</ion-label>
              <ion-input placeholder="placeholder" type="number" .value=${this.intvalue} @change="${(e) => this.dataSelect(input,e,this.text,this.system,this.proposalId, this.ambient)}"></ion-input>
            </ion-item>
            `)}
            ${this.checkboxoptions.length !==0? html`
            <ion-item >
              <ion-label>Footing drain</ion-label>
              <ion-checkbox slot="start"  value=${this.foot} @click="${(e)=>this.dataSelect(this.checkboxoptions, e,this.text,this.system,this.proposalId, this.ambient)}" ></ion-checkbox>
            </ion-item>
            <ion-item>
              <ion-label>Sump pump</ion-label>
              <ion-checkbox slot="start" value=${this.sump} @click="${(e)=>this.dataSelect(this.checkboxoptions, e,this.text,this.system,this.proposalId, this.ambient)}"></ion-checkbox>
            </ion-item> `: html``}
            ${this.radiobuttonoptions.length !==0? html`<ion-list>
            <ion-radio-group >${this.radiobuttonoptions.map((options) => html`
              <ion-item>
                <ion-label>
                ${options}</ion-label>
                <ion-radio slot="start" value=${this.rad} disabled=${this.disableRad} @focus=${(e)=>this.dataSelect(options,e,this.text,this.system,this.proposalId, this.ambient)}></ion-radio>`)}
              </ion-item>
            </ion-radio-group>
          </ion-list>`: html``}
          <side-selector .showsides=${this.sides} @sideSelected=${(e)=>this.dataSelect(this.sides,e,this.text,this.system,this.proposalId, this.ambient)} ></ide-selector>
          </ion-list>`
          
    };
    }

    //dropdown
    /**
     * listener input component
     * @param e {CustomEvent}
     */
    private _stepsListener(e: CustomEvent) {
      this.steps = e.detail.steps;
      this.itemDrop.dataSelected.steps=this.steps;
    }
    /**
     * Load image
     * @param e {Object}
     */
    private loadImageFromDevice(e: { target: { files: string | any[]; }; }){
      var img:any;
    if(e.target.files && e.target.files.length>0){
      const file=e.target.files[0];
      if(file.type.includes("image")){
        const reader= new FileReader()
        reader.readAsDataURL(file);
        reader.onload= function load(){
          this.image=reader.result;
        }.bind(this);
        img=file;
      }else{
        console.log("there was an error");
      }
      this.itemDrop.image=img
     }
    }
    /**
     * Send dropdown selection
     * @param e {object}
     */ 
    selectedDropOption(e: { target: { value: string; }; }){
      this.dropsel=e.target.value;
      this.itemDrop.dataSelected.material=this.dropsel;
      this.dispatchEvent(
        new CustomEvent<any>('option', {
          detail: this.dropsel,
        })
      );
    }
    /**
     * Send Proposal selection options
     * @param text {String}
     * @param system {String}
     * @param proposal {String}
     * @param ambient {String}
     */
    saveProposal(text: string , system: string, proposal: string, ambient: string){
      this.disable=true;
      this.itemDrop.dataSelected.name=text;
      this.itemDrop.proposal=proposal;
      this.itemDrop.system=system;
      this.itemDrop.ambient=ambient;
      this.dispatchEvent(
        new CustomEvent('saveProposal', {
          detail:this.itemDrop

        })
      );
    }
    //checkbox=HVAC
    /**
     * 
     * @param input {String}
     * @param e {Object}
     * @param text {String}
     * @param system {String}
     * @param proposal {String}
     * @param ambient {String}
     */
    dataSelect(input: string, e: { detail: { sides: string; }; target: { value: string; }; },text: string,system: string, proposal: string, ambient: string) {
      this.itemvalue.dataSelected.name=text;
      this.itemvalue.proposal=proposal;
      this.itemvalue.system=system;
      this.itemvalue.ambient=ambient;
      if(input==='sides' ||input==='corners'||input==='all'){
        this.itemvalue.dataSelected.sides=e.detail.sides;
      }
      if(e.target.value===this.out){
        this.itemvalue.dataSelected.outletForSumpPump=this.out;
      }
      if(e.target.value===this.mov){
        this.itemvalue.dataSelected.moveHVAC=this.mov;
      }
      if(e.target.value===this.mod){
        this.itemvalue.dataSelected.modifications=this.mod;
        }
      if(e.target.value===this.foot){
        this.itemvalue.dataSelected.isFooting=this.foot;
      }
      if(e.target.value===this.sump){
        this.itemvalue.dataSelected.isSumdump=this.sump;
      }
      if(input==='width'){
        this.itemvalue.dataSelected.width=e.target.value;
      }
      if(input==='high'){
        this.itemvalue.dataSelected.high=e.target.value;
      }
      if(input==='long'){
        this.itemvalue.dataSelected.long=e.target.value;
      }
      if(e.target.value===this.rad){
        this.itemvalue.dataSelected.choice=input;
        this.disableRad=true;
      }
      this.dispatchEvent(
        new CustomEvent('saveItem', {
          detail:this.itemvalue
  
        })
      );
    }
  }
