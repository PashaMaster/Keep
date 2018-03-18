import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteItem } from '../item/note.item'; 
import { DeleteItem } from '../item/delete.item'; 
import { Service } from '../main/service'; 

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

    getDeleteItems() {

        this.itemsDelete = this._noteService.getDeleteItems();
    }

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


} 
