import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { Produto } from '../produto/produto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage implements OnInit{

  inputNomeProduto: string = "";
  inputQuantidade: number = 1;
  modoEdicao: boolean = false;
  indiceEdicao: number = 0;

  message = "item adicionado";
  itens: Produto[] = [];


  constructor(private alertController: AlertController, private toastController: ToastController) { 
  }

  ngOnInit(): void {
 //   this.itens.push(new Produto('ss', 1));
  }

  startEditing(index:number){
    let produtoEditando:Produto = this.itens[index];
    this.inputNomeProduto = produtoEditando.nome;
    this.inputQuantidade = produtoEditando.quantidade;
    this.indiceEdicao = index;
    this.modoEdicao = true;
  }

  update(){
    if(this.modoEdicao){
      let produtoEditando:Produto = this.itens[this.indiceEdicao];
      produtoEditando.nome = this.inputNomeProduto;
      produtoEditando.quantidade = this.inputQuantidade;
      this.indiceEdicao = 0;
      this.modoEdicao = false;
    }

  }

  addToList() {
    if (this.inputNomeProduto === undefined || this.inputNomeProduto.trim() === "") {
      this.showAlert("O campo de produto não poderá ser vazio");
    } else if (this.inputQuantidade <= 0 ){
      this.showAlert("Informe uma quantidade válida");
    } else {
      this.itens.push(new Produto(this.inputNomeProduto, this.inputQuantidade));
      this.showToast("Produto adicionado");
    }
  }

  async showAlert(message: string) {
    let result = await this.alertController.create({ message, buttons: ['OK'] });
    result.present();
  }

  async showToast(message: string) {
    let result = await this.toastController.create({ message, duration: 1500, position: 'bottom' });
    await result.present();
  }

  removeFromList(index: number) {
    this.itens.splice(index, 1);
    this.showToast("Produto removido");
  }

}
