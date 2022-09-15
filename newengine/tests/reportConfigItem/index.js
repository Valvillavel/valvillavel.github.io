const request = require('supertest');

const item = {
    systemId: 53,
    subsystemId: 100,
    name: 'jsdc',
    reportText: '4h6rrfgrgre'
};
  it('should post new reportConfigItem', async () => {
    /* const reportConfigItem = await strapi.query('reportConfigItem').create({
      workOrderId:3
    });

    await request(strapi.server) // app server is an instance of Class: http.Server
      .get('/config/Items)
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.name).toBe(reportConfigItem.name);
    }); */
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
        expect(data.body.systemId.id).toBe(item.systemId);
        expect(data.body.subsystemId.id).toBe(item.subsystemId);
        expect(data.body.name).toBe(item.name);
        expect(data.body.reportText).toBe(item.reportText);
      });
  });

it('should return reportConfigItems fron reportConfigItemdb', async () => {
    
     await request(strapi.server).get('/config/items') 
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
   });

   it('should update reportConfigItem', async () => {
  
    await request(strapi.server) 
      .put('/config/items/3')
      .send({
        systemId: 43,
        subsystemId: 120,
        name: 'jsdc',
        reportText: '4h6rrfcx vbhfgrgre'
      })
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.systemId);
        expect(data.body.subsystemId);
        expect(data.body.name);
        expect(data.body.reportText);
      });
  });

  it('should delete reportConfigItem', async () => {

  await request(strapi.server)
    .delete('/config/items/2')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect(200)
    .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.systemId);
        expect(data.body.subsystemId);
        expect(data.body.name);
        expect(data.body.reportText);
    });
});
it('should create 50 new reportConfigItem', async () => {
  for(var i = 0; i<51; i++){
    await request(strapi.server) 
    .post('/config/items')
    .send(Item)
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);
  }
});
it('should delete 50 reportConfigItem', async () => {
    for(var i=3; i<53; i++){
        await request(strapi.server)
          .delete('/config/items/'+i)
          .set('accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect(200)
          .then(data => {
              expect(data.body).toBeDefined();
              expect(data.body.id);
              expect(data.body.systemId);
              expect(data.body.subsystemId);
              expect(data.body.name);
              expect(data.body.reportText);
          });
        }
});  