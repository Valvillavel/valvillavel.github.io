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
  await grantPrivilege(2, "permissions.application.controllers.report-config-ambients.create");
  await grantPrivilege(2, "permissions.application.controllers.report-config-ambients.find");
  await grantPrivilege(2, "permissions.application.controllers.report-config-ambients.findOne");
  await grantPrivilege(2, "permissions.application.controllers.report-config-ambients.delete");
  await grantPrivilege(2, "permissions.application.controllers.report-config-ambients.update");
  await grantPrivilege(2, "permissions.application.controllers.report-config-ambients.count");
});
const reportConfigAmbient = {
    name: 'prueba ',
    regOrder: '23424'
};
const reportConfigAmbient2 = {
    name: 'prueba ',
    regOrder: '83773'
};
var ids= [];
var ambientid=0;
it('should post new reporConfigAmbient', async () => {
   await request(strapi.server) 
   .post('/config/ambients')
   .send(reportConfigAmbient)
   .set('accept', 'application/json')
   .set('Content-Type', 'application/json')
   .expect('Content-Type', /json/ )
   .expect(200)
   .then(data => {
     expect(data.body).toBeDefined();
     expect(data.body.id);
     ambientid=data.body.id;
   });
   await request(strapi.server)
   .get('/config/ambients/'+ambientid)
   .set('accept', 'application/json')
   .set('Content-Type', 'application/json')
   .expect('Content-Type', /json/)
   .expect(200)
   .then(data => {
     expect(data.body).toBeDefined();
     expect(data.body.id);
     expect(data.body.name).toBe(reportConfigAmbient.name);
     expect(data.body.regOrder).toBe(reportConfigAmbient.regOrder);
   });
});
it('should return reporConfigAmbients from reporConfigAmbientdb', async () => {
    await request(strapi.server)
    .get('/config/ambients') 
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(data => {
      expect(data.body);
      expect(data.body.id);
      expect(data.body.name);
      expect(data.body.regOrder);
    });
    await request (strapi.server)
    .get('/config/ambients/count')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(data => {
      expect(data.body).toBeDefined();
      expect(data.body).toBe(1);
    });     
});
it('should update reporConfigAmbient', async () => {
    await request(strapi.server) 
    .put('/config/ambients/'+ambientid)
    .send(reportConfigAmbient2)
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(data => {
      expect(data.body).toBeDefined();
      expect(data.body.id).toBe(ambientid);
      expect(data.body.name).toBe(reportConfigAmbient2.name);
      expect(data.body.regOrder).toBe(reportConfigAmbient2.regOrder);
    });
});
it('should delete reporConfigAmbient', async () => {
   await request(strapi.server)
   .delete('/config/ambients/'+ambientid)
   .set('accept', 'application/json')
   .set('Content-Type', 'application/json')
   .expect(200)
   .then(data => {
       expect(data.body).toBeDefined();
       expect(data.body.id).toBe(ambientid);
       expect(data.body.name).toBe(reportConfigAmbient2.name);
       expect(data.body.regOrder).toBe(reportConfigAmbient2.regOrder);
   });
   await request (strapi.server)
   .get('/config/ambients/count')
   .set('accept', 'application/json')
   .set('Content-Type', 'application/json')
   .expect('Content-Type', /json/)
   .expect(200)
   .then(data => {
     expect(data.body).toBeDefined();
     expect(data.body).toBe(0);
   })
});
it('should create 50 new reporConfigAmbients', async () => {
for(var i = 0; i<50; i++){
   await request(strapi.server) 
   .post('/config/ambients')
   .send(reportConfigAmbient)
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
   .get('/config/ambients/count')
   .set('accept', 'application/json')
   .set('Content-Type', 'application/json')
   .expect('Content-Type', /json/)
   .expect(200)
   .then(data => {
       expect(data.body).toBeDefined();
       expect(data.body).toBe(50);
   });
});
it('should delete 30 reporConfigAmbients', async () => {
for(var i=0; i<(ids.length-20);i++){
   await request(strapi.server)
   .delete('/config/ambients/'+ids[i])
   .set('accept', 'application/json')
   .set('Content-Type', 'application/json')
   .expect(200)
   .then(data => {
       expect(data.body).toBeDefined();
   });
}
  await request (strapi.server)
  .get('/config/ambients/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(20);
  });
});