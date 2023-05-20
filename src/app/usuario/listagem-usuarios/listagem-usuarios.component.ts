import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../shared/modelo/usuario';
import {USUARIOS} from '../../shared/modelo/USUARIOS';
import {UsuarioService} from '../../shared/services/usuario.service';

@Component({
  selector: 'app-listagem-usuarios',
  templateUrl: './listagem-usuarios.component.html',
  styleUrls: ['./listagem-usuarios.component.css']
})
export class ListagemUsuariosComponent implements OnInit{

  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
    this.usuarioService.listar().subscribe(
      usuariosRetornados =>{

        this.usuarios = usuariosRetornados;
        console.log(this.usuarios);
      }
        );

    console.log('estou aqui');
  }

  excluir(usuarioARemover: Usuario): void {
    if (usuarioARemover.id) {
      this.usuarioService.apagar(usuarioARemover.id).subscribe(
        usuarioRemovido => {
          const indx = this.usuarios.findIndex(usuario =>
            usuario.id === usuarioARemover.id);
          this.usuarios.splice(indx, 1);
        }
      );
    }

  }

  inserir(usuario: Usuario): void{
    if(usuario != null){
      this.usuarioService.inserir(usuario).subscribe(
        usuario => {
          this.usuarios.push(usuario);
        }
      );
    }
  }

  atualizar(usuario: Usuario){
    if(usuario != null){
      this.usuarioService.atualizar(usuario).subscribe(
        usuario => {
          this.usuarioService.listar().subscribe(
            usuariosRetornados =>
              this.usuarios = usuariosRetornados
          );
        }
      );
    }
  }


  

}
