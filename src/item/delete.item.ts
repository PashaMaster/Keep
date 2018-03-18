import { NoteItem } from '../item/note.item';
/**
  * Класс, который будет хранить удаленные данные
  */
export class DeleteItem{

	/**
	  * Поле которое хранит дату удаления
	  */
	date: Date;

	/**
	  * Поле которое хранит записку
	  */
	item: NoteItem;

	/**
	  * Конструктор класса
	  * @param=item запискa
	  * @param=dateOfBegin дата
	  */
	constructor(item: NoteItem, date: Date) {
  
		this.item=item;
		this.date = date;
    }
}