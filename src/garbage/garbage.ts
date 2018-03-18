import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteItem } from '../item/note.item'; 
import { DeleteItem } from '../item/delete.item'; 
import { Service } from '../main/service'; 

declare var $ :any;

@Component({
    selector: 'garbage-app',
    templateUrl: './src/garbage/garbage.html',
    styleUrls: ['./src/garbage/garbage.css'],
    providers: []
})

export class GarbageComponent implements OnInit{

    /** 
      * Массив записок
      */
    items: NoteItem[];

    /** 
      * Массив удаленных записок
      */
    itemsDelete: DeleteItem[];

    /** 
      * Тестовый веделяемый элемент
      */
    testItem: NoteItem = {id: 0, textNote: "", dateOfBegin: new Date(''), autor: ""};

    /** 
      * Выделяемый элемент
      */
    selectedItem: NoteItem = this.testItem;

    /** 
      * Конструктор класса
      * @param=_noteService объект, которые передает мок сервис для работы
      */
    constructor(private _noteService: Service) {}

    /** 
      * Метод, который считывает данные при загрузке станицы
      */
    ngOnInit(){
      
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
      * Метод, который показывает информацию о записке
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
    }

    /** Метод, который убырает записку из корзиныы
      * @param=id номер удаляемого элемента
      */
    removeItem(id: number): void {
      
      let delItems : DeleteItem[]=[];
      let newItem: NoteItem;
      this.itemsDelete.forEach(function(item,i, itemsDelete) { 
        if (item.item.id != id)
          delItems.push(new DeleteItem(item.item, new Date()));
        else 
          newItem=(new NoteItem(item.item.id, item.item.textNote, item.item.dateOfBegin, item.item.autor));
       });
      this.itemsDelete=delItems;
      this.items.push(new NoteItem(newItem.id, newItem.textNote, newItem.dateOfBegin, newItem.autor));
      this.setItems();
      this.setDeleteItems();
    }
} 
