//確定資源檔案是否存在
if (typeof (I18N) == 'undefined') {
	document.write('<script language="JavaScript"  type="text/JavaScript" src="/js/util/I18N.js"></script>');
}

function createEnvelopDiv(displayDiv) {
	var tEnvelopIframe;
	var gap = 0;
	if(navigator&&navigator.userAgent.toLowerCase().indexOf("msie") == -1) {
		gap = 2;
	}
	
	//var displayDiv = Div;
	if(typeof(displayDiv.envelopDiv) == "undefined" || displayDiv.envelopDiv==null) {
		// create a div to envelop
		var tEnvelopDiv = document.createElement("DIV");
		
		// define the envelopDiv's style

		tEnvelopDiv.style.zIndex = 10000;
		
		// create a iframe
		tEnvelopIframe = document.createElement("IFRAME");

		// define the iframe's style
		tEnvelopIframe.style.position = "absolute";
		tEnvelopIframe.style.zIndex   = tEnvelopDiv.style.zIndex-1;

		
		tEnvelopDiv.appendChild(tEnvelopIframe);

		displayDiv.envelopDiv = tEnvelopDiv;
		displayDiv.envelopDiv.EnvelopIframe = tEnvelopIframe;
		displayDiv.parentNode.insertBefore(displayDiv.envelopDiv,displayDiv);
		
	}
	
	tIframe = displayDiv.envelopDiv.EnvelopIframe;
	tIframe.style.left   = displayDiv.style.left;
	tIframe.style.top    = displayDiv.style.top;
	tIframe.style.width  = displayDiv.offsetWidth-2*gap+"px";
	tIframe.style.height = displayDiv.offsetHeight-2*gap+"px";
	tIframe.style.display = displayDiv.style.display;
	tIframe.style.visibility = displayDiv.style.visibility;
	displayDiv.style.zIndex = displayDiv.envelopDiv.style.zIndex+1;
	
	return false;
}


function $calendar(name) {
	var temp = null;
	temp = document.getElementById(name);
	if(temp!=null) {
		return temp;
	}
	temp = document.getElementsByName(name);
	if(temp!=null) {
		return temp[0];
	}
	return null;
}

//var cal;
var isFocus=false; //是否為焦點
//自加

var MouseUtil = {
	//yyyy/MM/dd
	getAbsPoint: function(e) {
		var x = e.offsetLeft;
		var y = e.offsetTop;
		while(e = e.offsetParent){
			x += e.offsetLeft;
			y += e.offsetTop;
		}
		return {"x": x, "y": y};
	}
}

var TimeFormat = {
	//yyyy/MM/dd
	parse: function(text, timeFormat) {
		var y = text.substring(timeFormat.indexOf('y'),timeFormat.lastIndexOf('y')+1);//年
		var m = text.substring(timeFormat.indexOf('M'),timeFormat.lastIndexOf('M')+1);//月
		var d = text.substring(timeFormat.indexOf('d'),timeFormat.lastIndexOf('d')+1);//日
		if(y=="" || isNaN(y)) y = new Date().getFullYear();
		if(m=="" || isNaN(m)) m = new Date().getMonth();
		if(d=="" || isNaN(d)) d = new Date().getDate();
		return eval("new Date('"+ y+"', '"+(m-1)+"','"+ d +"')");
	},
	getTimeFormat: function(date, timeFormat) {
		var formatType;
		var o = {
			"M+" : date.getMonth() + 1, //month
			"d+" : date.getDate(),      //day
			"h+" : date.getHours(),     //hour
			"m+" : date.getMinutes(),   //minute
			"s+" : date.getSeconds()   //second
		}
		if(/(y+)/.test(timeFormat)) {
			timeFormat = timeFormat.replace(RegExp.$1,(date.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for(var k in o){
			if(new RegExp("("+ k +")").test(timeFormat)){
				if(RegExp.$1.length == 1) {
					formatType = o[k];
				} else {
					formatType = ("00" + o[k]).substr(("" + o[k]).length);
				}
				timeFormat = timeFormat.replace(RegExp.$1,formatType);
			}
		}
		return timeFormat;
	}
}


var Class = {
  create: function() {
    return function() {
      this.initialize.apply(this, arguments);
    }
  }
}

var calendarProperties = {
			firstday:1,
			beginYear:new Date().getFullYear()-1,
			endYear:new Date().getFullYear()+1,
			dateFormatStyle:'yyyy-MM-dd',
			showDays:true,
			showCurrentDate:new Date(),
			colors: {
				"cur_word"      : "#FFFFFF",  //當日日期文字顏色
				"cur_bg"        : "#FFCB93",  //當日日期單元格背影色
				"sel_bg"        : "#FFCCCC",  //已被選擇的日期單元格背影色 2006-12-03 寒羽楓添加
				"sun_word"      : "#D91717",  //星期天文字顏色
				"sat_word"      : "#0657B9",  //星期六文字顏色
				"td_word_light" : "#333333",  //單元格文字顏色
				"td_word_dark"  : "#CCCCCC",  //單元格文字暗色
				"td_bg_out"     : "#EFEFEF",  //單元格背影色
				"td_bg_over"    : "#d0d0d0",  //單元格背影色
				"tr_word"       : "#FFFFFF",  //日曆頭文字顏色 2015-11-13可刪除，用CSS控制
				"tr_bg"         : "#666666",  //日曆頭背影色 2015-11-13可刪除，用CSS控制
				"input_border"  : "#CCCCCC",  //input控件的邊框顏色 2015-11-13可刪除，用CSS控制
				"input_bg"      : "#EFEFEF"   //input控件的背影色 2015-11-13可刪除，用CSS控制
			},
			clear:I18N.get("calendar.form.text.Clear"),
			today:I18N.get("calendar.form.text.Today"),
			close:I18N.get("calendar.form.text.Close"),
			months :[I18N.get("calendar.text.month.1")+" ", I18N.get("calendar.text.month.2")+" ", I18N.get("calendar.text.month.3")+" ", I18N.get("calendar.text.month.4")+" ", I18N.get("calendar.text.month.5")+" ", I18N.get("calendar.text.month.6")+" ", I18N.get("calendar.text.month.7")+" ", I18N.get("calendar.text.month.8")+" ", I18N.get("calendar.text.month.9")+" ", I18N.get("calendar.text.month.10")+" ", I18N.get("calendar.text.month.11")+" ", I18N.get("calendar.text.month.12")+" "],
			daynames : [I18N.get("form.text.transfer.weekly.0"), I18N.get("form.text.transfer.weekly.1"), I18N.get("form.text.transfer.weekly.2"), I18N.get("form.text.transfer.weekly.3"), I18N.get("form.text.transfer.weekly.4"), I18N.get("form.text.transfer.weekly.5"), I18N.get("form.text.transfer.weekly.6")]
};

var Calendar = Class.create();
Calendar.prototype =  {
	initialize: function() {
		this.dateControl = null;
		this.currentDate = new Date();
		this.today = calendarProperties.showCurrentDate;

		var y = calendarProperties.showCurrentDate.getFullYear();
		var m = calendarProperties.showCurrentDate.getMonth();		
		this.periodType = new Array();
		var currentDateWeek = calendarProperties.showCurrentDate.getDay();
		this.periodType.push([new Date(y, m, calendarProperties.showCurrentDate.getDate() - ((currentDateWeek + 7 - 1) %7)), new Date(y, m, calendarProperties.showCurrentDate.getDate() + ((7 - currentDateWeek) % 7))]);
		this.periodType.push([new Date(y, m, calendarProperties.showCurrentDate.getDate() - ((currentDateWeek + 7 - 1) %7) - 7), new Date(y, m, calendarProperties.showCurrentDate.getDate() + ((7 - currentDateWeek) % 7) - 7)]);
		this.periodType.push([this.today, this.today]);
		var yesterday = new Date(y, m, calendarProperties.showCurrentDate.getDate() - 1);
		this.periodType.push([yesterday, yesterday]);
		this.periodType.push([new Date(y, m, 1), new Date(y, m + 1, 0)]);
		this.periodType.push([new Date(y, m - 1, 1), new Date(y, m, 0)]);
		this.BEGIN = 0
		this.END = 1;
		
		this.panel = $calendar("calendarPanel");
		this.container = $calendar("ContainerPanel");
		this.draw();
		this.bindYear();
		this.bindMonth();
		//this.changeYearElement(this.today);
	},
	draw: function() {
		var mvAry = [];
		mvAry[mvAry.length]  = '  <div id="calendarForm" name="calendarForm" style="margin: 0px;">';
		mvAry[mvAry.length]  = '    <table width="100%" border="0" cellpadding="0" cellspacing="1">';
		mvAry[mvAry.length]  = '      <tr>';
		mvAry[mvAry.length]  = '        <th align="left" width="1%"><input style="border: 1px solid ' + calendarProperties.colors["input_border"] + ';background-color:' + calendarProperties.colors["input_bg"] + ';width:16px;height:20px;" name="prevMonth" type="button" id="prevMonth" value="&lt;" /></th>';
		mvAry[mvAry.length]  = '        <th align="center" width="98%" nowrap="nowrap"><select name="calendarYear" id="calendarYear" style="font-size:12px;width:50px"></select><select name="calendarMonth" id="calendarMonth" style="font-size:12px;width:80px"></select></th>';
		mvAry[mvAry.length]  = '        <th align="right" width="1%"><input style="border: 1px solid ' + calendarProperties.colors["input_border"] + ';background-color:' + calendarProperties.colors["input_bg"] + ';width:16px;height:20px;" name="nextMonth" type="button" id="nextMonth" value="&gt;" /></th>';
		mvAry[mvAry.length]  = '      </tr>';
		mvAry[mvAry.length]  = '    </table>';

		mvAry[mvAry.length]  = '    <table id="calendarTable" width="100%" style="border:0px solid #CCCCCC;background-color:#FFFFFF;font-size:9pt" border="0" cellpadding="2" cellspacing="1">';

		if(calendarProperties.showDays) {
			mvAry[mvAry.length]  = '      <tr>';
			for(var i = 0; i < 7; i++) {
				mvAry[mvAry.length]  = '      <th style="font-weight:normal;background-color:' + calendarProperties.colors["tr_bg"] + ';color:' + calendarProperties.colors["tr_word"] + ';">' + calendarProperties.daynames[i] + '</th>';
			}
			mvAry[mvAry.length]  = '      </tr>';
			// 6 rows, 7 columns
			for(var i = 0; i < 6;i++) {
				mvAry[mvAry.length]  = '    <tr align="center">';
				for(var j = 0; j < 7; j++) {
					if (j == 0){
						mvAry[mvAry.length]  = '  <td style="cursor:default;color:' + calendarProperties.colors["sun_word"] + ';"></td>';
					} else if(j == 6) {
						mvAry[mvAry.length]  = '  <td style="cursor:default;color:' + calendarProperties.colors["sat_word"] + ';"></td>';
					} else {
						mvAry[mvAry.length]  = '  <td style="cursor:default;"></td>';
					}
				}
				mvAry[mvAry.length]  = '    </tr>';
			}
		}

		mvAry[mvAry.length]  = '      <tr style="background-color:' + calendarProperties.colors["input_bg"] + ';">';
		mvAry[mvAry.length]  = '        <th colspan="2"><input name="calendarClear" type="button" id="calendarClear" value="' + calendarProperties.clear + '" style="border: 1px solid ' + calendarProperties.colors["input_border"] + ';background-color:' + calendarProperties.colors["input_bg"] + ';width:100%;height:18px;font-size:9pt;"/></th>';
		mvAry[mvAry.length]  = '        <th colspan="3"><input name="calendarToday" type="button" id="calendarToday" value="' + calendarProperties.today + '" style="border: 1px solid ' + calendarProperties.colors["input_border"] + ';background-color:' + calendarProperties.colors["input_bg"] + ';width:100%;height:18px;font-size:9pt;"/></th>';
		mvAry[mvAry.length]  = '        <th colspan="2"><input name="calendarClose" type="button" id="calendarClose" value="' + calendarProperties.close + '" style="border: 1px solid ' + calendarProperties.colors["input_border"] + ';background-color:' + calendarProperties.colors["input_bg"] + ';width:100%;height:18px;font-size:9pt;"/></th>';
		mvAry[mvAry.length]  = '      </tr>';
		mvAry[mvAry.length]  = '    </table>';
		mvAry[mvAry.length]  = '  </div>';
		this.panel.innerHTML = mvAry.join("");
		
		

	  	var calendar = this;
		this.prevMonth = $calendar("prevMonth");
		this.prevMonth.onclick = function () { calendar.goPrevMonth(); }

		this.nextMonth = $calendar("nextMonth");
		this.nextMonth.onclick = function () { calendar.goNextMonth(); }

		this.calendarClear = $calendar("calendarClear");
		this.calendarClear.onclick = function () { calendar.dateControl.value = "";calendar.hide(); }

		this.calendarClose = $calendar("calendarClose");
		this.calendarClose.onclick = function () { calendar.hide(); }

		this.calendarYear = $calendar("calendarYear");
		this.calendarYear.onchange = function () { calendar.update(calendar); }

		this.calendarMonth = $calendar("calendarMonth");
		this.calendarMonth.onchange = function () {calendar.update(calendar);}

		this.calendarToday = $calendar("calendarToday");
		this.calendarToday.onclick = function () {
			calendar.changeYearElement(calendar.today);
			calendar.dateControl.value = TimeFormat.getTimeFormat(calendar.today, calendarProperties.dateFormatStyle);
			calendar.hide();
		}
	},
	getToday:function() {
		return TimeFormat.getTimeFormat(this.today, calendarProperties.dateFormatStyle);
	},
	bindYear: function() {
		var cy = this.calendarYear;
		//將select的option清空
		cy.length = 0;
		for (var i = calendarProperties.beginYear; i <= calendarProperties.endYear; i++) {
			cy.options[cy.length] = new Option(i, i);
		}
	},
	bindMonth: function() {
		var cm = this.calendarMonth;
		cm.length = 0;
		for (var i = 0; i < 12; i++){
			cm.options[cm.length] = new Option(calendarProperties.months[i], i);
		}
	},
	goPrevMonth: function() {
		var year = this.currentDate.getFullYear();
		var month = this.currentDate.getMonth();
		if (year == calendarProperties.beginYear && month == 0){
			return;
		}
		month--;
		if (month == -1) {
			year--;
			month = 11;
		}
		this.changeYearElement(new Date(year, month, 1));
	},
	goNextMonth: function() {
		var year = this.currentDate.getFullYear();
		var month = this.currentDate.getMonth();
		if (year == calendarProperties.endYear && month == 11){
			return;
		}
		month++;
		if (month == 12) {
			year++;
			month = 0;
		}
		this.changeYearElement(new Date(year, month, 1));
		if(!calendarProperties.showDays) {
			this.update(this);
		}
	},
	update: function(e) {
		//沒有天數
		var year  = e.calendarYear.options[e.calendarYear.selectedIndex].value;
		var month = e.calendarMonth.options[e.calendarMonth.selectedIndex].value;
		if(calendarProperties.showDays) {
			this.changeYearElement(new Date(year, month, 1));
		} else {
			this.dateControl.value = TimeFormat.getTimeFormat(new Date(year, month, 1), calendarProperties.dateFormatStyle);
		}
	},
	changeYearElement: function(targetDate) {
	
		this.calendarYear.value = targetDate.getFullYear();
		this.changeMonthElement(targetDate);
		
	},
	changeMonthElement: function(targetDate) {
		this.calendarMonth.value = targetDate.getMonth();
		this.bindData(targetDate);
	},
	bindData: function(targetDate) {
		//這邊要紀錄目前顯示的日期, 不然click的時候無法判斷
		if(targetDate) {
			this.currentDate = targetDate;
		}
		var calendar = this;
		var dateArray = this.getMonthViewArray(this.currentDate.getFullYear(), this.currentDate.getMonth());
		var tds = $calendar("calendarTable").getElementsByTagName("td");
		for(var i = 0; i < tds.length; i++) {
			tds[i].style.backgroundColor = calendarProperties.colors["td_bg_out"];
			tds[i].innerHTML = dateArray[i];
			if (dateArray[i] == "&nbsp;") {
				tds[i].onclick = function () {return;}
				tds[i].onmouseover = function () {return;}
				tds[i].onmouseout = function () {return;}
				continue;
			}
			tds[i].onclick = function () {
				if (calendar.dateControl != null){
					var specialDate = new Date(calendar.currentDate.getFullYear(),calendar.currentDate.getMonth(), this.innerHTML);
					calendar.dateControl.value = TimeFormat.getTimeFormat(specialDate, calendarProperties.dateFormatStyle);
					try{
					  $j(calendar.dateControl).trigger("change");
					}catch (e) {}
				}
				calendar.hide();
			}
			tds[i].onmouseover = function () {
				this.style.backgroundColor = calendarProperties.colors["td_bg_over"];
			}
			tds[i].onmouseout = function () {
				this.style.backgroundColor = calendarProperties.colors["td_bg_out"];
			}
			if (TimeFormat.getTimeFormat(new Date(), calendarProperties.dateFormatStyle) == TimeFormat.getTimeFormat(new Date(calendar.currentDate.getFullYear(),calendar.currentDate.getMonth(),dateArray[i]), calendarProperties.dateFormatStyle)) {

				tds[i].style.backgroundColor = calendarProperties.colors["cur_bg"];
				tds[i].onmouseover = function () {
					this.style.backgroundColor = calendarProperties.colors["td_bg_over"];
				}
				tds[i].onmouseout = function () {
					this.style.backgroundColor = calendarProperties.colors["cur_bg"];
				}
			}
		}
	},
	getMonthViewArray: function(y, m) {
		var mvArray = [];
		//判斷第一天是在星期幾
		var dayOfFirstDay = new Date(y, m, 1).getDay();
		//這個月最多有幾天, 等等要計算偏移量
		var daysOfMonth = new Date(y, m + 1, 0).getDate();

		for (var i = 0; i < 42; i++) {
			mvArray[i] = "&nbsp;";
		}
		//由偏移量做取代
		for (var i = 0; i < daysOfMonth; i++){
			mvArray[i + dayOfFirstDay] = i + 1;
		}
		return mvArray;
	},
	show: function(targetName) {
		
		dateObj = $calendar(targetName);
		if(!dateObj) {
			throw new Error("error");
		}
		this.dateControl = dateObj;

		if(dateObj.value.length > 0) {
			this.currentDate = TimeFormat.parse(dateObj.value, calendarProperties.dateFormatStyle);
		} else {
			this.currentDate = this.today;
		}
		this.changeYearElement(this.currentDate);

		var xy = MouseUtil.getAbsPoint(dateObj);
		this.panel.style.left = (xy.x + + dateObj.offsetWidth) + "px";
		this.panel.style.top = (xy.y + dateObj.offsetHeight) + "px";
		this.panel.style.display = "";
		this.container.style.display = "";
		
		createEnvelopDiv(this.panel);
		
		var calendar = this;
		dateObj.onblur = function() {calendar.onblur(); }
		//this.container.onmouseover = function(){isFocus=true;}
		//this.container.onmouseout = function(){isFocus=false;}
	},
	hide: function() {
		this.panel.style.display = "none";
		this.container.style.display = "none";
		//isFocus=false;
	},
	onblur: function() {
		//if(!isFocus){this.hide();}
	},
	setByPeriodType:function(targetName, pPeriodType, param) {
		dateObj = $calendar(targetName);
		if(!dateObj) {
			throw new Error("error");
		}
		this.dateControl = dateObj;		
		this.changeYearElement(this.periodType[pPeriodType][param]);
		this.dateControl.value = TimeFormat.getTimeFormat(this.periodType[pPeriodType][param], calendarProperties.dateFormatStyle);
	}
};

document.write('<div id="ContainerPanel" style="display:none">');
document.write('<div id="calendarPanel" class="calendarPanel"></div>');
document.write('</div>');
