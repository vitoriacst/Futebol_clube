import * as bcrypt from 'bcryptjs';

export default class EncryptService {
  static validatePassword = (password: string, hash: string): boolean =>
    bcrypt.compareSync(password, hash);
}

// -|> esconder senhas criadas pelos usuários em forma de texto “puro” em dados indecifráveis, utilizando o algoritmo hash
