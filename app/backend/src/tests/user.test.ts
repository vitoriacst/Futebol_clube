// -|> iniciando os testes da rota Login 🚀
import * as chai from 'chai';
import * as sinon from 'sinon';
// arquivos
import modelUsers from '../database/models/users.model';
import Encrypt from '../services/encrypt.service';
import JwtService from '../services/Jwt.service';
import { tokenMock, userDataMock } from './Mocks/mocksUser';
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
    it('🧪 checks if status 200 is returned after all data filled in by the user is valid',()=>{

    })
 })
