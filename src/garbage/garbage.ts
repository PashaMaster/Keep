import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteItem } from '../item/note.item'; 
import { DeleteItem } from '../item/delete.item'; 
import { Service } from '../service/service'; 

declare var $ :any;

@Component({
    selector: 'garbage-app',
    templateUrl: './src/garbage/garbage.html',
    styleUrls: ['./src/garbage/garbage.css',
                './src/menu/menu.css'],
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
      this.getHelper();
    }

    /**
      * Метод, который включает/выключает подсказки на странице
      */
    getHelper() {

      if (this._noteService.getHelper()=='true')
        $(".helper span").css({"display": "block"});
      else
        $(".helper span").css({"display": "none"});
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
        this.getHelper();
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
      let index:number;
      if (this.items.length==0)
        index=1;
      else
        index=this.items[this.items.length-1].id+1;
      this.items.push(new NoteItem(index, newItem.textNote, newItem.dateOfBegin, newItem.autor));
      this.setItems();
      this.setDeleteItems();
    }

    /** Метод, который удаляет записку из корзиныы
      * @param=id номер удаляемого элемента
      */
    deleteItem(id: number): void {
      
      let delItems : DeleteItem[]=[];
      this.itemsDelete.forEach(function(item,i, itemsDelete) { 
        if (item.item.id != id)
          delItems.push(new DeleteItem(item.item, new Date()));
       });
      this.itemsDelete=delItems;
      this.setDeleteItems();
    }

} 
