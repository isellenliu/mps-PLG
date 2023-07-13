//左側主選單開啟和關閉
function openNav() {
    // document.getElementById("mainSidenav").style.width = "70vw";
    document.getElementById("mainSidenav").classList.add('mainnav-in');
    document.getElementById('mask-all').classList.add('mask-all'); //add
}

function closeNav() {
    document.getElementById("mainSidenav").style.width = "0";
    document.getElementById("mainSidenav").classList.remove('mainnav-in');
    document.getElementById('mask-all').classList.remove('mask-all'); //remove
}

//popup-menu訊息關閉
function openPopupMenu() {
    document.getElementById("popup-menu").style.display = "block";
}

function closePopupMenu() {
    document.getElementById("popup-menu").style.display = "";
}

//交易紀錄面板開啟和關閉
function openRecord() {
    document.getElementById("record-area").classList.remove('record-hide');
    document.getElementById("record-area").classList.add('record-show');
    document.getElementById("record-area").classList.add('active');
}

function closeRecord() {
    document.getElementById("record-area").classList.remove('record-show');
    document.getElementById("record-area").classList.remove('active');
    document.getElementById("record-area").classList.add('record-hide');
}

//籌碼面板開啟和關閉
function openSetting() {
    document.getElementById("setting-area").classList.remove('setting-hide');
    document.getElementById("setting-area").classList.add('setting-show');
    document.getElementById("setting-area").classList.add('active');
}

function closeSetting() {
    document.getElementById("setting-area").classList.remove('setting-show');
    document.getElementById("setting-area").classList.remove('active');
    document.getElementById("setting-area").classList.add('setting-hide');
}

//popup訊息關閉
function closeMsgNav() {
    document.getElementById('msg').classList.add('msg-hide'); //remove
}

//Streaming fullsrn 切換
function switchStreaming() {
  var switcherClass = document.getElementsByClassName("video")[0].classList;
  var btnClass = document.getElementsByClassName("video-expand")[0].classList;

  if (switcherClass.contains("fullsrn")) {
    switcherClass.remove("fullsrn");
    btnClass.remove("active");
    } else {
      switcherClass.add("fullsrn");
      btnClass.add("active");
  }
}

//路子圖的圖案交換
function switchRecord() {
  var switcherClass = document.getElementById("road-table-switcher").classList;

  if (switcherClass.contains("meron-win-reverse")) {
    switcherClass.remove("meron-win-reverse");
    switcherClass.add("meron-win");
  } else {
    switcherClass.remove("meron-win");
    switcherClass.add("meron-win-reverse");
  }
}

//籌碼自定義鍵盤切換
function switchKeyborad() {
  var switcherClass = document.getElementById("keyboard").classList;

  if (switcherClass.contains("displayN")) {
    switcherClass.remove("displayN");
  } else {
    switcherClass.add("displayN");
  }
}

//Start-betting 切換
function switchStartbet() {
  var switcherClass = document.getElementById("start-betting").classList;

  if (switcherClass.contains("fade-in")) {
    switcherClass.remove("fade-in");
    switcherClass.add("fade-out");
    switcherClass.add("displayN");
  }
}

//Active switch
function switchActive(targetClass) {
  var switcherClass = document.getElementsByClassName(targetClass)[0].classList;

  if (switcherClass.contains("active")) {
    switcherClass.remove("active");
    } else {
      switcherClass.add("active");
  }
}

//Report切換
// function switchReport(targetID) {
function switchReport() {
  //用id找id為current-bets/today-report的a元素
  // var aElement = document.getElementById(targetID);
  var betElement = document.getElementById("current-bets");
  var rptElement = document.getElementById("today-report");
  
  //找同樣的父節點下class name為record-detail的div元素
  var betdivElement = betElement.parentElement.getElementsByClassName("record-detail")[0];
  var rptdivElement = rptElement.parentElement.getElementsByClassName("record-detail")[0]; 

  //宣告classList
  var betClass = betElement.classList;
  var betdivClass = betdivElement.classList;
  var rptClass = rptElement.classList;
  var rptdivClass = rptdivElement.classList;

  if (betClass.contains("active")) {
    betClass.remove("active");
    betdivClass.add("displayN");
    rptClass.add("active");
    rptdivClass.remove("displayN");
  } else {
    betClass.add("active");
    betdivClass.remove("displayN");
    rptClass.remove("active");
    rptdivClass.add("displayN");
  }
}

//版面強制固定比例縮放
var $el = $("#scaleable-content");
var elHeight = $el.outerHeight();
var elWidth = $el.outerWidth();

var $wrapper = $("#scaleable-wrapper");

$wrapper.resizable({
  resize: doResize
});

function doResize(event, ui) {
  
  var scale, origin;
    
  scale = Math.min(
    ui.size.width / elWidth,    
    ui.size.height / elHeight
  );
  
  $el.css({
    transform: "translate(-50%, -50%) " + "scale(" + scale + ")"
  });
  
}

var starterData = { 
  size: {
    width: $wrapper.width(),
    height: $wrapper.height()
  }
}
doResize(null, starterData);