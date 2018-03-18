import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteItem } from '../item/note.item'; 

var dialog;

@Component({
    selector: 'note-app',
    templateUrl: './src/note/note.html',
    styleUrls: ['./src/note/note.css'],
    providers: []
})

export class NoteComponent{

	  ngAfterViewInit(){
      dialog = document.querySelector('dialog');
  		document.querySelector('#show').onclick = function() {
  		  dialog.showModal();
  		};
  		document.querySelector('.close').onclick = function() {
  		  dialog.close();
  		};
    }

    /** 
      * Поле, которое хранит в себе массив элементов списка
      */
    items: NoteItem[]=[];


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
    }

    removeItem(id: number): void {
      
      let newItems : NoteItem[]=[];
      for (var item of this.items) {
        if (item.id != id)
          newItems.push(new NoteItem(item.id, item.textNote,  item.dateOfBegin, item.autor));
       }
      this.items=newItems;
    }








} 


