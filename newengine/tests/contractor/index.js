const request = require('supertest');

const contractor = {
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
  it('should post new contractor', async () => {
    /* const contractor = await strapi.query('contractor').create({
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
      .get('/entities/contractors)
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.name).toBe(contractor.name);
        expect(data.body.company).toBe(contractor.company);
        expect(data.body.email).toBe(contractor.email);
        expect(data.body.address).toBe(contractor.address);
        expect(data.body.city).toBe(contractor.city);
        expect(data.body.country).toBe(contractor.country);
        expect(data.body.phone).toBe(contractor.phone);
        expect(data.body.mobile).toBe(contractor.mobile);
    }); */
    await request(strapi.server) 
      .post('/entities/contractors')
      .send(contractor)
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(data => {
        expect(data.body).toBeDefined();
        expect(data.body.id);
        expect(data.body.name).toBe(contractor.name);
        expect(data.body.company).toBe(contractor.company);
        expect(data.body.email).toBe(contractor.email);
        expect(data.body.address).toBe(contractor.address);
        expect(data.body.city).toBe(contractor.city);
        expect(data.body.country).toBe(contractor.country);
        expect(data.body.phone).toBe(contractor.phone);
        expect(data.body.mobile).toBe(contractor.mobile);
      });
  });

it('should return contractors fron contractordb', async () => {
    
     await request(strapi.server).get('/entities/contractors') 
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

   it('should update contractor', async () => {
  
    await request(strapi.server) 
      .put('/entities/contractors/3')
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

  it('should delete contractor', async () => {

  await request(strapi.server)
    .delete('/entities/contractors/16')
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
it('should create 50 new contractor', async () => {
  for(var i = 0; i<51; i++){
    await request(strapi.server) 
    .post('/entities/contractors')
    .send(contractor)
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);
  }
});
it('should delete 50 contractor', async () => {
  for(var i=3; i<53; i++){
    await request(strapi.server)
    .delete('/entities/contractors/'+i)
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

