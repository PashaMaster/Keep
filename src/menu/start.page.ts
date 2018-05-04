import { Component, AfterViewInit, OnInit  } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService} from '@ngx-translate/core';
import { NoteComponent } from '../note/note';
import { NoteItem } from '../item/note.item'; 
import { DeleteItem } from '../item/delete.item'; 
import { GraficItem } from '../item/grafic.item'; 
import { Service } from '../service/service'; 
import { Arhive } from '../arhive/arhive';

declare var $:any;
declare var d3:any;
var svg;
var settings;


@Component({
    selector: 'main-app',
    templateUrl: './src/menu/menu.html',
    styleUrls: ['./src/menu/menu.css'],
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
     
          var color = d3.scale.category10();
           
          var radius = Math.min((width-60) - 2*margin, height- 2*margin) / 2;
           
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
      * Формируем массив данных для отрисовки графика
      */
    getDataGrafic():GraficItem[] {
      
      let dataGrafic:GraficItem[] = [];
      // тестовые записи
      dataGrafic.push(new GraficItem(5, new Date(2018, 3, 17)))
      dataGrafic.push(new GraficItem(1, new Date(2018, 3, 19)))
      dataGrafic.push(new GraficItem(5, new Date(2018, 3, 20)))
      dataGrafic.push(new GraficItem(11, new Date(2018, 3, 23)))
      dataGrafic.push(new GraficItem(9, new Date(2018, 3, 27)))
      //
      let deleteItems:DeleteItem[];
      let f;
      deleteItems = this._noteService.getDeleteItems();
      deleteItems.forEach(function(item, i, deleteItems) {
        f=false;
        dataGrafic.forEach(function(data, j, dataGrafic){
          if (item.date.toDateString() == data.date.toDateString()) {
            data.count++;
            f = true;          
           }
        });      
        if (!f) {
          dataGrafic.push(new GraficItem(1, item.date));
        }
      });

      return dataGrafic;
    }

    /**
      * Строим график по данным удаления записок
      */
    getGrafic() {
      this.getDataGrafic();
      this.clearSVG();
      var height = 300, 
          width = 600, 
          margin=30,
          Data = this.getDataGrafic();
          
      
        svg = d3.select("body").select("svg")
                  .attr("class", "axis")
                  .attr("width", width)
                  .attr("height", height)
                  .append("g");                  
         
        var xAxisLength = width - 2 * margin;     
          
        var yAxisLength = height - 2 * margin;

        var maxValue = d3.max(Data, function(d) { return d.count; });


        var scaleX = d3.time.scale()
                       .domain([d3.min(Data, function(d) { return d.date; }), 
                                d3.max(Data, function(d) { return d.date; })])
                       .range([0, xAxisLength]);
                     
        var scaleY = d3.scale.linear()
                    .domain([maxValue, 0])
                    .range([0, yAxisLength]);
        
        var xAxis = d3.svg.axis()
                     .scale(scaleX)
                     .orient("bottom")
                     .tickFormat(d3.time.format('%e %B'));
        
        var yAxis = d3.svg.axis()
                     .scale(scaleY)
                     .orient("left");
        
        svg.append("g")       
             .attr("class", "x-axis")
             .attr("transform",  
                 "translate(" + margin + "," + (height - margin) + ")")
            .call(xAxis);
         
        svg.append("g")       
            .attr("class", "y-axis")
            .attr("transform", 
                    "translate(" + margin + "," + margin + ")")
            .call(yAxis);
         
        d3.selectAll("g.x-axis g.tick")
            .append("line") 
            .classed("grid-line", true) 
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", - (height - 2 * margin));
             
        d3.selectAll("g.y-axis g.tick")
            .append("line")
            .classed("grid-line", true)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", xAxisLength)
            .attr("y2", 0);
        
       createChart(Data, "steelblue");             
       
         
        function createChart (data, colorStroke){
         
          var line = d3.svg.line()
              .interpolate("basis")
              .x(function(d) { return scaleX(d.date)+margin; })
              .y(function(d){return scaleY(d.count)+margin;});
                   
          var area = d3.svg.area()
              .interpolate("basis")
              .x(function(d) { return d.date; })
              .y0(height - margin)
              .y1(function(d) { return d.count; });
               
          var g = svg.append("g");
          g.append("path")
              .attr("d", area(data))
              .style("fill", "lightblue");
          g.append("path")
              .attr("d", line(data))
              .style("stroke", colorStroke)
              .style("fill", "none")
              .style("stroke-opacity", 0.6)
              .style("stroke-width", 2.5);
        };
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

    getPosition() {
      if (this._noteService.getPosition() == 'block')
        $(".notes li").css({"width": "calc(100% /2 - 15px)"});
      else
        $(".notes li").css({"width": "calc(100% - 15px)"});
    }

    /** 
      * Устанавливаем позицию для блоков
      * @param=position свойство
      */ 
    setPosition(position:string) {

      if (position=='1')
        this._noteService.setPosition('inline');
      else
        this._noteService.setPosition('block');
      this.getPosition();
    }
}