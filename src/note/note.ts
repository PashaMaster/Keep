import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteItem } from '../item/note.item'; 
import { Service } from '../main/service'; 
import { DeleteItem } from '../item/delete.item'; 

declare var jquery:any;
declare var $ :any;
var add, detail;

@Component({
    selector: 'note-app',
    templateUrl: './src/note/note.html',
    styleUrls: ['./src/note/note.css'],
    providers: []
})

export class NoteComponent implements OnInit{

    /** 
      * Тестовый веделяемый элемент
      */
    testItem: NoteItem = {id: 0, textNote: "", dateOfBegin: new Date(''), autor: ""};

    /** 
      * Выделяемый элемент
      */
    selectedItem: NoteItem = this.testItem;
     
    /** 
      * Массив записок
      */
    items: NoteItem[];

    /** 
      * Массив удаленных записок
      */
    itemsDelete: DeleteItem[];

    /** 
      * Конструктор класса
      * @param=_noteService объект, которые передает мок сервис для работы
      */
    constructor(private _noteService: Service) {}

    /** 
      * Метод, который обрабатывает кнопку для добавления(js) и заполняет тестовые данные в массив
      */
	  ngOnInit(){
      add = document.querySelectorAll('dialog')[1];
  		document.querySelector('#showAdd').onclick = function() {
  		  add.showModal();
  		};
  		document.querySelector('.closeAdd').onclick = function() {
  		  add.close();
  		};
      this.getItems();
      this.getDeleteItems();
    }

    /** 
      * Метод,который получает данные корзины из хранилища
      */
    getDeleteItems() {

        this.itemsDelete = this._noteService.getDeleteItems();
    }

    /** 
      * Метод,который записывает изменненые данные корзины в хранилища
      */
    setDeleteItems() {

        this._noteService.setDeleteItems(this.itemsDelete);
    }

    /** 
      * Метод,который получает данные из хранилища
      */
    getItems() {

        this.items = this._noteService.getItems();
    }

    /** 
      * Метод,который записывает изменненые данные в хранилище
      */
    setItems() {

      this._noteService.setItems(this.items);
    }

    /** 
      * Метод, который дает id каждой записке в html
      * @param=item объект-записка
      */
    selected(item: NoteItem) : string {
      return 'showDetail' + item.id;
    }

    /** 
      * Метод, который изменяет записку
      * @param=item объект-записка
      */
    onSelected(item: NoteItem) : void {

        if (item!=this.selectedItem)
        {
          $('#showDetail'+this.selectedItem.id).slideToggle();
          $('#showDetail'+item.id).slideToggle();
          this.selectedItem = item;
        }
        else
        {
          $('#showDetail'+item.id).slideToggle();
          this.selectedItem = this.testItem;
        }
        this.setItems();
    }

     /** 
      * Метод, который добавляет записку
      * @param=textN строка, которую нужно добавить
      * @param=dateN дата, которую нужно добавить
      * @param=nameN автор, которого нужно добавить
      */
    addItem(textN: string, dateN: Date, nameN: string): void {
      
      var lastItem;
      let id;
      if (this.items.length == 0) 
        id = 1;
      else
      {
        lastItem = this.items[this.items.length - 1];
        id = lastItem.id+1;
      }
      
      this.items.push(new NoteItem(id, textN, dateN, nameN));
      this.setItems();
    }

     /** 
      * Метод, который удаляет записку
      * @param=id номер удаляемого элемента
      */
    removeItem(id: number): void {
      
      let newItems : NoteItem[]=[];
      let delItem: DeleteItem;
      this.items.forEach(function(item,i, items) { 
        if (item.id != id)
          newItems.push(new NoteItem(item.id, item.textNote,  item.dateOfBegin, item.autor));
        else 
          delItem=(new DeleteItem(item, new Date()));
       });
      this.itemsDelete.push(new DeleteItem(delItem.item, delItem.date));
      this.items=newItems;
      this.setItems();
      this.setDeleteItems();
    }
} 
