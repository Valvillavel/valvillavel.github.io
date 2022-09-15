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
})
it('strapi is defined', () => {
  expect(strapi).toBeDefined();
});
beforeAll(async () => {
  await grantPrivilege(2, "permissions.application.controllers.agent.create");
  await grantPrivilege(2, "permissions.application.controllers.agent.find");
  await grantPrivilege(2, "permissions.application.controllers.agent.findOne");
  await grantPrivilege(2, "permissions.application.controllers.agent.delete");
  await grantPrivilege(2, "permissions.application.controllers.agent.update");
  await grantPrivilege(2, "permissions.application.controllers.agent.count");
});

const agent = {
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
const agent2 = {
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
var ids=[];
var agentid=0;
var cant=0;
it('should post new agent', async () => {
  await request(strapi.server) 
  .post('/entities/agents')
  .send(agent)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id);
    agentid=data.body.id;
  });
  
});
it('should check that agent was created correctly', async () => {
  await request(strapi.server)
  .get('/entities/agents/'+agentid)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id);
    expect(data.body.name).toBe(agent.name);
    expect(data.body.company).toBe(agent.company);
    expect(data.body.email).toBe(agent.email);
    expect(data.body.address).toBe(agent.address);
    expect(data.body.city).toBe(agent.city);
    expect(data.body.country).toBe(agent.country);
    expect(data.body.phone).toBe(agent.phone);
    expect(data.body.mobile).toBe(agent.mobile);
  });
});
it('should return agents from agentdb', async () => {
  await request(strapi.server)
  .get('/entities/agents') 
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
  .get('/entities/agents/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(1);
  });      
});
it('should update agent', async () => {
  await request(strapi.server) 
  .put('/entities/agents/'+agentid)
  .send(agent2)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id).toBe(agentid);
    expect(data.body.name).toBe(agent2.name);
    expect(data.body.company).toBe(agent2.company);
    expect(data.body.email).toBe(agent2.email);
    expect(data.body.address).toBe(agent2.address);
    expect(data.body.city).toBe(agent2.city);
    expect(data.body.country).toBe(agent2.country);
    expect(data.body.phone).toBe(agent2.phone);
    expect(data.body.mobile).toBe(agent2.mobile);
  });
});
it('should delete agent', async () => {
  await request(strapi.server)
  .delete('/entities/agents/'+agentid)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body.id).toBe(agentid);
    expect(data.body.name).toBe(agent2.name);
    expect(data.body.company).toBe(agent2.company);
    expect(data.body.email).toBe(agent2.email);
    expect(data.body.address).toBe(agent2.address);
    expect(data.body.city).toBe(agent2.city);
    expect(data.body.country).toBe(agent2.country);
    expect(data.body.phone).toBe(agent2.phone);
    expect(data.body.mobile).toBe(agent2.mobile);
  });
  await request (strapi.server)
  .get('/entities/agents/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(0);
  });
});
it('should create 50 new agents', async () => {
for(var i = 0; i<50; i++){
  await request(strapi.server) 
  .post('/entities/agents')
  .send(agent)
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
  .get('/entities/agents/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    cant=data.body;
  });
});
it('should delete 30 agents', async () => {
for(var i=0; i<(ids.length-20);i++){
  await request(strapi.server)
  .delete('/entities/agents/'+ids[i])
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
  });
}
  await request (strapi.server)
  .get('/entities/agents/count')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  .then(data => {
    expect(data.body).toBeDefined();
    expect(data.body).toBe(cant-30);
  });
});
