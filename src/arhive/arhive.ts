import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteItem } from '../item/note.item'; 
import { Service } from '../main/service'; 

declare var $ :any;

@Component({
    selector: 'arhive-app',
    templateUrl: './src/arhive/arhive.html',
    styleUrls: ['./src/arhive/arhive.css'],
    providers: []
})

export class Arhive  implements OnInit{
	/** 
      * Массив записок
      */
    items: NoteItem[];

    /** 
      * Массив архивных  записок
      */
    itemsArhive: NoteItem[];

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
      this.getAthiveItems();
    }

    /**
      * Получение подсказок
      * @param = index номер подсказки
      */   
    titleHelper(index:number):string {
      
      if (this.getHelper()=='true')
      {
        let title:string;        
        switch (index) {
          case 1:
            title="Number";
            break;
          case 2:
            title="Note";
            break;
          case 3:
            title="Note";
            break;
          case 4:
            title="Date";
            break;
          case 5:
            title="Name";
            break;
          case 6:
            title="Delete";
            break;
          default:
            title="";
            break;
        }
        return title;      
      }
      else
        return "null";      

    }

    /**
      * Получение включения/выключения подсказок
      */   
    getHelper():string {
      return this._noteService.getHelper();
    }

    /** 
      * Метод,который получает данные архива из хранилища
      */
    getAthiveItems() {

        this.itemsArhive = this._noteService.getItemsArhive();
    }

    /** 
      * Метод,который записывает изменненые данные архива в хранилище
      */
    setAthiveItems() {

        this._noteService.setItemsArhive(this.itemsArhive);
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

    /** Метод, который убырает записку из архива
      * @param=id номер удаляемого элемента
      */
    removeItem(id: number): void {
      
      let arhItems : NoteItem[]=[];
      let newItem: NoteItem;
      this.itemsArhive.forEach(function(item,i, itemsArhive) { 
        if (item.id != id)
          arhItems.push(new NoteItem(item.id, item.textNote, item.dateOfBegin, item.autor));
        else 
          newItem=(new NoteItem(item.id, item.textNote, item.dateOfBegin, item.autor));
       });
      this.itemsArhive=arhItems;
      this.items.push(new NoteItem(this.items[this.items.length-1].id+1, newItem.textNote, newItem.dateOfBegin, newItem.autor));
      this.setItems();
      this.setAthiveItems();
    }
}