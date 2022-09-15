const request = require('supertest');

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
  it('should post new agent', async () => {
    /* const agent = await strapi.query('agent').create({
      name: 'Joe Doe',
      company: 'ACME',
      email: 'joe@acme.com',
      address: '123 Joe Street',
      city: 'Manassas',
      country: 'USA',
      state: 'Virginia',
      phone: '123456789',
      mobile: '123456789'
    });

    await request(strapi.server) // app server is an instance of Class: http.Server
      .get('/entities/agents)
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
    }); */
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

it('should return agents fron agentdb', async () => {
    
     await request(strapi.server).get('/entities/agents') 
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
   });

   it('should update agent', async () => {
  
    await request(strapi.server) 
      .put('/entities/agents/3')
      .send({
        name: 'Joey',
        company: 'AYC',
      })
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(data => {
        expect(data.body).toBeDefined();
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
  });

  it('should delete agent', async () => {

  await request(strapi.server)
    .delete('/entities/agents/16')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect(200)
    .then(data => {
        expect(data.body).toBeDefined();
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
});
it('should create 50 new agent', async () => {
  for(var i = 0; i<51; i++){
    await request(strapi.server) 
    .post('/entities/agents')
    .send(agent)
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);
  }
});
it('should delete 50 agent', async () => {
  for(var i=3; i<53; i++){
    await request(strapi.server)
    .delete('/entities/agents/'+i)
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect(200)
    .then(data => {
        expect(data.body).toBeDefined();
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
    }
});

