const request = require('supertest');

const inspection = {
  workOrderId: 18
};
  it('should post new inspection', async () => {
    /* const inspection = await strapi.query('inspection').create({
      workOrderId:3
    });

    await request(strapi.server) // app server is an instance of Class: http.Server
      .get('/inspections)
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.workOrder).toBe(inspection.workOrder);
    }); */
    await request(strapi.server) 
      .post('/inspections')
      .send(inspection)
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/ )
      .expect(200)
      .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.workOrder);
        expect(data.body.workOrderId.id).toBe(inspection.workOrderId);
      });
  });

it('should return inspections fron inspectiondb', async () => {
    
     await request(strapi.server).get('/inspections') 
       .set('accept', 'application/json')
       .set('Content-Type', 'application/json')
       .expect('Content-Type', /json/)
       .expect(200)
       .then(data => {
         expect(data.body);
         expect(data.body.id);
         expect(data.body.workOrderId);
       });
   });

   it('should update inspection', async () => {
  
    await request(strapi.server) 
      .put('/inspections/3')
      .send({
        workOrderId: 7
      })
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.workOrderId.id);
      });
  });

  it('should delete inspection', async () => {

  await request(strapi.server)
    .delete('/inspections/1')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect(200)
    .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.workOrderId);
    });
});
it('should create 50 new inspection', async () => {
  for(var i = 0; i<51; i++){
    await request(strapi.server) 
    .post('/inspections')
    .send(inspection)
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);
  }
});
it('should delete 50 inspection', async () => {
  for(var i=3; i<53; i++){
    await request(strapi.server)
    .delete('/inspectios/'+i)
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect(200)
    .then(data => {
      expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.workOrderId);
      });
    }
}); 

