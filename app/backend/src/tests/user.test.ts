// -|> iniciando os testes da rota Login 🚀
import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

// arquivos
import { app } from '../app';
import modelUsers from '../database/models/users.model';
import Encrypt from '../services/encrypt.service';
import JwtService from '../services/Jwt.service';
import { incorrectPassword, notHaveEmail, notHavePassword, tokenMock, userDataMock } from './Mocks/mocksUser';
// lib


chai.use(chaiHttp)

describe('🧪 Check if the login was successful', () => {
  beforeEach(()=>{
    sinon.stub(Encrypt, 'validatePassword').returns(true);
    sinon.stub(modelUsers, 'findOne').resolves( userDataMock as modelUsers)
    sinon.stub(JwtService, 'generateToken').resolves(tokenMock.token)
  })
  afterEach(()=>{
    sinon.restore();
  })
    it('🧪 checks if status 200 is returned after all data filled in by the user is valid',async()=>{
      const response = await chai.request(app).post('/login').send(userDataMock);
      // -> realizando o envio do mock para a rota post '/login'
      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.deep.equal(tokenMock);
    })
 })


 describe('🧪  checks the errors returned by the executions during login', () => {
    beforeEach(()=>{
      sinon.stub(modelUsers, 'findOne').resolves( userDataMock as modelUsers)
    })
    afterEach(()=>{
      sinon.restore();
    })
    it('🧪 checks if status 400 is returned if email is not provided during login',async()=>{
      const response = await chai.request(app).post('/login').send(notHaveEmail);
      chai.expect(response.status).to.equal(400);
      chai.expect(response.body).to.deep.equal({
        message: 'All fields must be filled',
      });
    });
    it('🧪 checks if status 400 is returned if password is not provided during login',async()=>{
      const response = await chai.request(app).post('/login').send(notHavePassword);
      chai.expect(response).to.have.status(400);
      chai.expect(response.body).to.be.a('object');
    });
    it('🧪 check if 401 status is returned for previous password when sent to login',async()=>{
      const response = await chai.request(app).post('/login').send(incorrectPassword);
        chai.expect(response.status).to.equal(401);
        chai.expect(response.body).to.deep.equal({
          message: 'Incorrect email or password',
        });
    });
    // it('🧪 check if 401 status is returned for previous email when sent to login',async()=>{
    //   const response = await chai.request(app).post('/login').send(incorrectEmail);
    //     chai.expect(response.status).to.equal(401);
    //     chai.expect(response.body).to.deep.equal({
    //       message: 'Incorrect email or password',
    //     });
    // });
  })
