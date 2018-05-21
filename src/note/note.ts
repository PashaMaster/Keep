import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteItem } from '../item/note.item'; 
import { Service } from '../service/service'; 
import { DeleteItem } from '../item/delete.item'; 

declare var jquery:any;
declare var $ :any;
var add, detail;

@Component({
    selector: 'note-app',
    templateUrl: './src/note/note.html',
    styleUrls: ['./src/note/note.css',
                './src/menu/menu.css'],
    providers: []
})

export class NoteComponent implements OnInit{

     /** 
      * Кол элементов списка
      */
    numberList:number;

    /** 
      * Тестовый веделяемый элемент
      */
    testItem: NoteItem = {id: 0, textNote: "", dateOfBegin: new Date(''), autor: "", textList: []};

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
      * Массив архивных  записок
      */
    itemsArhive: NoteItem[];

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
      this.numberList=1; 
      this.initList();
      this.getItems();
      this.getDeleteItems();
      this.getAthiveItems();
      this.getHelper();    
      this.getPosition();  
    }

    /**
      * Метод получения и отображения картинки
      */
    addBackgroung(id:number) {
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#blah'+id).attr('src', e.target.result);
                    $('#blah'+id).css({"display":"block"});
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
    
        $("#imgInp"+id).change(function(){
            readURL(this);
        });
    }

    /**
      * Метод получения id img для картинки
      */
    getIDImage(id:number):string {
      return 'blah'+id;
    }

    /**
      * Метод получения id input для выбора картинки
      */
    getInputImage(id:number):string {
      return 'imgInp'+id;
    }

    /**
      * Метод, который меняет отображение блоков
      */
    getPosition() {
      if (this._noteService.getPosition() == 'block')
        $(".notes").css("width", "calc(100% / 4- 15px)");
      else
        $(".notes").css("width", "calc(100% - 15px)");
    }

    /**
      * Метод, который инициализирует список
      */    
    initList() {
      $(".addinputT").css({"display": "none"});
      $("#noteListB").css({"display": "none"});
    }

    /**
      * Метод, который удаляет элемент списка для пользователя
      */
    delListElemtnt() {
      this.numberList--;
      $("#noteList"+this.numberList.toString()).css({"display": "none"});
      if (this.numberList == 1)
        $("#noteListB").css({"display": "none"});      
    }

    /**
      * Метод, который добавляет элемент списка для пользователя
      */
    getList() {
      if (this.numberList <=3)  {
        $("#noteList"+this.numberList.toString()).css({"display": "block"});
        $("#noteListB").css({"display": "block"});
        this.numberList++;
      }
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

    /*
     * Получение цвета из хранилища
     */
    getColor():string {
     
      return this._noteService.getColor();
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
        this.getHelper();
    }

     /** 
      * Метод, который добавляет записку
      * @param=textN строка, которую нужно добавить
      * @param=dateN дата, которую нужно добавить
      * @param=nameN автор, которого нужно добавить
      */
    addItem(textN: string, dateN: Date, nameN: string, nameL1: string, nameL2: string, nameL3: string): void {
      
      var lastItem;
      let id;
      if (this.items.length == 0) 
        id = 1;
      else
      {
        lastItem = this.items[this.items.length - 1];
        id = lastItem.id+1;
      }

      // формируем список
      let nameList : string[] = [];
      if (nameL1!=null) nameList.push(nameL1);
      if (nameL2!=null) nameList.push(nameL2);
      if (nameL3!=null) nameList.push(nameL3);


      this.items.push(new NoteItem(id, textN, dateN, nameN, nameList));
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
          newItems.push(new NoteItem(item.id, item.textNote,  item.dateOfBegin, item.autor, item.textList));
        else 
          delItem=(new DeleteItem(item, new Date()));
       });
      if (this.itemsDelete.length==0)
        delItem.item.id=1;
      else
        delItem.item.id = this.itemsDelete[this.itemsDelete.length-1].item.id + 1; 
      this.itemsDelete.push(new DeleteItem(delItem.item, delItem.date));
      this.items=newItems;
      this.setItems();
      this.setDeleteItems();
    }

    /** 
      * Метод, который добавляет записку в архив
      * @param=id номер добавляемого элемента
      */
    addArhiveItem(id: number): void {
      
      let newItem: NoteItem[]=[];
      let arhItems: NoteItem;
      this.items.forEach(function(item,i, items) { 
        if (item.id != id)
          newItem.push(new NoteItem(item.id, item.textNote, item.dateOfBegin, item.autor, item.textList));
        else 
          arhItems=(new NoteItem(item.id, item.textNote, item.dateOfBegin, item.autor, item.textList));
       });
      this.items=newItem;
      this.itemsArhive.push(new NoteItem(arhItems.id, arhItems.textNote, arhItems.dateOfBegin, arhItems.autor, arhItems.textList));
      this.setItems();
      this.setAthiveItems();
    }
    
} 
