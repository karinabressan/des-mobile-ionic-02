export class Produto {
    private _nome:string;
    private _quantidade:number;
    
    set nome(nome:string){
        this._nome = nome
    };
    set quantidade(quantidade:number){
        this._quantidade = quantidade;
    };
    get nome(): string{
        return this._nome;
    };
    get quantidade(): number{
        return this._quantidade;
    };
    
    constructor(nome: string, quantidade: number){
        this._nome = nome;
        this._quantidade = quantidade;
    }

    
}