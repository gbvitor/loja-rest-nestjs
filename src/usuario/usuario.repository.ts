import { Injectable } from '@nestjs/common';
@Injectable()
export class UsuarioRepository {
  private usuarios = [];

  async salvar(usuario) {
    this.usuarios.push(usuario);
  }

  async listar() {
    return this.usuarios;
  }

  async existeEmail(email: string) {
    const possivelUsuario = this.usuarios.find((u) => u.email === email);
    return possivelUsuario != undefined;
  }
}
