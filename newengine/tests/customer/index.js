const request = require('supertest');

const customer = {
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
  it('should post new customer', async () => {
    /* const customer = await strapi.query('customer').create({
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
      .get('/entities/customers)
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.name).toBe(customer.name);
        expect(data.body.company).toBe(customer.company);
        expect(data.body.email).toBe(customer.email);
        expect(data.body.address).toBe(customer.address);
        expect(data.body.city).toBe(customer.city);
        expect(data.body.country).toBe(customer.country);
        expect(data.body.phone).toBe(customer.phone);
        expect(data.body.mobile).toBe(customer.mobile);
    }); */
    await request(strapi.server) 
      .post('/entities/customers')
      .send(customer)
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.name).toBe(customer.name);
        expect(data.body.company).toBe(customer.company);
        expect(data.body.email).toBe(customer.email);
        expect(data.body.address).toBe(customer.address);
        expect(data.body.city).toBe(customer.city);
        expect(data.body.country).toBe(customer.country);
        expect(data.body.phone).toBe(customer.phone);
        expect(data.body.mobile).toBe(customer.mobile);
      });
  });

it('should return customers fron customerdb', async () => {
    
     await request(strapi.server).get('/entities/customers') 
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

   it('should update customer', async () => {
  
    await request(strapi.server) 
      .put('/entities/customers/3')
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

  it('should delete customer', async () => {

  await request(strapi.server)
    .delete('/entities/customers/16')
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
it('should create 50 new customer', async () => {
  for(var i = 0; i<51; i++){
    await request(strapi.server) 
    .post('/entities/customers')
    .send(customer)
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);
  }
});
it('should delete 50 customer', async () => {
  for(var i=3; i<53; i++){
    await request(strapi.server)
    .delete('/entities/customers/'+i)
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

