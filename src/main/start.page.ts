import { Component, AfterViewInit, OnInit  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService} from '@ngx-translate/core';
import { NoteComponent } from '../note/note';
import { NoteItem } from '../item/note.item'; 
import { Service } from '../main/service'; 
import { Arhive } from '../arhive/arhive';

declare var $:any;
declare var d3:any;
var svg;
var settings;


@Component({
    selector: 'main-app',
    templateUrl: './src/main/menu.html',
    styleUrls: ['./src/main/menu.css'],
    providers: [Service]
})

export class AppComponent{

    /** 
      * Поле для храниения кол записок
      */ 
    private countNote:string;

    /** 
      * Поле для храниения кол архивных записок
      */ 
    private countArhive:string;

    /** 
      * Поле для храниения кол удаленных записок
      */ 
    private countGarbage:string;

    /** 
      * Конструктор класса, в котором идет определение выбранного языка из списка и просходит перевод страницы
      * @param=translate сервис, который хранит все необходимые параметры для перевода
      */ 
    constructor(private translate: TranslateService, private _noteService: Service) {
       
        translate.addLangs(["English", "Russian"]);
        translate.setDefaultLang('English');
        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/English|Russian/) ? browserLang : 'English');
    }

    /** 
      * Метод получения данных для диаграммы
      */ 
    getData(): void{
        let count:number=
          this._noteService.getItemsArhive().length + 
          this._noteService.getDeleteItems().length + 
          this._noteService.getItems().length;
        
        if (this._noteService.getItemsArhive().length/count*100 == 0) {
          this.countArhive='';
        }
        else {
          this.countArhive=(this._noteService.getItemsArhive().length/count*100).toFixed(2);
        }
        if (this._noteService.getDeleteItems().length/count*100 == 0) {
          this.countGarbage='';
        }
        else {
          this.countGarbage=(this._noteService.getDeleteItems().length/count*100).toFixed(2);
        }
        if (this._noteService.getItems().length/count*100 == 0) {
          this.countNote='';
        }
        else {
          this.countNote=(this._noteService.getItems().length/count*100).toFixed(2);  
        }
        
    }

    /**
      * Метод, который выполняет скрипт для работы меню
      */
    ngAfterViewInit(){

         $(function() {
                $(' #navigation a').stop().animate({'marginLeft':'-85px'},1000);

                $(' #navigation > li').hover(
                    function () {
                        $('a',$(this)).stop().animate({'marginLeft':'-2px'},200);
                    },
                    function () {
                        $('a',$(this)).stop().animate({'marginLeft':'-85px'},200);
                    }
                );
            });
          settings = document.querySelectorAll('dialog')[0];
          document.querySelector('#showSettings').onclick = function() {
            settings.showModal();
          };
          document.querySelector('.closeSettings').onclick = function() {
            settings.close();
          };
    }

    /** 
      * Метод очистки диаграммы
      */ 
    clearSVG():void {
        
        d3.selectAll("svg > *").remove();
    }
  
    /** 
      * Метод построения  диаграммы
      */ 
    getDiagram(noteName:string, arhiveName:string, garbageName:string):void {

          this.getData();
          this.clearSVG();
          var height = 300, 
              width = 360, 
              margin=30,
              data=[
                  {browser: noteName, rate: this.countNote},
                  {browser: arhiveName, rate: this.countArhive},
                  {browser: garbageName, rate: this.countGarbage},
              ];
     
          // функция для получения цветов
          var color = d3.scale.category10();
           
          // задаем радиус
          var radius = Math.min((width-60) - 2*margin, height- 2*margin) / 2;
           
          // создаем элемент арки с радиусом
          var arc = d3.svg.arc()
              .outerRadius(radius)
              .innerRadius(0);
               
          var pie = d3.layout.pie()
              .sort(null)
              .value(function(d) { return d.rate; });
           
          svg = d3.select("body").select("svg")
                  .attr("class", "axis")
                  .attr("width", width)
                  .attr("height", height)
                  .append("g")
                  .attr("transform", 
                      "translate(" +((width-60) / 2) + "," + (height / 2 ) + ")");
         
          var g = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");  
           
          g.append("path")
            .attr("d", arc)
            .style("fill", function(d) { return color(d.data.browser); });
           
          g.append("text")
              .attr("transform", function(d) {
                  return "translate(" + arc.centroid(d) + ")"; })
              .style("text-anchor", "middle")
              .text(function(d) { 
                  if(d.data.rate==0) return d.data.rate;
                  else return d.data.rate + "%"; 
                });

          var legendTable = d3.select("svg").append("g")
              .attr("transform", "translate(0, "+margin+")")
              .attr("class", "legendTable");
           
          var legend = legendTable.selectAll(".legend")
              .data(pie(data))
              .enter().append("g")
              .attr("class", "legend")
              .attr("transform", function(d, i) {
                  return "translate(0, " + i * 20 + ")"; 
              });
           
          legend.append("rect")
              .attr("x", width - 10)
              .attr("y", 4)
              .attr("width", 10)
              .attr("height", 10)
              .style("fill", function(d) { return color(d.data.browser); });
           
          legend.append("text")
              .attr("x", width - 15)
              .attr("y", 9)
              .attr("dy", ".35em")
              .style("text-anchor", "end")
              .text(function(d) { return d.data.browser; });
    }

    /**
      * Изменение цвета заметок
      * @param = id цвет на который изменить
      */ 
    updateColor(id:string):void {

      this._noteService.setColor('color'+id);
    }

    /**
      * Получение включения/выключения подсказок
      */   
    getHelper() {

      if (this._noteService.getHelper()=='true')
        $(".helper span").css({"display": "block"});
      else
        $(".helper span").css({"display": "none"});
    }

    /**
      * Включаем/выключаем подсказки
      */   
    setHelper(flag:string) {
      this._noteService.setHelper(flag);      
      this.getHelper();
    }

    /** 
      * Заголовок меню
      */
    title:string = "Title"
    
    /** 
      * Читаем заголовок для меню
      */
    getTitle():string {

      return this.title;
    }

    /** 
      * Устанавливаем заголовок для меню
      * @param=title заголовок
      */ 
    setTitle(title: string):void {
      
      this.title = title;
    }
}