import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';

import { EngineService } from './engine.service';

describe('EngineService', () => {
  let service: EngineService;
  let injector:TestBed;
  let httpMock:HttpTestingController;
  let url='http://localhost:1337/entities/'
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [],
    teardown: { destroyAfterEach: false }
});
    service = TestBed.inject(EngineService);
    injector=getTestBed();
    httpMock=injector.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('method get of entities',()=>{
    
    it('should return an Observable<customer>',()=>{
      const dummyEntities=[{id:1},{id:2}];
      service.getEntities("customers").subscribe(entities=>{
        expect(entities).toEqual(dummyEntities);
      });
      const req=httpMock.expectOne(url+'customers');
      expect(req.request.method).toBe('GET');
      req.flush(dummyEntities)
  
    })
    it('should return an Observable<agent>',()=>{
      const dummyEntities=[{id:1},{id:2}];
      service.getEntities("agents").subscribe(entities=>{
        expect(entities).toEqual(dummyEntities);
      });
      const req=httpMock.expectOne(url+'agents');
      expect(req.request.method).toBe('GET');
      req.flush(dummyEntities)
  
    })
    it('should return an Observable<inspector>',()=>{
      const dummyEntities=[{id:1},{id:2}];
      service.getEntities("inspectors").subscribe(entities=>{
        expect(entities).toEqual(dummyEntities);
      });
      const req=httpMock.expectOne(url+'inspectors');
      expect(req.request.method).toBe('GET');
      req.flush(dummyEntities)
  
    })
    it('should return an Observable<contractor>',()=>{
      const dummyEntities=[{id:1},{id:2}];
      service.getEntities("contractors").subscribe(entities=>{
        expect(entities).toEqual(dummyEntities);
      });
      const req=httpMock.expectOne(url+'contractors');
      expect(req.request.method).toBe('GET');
      req.flush(dummyEntities)
  
    })
  })
  
  describe('post entities',()=>{
    it('method post should return an Observable<customer>',()=>{
      const mockEntity={
        name:"Marco antonio",
        company:"new business",
        email:"marc@gmail.com",
        address:"cbba",
        city:"cochabamba",
        state:"new",
        country:"new country",
        phone:"78454545",
        mobile:"7845787878",
      };
      service.postEntity("customers",mockEntity).subscribe(entity=>{
        expect(200)
        expect(entity).toEqual(mockEntity);
      });
      const req=httpMock.expectOne(url+'customers');
      expect(req.request.method).toBe('POST');
      req.flush(mockEntity)
  
    })
    it('method post should return an Observable<agent>',()=>{
      const mockEntity={
        name:"Marco antonio",
        company:"new business",
        email:"marc@gmail.com",
        address:"cbba",
        city:"cochabamba",
        state:"new",
        country:"new country",
        phone:"78454545",
        mobile:"7845787878",
      };
      service.postEntity("agents",mockEntity).subscribe(entity=>{
        expect(entity).toEqual(mockEntity);
      });
      const req=httpMock.expectOne(url+'agents');
      expect(req.request.method).toBe('POST');
      req.flush(mockEntity)
  
    })
    it('method post should return an Observable<inspector>',()=>{
      const mockEntity={
        name:"Marco antonio",
        company:"new business",
        email:"marc@gmail.com",
        address:"cbba",
        city:"cochabamba",
        state:"new",
        country:"new country",
        phone:"78454545",
        mobile:"7845787878",
      };
      service.postEntity("inspectors",mockEntity).subscribe(entity=>{
        expect(entity).toEqual(mockEntity);
      });
      const req=httpMock.expectOne(url+'inspectors');
      expect(req.request.method).toBe('POST');
      req.flush(mockEntity)
  
    })
    it('method post should return an Observable<contractor>',()=>{
      const mockEntity={
        name:"Marco antonio",
        company:"new business",
        email:"marc@gmail.com",
        address:"cbba",
        city:"cochabamba",
        state:"new",
        country:"new country",
        phone:"78454545",
        mobile:"7845787878",
      };
      service.postEntity("contractors",mockEntity).subscribe(entity=>{
        expect(entity).toEqual(mockEntity);
      });
      const req=httpMock.expectOne(url+'contractors');
      expect(req.request.method).toBe('POST');
      req.flush(mockEntity)
  
    })
  })
  describe('put entities',()=>{
    it('method put should return an Observable<customer>',()=>{
      const mockEntity={
        id:1,
        name:"Marco antonio",
        company:"new business",
        email:"marc@gmail.com",
        address:"cbba",
        city:"cochabamba",
        state:"new",
        country:"new country",
        phone:"78454545",
        mobile:"7845787878",
      };
      service.updateEntity("customers",mockEntity.id,mockEntity).subscribe(entity=>{
        expect(200)
        expect(entity).toEqual(mockEntity);
      });
      const req=httpMock.expectOne(url+'customers/'+mockEntity.id);
      expect(req.request.method).toBe('PUT');
      req.flush(mockEntity)
  
    })
  })
  describe('delete entities',()=>{
    it('method delete should return an Observable<customer>',()=>{
      const mockEntity={
        id:1
      };
      service.deleteEntity("customers",mockEntity.id).subscribe(entity=>{
        expect(200)
        expect(entity).toEqual(mockEntity);
      });
      const req=httpMock.expectOne(url+'customers/'+mockEntity.id);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockEntity)
  
    })
  })
});
