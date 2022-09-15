import { InputNumber } from "./input-number";

describe('input-number', () => {
    const INPUT_TAG='input-number';
    let InputElement:InputNumber;

    const getShadowRoot = (tagName: string): ShadowRoot => {
        return document.body.getElementsByTagName(tagName)[0].shadowRoot;
    }
    beforeEach(()=>{
        InputElement=window.document.createElement(INPUT_TAG) as InputNumber;
        window.document.body.appendChild(InputElement);
    });
    afterAll(()=>{
        document.body.getElementsByTagName(INPUT_TAG)[0].remove();
    });
    it('displays button text', async () => {
        const issteps=InputElement.getAttribute('issteps');
        console.log(issteps)
        const renderedText = getShadowRoot(INPUT_TAG)
        console.log(renderedText)
        expect(renderedText).toEqual('dummyText');
    });
    it('should be registered', () => {
      expect(customElements.get('input-number')).toBeDefined();
    });
  
  });