// -> criando os mocks para os testes do projeto

export const userDataMock = {
  id:5,
  username: 'user',
  role: 'teste',
  email: '123456'
}

export const loginMock = {
  email: 'user@gmail.com',
  password: '1234567'
}

export const tokenMock = {
  "token": ""eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc""
}

export const notHaveEmail = {
  password: '1234567'
}

export const notHavePassword = {
  email: 'user@gmail.com',
}

export const incorrectPassword = {
  password: '12345'
}

export const incorrectEmail =  {
  email: 'usuario@gmail.com',
}
