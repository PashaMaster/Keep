/**
  * Класс, который будет хранить номер и записку
  */
export class NoteItem{

	/**
	  * Поле, которое хранит номер записки
	  */
	id : number;
	
	/**
	  * Поле которое хранит заголовок записки
	  */
	textNote: string;
    
	/**
	  * Поле которое хранит список записки
	  */
	textList: string[];

	/**
	  * Поле которое хранит дату
	  */
	dateOfBegin: Date;

	/**
	  * Поле которое хранит дату
	  */
	autor: string;
	
	/**
	  * Конструктор класса
	  * @param=id номер записки
	  * @param=textNote заголовок записки
	  * @param=dateOfBegin дата
	  * @param=autor имя автора
	  * @param=textList список записки
	  */
	constructor(id: number, textNote: string, dateOfBegin: Date, autor: string, textList: string[]) {
  
		this.id=id;
        this.textNote = textNote;
		this.dateOfBegin = dateOfBegin;
		this.autor=autor;
		this.textList=textList;
    }
}