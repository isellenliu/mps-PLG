// 這裡是demo用的效果，開發時可以不導入
window.onload = function () {
    categoryFilter();
    showDetail()
    countdown_liveDrawing();
    on_click();
};


// 點分類換資料
function categoryFilter() {
    var categories = document.querySelector(".categories-list");
    var dataList = document.querySelector(".tickets-list");
    var allItem = categories.querySelector(".all");
    allItem.classList.add("active");

    categories.addEventListener("click", function (event) {
        var target = event.target;

        if (target.classList.contains("categories")) {

            var allItems = categories.querySelectorAll(".categories");
            allItems.forEach(function (item) {
                item.classList.remove("active");
            });

            target.classList.add("active");

            var dataItems = dataList.querySelectorAll(".ticket");
            dataItems.forEach(function (item) {
                item.style.display = "none";
            });

            if (target.classList.contains("all")) {
                dataItems.forEach(function (item) {
                    item.style.display = "block";
                });
            } else {
                var category = target.classList[1];
                dataItems.forEach(function (item) {
                    if (item.classList.contains(category)) {
                        item.style.display = "block";
                    }
                });
            }
        }
    });
}


// 打開明細
function showDetail() {
    var dataItems = document.querySelectorAll(".tickets-list .ticket");

    dataItems.forEach(function (item) {
        var betCount = item.querySelector(".betCount");
        betCount.addEventListener("click", function (event) {
            betCount.classList.toggle("open");
            event.stopPropagation(); // 阻止事件冒泡
        });

        var delBTN = item.querySelector(".btn-delete");
        var delConfirm = document.querySelector(".lotto-modal.notifs");
        var mask = document.querySelector(".lotto-mask");
        delBTN.addEventListener("click", function (event) {
            delConfirm.classList.add("show");
            mask.classList.add("show");
            event.stopPropagation(); // 阻止事件冒泡
        });

        item.addEventListener("click", function () {
            this.classList.toggle("show");
            dataItems.forEach(function (otherItem) {
                if (otherItem !== item && otherItem.classList.contains("show")) {
                    otherItem.classList.remove("show");
                    betCount.classList.remove("open");
                }
            });
        });
    });
}


// 開獎橫幅倒計時
function countdown_liveDrawing() {
    // 莫名卡住，不到五秒，以後再檢查

    const countdownElement = document.querySelector('.liveDrawing-countdown');
    const balls = document.querySelectorAll('.winningBall');
    let countdownInterval;
    let currentIndex = 0;

    function startCountdown() {
        let remainingTime = 5;

        updateCountdown(remainingTime);

        countdownInterval = setInterval(function () {
            remainingTime--; // 每秒鐘減少倒數時間

            if (remainingTime <= 0) {
                clearInterval(countdownInterval);
                countdownElement.classList.add('close');

                addShowClass(); // 立即執行第一次添加 show class
                setInterval(addShowClass, 5000); // 之後每隔 5 秒執行一次添加 show class

                return;
            }

            updateCountdown(remainingTime);
        }, 1000);
    }

    function addShowClass() {
        if (currentIndex < balls.length) {
            balls[currentIndex].classList.add('show');
            currentIndex++;

            if (currentIndex === 1) {
                setTimeout(addShowClass, 5000);
            }
        }
    }

    function updateCountdown(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        const formattedTime = `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;
        countdownElement.innerText = formattedTime;
    }

    function handleTransitionEnd() {
        if (boxElement.classList.contains('show')) {
            setTimeout(function () {
                countdownElement.classList.add('show');
                startCountdown();
            }, 0);
        }
    }

    const boxElement = document.querySelector('.box-liveDrawing');
    boxElement.addEventListener('transitionend', handleTransitionEnd);
}


// header 捲動增加影子
window.addEventListener("scroll", function () {
    var pageHead = document.querySelector(".page-head");
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 0) {
        pageHead.classList.add("scroll");
    } else {
        pageHead.classList.remove("scroll");
    }
});


// 其他各種 click 事件
function on_click() {

    // betting 取消
    // var cancelBTN = document.querySelector(".betConfirm-btn .cancel");
    // cancelBTN.addEventListener("click", function () {
    //     location.reload();
    // });

    // 打開選單
    var HB = document.querySelector(".nav-hb");
    HB.addEventListener("click", function () {
        HB.classList.toggle("show");
    });

    // demo 開獎橫幅
    var title = document.querySelector(".nav-title");
    var liveDrawing = document.querySelector(".box-liveDrawing");
    title.addEventListener("click", function () {
        liveDrawing.classList.toggle("show");
    });

    // 遮罩
    var mask = document.querySelector(".lotto-mask");
    var betConfirmBox = document.querySelector(".box-betConfirm");
    mask.addEventListener("click", function () {
        var modal = document.querySelector(".lotto-modal.show");

        if (modal === null) {
            // 在沒有 .show class 的情況下執行特定動作
            mask.classList.remove("show");
            betConfirmBox.classList.remove("show");
        }
    });

    // demo 投注未完成_彈出對話框
    // var back = document.querySelector(".nav-icon");
    // var notComplete = document.querySelector(".lotto-modal.notifs");
    // back.addEventListener("click", function () {
    //     mask.classList.add("show");
    //     notComplete.classList.add("show");
    // });

    // demo 投注完成_submit
    // var modalSuccess = document.querySelector(".lotto-modal.success");
    // var submit = document.querySelector(".lotto-btn.submit");
    // submit.addEventListener("click", function () {
    //     mask.classList.add("show");
    //     modalSuccess.classList.add("show");
    // });

    // demo 點擊對話框
    var modals = document.querySelectorAll(".lotto-modal");
    for (var i = 0; i < modals.length; i++) {
        modals[i].addEventListener("click", function (event) {
            var target = event.target;

            if (target.classList.contains("modal-close")) {
                mask.classList.remove("show");
                this.classList.remove("show");
            } else if (target.classList.contains("lotto-btn")) {
                if (this.classList.contains("notifs")) {
                    if (target.classList.contains("btn-L")) {
                        mask.classList.remove("show");
                        this.classList.remove("show");
                    } else if (target.classList.contains("btn-R")) {
                        location.reload();
                    }
                } else {
                    location.reload();
                }
            }
        });
    }
}