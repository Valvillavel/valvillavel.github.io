const request = require('supertest');

const subsystem = {
    systemId: 53,
    name: 'jsdc'
};
  it('should post new reportConfigSubsystem', async () => {
    /* const reportConfigSubsystem = await strapi.query('reportConfigSubsystem').create({
      workOrderId:3
    });

    await request(strapi.server) // app server is an instance of Class: http.Server
      .get('/config/Subsystems)
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.name).toBe(reportConfigSubsystem.name);
    }); */
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
        expect(data.body.systemId.id).toBe(subsystem.systemId);
        expect(data.body.name).toBe(subsystem.name);
      });
  });

it('should return reportConfigSubsystems fron reportConfigSubsystemdb', async () => {
    
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
   });

   it('should update reportConfigSubsystem', async () => {
  
    await request(strapi.server) 
      .put('/config/subsystems/3')
      .send({
        systemId: 63,
        name: 'preba6',
      })
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.systemId);
        expect(data.body.name);
      });
  });

  it('should delete reportConfigSubsystem', async () => {

  await request(strapi.server)
    .delete('/config/subsystems/2')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect(200)
    .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.systemId);
        expect(data.body.name);
    });
});
it('should create 50 new reportConfigSubsystem', async () => {
  for(var i = 0; i<51; i++){
    await request(strapi.server) 
    .post('/config/subsystems')
    .send(subsystem)
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);
  }
});
it('should delete 50 reportConfigSubsystem', async () => {
    for(var i=3; i<53; i++){
        await request(strapi.server)
          .delete('/config/subsystems/'+i)
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
});  