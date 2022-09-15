const request = require('supertest');

/* const workOrder = {
    customer: 1,
    agent: 4, 
    address: '123 Joe Street',
    propertyDescription: 'Manassas',
    inspectionDate: '2021-11-03T16:00:00.000Z',
    contractSigned: '123',
    contractLocation: '123456789'
} */

it('should create new work-order', async () => {
    const workOrder = await strapi.query('work-order').create({
        customer: 1,
        agent: 4, 
        address: '123 Joe Street',
        propertyDescription: 'Manassas',
        inspectionDate: '2021-11-03T16:00:00.000Z',
        contractSigned: '123',
        contractLocation: '123456789'
    });
  
    await request(strapi.server) // app server is an instance of Class: http.Server
      .get('/work-orders/'+workOrder.id)
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.customer);
        expect(data.body.customer.id).toBe(workOrder.customer.id);
        expect(data.body.agent.id).toBe(workOrder.agent.id);
        expect(data.body.address).toBe(workOrder.address);
        expect(data.body.propertyDescription).toBe(workOrder.propertyDescription);
        expect(data.body.inspectionDate).toBe(workOrder.inspectionDate);
        expect(data.body.contractSigned).toBe(workOrder.contractSigned);
        expect(data.body.contractLocation).toBe(workOrder.contractLocation);
      });
  
    
   /*  await request(strapi.server) 
     .post('/work-orders')
     .send(workOrder) 
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.customer);
        expect(data.body.customer.id).toBe(workOrder.customer);
        expect(data.body.agent.id).toBe(workOrder.agent);
        expect(data.body.address).toBe(workOrder.address);
        expect(data.body.propertyDescription).toBe(workOrder.propertyDescription);
        expect(data.body.inspectionDate).toBe(workOrder.inspectionDate);
        expect(data.body.contractSigned).toBe(workOrder.contractSigned);
        expect(data.body.contractLocation).toBe(workOrder.contractLocation);
      });  */
  });

it('should return work-orders fron work-orderdb', async () => {
     await request(strapi.server).get('/work-orders') 
     
       .set('accept', 'application/json')
       .set('Content-Type', 'application/json')
       .expect('Content-Type', /json/)
       .expect(200)
       .then(data => {
         expect(data.body);
         expect(data.body.id);
         expect(data.body.customerId);
        expect(data.body.agentId);
        expect(data.body.address);
        expect(data.body.propertyDescription);
        expect(data.body.inspectionDate);
        expect(data.body.contractSigned);
        expect(data.body.contractLocation);
       });
   });

   it('should update work-order', async () => {
     
    await request(strapi.server) // app server is an instance of Class: http.Server
      .put('/work-orders/1')
      .send({
        address: '123 Joe Strt',
        propertyDescription: 'Majncdssas',
      })
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.customerId);
        expect(data.body.agentId);
        expect(data.body.address);
        expect(data.body.propertyDescription);
        expect(data.body.inspectionDate);
        expect(data.body.contractSigned);
        expect(data.body.contractLocation);
      });
  });

  it('should delete work-order', async () => {

  await request(strapi.server) // app server is an instance of Class: http.Server
    .delete('/work-orders/5')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect(200)
    .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.customerId);
        expect(data.body.agentId);
        expect(data.body.address);
        expect(data.body.propertyDescription);
        expect(data.body.inspectionDate);
        expect(data.body.contractSigned);
        expect(data.body.contractLocation);
    });
});

it('should create 50 new work-order', async () => {
    for(var i = 0; i<51; i++){
        const workOrder = await strapi.query('work-order').create({
            customer: 1,
            agent: 4, 
            address: '123 Joe Street',
            propertyDescription: 'Manassas',
            inspectionDate: '2021-11-03T16:00:00.000Z',
            contractSigned: '123',
            contractLocation: '123456789'
        });
    }
});
it('should delete 50 work-order', async () => {
  for(var i=3; i<53; i++){
    await request(strapi.server)
    .delete('/work-orders/'+i)
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect(200)
    .then(data => {
      expect(data.body).toBeDefined();
      expect(data.body.id);
      expect(data.body.customerId);
      expect(data.body.agentId);
      expect(data.body.address);
      expect(data.body.propertyDescription);
      expect(data.body.inspectionDate);
      expect(data.body.contractSigned);
      expect(data.body.contractLocation);
      });
    }
  });
        