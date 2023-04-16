import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage {
  novoProduto:string="";
  itens:string[] = [];
  constructor() {}

  addToList(item:string){
    this.itens.push(item);
  }

  removeFromList(indice:number){
    this.itens.splice(indice,1);
  }

  aa(){

    this.itens.push("item 1");
    this.itens.push("item 1");

    for(let i = 0; i < this.itens.length;i++){
      let item = this.itens[i];
      console.log(item);

    }
    
  }
  
}
