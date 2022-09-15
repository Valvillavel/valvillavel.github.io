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
  await grantPrivilege(2, "permissions.application.controllers.inspector.create");
  await grantPrivilege(2, "permissions.application.controllers.inspector.find");
  await grantPrivilege(2, "permissions.application.controllers.inspector.findOne");
  await grantPrivilege(2, "permissions.application.controllers.inspector.delete");
  await grantPrivilege(2, "permissions.application.controllers.inspector.update");
  await grantPrivilege(2, "permissions.application.controllers.inspector.count");
});
const inspector = {
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
const inspector2 = {
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
var inspectorid=0;
it('should post new inspector', async () => {
  await request(strapi.server) 
  .post('/entities/inspectors')
  .send(inspector)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id);
    inspectorid=data.body.id;
  });
  await request(strapi.server)
  .get('/entities/inspectors/'+inspectorid)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id);
    expect(data.body.name).toBe(inspector.name);
    expect(data.body.company).toBe(inspector.company);
    expect(data.body.email).toBe(inspector.email);
    expect(data.body.address).toBe(inspector.address);
    expect(data.body.city).toBe(inspector.city);
    expect(data.body.country).toBe(inspector.country);
    expect(data.body.phone).toBe(inspector.phone);
    expect(data.body.mobile).toBe(inspector.mobile);
  });
});
it('should return inspectors from inspectordb', async () => {
  await request(strapi.server).get('/entities/inspectors') 
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
  .get('/entities/inspectors/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(1);
  });   
});
it('should update inspector', async () => {
 await request(strapi.server) 
  .put('/entities/inspectors/'+inspectorid)
  .send(inspector2)
   .set('accept', 'application/json')
   .set('Content-Type', 'application/json')
   .expect('Content-Type', /json/)
   .expect(200)
   .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id).toBe(inspectorid);
    expect(data.body.name).toBe(inspector2.name);
    expect(data.body.company).toBe(inspector2.company);
    expect(data.body.email).toBe(inspector2.email);
    expect(data.body.address).toBe(inspector2.address);
    expect(data.body.city).toBe(inspector2.city);
    expect(data.body.country).toBe(inspector2.country);
    expect(data.body.phone).toBe(inspector2.phone);
    expect(data.body.mobile).toBe(inspector2.mobile);
   });
});
it('should delete inspector', async () => {
  await request(strapi.server)
  .delete('/entities/inspectors/'+inspectorid)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect(200)
  .then(data => {
      expect(data.body).toBeDefined();
  });
  await request (strapi.server)
  .get('/entities/inspectors/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(0);
  });
});
it('should create 50 new inspectors', async () => {
 for(var i = 0; i<50; i++){
  await request(strapi.server) 
  .post('/entities/inspectors')
  .send(inspector)
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
  .get('/entities/inspectors/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(50);
  });   
});
it('should delete 30 inspector', async () => {
  for(var i=0; i<ids.length-20;i++){
    await request(strapi.server)
    .delete('/entities/inspectors/'+ids[i])
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect(200)
    .then(data => {
      expect(data.body).toBeDefined();
    });
  }
    await request (strapi.server)
    .get('/entities/inspectors/count')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(data => {
      expect(data.body).toBeDefined();
      expect(data.body).toBe(20);
    });
});
