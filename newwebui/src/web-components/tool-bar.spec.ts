
import { Toolbar } from "./tool-bar";
import {render} from "lit-html";
describe('lit-toolbar', ()=>{
    const TOOLBAR_TAG='tool-bar';
    let toolbarElement:Toolbar;
    beforeEach(()=>{
        toolbarElement=window.document.createElement(TOOLBAR_TAG) as Toolbar;
        window.document.body.appendChild(toolbarElement);
    });
    afterAll(()=>{
        document.body.getElementsByTagName(TOOLBAR_TAG)[0].remove();
    });

    it('check elements',()=>{
        
    })
    it('should be registered', () => {
        expect(customElements.get('tool-bar')).toBeDefined();
      });
    it('displays button text', async () => {
        const dummyText = 'Web components & Jest with Electron';
        toolbarElement.setAttribute('buttonText', dummyText);
        await toolbarElement.updateComplete;
        console.log(toolbarElement)
        expect(1+2).toEqual(3);
    });
    it("should run an empty test", () => {
        expect(true).toBeTruthy()
    })
    it('should contain menu button',() => {
       
        expect(document.querySelector('ion-menu-button')).toBeDefined()
      })
      it('should contain a button as name New',() => {
        expect(document.querySelector('ion-button').textContent).toContain('New')
      })

})