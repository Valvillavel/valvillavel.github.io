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
  await grantPrivilege(2, "permissions.application.controllers.report-config-item.create");
  await grantPrivilege(2, "permissions.application.controllers.report-config-item.find");
  await grantPrivilege(2, "permissions.application.controllers.report-config-item.findOne");
  await grantPrivilege(2, "permissions.application.controllers.report-config-item.delete");
  await grantPrivilege(2, "permissions.application.controllers.report-config-item.update");
  await grantPrivilege(2, "permissions.application.controllers.report-config-item.count");
  await grantPrivilege(2, "permissions.application.controllers.report-config-system.create");
  await grantPrivilege(2, "permissions.application.controllers.report-config-subsystem.create");
});
const subsystem = {
  systemId: 1,
  name: 'jsdc'
};
const system = {
  name: 'somesystem'
};
const item = {
  systemId: 1,
  subsystemId: 1,
  name: 'jsdc',
  reportText: '4h6rrfgrgre'
};
const item2 = {
  systemId: 1,
  subsystemId: 2,
  name: 'something',
  reportText: '4h6rrfgrgre kuhishci'
};
var ids= [];
var itemid=0;
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
    });
  }
});
it('should post new reportConfigItem', async () => {
  await request(strapi.server) 
  .post('/config/items')
  .send(item)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/ )
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id);
    itemid=data.body.id;
  });
  await request(strapi.server)
  .get('/config/items/'+itemid)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id);
    expect(data.body.systemId.id).toBe(item.systemId);
    expect(data.body.subsystemId.id).toBe(item.subsystemId);
    expect(data.body.name).toBe(item.name);
    expect(data.body.reportText).toBe(item.reportText);
  });
});

it('should return reportConfigItems from reportConfigItemdb', async () => {
  await request(strapi.server)
  .get('/config/items') 
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body);
    expect(data.body.id);
    expect(data.body.systemId);
    expect(data.body.subsystemId);
    expect(data.body.name);
    expect(data.body.reportText);
  });
  await request (strapi.server)
  .get('/config/items/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(1);
  });   
});

it('should update reportConfigItem', async () => {
  await request(strapi.server) 
  .put('/config/items/'+itemid)
  .send(item2)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id).toBe(itemid);
    expect(data.body.systemId.id).toBe(item2.systemId);
    expect(data.body.subsystemId.id).toBe(item2.subsystemId);
    expect(data.body.name).toBe(item2.name);
    expect(data.body.reportText).toBe(item2.reportText);
  });
});

it('should delete reportConfigItem', async () => {
  await request(strapi.server)
  .delete('/config/items/'+itemid)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id).toBe(itemid);
    expect(data.body.systemId.id).toBe(item2.systemId);
    expect(data.body.subsystemId.id).toBe(item2.subsystemId);
    expect(data.body.name).toBe(item2.name);
    expect(data.body.reportText).toBe(item2.reportText);
  });
  await request (strapi.server)
  .get('/config/items/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(0);
  });
});
it('should create 50 new reportConfigItem', async () => {
  for(var i = 0; i<50; i++){
    await request(strapi.server) 
    .post('/config/items')
    .send(item)
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
  .get('/config/items/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(50);
  });   
});
it('should delete 30 reportConfigItems', async () => {
    for(var i=0; i<ids.length-20;i++){
      await request(strapi.server)
      .delete('/config/items/'+ids[i])
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