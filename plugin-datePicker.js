;(function($, window, document, undefined) {
    //定义wsk的构造函数
    var Wsk = function(ele, opt) {
    	this.$element = ele;
        this.defaults = {
            'year': new Date().getFullYear(),
            'month': new Date().getMonth(),
            'day': new Date().getDay()
        };
        this.options = $.extend({}, this.defaults, opt);
        this.temps = this.rander(this.options.day, this.options.month,this.options.year);
    	//console.log(this.$element);
    	this.$element.append(this.temps);
    }
        //定义Wsk的方法
    Wsk.prototype = {
        LeapYear: function(years) {
            return years % 100 == 0 ? (years % 400 == 0 ? 1 : 0) : (years % 4 == 0 ? 1 : 0); //判断闰年；如果是闰年返回1，平年返回0
        },
        DaysPerMonth: function day(month, years) { //fn --> year()函数
        	this.flag = years % 100 == 0 ? (years % 400 == 0 ? 1 : 0) : (years % 4 == 0 ? 1 : 0); //判断闰年；如果是闰年返回1，平年返回0
        	if(month == (4 || 6 || 7 || 9 || 11)){
        		this.month = 30;
        	}else if(month == 2){
        		if(this.flag == 1){
        			this.month = 29;
        		}else{
        			this.month = 28;
        		};
        	}else{
        		this.month = 31;
        	};
        	return this.month;
        },
        rander: function(day, month, year) {
        	var that = this;
        	this.frame = $('<p></p><div class="years"></div><div class="months"></div><div class="days"></div>');
        	this.yearMenu = $('<p><img src="" class="prevYear"><span class="year">'+year+'年</span><img src="" class="nextYear"></p>');
        	this.monthMenu = $('<p><img src="" class="prevMonth"><span class="month">'+month+'月</span><img src="" class="nextMonth"></p>');
        	this.dayMenu = '<p>'+
				                '<img src="" class="prevYear">'+
				                '<img src="" class="prevMonth">'+
				                '<span class="year">'+year+'年</span>'+
				                '<span class="month">'+month+'月</span>'+
				                '<img src="" class="nextMonth">'+
				                '<img src="" class="nextYear">'+
				            '</p>';
			this.yearContent = $('<div>'+this.randerYears(year)+'</div>');
			this.monthContent = $('<div>'+this.randerMonths()+'</div>');
			this.dayContent = $('<div>'+this.randerDays(month)+'</div>');
			$.each(this.frame, function(key, val) {
				if(this.className === 'years'){
					$(val).append(that.yearMenu);
					$(val).append(that.yearContent);
				}else if(this.className === 'months'){
					$(val).append(that.monthMenu);
					$(val).append(that.monthContent);
				}else if(this.className === 'days'){
					$(val).append(that.dayMenu);
					$(val).append(that.dayContent);
				}
			});
			console.log(this.frame)
        	return this.frame;
        	/*this.showDate = '<p></p>';
        	this.menu = '<p>'+
                '<img src="" class="prevYear">'+
                '<img src="" class="prevMonth">'+
                '<span class="year">'+years+'年</span>'+
                '<span class="month">'+month+'月</span>'+
                '<img src="" class="nextMonth">'+
                '<img src="" class="nextYear">'+
            '</p>';
            this.content = '<div class="clearFix">' + fn(month, LeapYear)+ '</div></div>'
        	this.all = this.showDate + '<div>' + this.menu + this.content;
            return this.all;*/
        },
        randerYears: function(currYear){
        	this.currYear = parseInt(currYear);
        	this.startYearStr = '<a class="prevPageYear">...</a>';
        	this.endYearStr = '<a class="nextPageYear">...</a>';
        	this.yearStr = '';
        	for (var i = this.currYear; i > this.currYear - 10; i--) {
        		this.yearStr = this.yearStr + '<a data-type="year">' + i +'</a>';
        	};
        	return this.startYearStr + this.yearStr + this.endYearStr;
        },
        randerDays: function(month, years){
        	this.year = years == undefined ? new Date().getFullYear() : years;
            this.length = this.DaysPerMonth(month, this.year);
            console.log(this.length)
            this.days = ''
            for(var i = 1; i <= this.length; i++){
				this.days = this.days + '<span>' + i + '</span>';
            };
            return this.days
        },
        randerMonths: function(){
        	this.month = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
        	this.monthStr = '';
        	for (var i = 0; i < this.month.length; i++) {
        		this.monthStr = this.monthStr + '<a data-type="month" data-code="'+(i+1)+'">' +(i+1) /*this.month[i]*/ + '月</a>';
        	};
        	return this.monthStr;
        	
        },
        getWeek: function(val){//后期完善插件的时候使用-----作用：输入具体日期返回周几
            var day = new Date(Date.parse(val.replace(/-/g, '/'))); //将日期值格式化 
           	return day.getDay();
        }
    };
    $.fn.datePicker= function(options) {
        var wsk = new Wsk(this, options);
        //调用其方法;
        wsk.$element.children('p').bind('click', function(){
        	
        	$(this).siblings('.days').slideDown();
        })
        
        wsk.$element.find('.years>div>a').bind('click', function(){
        	if($(this).text() !== '...'){
        		wsk.options.year = $(this).text();
        	}else{
        		
        	}
        });
        wsk.$element.find('.months>div>a').bind('click', function(){
        	
        	wsk.options.month = $(this).text();
        	
        });
        wsk.$element.find('.days>div>span').bind('click', function(){
        	wsk.options.day = $(this).text();
        	wsk.$element.children('p').text(wsk.options.year + '-' + wsk.options.month + '-' + wsk.options.day);
        	wsk.$element.children('div').slideUp();
        });
        wsk.$element.find('.days>p>span').bind('click', function(){
        	console.log($(this).index());
        	if($(this).index() == 2){
        		wsk.$element.find('.years').slideDown();
        		wsk.$element.find('.days').slideUp();
        	}else if($(this).index() == 3){
        		wsk.$element.find('.months').slideDown();
        		wsk.$element.find('.days').slideUp();
        	}
        	/*wsk.options.day = $(this).text();
        	wsk.$element.children('p').text(wsk.options.year + '-' + wsk.options.month + '-' + wsk.options.day);
        	wsk.$element.children('div').slideUp();*/
        })
    }
    
})(jQuery, window, document);