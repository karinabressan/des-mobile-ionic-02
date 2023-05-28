import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { Produto } from '../produto/produto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, IonicStorageModule],
})
export class HomePage implements OnInit {

  inputNomeProduto: string = "";
  inputQuantidade: number = 1;
  inputValor: number = 0;
  modoEdicao: boolean = false;
  indiceEdicao: number = 0;

  message = "item adicionado";
  itens: Produto[] = [];


  constructor(private alertController: AlertController, private toastController: ToastController, private storage: Storage) { 
  }

  async ngOnInit(): Promise<void> {
    await this.storage.create();
    let produtos = await this.storage.get('produtos');
    this.itens = produtos ? JSON.parse(produtos) : [];
  }

  startEditing(index:number){
    let produtoEditando:Produto = this.itens[index];
    this.inputNomeProduto = produtoEditando.nome;
    this.inputQuantidade = produtoEditando.quantidade;
    this.inputValor = produtoEditando.valor;
    this.indiceEdicao = index;
    this.modoEdicao = true;
  }

  update(){
    if(this.modoEdicao && this.validateInputs(true)){
      let produtoEditando:Produto = this.itens[this.indiceEdicao];
      produtoEditando.nome = this.inputNomeProduto;
      produtoEditando.quantidade = this.inputQuantidade;
      produtoEditando.valor = this.inputValor;
      this.storage.set('produtos', JSON.stringify(this.itens));
      this.inputNomeProduto = '';
      this.inputQuantidade = 1;
      this.inputValor = 0;
      this.indiceEdicao = 0;
      this.modoEdicao = false;
    }

  }

  addToList() {
      if(this.validateInputs(true)){
        this.itens.push(new Produto(this.inputNomeProduto, this.inputQuantidade, this.inputValor));
        this.storage.set('produtos', JSON.stringify(this.itens));
        this.inputNomeProduto = '';
        this.inputQuantidade = 1;
        this.inputValor = 0;
        this.showToast("Produto adicionado");
      }
  }

  validateInputs(alertErrors: boolean): boolean{
    let alertMessage = undefined;
    if (this.inputNomeProduto === undefined || this.inputNomeProduto.trim() === "") {
      alertMessage = "O campo de produto não poderá ser vazio";
    } else if (this.inputQuantidade <= 0 ){
      alertMessage = "Informe uma quantidade válida";
    } else if (this.inputValor < 0 || this.inputValor === null){
      alertMessage = "Informe um valor válido";
    }
    if(alertMessage != undefined && alertErrors){
      this.showAlert(alertMessage);
    }
    return alertMessage === undefined;
    
  }  

  removeFromList(index: number) {
    this.itens.splice(index, 1);
    this.storage.set('produtos', JSON.stringify(this.itens));
    this.showToast("Produto removido");
  }

  async showAlert(message: string) {
    let result = await this.alertController.create({ message, buttons: ['OK'] });
    result.present();
  }

  async showToast(message: string) {
    let result = await this.toastController.create({ message, duration: 1500, position: 'bottom' });
    await result.present();
  }

}
