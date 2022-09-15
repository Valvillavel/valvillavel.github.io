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
  await grantPrivilege(2, "permissions.application.controllers.report-config-subsystem.create");
  await grantPrivilege(2, "permissions.application.controllers.report-config-subsystem.find");
  await grantPrivilege(2, "permissions.application.controllers.report-config-subsystem.findOne");
  await grantPrivilege(2, "permissions.application.controllers.report-config-subsystem.delete");
  await grantPrivilege(2, "permissions.application.controllers.report-config-subsystem.update");
  await grantPrivilege(2, "permissions.application.controllers.report-config-subsystem.count");
  await grantPrivilege(2, "permissions.application.controllers.report-config-system.create");
});
const system = {
  name: 'somesystem'
};
const subsystem = {
  systemId: 1,
  name: 'jsdc'
};
const subsystem2 = {
  name: 'somesubsystem'
};
var ids= [];
var subsystemid=0;
it("should post new system an subsystem", async () =>{
  for(var i=0; i<2; i++){
    await request(strapi.server) 
    .post('/config/systems')
    .send(system)
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/ )
    .expect(200)
    .then(data => {
      expect(data.body).toBeDefined();
      expect(data.body.id);
    });
  }
});
it('should post new reportConfigSubsystem', async () => {
  await request(strapi.server) 
  .post('/config/subsystems')
  .send(subsystem)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/ )
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id);
    subsystemid=data.body.id;
  });
  await request(strapi.server)
  .get('/config/subsystems/'+subsystemid)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id).toBe(subsystemid);
    expect(data.body.systemId.id).toBe(subsystem.systemId);
    expect(data.body.name).toBe(subsystem.name);
  });
});

it('should return reportConfigSubsystems from reportConfigSubsystemdb', async () => {
  await request(strapi.server).get('/config/subsystems') 
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body);
    expect(data.body.id);
    expect(data.body.systemId);
    expect(data.body.name);
  });
  await request (strapi.server)
  .get('/config/subsystems/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
   expect(data.body).toBeDefined();
   expect(data.body).toBe(1);
  });   
});

it('should update reportConfigSubsystem', async () => { 
  await request(strapi.server) 
  .put('/config/subsystems/'+subsystemid)
  .send(subsystem2)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id).toBe(subsystemid);
    expect(data.body.name).toBe(subsystem2.name);
  });
});

it('should delete reportConfigSubsystem', async () => {
  await request(strapi.server)
  .delete('/config/subsystems/'+subsystemid)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id).toBe(subsystemid);
    expect(data.body.systemId.id).toBe(subsystem2.systemId);
    expect(data.body.name).toBe(subsystem2.name);
  });
  await request (strapi.server)
  .get('/config/subsystems/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(0);
  });
});
it('should create 50 new reportConfigSubsystem', async () => {
  for(var i = 0; i<50; i++){
    await request(strapi.server) 
    .post('/config/subsystems')
    .send(subsystem)
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
  .get('/config/subsystems/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(50);
  });   
});
it('should delete 30 reportConfigSubsystems', async () => {
  for(var i=0; i<ids.length-20;i++){
    await request(strapi.server)
    .delete('/config/subsystems/'+ids[i])
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect(200)
    .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.systemId);
        expect(data.body.name);
    });
  }
    await request (strapi.server)
    .get('/config/subsystems/count')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(data => {
      expect(data.body).toBeDefined();
      expect(data.body).toBe(20);
    });
});  