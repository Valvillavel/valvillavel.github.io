const request = require('supertest');
const fs = require('fs');
const { setupStrapi, grantPrivilege } = require('../helpers/strapi');

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
  await grantPrivilege(2, "permissions.application.controllers.contractor.create");
  await grantPrivilege(2, "permissions.application.controllers.contractor.find");
  await grantPrivilege(2, "permissions.application.controllers.contractor.findOne");
  await grantPrivilege(2, "permissions.application.controllers.contractor.delete");
  await grantPrivilege(2, "permissions.application.controllers.contractor.update");
  await grantPrivilege(2, "permissions.application.controllers.contractor.count");
});

const contractor = {
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
const contractor2 = {
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
var contractorid=0;
it('should post new contractor', async () => {
  await request(strapi.server) 
  .post('/entities/contractors')
  .send(contractor)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id);
    contractorid=data.body.id;
  });
  await request(strapi.server)
  .get('/entities/contractors/'+contractorid)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id);
    expect(data.body.name).toBe(contractor.name);
    expect(data.body.company).toBe(contractor.company);
    expect(data.body.email).toBe(contractor.email);
    expect(data.body.address).toBe(contractor.address);
    expect(data.body.city).toBe(contractor.city);
    expect(data.body.country).toBe(contractor.country);
    expect(data.body.phone).toBe(contractor.phone);
    expect(data.body.mobile).toBe(contractor.mobile);
  });
});
it('should return contractors from contractordb', async () => {
  await request(strapi.server).get('/entities/contractors') 
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
  .get('/entities/contractors/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(1);
  });   
});
it('should update contractor', async () => {
 await request(strapi.server) 
  .put('/entities/contractors/'+contractorid)
  .send(contractor2)
   .set('accept', 'application/json')
   .set('Content-Type', 'application/json')
   .expect('Content-Type', /json/)
   .expect(200)
   .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id).toBe(contractorid);
    expect(data.body.name).toBe(contractor2.name);
    expect(data.body.company).toBe(contractor2.company);
    expect(data.body.email).toBe(contractor2.email);
    expect(data.body.address).toBe(contractor2.address);
    expect(data.body.city).toBe(contractor2.city);
    expect(data.body.country).toBe(contractor2.country);
    expect(data.body.phone).toBe(contractor2.phone);
    expect(data.body.mobile).toBe(contractor2.mobile);
   });
});
it('should delete contractor', async () => {
  await request(strapi.server)
  .delete('/entities/contractors/'+contractorid)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect(200)
  .then(data => {
      expect(data.body).toBeDefined();
  });
  await request (strapi.server)
  .get('/entities/contractors/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(0);
  });
});
it('should create 50 new contractors', async () => {
 for(var i = 0; i<50; i++){
  await request(strapi.server) 
  .post('/entities/contractors')
  .send(contractor)
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
  .get('/entities/contractors/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(50);
  });   
});
it('should delete 30 contractor', async () => {
  for(var i=0; i<ids.length-20;i++){
    await request(strapi.server)
    .delete('/entities/contractors/'+ids[i])
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect(200)
    .then(data => {
      expect(data.body).toBeDefined();
    });
  }
    await request (strapi.server)
    .get('/entities/contractors/count')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(data => {
      expect(data.body).toBeDefined();
      expect(data.body).toBe(20);
    });
});

