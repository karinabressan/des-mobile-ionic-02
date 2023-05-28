import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate inputs correctly when all inputs are valid', () => {
    component.inputNomeProduto = 'Produto';
    component.inputQuantidade = 2;
    component.inputValor = 1;

    expect(component.validateInputs(true)).toBeTruthy();
  });

  it('should validate inputs correctly when all inputs are not valid', () => {
    component.inputNomeProduto = '';
    component.inputQuantidade = -1;
    component.inputValor = -2;

    expect(component.validateInputs(true)).toBeFalsy();
  });

  it('should validate inputs correctly when nameProduto input are not valid', () => {
    //preparacao do cenario
    component.inputNomeProduto = '';
    component.inputQuantidade = 1;
    component.inputValor = 2;
    let showAlertParameter!:string;
    let fakeShowAlert = (message: string) : Promise<void> => {
      message = showAlertParameter;
      return new Promise<void>((resolve)=>resolve());
    }
    spyOn(component, 'showAlert').and.callFake(fakeShowAlert);

    //execucao do que se quer validar
    let result:boolean = component.validateInputs(true);
    
    //validacoes
    expect(result).toBeFalsy();
    expect(showAlertParameter).toBe("O campo de produto não poderá ser vazio")
    

  });
});
