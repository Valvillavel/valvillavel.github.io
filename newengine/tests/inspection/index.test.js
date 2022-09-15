const request = require('supertest');
const fs = require('fs');
const { setupStrapi, grantPrivilege } = require('../helpers/strapi');

/** this code is called once before any test is called */
beforeAll(async () => {
  await setupStrapi(); 
});
/** this code is called once before all the tested are finished */
afterAll(async () => {
  const dbSettings = strapi.config.get('database.connections.default.settings');
  
  //close server to release the db-file
  await strapi.destroy();

  //delete test database after all tests
  if (dbSettings && dbSettings.filename) {
    const tmpDbFile = `${__dirname}/../../${dbSettings.filename}`;
    if (fs.existsSync(tmpDbFile)) {
      fs.unlinkSync(tmpDbFile);
    }
  }
});

it('strapi is defined', () => {
  expect(strapi).toBeDefined();
});
beforeAll(async () => {
  await grantPrivilege(2, "permissions.application.controllers.inspection.create");
  await grantPrivilege(2, "permissions.application.controllers.inspection.find");
  await grantPrivilege(2, "permissions.application.controllers.inspection.findOne");
  await grantPrivilege(2, "permissions.application.controllers.inspection.delete");
  await grantPrivilege(2, "permissions.application.controllers.inspection.update");
  await grantPrivilege(2, "permissions.application.controllers.inspection.count");
  await grantPrivilege(2, "permissions.application.controllers.work-order.create");
});
const workOrder = {
  customerid: 1,
  agentid: 4, 
  address: '123 Joe Street',
  propertyDescription: 'Manassas',
  inspectionDate: '2021-11-03T16:00:00.000Z',
  contractSigned: '123',
  contractLocation: '123456789'
};
const inspection = {
    workOrderId: 1
};
const inspection2 = {
    workOrderId: 2
};
var ids= [];
var inspectionid=0;
it('should post news work-orders', async () => {
  for(var i=0; i<2; i++){
    await request(strapi.server) 
      .post('/work-orders')
      .send(workOrder)
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
      });
  }
});

it('should post new inspection', async () => {
   await request(strapi.server) 
   .post('/inspections')
   .send(inspection)
   .set('accept', 'application/json')
   .set('Content-Type', 'application/json')
   .expect('Content-Type', /json/ )
   .expect(200)
   .then(data => {
     expect(data.body.id);
     inspectionid=data.body.id;
   });
   await request(strapi.server)
   .get('/inspections/'+inspectionid)
   .set('accept', 'application/json')
   .set('Content-Type', 'application/json')
   .expect('Content-Type', /json/)
   .expect(200)
   .then(data => {
     expect(data.body).toBeDefined();
     expect(data.body.id);
     expect(data.body.workOrder);
     expect(data.body.workOrderId.id).toBe(inspection.workOrderId);
   });
});
it('should return inspections from inspectiondb', async () => {
  await request(strapi.server).get('/inspections') 
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body);
    expect(data.body.id);
    expect(data.body.workOrderId);
  });
  await request (strapi.server)
  .get('/inspections/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(1);
  });     
});
it('should update inspection', async () => {
  await request(strapi.server) 
  .put('/inspections/'+inspectionid)
  .send(inspection2)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id);
    expect(data.body.workOrderId.id).toBe(inspection2.workOrderId);
  });
});
it('should delete inspection', async () => {
   await request(strapi.server)
   .delete('/inspections/'+inspectionid)
   .set('accept', 'application/json')
   .set('Content-Type', 'application/json')
   .expect(200)
   .then(data => {
      expect(data.body).toBeDefined();
      expect(data.body.id);
      expect(data.body.workOrderId);
   });
   await request (strapi.server)
   .get('/inspections/count')
   .set('accept', 'application/json')
   .set('Content-Type', 'application/json')
   .expect('Content-Type', /json/)
   .expect(200)
   .then(data => {
     expect(data.body).toBeDefined();
     expect(data.body).toBe(0);
   });
});
it('should create 50 new inspections', async () => {
for(var i = 0; i<50; i++){
  await request(strapi.server) 
  .post('/inspections')
  .send(inspection)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    ids.push(data.body.id);
  });
}
  await request (strapi.server)
  .get('/inspections/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(50);
  });
});
it('should delete 30 inspections', async () => {
for(var i=0; i<(ids.length-20);i++){
  await request(strapi.server)
  .delete('/inspections/'+ids[i])
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
  });
}
  await request (strapi.server)
  .get('/inspections/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(20);
  });
});

