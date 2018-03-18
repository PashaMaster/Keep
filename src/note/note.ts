import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteItem } from '../item/note.item'; 

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

    testItem: NoteItem = {id: 0, textNote: "", dateOfBegin: new Date(''), autor: ""};
    selectedItem: NoteItem = this.testItem;
    
	  ngOnInit(){
      add = document.querySelectorAll('dialog')[0];
  		document.querySelector('#showAdd').onclick = function() {
  		  add.showModal();
  		};
  		document.querySelector('.closeAdd').onclick = function() {
  		  add.close();
  		};
    }


    selected(item: NoteItem) : string {
      return 'showDetail' + item.id;
    }

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
      this.items.forEach(function(item,i, items) { 
        if (item.id != id)
          newItems.push(new NoteItem(item.id, item.textNote,  item.dateOfBegin, item.autor));
       });
      this.items=newItems;
    }

     /** 
      * Поле, которое хранит в себе массив элементов списка
      */
    items: NoteItem[]=[
        { id: 1, textNote: "Hello!"},
        { id: 2, textNote: "I am Pash"},
        { id: 3, textNote: "Good morning:)"},
        { id: 4, textNote: "What do you do?"}
  
    ];
} 
