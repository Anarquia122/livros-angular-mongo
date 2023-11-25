export class Livro {
    private _id: string;
    private codEditora: number;
    private titulo: string;
    private resumo: string;
    private autores: string[];
  
    constructor(
      _id: string = '',
      codEditora: number = 1 || 2 || 3,
      titulo: string = '',
      resumo: string = '',
      autores: string[] = []
    ) {
      this._id = _id;
      this.codEditora = codEditora;
      this.titulo = titulo;
      this.resumo = resumo;
      this.autores = autores;
    }
  
    getId(): string {
      return this._id;
    }
  
    setId(_id: string): void {
      this._id = _id;
    }
  
    getCodEditora(): number {
      return this.codEditora;
    }
  
    setCodEditora(codEditora: number): void {
      this.codEditora = codEditora;
    }
  
    getTitulo(): string {
      return this.titulo;
    }
  
    setTitulo(titulo: string): void {
      this.titulo = titulo;
    }
  
    getResumo(): string {
      return this.resumo;
    }
  
    setResumo(resumo: string): void {
      this.resumo = resumo;
    }
  
    setAutoresFromString(autoresString: string): void {
      this.autores = autoresString.split(',').map((autor) => autor.trim());
    }
  
    getAutores(): string[] {
      return this.autores;
    }
  
    setAutores(autores: string[]): void {
      this.autores = autores;
    }
  }
