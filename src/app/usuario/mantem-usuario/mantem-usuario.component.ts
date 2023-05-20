import { Component } from '@angular/core';
import {Usuario} from '../../shared/modelo/usuario';
import {USUARIOS} from '../../shared/modelo/USUARIOS';
import {ActivatedRoute, Router} from '@angular/router';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-mantem-usuario',
  templateUrl: './mantem-usuario.component.html',
  styleUrls: ['./mantem-usuario.component.css']
})
export class MantemUsuarioComponent {

  usuarioDeManutencao: Usuario;
  estahCadastrando = true;
  nomeBotaoManutencao = 'Cadastrar';
  IdUsuarioEditar: any = "";

  usuarios = USUARIOS;

  ngOnInit(): void {
    this.usuarioService.listar().subscribe(
      usuariosRetornados =>
        this.usuarios = usuariosRetornados
    );
    this.IdUsuarioEditar = this.rotaAtual.snapshot.paramMap.get('id');
  }


  constructor(private rotaAtual: ActivatedRoute, private roteador: Router, private usuarioService: UsuarioService) {
    this.usuarioDeManutencao = new Usuario('', 0);
    const idParaEdicao = this.rotaAtual.snapshot.paramMap.get('id');
    if (idParaEdicao) {
      // editando
      this.usuarioService.pesquisarPorId(+idParaEdicao).subscribe(
        usuario => {
          this.usuarioDeManutencao = usuario
        }
      )

     
      if (this.rotaAtual.snapshot.paramMap.get('id')) {
        this.estahCadastrando = false;
        this.nomeBotaoManutencao = 'Salvar';
      }


    } else {
      this.nomeBotaoManutencao = 'Cadastrar';
    }
  }

  manter(): void {
    if (this.estahCadastrando && this.usuarioDeManutencao) {
      //this.usuarios.push(this.usuarioDeManutencao);
      this.usuarioService.inserir(this.usuarioDeManutencao).subscribe(
        usuario => {
          this.usuarios.push(usuario)
        }
      )
    }
    this.usuarioDeManutencao = new Usuario();
    this.nomeBotaoManutencao = 'Cadastrar';
    this.roteador.navigate(['listagemusuarios']);
  }

  atualizar(){
    if(this.usuarioDeManutencao != null){
      this.usuarioService.atualizar(this.usuarioDeManutencao).subscribe(
        usuario => {
          this.roteador.navigate(['listagemusuarios']);

        }
      );
    }
  }

}
