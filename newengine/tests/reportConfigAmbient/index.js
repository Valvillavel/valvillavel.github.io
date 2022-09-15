const request = require('supertest');

const reportConfigAmbient = {
    name: 'preba ',
    regOrder: '23424'
};
  it('should post new reportConfigAmbient', async () => {
    /* const reportConfigAmbient = await strapi.query('reportConfigAmbient').create({
      workOrderId:3
    });

    await request(strapi.server) // app server is an instance of Class: http.Server
      .get('/reportConfigAmbients)
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.workOrder).toBe(reportConfigAmbient.workOrder);
    }); */
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
        expect(data.body.name).toBe(reportConfigAmbient.name);
        expect(data.body.regOrder).toBe(reportConfigAmbient.regOrder);
      });
  });

it('should return reportConfigAmbients fron reportConfigAmbientdb', async () => {
    
     await request(strapi.server).get('/config/ambients') 
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
   });

   it('should update reportConfigAmbient', async () => {
  
    await request(strapi.server) 
      .put('/config/ambients/3')
      .send({
        name: 'preba6',
        regOrder: '23454624'
      })
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.name);
         expect(data.body.regOrder);
      });
  });

  it('should delete reportConfigAmbient', async () => {

  await request(strapi.server)
    .delete('/config/ambients/1')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect(200)
    .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.name);
         expect(data.body.regOrder);
    });
});
it('should create 50 new reportConfigAmbient', async () => {
  for(var i = 0; i<51; i++){
    await request(strapi.server) 
    .post('/config/ambients')
    .send(reportConfigAmbient)
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);
  }
});
it('should delete 50 reportConfigAmbient', async () => {
  for(var i=3; i<53; i++){
    await request(strapi.server)
      .delete('/config/ambients/'+i)
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect(200)
      .then(data => {
          expect(data.body).toBeDefined();
          expect(data.body.id);
          expect(data.body.name);
          expect(data.body.regOrder);
      });
    }
  });

