// 這裡是demo用的效果，開發時可以不導入
window.onload = function () {
    countdown_liveDrawing();
    countdown_drawTime();
    pick_number();
    select_BetAmount();
    on_click();
};


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



// betting 倒計時
function countdown_drawTime() {
    // 彩票當期投注單, 只收到當日晚上6點
    // 每一期的最後下注時間為 mm/dd/yyyy 18:00 前

    var drawTime = document.querySelector(".drawTime-select");
    var countdownBox = document.querySelector(".drawTime-countdown");
    var intervalId; // 存計時器的 ID

    drawTime.addEventListener("change", function () {
        var selectedDate = new Date(this.value);
        selectedDate.setHours(18, 0, 0);

        // 停止先前的計時器
        clearInterval(intervalId);
        // 執行倒計時
        startCountdown(selectedDate);
    });

    // 頁面載入時執行一次倒計時
    var initialDrawTime = new Date(drawTime.value);
    initialDrawTime.setHours(18, 0, 0);
    startCountdown(initialDrawTime);

    function startCountdown(targetTime) {
        // 每秒更新計時器
        intervalId = setInterval(function () {
            var currentTime = new Date(); // 獲取當前時間
            var timeDiff = targetTime - currentTime; // 計算剩餘時間的毫秒數

            // 倒計時結束
            if (timeDiff <= 0) {
                clearInterval(intervalId);
                countdownBox.textContent = "Bet Closed";
                return;
            }

            // 計算剩餘時間的天、小時、分鐘和秒數
            var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            var hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            // 格式化時間
            var formattedTime = (days > 0 ? days + 'day ' : '') +
                ('0' + hours).slice(-2) + ':' +
                ('0' + minutes).slice(-2) + ':' +
                ('0' + seconds).slice(-2);

            // 更新倒計時的內容
            countdownBox.textContent = formattedTime;
        }, 1000);
    }
}


// betting 選號碼
function pick_number() {
    var numberBall = document.getElementsByClassName("numberBall");
    var numberCount = document.querySelector(".count-numberCount span:last-child");
    var betAmountBox = document.querySelector(".box-betAmount");
    var clearBTN = document.querySelector(".btn-clear");
    var betCount = document.querySelector(".count-betCount span:last-child");
    var lottoAlert = document.querySelector(".lotto-alert.error");
    var alertTimer;

    clearBTN.addEventListener("click", function () {
        for (var i = 0; i < numberBall.length; i++) {
            numberBall[i].classList.remove("pick");
        }
        numberCount.textContent = "0";
        betAmountBox.classList.remove("show");
        betCount.textContent = "0";
    });

    for (var i = 0; i < numberBall.length; i++) {
        numberBall[i].addEventListener("click", function () {
            var pickCount = document.getElementsByClassName("pick").length;

            if (pickCount === 6 && !this.classList.contains("pick")) {
                clearTimeout(alertTimer); // 清除先前的計時器
                lottoAlert.classList.add("show");
                alertTimer = setTimeout(function () {
                    lottoAlert.classList.remove("show");
                }, 2000);
                return;
            }

            this.classList.toggle("pick");

            if (this.classList.contains("pick")) {
                pickCount++; // 增加選取數量
            } else {
                pickCount--; // 減少選取數量
            }

            numberCount.textContent = pickCount;

            if (pickCount >= 3) {
                betAmountBox.classList.add("show");
                betCount.textContent = calculateCombination(pickCount, 3);
            } else {
                betAmountBox.classList.remove("show");
                betCount.textContent = "0";
            }
        });
    }

    function calculateCombination(n, m) {
        if (n < m) {
            return 0;
        }
        return factorial(n) / (factorial(m) * factorial(n - m));
    }

    function factorial(num) {
        if (num === 0 || num === 1) {
            return 1;
        }
        return num * factorial(num - 1);
    }
}


// betting 選金額
function select_BetAmount() {
    var betAmountItems = document.querySelectorAll(".box-betAmount li");
    var betConfirmBox = document.querySelector(".box-betConfirm");
    var mask = document.querySelector(".lotto-mask");

    betAmountItems.forEach(function (item) {
        item.addEventListener("click", function () {
            betConfirmBox.classList.add("show");
            mask.classList.add("show");
        });
    });
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
    var cancelBTN = document.querySelector(".betConfirm-btn .cancel");
    cancelBTN.addEventListener("click", function () {
        location.reload();
    });

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
    var back = document.querySelector(".nav-icon");
    var notComplete = document.querySelector(".lotto-modal.notifs");
    back.addEventListener("click", function () {
        mask.classList.add("show");
        notComplete.classList.add("show");
    });

    // demo 投注完成_submit
    var modalSuccess = document.querySelector(".lotto-modal.success");
    var submit = document.querySelector(".lotto-btn.submit");
    submit.addEventListener("click", function () {
        mask.classList.add("show");
        modalSuccess.classList.add("show");
    });

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