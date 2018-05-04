import { Injectable } from '@angular/core';
import { ITEMS } from '../mock/note.test';
import { NoteItem } from '../item/note.item'; 
import { DeleteItem } from '../item/delete.item'; 

@Injectable()

/**
  * Класс, который моделирует мок-сервис
  */
export class Service {

	/**
	  * Поле, которое хранит текущее позиционирование
	  */
	private position: string = 'block';

	/**
	  * Флаг, котрый хранит данные о включении/выключении подсказок
	  */
	private anotation: string = 'true';
	
	/**
	  * Поле, которое хранит цвет записки
	  */
	private color: string = 'color1';

	/**
	  * Массив, котой хранит записки
	  */
	private items: NoteItem[];

	/**
	  * Массив, котой хранит архивные записки
	  */
	private itemsArhive: NoteItem[] = [];

	/**
	  * Массив, котой хранит удаленные записки
	  */
	private itemsDelete: DeleteItem[] = [];

	/**
	  * Конструктор, в котором получаем тестовые записки из хранилища
	  */
	constructor() {
		this.items=ITEMS;
	}

	/**
	  * Метод получения записок из сервиса
	  */
	getItems() {		
		return this.items;
	}

	/**
	  * Метод перезаписи записок в сервис
	  */
	setItems(items: NoteItem[]) {
		this.items=items;	
	}

	/**
	  * Метод получения архивных записок из сервиса
	  */
	getItemsArhive() {		
		return this.itemsArhive;
	}

	/**
	  * Метод перезаписи архивных записок в сервис
	  */
	setItemsArhive(itemsArhive: NoteItem[]) {
		this.itemsArhive=itemsArhive;	
	}

	/**
	  * Метод получения удаленных записок из сервиса
	  */
	getDeleteItems() {		
		return this.itemsDelete;
	}

	/**
	  * Метод перезаписи удаленных записок в сервис
	  */
	setDeleteItems(itemsDelete: DeleteItem[]){
		this.itemsDelete=itemsDelete;
	}

	/**
	  * Метод записи включения/выключения подсказок 
	  */
	setHelper(anotation: string) {
		this.anotation=anotation;	
	}

	/**
	  * Метод получения включения/выключения подсказок
	  */
	getHelper() {		
		return this.anotation;
	}	

	/**
	  * Метод записи цвета 
	  */
	setColor(color: string) {
		this.color=color;	
	}

	/**
	  * Метод получения цвета
	  */
	getColor() {		
		return this.color;
	}	

	/**
	  * Метод записи позиционирования 
	  */
	setPosition(position: string) {
		this.position=position;	
	}

	/**
	  * Метод получения позиционирования
	  */
	getPosition() {		
		return this.position;
	}		
}
