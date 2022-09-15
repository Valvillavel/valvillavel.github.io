const request = require('supertest');
const fs = require('fs');
const { setupStrapi, grantPrivilege} = require('../helpers/strapi');

/** this code is called once before any test is called */
beforeAll(async () => {
  await setupStrapi(); // singleton so it can be called many times
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
  await grantPrivilege(2, "permissions.application.controllers.customer.create");
  await grantPrivilege(2, "permissions.application.controllers.customer.find");
  await grantPrivilege(2, "permissions.application.controllers.customer.findOne");
  await grantPrivilege(2, "permissions.application.controllers.customer.delete");
  await grantPrivilege(2, "permissions.application.controllers.customer.update");
  await grantPrivilege(2, "permissions.application.controllers.customer.count");
});
const customer = {
  name: 'Joe Doe',
  company: 'ACME',
  email: 'joe@acme.com',
  address: '123 Joe Street',
  city: 'Manassas',
  country: 'USA',
  state: 'Virginia',
  phone: '123456789',
  mobile: '123456789'
};
const customer2 = {
  name: 'Joe Denner',
  company: 'AYC',
  email: 'joe@ayc.com',
  address: '123 Denner Street',
  city: 'Manassas',
  country: 'USA',
  state: 'Virginia',
  phone: '123456789',
  mobile: '123456789'
};
var ids= [];
var customerid=0;
it('should post new customer', async () => {
  await request(strapi.server) 
  .post('/entities/customers')
  .send(customer)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id);
    customerid=data.body.id;
  });
  await request(strapi.server)
  .get('/entities/customers/'+customerid)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id);
    expect(data.body.name).toBe(customer.name);
    expect(data.body.company).toBe(customer.company);
    expect(data.body.email).toBe(customer.email);
    expect(data.body.address).toBe(customer.address);
    expect(data.body.city).toBe(customer.city);
    expect(data.body.country).toBe(customer.country);
    expect(data.body.phone).toBe(customer.phone);
    expect(data.body.mobile).toBe(customer.mobile);
  });
});
it('should return customers from customerdb', async () => {
  await request(strapi.server).get('/entities/customers') 
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body);
    expect(data.body.id);
    expect(data.body.name);
    expect(data.body.company);
    expect(data.body.email);
    expect(data.body.address);
    expect(data.body.city);
    expect(data.body.country);
    expect(data.body.phone);
    expect(data.body.mobile);
  });
  await request (strapi.server)
  .get('/entities/customers/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(1);
  });   
});
it('should update customer', async () => {
 await request(strapi.server) 
  .put('/entities/customers/'+customerid)
  .send(customer2)
   .set('accept', 'application/json')
   .set('Content-Type', 'application/json')
   .expect('Content-Type', /json/)
   .expect(200)
   .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id).toBe(customerid);
    expect(data.body.name).toBe(customer2.name);
    expect(data.body.company).toBe(customer2.company);
    expect(data.body.email).toBe(customer2.email);
    expect(data.body.address).toBe(customer2.address);
    expect(data.body.city).toBe(customer2.city);
    expect(data.body.country).toBe(customer2.country);
    expect(data.body.phone).toBe(customer2.phone);
    expect(data.body.mobile).toBe(customer2.mobile);
   });
});
it('should delete customer', async () => {
  await request(strapi.server)
  .delete('/entities/customers/'+customerid)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect(200)
  .then(data => {
      expect(data.body).toBeDefined();
  });
  await request (strapi.server)
  .get('/entities/customers/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(0);
  });
});
it('should create 50 new customers', async () => {
 for(var i = 0; i<50; i++){
  await request(strapi.server) 
  .post('/entities/customers')
  .send(customer)
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
  .get('/entities/customers/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(50);
  });   
});
it('should delete 30 customer', async () => {
  for(var i=0; i<ids.length-20;i++){
    await request(strapi.server)
    .delete('/entities/customers/'+ids[i])
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect(200)
    .then(data => {
      expect(data.body).toBeDefined();
    });
  }
    await request (strapi.server)
    .get('/entities/customers/count')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(data => {
      expect(data.body).toBeDefined();
      expect(data.body).toBe(20);
    });
});
