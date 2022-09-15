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
  await grantPrivilege(2, "permissions.application.controllers.report-config-system.create");
  await grantPrivilege(2, "permissions.application.controllers.report-config-system.find");
  await grantPrivilege(2, "permissions.application.controllers.report-config-system.findOne");
  await grantPrivilege(2, "permissions.application.controllers.report-config-system.delete");
  await grantPrivilege(2, "permissions.application.controllers.report-config-system.update");
  await grantPrivilege(2, "permissions.application.controllers.report-config-system.count");
});
const reportConfigSystem = {
  name: 'prueba '
};
const reportConfigSystem2 = {
  name: 'somesystem'
};
var ids= [];
var systemid=0;
it('should post new reportConfigSystem', async () => { 
  await request(strapi.server) 
  .post('/config/systems')
  .send(reportConfigSystem)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/ )
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id);
    systemid=data.body.id;
  });
  await request(strapi.server)
  .get('/config/systems/'+systemid)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id).toBe(systemid);
    expect(data.body.name).toBe(reportConfigSystem.name);
  });
});

it('should return reportConfigsystems from reportConfigsystemdb', async () => {
  await request(strapi.server).get('/config/systems') 
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body);
    expect(data.body.id);
    expect(data.body.name);
  });
  await request (strapi.server)
  .get('/config/systems/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(1);
  });   
 });

it('should update reportConfigsystem', async () => { 
  await request(strapi.server) 
  .put('/config/systems/'+systemid)
  .send(reportConfigSystem2)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id).toBe(systemid);
    expect(data.body.name).toBe(reportConfigSystem2.name);
  });
});

it('should delete reportConfigSystem', async () => {
  await request(strapi.server)
  .delete('/config/systems/'+systemid)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id).toBe(systemid);
    expect(data.body.name).toBe(reportConfigSystem2.name);
  });
  await request (strapi.server)
  .get('/config/systems/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(0);
  });
});
it('should create 50 new reportConfigSystem', async () => {
  for(var i = 0; i<50; i++){
    await request(strapi.server) 
    .post('/config/systems')
    .send(reportConfigSystem)
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
  .get('/config/systems/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(50);
  });   
});
it('should delete 30 reportConfigSystems', async () => {
  for(var i=0; i<ids.length-20;i++){
    await request(strapi.server)
    .delete('/config/systems/'+ids[i])
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect(200)
    .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.name);
    });
  }
  await request (strapi.server)
  .get('/config/systems/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(20);
  });
});  
