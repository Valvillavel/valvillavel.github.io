const request = require('supertest');

const reportConfigSystem = {
    name: 'preba '
};
  it('should post new reportConfigSystem', async () => { 
    /* const reportConfigSystem = await strapi.query('reportConfigSystem').create({
      workOrderId:3
    });

    await request(strapi.server) // app server is an instance of Class: http.Server
      .get('/config/systems)
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.name).toBe(reportConfigSystem.name);
    }); */
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
        expect(data.body.name).toBe(reportConfigSystem.name);
      });
  });

it('should return reportConfigsystems fron reportConfigsystemdb', async () => {
    
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
   });

   it('should update reportConfigsystem', async () => {
  
    await request(strapi.server) 
      .put('/config/systems/3')
      .send({
        name: 'preba6',
      })
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.name);
      });
  });

  it('should delete reportConfigSystem', async () => {

  await request(strapi.server)
    .delete('/config/systems/1')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect(200)
    .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.name);
    });
});
it('should create 50 new reportConfigSystem', async () => {
  for(var i = 0; i<51; i++){
    await request(strapi.server) 
    .post('/config/systems')
    .send(reportConfigSystem)
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);
  }
});
it('should delete 50 reportConfigSystem', async () => {
  for(var i=3; i<53; i++){
  await request(strapi.server)
    .delete('/config/systems/'+i)
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect(200)
    .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.name);
    });
  }

});  
