// -|> iniciando os testes da rota Login 🚀
import * as chai from 'chai';
import * as sinon from 'sinon';
// arquivos
import { app } from '../app';
import modelUsers from '../database/models/users.model';
import Encrypt from '../services/encrypt.service';
import JwtService from '../services/Jwt.service';
import { notHaveEmail, tokenMock, userDataMock } from './Mocks/mocksUser';
// lib
import chaiHttp = require('chai-http');


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
    it('🧪 checks if status 400 is returned if email is not provided during login',async()=>{
      const response = await chai.request(app).post('/login').send(notHaveEmail);
      chai.expect(response.status).to.equal(400);
      chai.expect(response.body).to.deep.equal({
        message: 'All fields must be filled',
      });
    })
  })
