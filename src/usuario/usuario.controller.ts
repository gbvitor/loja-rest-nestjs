import { Body, Controller, Get, Post } from '@nestjs/common';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.nome = dadosDoUsuario.nome;
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.senha = dadosDoUsuario.senha;
    usuarioEntity.id = uuid();
    this.usuarioRepository.salvar(usuarioEntity);
    return {
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      message: 'Usuário criado com sucesso!',
    };
  }

  @Get()
  async listUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.listar();
    const usuariosLista = usuariosSalvos.map(
      (u) => new ListaUsuarioDTO(u.id, u.nome),
    );
    return usuariosLista;
  }
}
