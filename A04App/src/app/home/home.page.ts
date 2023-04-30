import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class HomePage {

  novoProduto: string = "";
  novaQuantidade: number = 1;

  message = "item adicionado";
  itens: Produto[] = [];


  constructor(private alertController: AlertController, private toastController: ToastController) { }

  addToList(item: string, quantidade: number) {
    if (item === undefined || item.trim() === "") {
      this.showAlert("O campo de produto não poderá ser vazio");
    } else {
      this.itens.push(new Produto(item, quantidade));
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
