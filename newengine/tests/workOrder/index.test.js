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
  await grantPrivilege(2, "permissions.application.controllers.work-order.create");
  await grantPrivilege(2, "permissions.application.controllers.work-order.find");
  await grantPrivilege(2, "permissions.application.controllers.work-order.findOne");
  await grantPrivilege(2, "permissions.application.controllers.work-order.delete");
  await grantPrivilege(2, "permissions.application.controllers.work-order.update");
  await grantPrivilege(2, "permissions.application.controllers.work-order.count");
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
const workOrder2 = {
  customerid: 1,
  agentid: 6, 
  address: '123 Den Street',
  propertyDescription: 'Virginia',
  inspectionDate: '2021-11-03T16:00:00.000Z',
  contractSigned: '123',
  contractLocation: '123456789'
};
var ids= [];
var orderid=0;
it('should create new work-order', async () => {
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
    orderid=data.body.id;
  });
  await request(strapi.server)
  .get('/work-orders/'+orderid)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id).toBe(orderid);
    expect(data.body.customer.id).toBe(workOrder.customerid);
    expect(data.body.agent.id).toBe(workOrder.agentid);
    expect(data.body.address).toBe(workOrder.address);
    expect(data.body.propertyDescription).toBe(workOrder.propertyDescription);
    expect(data.body.inspectionDate).toBe(workOrder.inspectionDate);
    expect(data.body.contractSigned).toBe(workOrder.contractSigned);
    expect(data.body.contractLocation).toBe(workOrder.contractLocation);
  });  
});

it('should return work-orders from work-orderdb', async () => {
  await request(strapi.server).get('/work-orders') 
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body);
    expect(data.body.id);
    expect(data.body.customerId);
    expect(data.body.agentId);
    expect(data.body.address);
    expect(data.body.propertyDescription);
    expect(data.body.inspectionDate);
    expect(data.body.contractSigned);
    expect(data.body.contractLocation);
  });
  await request (strapi.server)
  .get('/work-orders/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(1);
  });   
});

it('should update work-order', async () => {
  await request(strapi.server) 
  .put('/work-orders/'+orderid)
  .send(workOrder2)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id).toBe(orderid);
    expect(data.body.customer.id).toBe(workOrder2.customerid);
    expect(data.body.agent.id).toBe(workOrder2.agentid);
    expect(data.body.address).toBe(workOrder2.address);
    expect(data.body.propertyDescription).toBe(workOrder2.propertyDescription);
    expect(data.body.inspectionDate).toBe(workOrder2.inspectionDate);
    expect(data.body.contractSigned).toBe(workOrder2.contractSigned);
    expect(data.body.contractLocation).toBe(workOrder2.contractLocation);
  });
});

it('should delete work-order', async () => {
  await request(strapi.server) 
  .delete('/work-orders/'+orderid)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id).toBe(orderid);
    expect(data.body.customer.id).toBe(workOrder2.customerid);
    expect(data.body.agent.id).toBe(workOrder2.agentid);
    expect(data.body.address).toBe(workOrder2.address);
    expect(data.body.propertyDescription).toBe(workOrder2.propertyDescription);
    expect(data.body.inspectionDate).toBe(workOrder2.inspectionDate);
    expect(data.body.contractSigned).toBe(workOrder2.contractSigned);
    expect(data.body.contractLocation).toBe(workOrder2.contractLocation);
  });
  await request (strapi.server)
  .get('/work-orders/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(0);
  });
});

it('should create 50 new work-orders', async () => {
  for(var i = 0; i<51; i++){
    await request(strapi.server) 
    .post('/work-order')
    .send(workOrder)
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
  .get('/work-orders/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(50);
  });   
});
it('should delete 50 work-order', async () => {
  for(var i=0; i<ids.length-20;i++){
    await request(strapi.server)
    .delete('/work-orders/'+ids[i])
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect(200)
    .then(data => {
      expect(data.body).toBeDefined();
      expect(data.body.id);
      expect(data.body.customerId);
      expect(data.body.agentId);
      expect(data.body.address);
      expect(data.body.propertyDescription);
      expect(data.body.inspectionDate);
      expect(data.body.contractSigned);
      expect(data.body.contractLocation);
      });
    }
    await request (strapi.server)
    .get('/work-orders/count')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(data => {
      expect(data.body).toBeDefined();
      expect(data.body).toBe(20);
    });
  });
        