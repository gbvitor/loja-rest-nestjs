import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';
@Injectable()
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = [];

  private buscaPorId(id: string) {
    const possivelUsuario = this.usuarios.find((u) => u.id === id);
    if (!possivelUsuario) {
      throw new Error('Usuário não encontrado');
    }
  }

  async salvar(usuario: UsuarioEntity) {
    this.usuarios.push(usuario);
  }

  async listar() {
    return this.usuarios;
  }

  async existeEmail(email: string) {
    const possivelUsuario = this.usuarios.find((u) => u.email === email);
    return possivelUsuario != undefined;
  }

  async atualizaUsuario(
    id: string,
    dadosDeAtualizacao: Partial<UsuarioEntity>,
  ) {
    const usuario = this.buscaPorId(id);
    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      if (chave == 'id') {
        return;
      }
      usuario[chave] = valor;
    });
    return usuario;
  }

  async deletarUsuario(id: string) {
    const usuario = this.buscaPorId(id);
    this.usuarios = this.usuarios.filter((u) => u.id !== id);

    return usuario;
  }
}
