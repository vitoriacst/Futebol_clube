// -|> iniciando os testes da rota Login 🚀
import * as chai from 'chai';
import * as sinon from 'sinon';
import Encrypt from '../services/encrypt.service';
import JwtService from '../services/Jwt.service';
import { tokenMock } from './Mocks/mocksUser';
import chaiHttp = require('chai-http');


chai.use(chaiHttp)

describe('Check if the login was successful', () => {
  beforeEach(()=>{
    sinon.stub(Encrypt, 'validatePassword').returns(true);
    sinon.stub(JwtService, 'generateToken').resolves(tokenMock.token)
  })
 })
