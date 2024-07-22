let flag_bet;
let big_flag = false;
let reg_flag = false;
let gogo_lamp = 1;

let thr = new Array(12);
// thr[0]:単独BIG
// thr[1]:単独REG
// thr[2]:通常チェリー+BIG
// thr[3]:チェリー+REG
// thr[4]:レアチェリーA+BIG
// thr[5]:レアチェリーB+BIG
// thr[6]:レアチェリーC+BIG
// thr[7]:リプレイ
// thr[8]:ブドウ
// thr[9]:チェリー
// thr[10]:ピエロ
// thr[11]:ベル

let game_count = 0;
let credit = 0;
let count = 0;
let payout = 0;
let balance = 0;
$('#game_count').html(game_count);
$('#credit').html(credit);
$('#count').html(count);
$('#payout').html(payout);
$('#balance').html(balance);

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('DOMContentLoaded', (event) => {
    const toggleButton = document.getElementById('toggleButton');
    const imageContainer = document.getElementById('imageContainer');

    toggleButton.addEventListener('click', () => {
        if (imageContainer.style.display === 'none' || imageContainer.style.display === '') {
            imageContainer.style.display = 'block';
            toggleButton.textContent = 'スペックを非表示';
        } else {
            imageContainer.style.display = 'none';
            toggleButton.textContent = 'スペックを表示';
        }
    });
});


//「ゲームスタート」をクリックすると、設定値をランダムに決定
$('#gs_btn').on('click', function () {
    const setting = Math.ceil(Math.random() * 6);
    $('#setting').html(setting);

    if (setting == 1) {
        thr[0] = 169;
        thr[1] = 272;
        thr[2] = 313;
        thr[3] = 359;
        thr[4] = 369;
        thr[5] = 379;
        thr[6] = 389;
        thr[7] = 9369;
        thr[8] = 20248;
        thr[9] = 22088;
        thr[10] = 22148;
        thr[11] = 22208;
    } else if (setting == 2) {
        thr[0] = 172;
        thr[1] = 287;
        thr[2] = 328;
        thr[3] = 377;
        thr[4] = 387;
        thr[5] = 397;
        thr[6] = 407;
        thr[7] = 9387;
        thr[8] = 20266;
        thr[9] = 22106;
        thr[10] = 22166;
        thr[11] = 22226;
    } else if (setting == 3) {
        thr[0] = 172;
        thr[1] = 311;
        thr[2] = 352;
        thr[3] = 411;
        thr[4] = 421;
        thr[5] = 431;
        thr[6] = 441;
        thr[7] = 9421;
        thr[8] = 20300;
        thr[9] = 22140;
        thr[10] = 22200;
        thr[11] = 22260;
    } else if (setting == 4) {
        thr[0] = 177;
        thr[1] = 324;
        thr[2] = 364;
        thr[3] = 425;
        thr[4] = 437;
        thr[5] = 449;
        thr[6] = 461;
        thr[7] = 9441;
        thr[8] = 20320;
        thr[9] = 22160;
        thr[10] = 22220;
        thr[11] = 22280;
    } else if (setting == 5) {
        thr[0] = 177;
        thr[1] = 358;
        thr[2] = 398;
        thr[3] = 474;
        thr[4] = 486;
        thr[5] = 498;
        thr[6] = 510;
        thr[7] = 9490;
        thr[8] = 20369;
        thr[9] = 22209;
        thr[10] = 22269;
        thr[11] = 22329
    } else if (setting == 6) {
        thr[0] = 181;
        thr[1] = 362;
        thr[2] = 402;
        thr[3] = 478;
        thr[4] = 490;
        thr[5] = 502;
        thr[6] = 514;
        thr[7] = 9494;
        thr[8] = 20701;
        thr[9] = 22540;
        thr[10] = 22600;
        thr[11] = 22660;
    };

    game_count = 0;
    credit = 50;
    count = 0;
    payout = 0;
    balance = -1000;
    $('#game_count').html(game_count);
    $('#credit').html(credit);
    $('#count').html(count);
    $('#payout').html(payout);
    $('#balance').html(balance);

    flag_bet = 0;


});

$('#maxbet').on('click', function () {
    if (flag_bet == 1) {

    } else if (flag_bet == 0) {
        flag_bet = 1;
        payout = 0;
        $('#payout').html(payout);
        credit = credit - 3;
        $('#credit').html(credit);
    }

    if (credit < 0) {
        credit = credit + 50;
        $('#credit').html(credit);

        balance = balance - 1000;
        $('#balance').html(balance);
    }
});

$(document).ready(function () {
    $('.lever').click(function () {
        let $lever = $(this);
        $lever.toggleClass('active');

        setTimeout(function () {
            $lever.removeClass('active');
        }, 100);
    });

    $('.white-button').click(function () {
        let reelId = $(this).data('reel');
        $('#' + reelId + ' img').css('animation', 'none');
    });
});

let hit = document.getElementById("hit");
let slot_frame = document.getElementById("slot-frame");
let reel = document.getElementsByClassName("reel");
let reels = document.getElementsByClassName("reels");
let start_btn = document.getElementById("start-lever");
let stop_btn = document.getElementsByClassName("stop-btn");
let hit_img;
let slot_pattern = [];
let sec = 50;          //スロットのリール回転速度(実行毎秒数)
let stopReelFlag = [];  //スロットのリール停止フラグ
let checkReelFlag = [];
let reelCounts = [];    //どの画像をどの位置にさせるか
let slotFrameHeight;    //フレームの大きさ
let slotReelsHeight;    //リール(画像)全体の大きさ
let slotReelItemHeight; //リール(画像)1個の大きさ
let slotReelStartHeight;//画像の初期値
let AdjustMaxNum = 2; //引き込みアシストの最大図柄数

let pattern = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

let Slot = {
    init: function () {  //初期化
        stopReelFlag[0] = stopReelFlag[1] = stopReelFlag[2] = false;
        //[false, false, false]　回転させていたら止まらない状態
        checkReelFlag[0] = checkReelFlag[1] = checkReelFlag[2] = false;
        reelCounts[0] = reelCounts[1] = reelCounts[2] = 0;
        //[0, 0, 0] 最初に中央にくる画像の設定
    },
    start: function () { //クリックイベント
        Slot.init();
        for (let index = 0; index < 3; index++) {
            Slot.animation(index); //スロット３つ動かす
        }
    },
    controlReel: function (index) {
        return new Promise((resolve) => {
            $('.reels').eq(index).animate({
                'top': slotReelStartHeight + (reelCounts[index] * slotReelItemHeight)
            }, {
                duration: sec, // アニメーションの速度
                easing: 'linear', // 常に一定の速度
                complete: function () {
                    resolve();
                }
            });
        });
    },
    stop: async function (i) { //ストップボタンのクリックイベント
        // チェリー非成立時、左リールにチェリーが存在しないように調整
        if ($('#result').html() != '通常チェリー+BIG' && $('#result').html() != 'チェリー+REG' && $('#result').html() != 'レアチェリーA+BIG' && $('#result').html() != 'レアチェリーB+BIG' && $('#result').html() != 'レアチェリーC+BIG' && $('#result').html() != '通常チェリー') {
            // 左リール (i == 0) の場合にチェリーをチェック
            if (i == 0) {
                checkReelFlag[0] = true;
                let currentReelIndex = 21 - reelCounts[i];
                let topValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                let middleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                let bottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                // チェリーが上段/中段/下段のいずれかにある場合
                while (topValue === 'cherry' || middleValue === 'cherry' || bottomValue === 'cherry') { //リール停止時にanimationの呼び出して一つリールが動くので下段にある場合はOK
                    reelCounts[i]++;
                    if (reelCounts[i] >= 21) {
                        reelCounts[i] = 0;
                    }
                    currentReelIndex = 21 - reelCounts[i];
                    topValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    middleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    bottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    // リールの位置を更新
                    await Slot.controlReel(i);
                }
            }
        }

        //ブドウ非成立時、第1停止と第2停止でブドウがテンパイしている場合、第3停止でブドウが揃わないように調整
        if ($('#result').html() != 'ブドウ') {
            //第3停止時、第1停止と第2停止のチェック
            if (stopReelFlag[0] && stopReelFlag[1] && !stopReelFlag[2]) {
                let leftReelIndex = 21 - reelCounts[0];
                let middleReelIndex = 21 - reelCounts[1];

                let leftTopValue = reels[0].children[leftReelIndex - 1].getAttribute('data-val');
                let leftMiddleValue = reels[0].children[leftReelIndex].getAttribute('data-val');
                let leftBottomValue = reels[0].children[leftReelIndex + 1].getAttribute('data-val');

                let middleTopValue = reels[1].children[middleReelIndex - 1].getAttribute('data-val');
                let middleMiddleValue = reels[1].children[middleReelIndex].getAttribute('data-val');
                let middleBottomValue = reels[1].children[middleReelIndex + 1].getAttribute('data-val');

                if ((leftTopValue === 'grape' && middleTopValue === 'grape') ||
                    (leftMiddleValue === 'grape' && middleMiddleValue === 'grape') ||
                    (leftBottomValue === 'grape' && middleBottomValue === 'grape') ||
                    (leftTopValue === 'grape' && middleMiddleValue === 'grape') ||
                    (leftBottomValue === 'grape' && middleMiddleValue === 'grape')) {
                    
                    checkReelFlag[2] = true;
                    let currentReelIndex = 21 - reelCounts[2];
                    let rightTopValue = reels[2].children[currentReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[2].children[currentReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[2].children[currentReelIndex + 1].getAttribute('data-val');

                    while ((leftTopValue === 'grape' && middleTopValue === 'grape' && rightTopValue === 'grape') ||
                        (leftMiddleValue === 'grape' && middleMiddleValue === 'grape' && rightMiddleValue === 'grape') ||
                        (leftBottomValue === 'grape' && middleBottomValue === 'grape' && rightBottomValue === 'grape') ||
                        (leftTopValue === 'grape' && middleMiddleValue === 'grape' && rightBottomValue === 'grape') ||
                        (leftBottomValue === 'grape' && middleMiddleValue === 'grape' && rightTopValue === 'grape')) {
                        
                        reelCounts[2]++;
                        if (reelCounts[2] >= 21) {
                            reelCounts[2] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[2];
                        rightTopValue = reels[2].children[currentReelIndex - 1].getAttribute('data-val');
                        rightMiddleValue = reels[2].children[currentReelIndex].getAttribute('data-val');
                        rightBottomValue = reels[2].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(2);
                    }
                }
        
            } else if (stopReelFlag[0] && !stopReelFlag[1] && stopReelFlag[2]) {
                let leftReelIndex = 21 - reelCounts[0];
                let rightReelIndex = 21 - reelCounts[2];

                let leftTopValue = reels[0].children[leftReelIndex - 1].getAttribute('data-val');
                let leftMiddleValue = reels[0].children[leftReelIndex].getAttribute('data-val');
                let leftBottomValue = reels[0].children[leftReelIndex + 1].getAttribute('data-val');

                let rightTopValue = reels[2].children[rightReelIndex - 1].getAttribute('data-val');
                let rightMiddleValue = reels[2].children[rightReelIndex].getAttribute('data-val');
                let rightBottomValue = reels[2].children[rightReelIndex + 1].getAttribute('data-val');

                if ((leftTopValue === 'grape' && rightTopValue === 'grape') ||
                    (leftMiddleValue === 'grape' && rightMiddleValue === 'grape') ||
                    (leftBottomValue === 'grape' && rightBottomValue === 'grape') ||
                    (leftTopValue === 'grape' && rightBottomValue === 'grape') ||
                    (leftBottomValue === 'grape' && rightTopValue === 'grape')) {
                    
                    checkReelFlag[1] = true;
                    let currentReelIndex = 21 - reelCounts[1];
                    let middleTopValue = reels[1].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[1].children[currentReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[1].children[currentReelIndex + 1].getAttribute('data-val');

                    while ((leftTopValue === 'grape' && middleTopValue === 'grape' && rightTopValue === 'grape') ||
                        (leftMiddleValue === 'grape' && middleMiddleValue === 'grape' && rightMiddleValue === 'grape') ||
                        (leftBottomValue === 'grape' && middleBottomValue === 'grape' && rightBottomValue === 'grape') ||
                        (leftTopValue === 'grape' && middleMiddleValue === 'grape' && rightBottomValue === 'grape') ||
                        (leftBottomValue === 'grape' && middleMiddleValue === 'grape' && rightTopValue === 'grape')) {

                        reelCounts[1]++;
                        if (reelCounts[1] >= 21) {
                            reelCounts[1] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[1];
                        middleTopValue = reels[1].children[currentReelIndex - 1].getAttribute('data-val');
                        middleMiddleValue = reels[1].children[currentReelIndex].getAttribute('data-val');
                        middleBottomValue = reels[1].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(1);
                    }
                }

            } else if (!stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
                let middleReelIndex = 21 - reelCounts[1];
                let rightReelIndex = 21 - reelCounts[2];

                let middleTopValue = reels[1].children[middleReelIndex - 1].getAttribute('data-val');
                let middleMiddleValue = reels[1].children[middleReelIndex].getAttribute('data-val');
                let middleBottomValue = reels[1].children[middleReelIndex + 1].getAttribute('data-val');

                let rightTopValue = reels[2].children[rightReelIndex - 1].getAttribute('data-val');
                let rightMiddleValue = reels[2].children[rightReelIndex].getAttribute('data-val');
                let rightBottomValue = reels[2].children[rightReelIndex + 1].getAttribute('data-val');

                if ((middleTopValue === 'grape' && rightTopValue === 'grape') ||
                    (middleMiddleValue === 'grape' && rightMiddleValue === 'grape') ||
                    (middleBottomValue === 'grape' && rightBottomValue === 'grape') ||
                    (middleMiddleValue === 'grape' && rightBottomValue === 'grape') ||
                    (middleMiddleValue === 'grape' && rightTopValue === 'grape')) {

                    checkReelFlag[0] = true;
                    let currentReelIndex = 21 - reelCounts[0];
                    let leftTopValue = reels[0].children[currentReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[0].children[currentReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[0].children[currentReelIndex + 1].getAttribute('data-val');

                    while ((leftTopValue === 'grape' && middleTopValue === 'grape' && rightTopValue === 'grape') ||
                        (leftMiddleValue === 'grape' && middleMiddleValue === 'grape' && rightMiddleValue === 'grape') ||
                        (leftBottomValue === 'grape' && middleBottomValue === 'grape' && rightBottomValue === 'grape') ||
                        (leftTopValue === 'grape' && middleMiddleValue === 'grape' && rightBottomValue === 'grape') ||
                        (leftBottomValue === 'grape' && middleMiddleValue === 'grape' && rightTopValue === 'grape')) {

                        reelCounts[0]++;
                        if (reelCounts[0] >= 21) {
                            reelCounts[0] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[0];
                        leftTopValue = reels[0].children[currentReelIndex - 1].getAttribute('data-val');
                        leftMiddleValue = reels[0].children[currentReelIndex].getAttribute('data-val');
                        leftBottomValue = reels[0].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(0);
                    }
                }

            }
        }
        //ブドウ成立時、強制的にブドウが揃うように調整
        else {
            if (i == 0) {
                stopReelFlag[i] = true;
                checkReelFlag[i] = true;

                if (stopReelFlag[0] && !stopReelFlag[1] && !stopReelFlag[2]) {
                    
                    let currentReelIndex = 21 - reelCounts[i];
                    let topValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let bottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    // ブドウが上段/中段/下段のいずれかにない場合
                    while (topValue !== 'grape' && middleValue !== 'grape' && bottomValue !== 'grape') {
                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        topValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        middleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        bottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && stopReelFlag[1] && !stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let leftTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let middleReelIndex = 21 - reelCounts[1];
                    let middleTopValue = reels[1].children[middleReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[1].children[middleReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[1].children[middleReelIndex + 1].getAttribute('data-val');

                    while (!((leftTopValue === 'grape' && middleTopValue === 'grape') ||
                        (leftMiddleValue === 'grape' && middleMiddleValue === 'grape') ||
                        (leftBottomValue === 'grape' && middleBottomValue === 'grape') ||
                        (leftTopValue === 'grape' && middleMiddleValue === 'grape') ||
                        (leftBottomValue === 'grape' && middleMiddleValue === 'grape'))) {
                        
                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        leftTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        leftMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        leftBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && !stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let leftTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let rightReelIndex = 21 - reelCounts[2];
                    let rightTopValue = reels[2].children[rightReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[2].children[rightReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[2].children[rightReelIndex + 1].getAttribute('data-val');

                    while (!((leftTopValue === 'grape' && rightTopValue === 'grape') ||
                        (leftMiddleValue === 'grape' && rightMiddleValue === 'grape') ||
                        (leftBottomValue === 'grape' && rightBottomValue === 'grape') ||
                        (leftTopValue === 'grape' && rightBottomValue === 'grape') ||
                        (leftBottomValue === 'grape' && rightTopValue === 'grape'))) {

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        leftTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        leftMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        leftBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let leftTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let middleReelIndex = 21 - reelCounts[1];
                    let middleTopValue = reels[1].children[middleReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[1].children[middleReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[1].children[middleReelIndex + 1].getAttribute('data-val');

                    let rightReelIndex = 21 - reelCounts[2];
                    let rightTopValue = reels[2].children[rightReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[2].children[rightReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[2].children[rightReelIndex + 1].getAttribute('data-val');

                    while (!((leftTopValue === 'grape' && middleTopValue === 'grape' && rightTopValue === 'grape') ||
                        (leftMiddleValue === 'grape' && middleMiddleValue === 'grape' && rightMiddleValue === 'grape') ||
                        (leftBottomValue === 'grape' && middleBottomValue === 'grape' && rightBottomValue === 'grape') ||
                        (leftTopValue === 'grape' && middleMiddleValue === 'grape' && rightBottomValue === 'grape') ||
                        (leftBottomValue === 'grape' && middleMiddleValue === 'grape' && rightTopValue === 'grape'))) {
                        
                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        leftTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        leftMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        leftBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }
            }

            if (i == 1) {
                stopReelFlag[i] = true;
                checkReelFlag[i] = true;
                if (!stopReelFlag[0] && stopReelFlag[1] && !stopReelFlag[2]) {
                    
                    let currentReelIndex = 21 - reelCounts[i];
                    let topValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let bottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    // ブドウが上段/中段/下段のいずれかにない場合
                    while (topValue !== 'grape' && middleValue !== 'grape' && bottomValue !== 'grape') {
                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        topValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        middleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        bottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && stopReelFlag[1] && !stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let middleTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let leftReelIndex = 21 - reelCounts[0];
                    let leftTopValue = reels[0].children[leftReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[0].children[leftReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[0].children[leftReelIndex + 1].getAttribute('data-val');

                    while (!((leftTopValue === 'grape' && middleTopValue === 'grape') ||
                        (leftMiddleValue === 'grape' && middleMiddleValue === 'grape') ||
                        (leftBottomValue === 'grape' && middleBottomValue === 'grape') ||
                        (leftTopValue === 'grape' && middleMiddleValue === 'grape') ||
                        (leftBottomValue === 'grape' && middleMiddleValue === 'grape'))) {
                        
                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        middleTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        middleMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        middleBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (!stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let middleTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let rightReelIndex = 21 - reelCounts[2];
                    let rightTopValue = reels[2].children[rightReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[2].children[rightReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[2].children[rightReelIndex + 1].getAttribute('data-val');

                    while (!((middleTopValue === 'grape' && rightTopValue === 'grape') ||
                        (middleMiddleValue === 'grape' && rightMiddleValue === 'grape') ||
                        (middleBottomValue === 'grape' && rightBottomValue === 'grape') ||
                        (middleMiddleValue === 'grape' && rightTopValue === 'grape') ||
                        (middleMiddleValue === 'grape' && rightBottomValue === 'grape'))) {
                        
                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        middleTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        middleMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        middleBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let middleTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let leftReelIndex = 21 - reelCounts[0];
                    let leftTopValue = reels[0].children[leftReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[0].children[leftReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[0].children[leftReelIndex + 1].getAttribute('data-val');

                    let rightReelIndex = 21 - reelCounts[2];
                    let rightTopValue = reels[2].children[rightReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[2].children[rightReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[2].children[rightReelIndex + 1].getAttribute('data-val');

                    while (!((leftTopValue === 'grape' && middleTopValue === 'grape' && rightTopValue === 'grape') ||
                        (leftMiddleValue === 'grape' && middleMiddleValue === 'grape' && rightMiddleValue === 'grape') ||
                        (leftBottomValue === 'grape' && middleBottomValue === 'grape' && rightBottomValue === 'grape') ||
                        (leftTopValue === 'grape' && middleMiddleValue === 'grape' && rightBottomValue === 'grape') ||
                        (leftBottomValue === 'grape' && middleMiddleValue === 'grape' && rightTopValue === 'grape'))) {

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        middleTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        middleMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        middleBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }
            }

            if (i == 2) {
                stopReelFlag[i] = true;
                checkReelFlag[i] = true;
                if (!stopReelFlag[0] && !stopReelFlag[1] && stopReelFlag[2]) {
                    
                    let currentReelIndex = 21 - reelCounts[i];
                    let topValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let bottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    // ブドウが上段/中段/下段のいずれかにない場合
                    while (topValue !== 'grape' && middleValue !== 'grape' && bottomValue !== 'grape') {
                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        topValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        middleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        bottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && !stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let rightTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let leftReelIndex = 21 - reelCounts[0];
                    let leftTopValue = reels[0].children[leftReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[0].children[leftReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[0].children[leftReelIndex + 1].getAttribute('data-val');

                    while (!((leftTopValue === 'grape' && rightTopValue === 'grape') ||
                        (leftMiddleValue === 'grape' && rightMiddleValue === 'grape') ||
                        (leftBottomValue === 'grape' && rightBottomValue === 'grape') ||
                        (leftTopValue === 'grape' && rightBottomValue === 'grape') ||
                        (leftBottomValue === 'grape' && rightTopValue === 'grape'))) {

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        rightTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        rightMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        rightBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (!stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let rightTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let middleReelIndex = 21 - reelCounts[1];
                    let middleTopValue = reels[1].children[middleReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[1].children[middleReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[1].children[middleReelIndex + 1].getAttribute('data-val');

                    while (!((middleTopValue === 'grape' && rightTopValue === 'grape') ||
                        (middleMiddleValue === 'grape' && rightMiddleValue === 'grape') ||
                        (middleBottomValue === 'grape' && rightBottomValue === 'grape') ||
                        (middleMiddleValue === 'grape' && rightTopValue === 'grape') ||
                        (middleMiddleValue === 'grape' && rightBottomValue === 'grape'))) {

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        rightTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        rightMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        rightBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let rightTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let leftReelIndex = 21 - reelCounts[0];
                    let leftTopValue = reels[0].children[leftReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[0].children[leftReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[0].children[leftReelIndex + 1].getAttribute('data-val');

                    let middleReelIndex = 21 - reelCounts[1];
                    let middleTopValue = reels[1].children[middleReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[1].children[middleReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[1].children[middleReelIndex + 1].getAttribute('data-val');

                    while (!((leftTopValue === 'grape' && middleTopValue === 'grape' && rightTopValue === 'grape') ||
                        (leftMiddleValue === 'grape' && middleMiddleValue === 'grape' && rightMiddleValue === 'grape') ||
                        (leftBottomValue === 'grape' && middleBottomValue === 'grape' && rightBottomValue === 'grape') ||
                        (leftTopValue === 'grape' && middleMiddleValue === 'grape' && rightBottomValue === 'grape') ||
                        (leftBottomValue === 'grape' && middleMiddleValue === 'grape' && rightTopValue === 'grape'))) {

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        rightTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        rightMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        rightBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

            }
        }

        //リプレイ非成立時、第1停止と第2停止でリプレイがテンパイしている場合、第3停止でリプレイが揃わないように調整
        if ($('#result').html() != 'リプレイ') {
            //第3停止時、第1停止と第2停止のチェック
            if (stopReelFlag[0] && stopReelFlag[1] && !stopReelFlag[2]) {
                let leftReelIndex = 21 - reelCounts[0];
                let middleReelIndex = 21 - reelCounts[1];

                let leftTopValue = reels[0].children[leftReelIndex - 1].getAttribute('data-val');
                let leftMiddleValue = reels[0].children[leftReelIndex].getAttribute('data-val');
                let leftBottomValue = reels[0].children[leftReelIndex + 1].getAttribute('data-val');

                let middleTopValue = reels[1].children[middleReelIndex - 1].getAttribute('data-val');
                let middleMiddleValue = reels[1].children[middleReelIndex].getAttribute('data-val');
                let middleBottomValue = reels[1].children[middleReelIndex + 1].getAttribute('data-val');

                if ((leftTopValue === 'replay' && middleTopValue === 'replay') ||
                    (leftMiddleValue === 'replay' && middleMiddleValue === 'replay') ||
                    (leftBottomValue === 'replay' && middleBottomValue === 'replay') ||
                    (leftTopValue === 'replay' && middleMiddleValue === 'replay') ||
                    (leftBottomValue === 'replay' && middleMiddleValue === 'replay')) {

                    checkReelFlag[2] = true;
                    let currentReelIndex = 21 - reelCounts[2];
                    let rightTopValue = reels[2].children[currentReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[2].children[currentReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[2].children[currentReelIndex + 1].getAttribute('data-val');

                    while ((leftTopValue === 'replay' && middleTopValue === 'replay' && rightTopValue === 'replay') ||
                        (leftMiddleValue === 'replay' && middleMiddleValue === 'replay' && rightMiddleValue === 'replay') ||
                        (leftBottomValue === 'replay' && middleBottomValue === 'replay' && rightBottomValue === 'replay') ||
                        (leftTopValue === 'replay' && middleMiddleValue === 'replay' && rightBottomValue === 'replay') ||
                        (leftBottomValue === 'replay' && middleMiddleValue === 'replay' && rightTopValue === 'replay')) {

                        reelCounts[2]++;
                        if (reelCounts[2] >= 21) {
                            reelCounts[2] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[2];
                        rightTopValue = reels[2].children[currentReelIndex - 1].getAttribute('data-val');
                        rightMiddleValue = reels[2].children[currentReelIndex].getAttribute('data-val');
                        rightBottomValue = reels[2].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(2);
                    }
                }

            } else if (stopReelFlag[0] && !stopReelFlag[1] && stopReelFlag[2]) {
                let leftReelIndex = 21 - reelCounts[0];
                let rightReelIndex = 21 - reelCounts[2];

                let leftTopValue = reels[0].children[leftReelIndex - 1].getAttribute('data-val');
                let leftMiddleValue = reels[0].children[leftReelIndex].getAttribute('data-val');
                let leftBottomValue = reels[0].children[leftReelIndex + 1].getAttribute('data-val');

                let rightTopValue = reels[2].children[rightReelIndex - 1].getAttribute('data-val');
                let rightMiddleValue = reels[2].children[rightReelIndex].getAttribute('data-val');
                let rightBottomValue = reels[2].children[rightReelIndex + 1].getAttribute('data-val');

                if ((leftTopValue === 'replay' && rightTopValue === 'replay') ||
                    (leftMiddleValue === 'replay' && rightMiddleValue === 'replay') ||
                    (leftBottomValue === 'replay' && rightBottomValue === 'replay') ||
                    (leftTopValue === 'replay' && rightBottomValue === 'replay') ||
                    (leftBottomValue === 'replay' && rightTopValue === 'replay')) {

                    checkReelFlag[1] = true;
                    let currentReelIndex = 21 - reelCounts[1];
                    let middleTopValue = reels[1].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[1].children[currentReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[1].children[currentReelIndex + 1].getAttribute('data-val');

                    while ((leftTopValue === 'replay' && middleTopValue === 'replay' && rightTopValue === 'replay') ||
                        (leftMiddleValue === 'replay' && middleMiddleValue === 'replay' && rightMiddleValue === 'replay') ||
                        (leftBottomValue === 'replay' && middleBottomValue === 'replay' && rightBottomValue === 'replay') ||
                        (leftTopValue === 'replay' && middleMiddleValue === 'replay' && rightBottomValue === 'replay') ||
                        (leftBottomValue === 'replay' && middleMiddleValue === 'replay' && rightTopValue === 'replay')) {

                        reelCounts[1]++;
                        if (reelCounts[1] >= 21) {
                            reelCounts[1] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[1];
                        middleTopValue = reels[1].children[currentReelIndex - 1].getAttribute('data-val');
                        middleMiddleValue = reels[1].children[currentReelIndex].getAttribute('data-val');
                        middleBottomValue = reels[1].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(1);
                    }
                }

            } else if (!stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
                let middleReelIndex = 21 - reelCounts[1];
                let rightReelIndex = 21 - reelCounts[2];

                let middleTopValue = reels[1].children[middleReelIndex - 1].getAttribute('data-val');
                let middleMiddleValue = reels[1].children[middleReelIndex].getAttribute('data-val');
                let middleBottomValue = reels[1].children[middleReelIndex + 1].getAttribute('data-val');

                let rightTopValue = reels[2].children[rightReelIndex - 1].getAttribute('data-val');
                let rightMiddleValue = reels[2].children[rightReelIndex].getAttribute('data-val');
                let rightBottomValue = reels[2].children[rightReelIndex + 1].getAttribute('data-val');

                if ((middleTopValue === 'replay' && rightTopValue === 'replay') ||
                    (middleMiddleValue === 'replay' && rightMiddleValue === 'replay') ||
                    (middleBottomValue === 'replay' && rightBottomValue === 'replay') ||
                    (middleMiddleValue === 'replay' && rightBottomValue === 'replay') ||
                    (middleMiddleValue === 'replay' && rightTopValue === 'replay')) {

                    checkReelFlag[0] = true;
                    let currentReelIndex = 21 - reelCounts[0];
                    let leftTopValue = reels[0].children[currentReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[0].children[currentReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[0].children[currentReelIndex + 1].getAttribute('data-val');

                    while ((leftTopValue === 'replay' && middleTopValue === 'replay' && rightTopValue === 'replay') ||
                        (leftMiddleValue === 'replay' && middleMiddleValue === 'replay' && rightMiddleValue === 'replay') ||
                        (leftBottomValue === 'replay' && middleBottomValue === 'replay' && rightBottomValue === 'replay') ||
                        (leftTopValue === 'replay' && middleMiddleValue === 'replay' && rightBottomValue === 'replay') ||
                        (leftBottomValue === 'replay' && middleMiddleValue === 'replay' && rightTopValue === 'replay')) {

                        reelCounts[0]++;
                        if (reelCounts[0] >= 21) {
                            reelCounts[0] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[0];
                        leftTopValue = reels[0].children[currentReelIndex - 1].getAttribute('data-val');
                        leftMiddleValue = reels[0].children[currentReelIndex].getAttribute('data-val');
                        leftBottomValue = reels[0].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(0);
                    }
                }

            }
        }
        //リプレイ成立時、強制的にリプレイが揃うように調整
        else {
            if (i == 0) {
                stopReelFlag[i] = true;
                checkReelFlag[i] = true;

                if (stopReelFlag[0] && !stopReelFlag[1] && !stopReelFlag[2]) {

                    let currentReelIndex = 21 - reelCounts[i];
                    let topValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let bottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    // ブドウが上段/中段/下段のいずれかにない場合
                    while (topValue !== 'replay' && middleValue !== 'replay' && bottomValue !== 'replay') {
                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        topValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        middleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        bottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && stopReelFlag[1] && !stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let leftTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let middleReelIndex = 21 - reelCounts[1];
                    let middleTopValue = reels[1].children[middleReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[1].children[middleReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[1].children[middleReelIndex + 1].getAttribute('data-val');

                    while (!((leftTopValue === 'replay' && middleTopValue === 'replay') ||
                        (leftMiddleValue === 'replay' && middleMiddleValue === 'replay') ||
                        (leftBottomValue === 'replay' && middleBottomValue === 'replay') ||
                        (leftTopValue === 'replay' && middleMiddleValue === 'replay') ||
                        (leftBottomValue === 'replay' && middleMiddleValue === 'replay'))) {

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        leftTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        leftMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        leftBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && !stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let leftTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let rightReelIndex = 21 - reelCounts[2];
                    let rightTopValue = reels[2].children[rightReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[2].children[rightReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[2].children[rightReelIndex + 1].getAttribute('data-val');

                    while (!((leftTopValue === 'replay' && rightTopValue === 'replay') ||
                        (leftMiddleValue === 'replay' && rightMiddleValue === 'replay') ||
                        (leftBottomValue === 'replay' && rightBottomValue === 'replay') ||
                        (leftTopValue === 'replay' && rightBottomValue === 'replay') ||
                        (leftBottomValue === 'replay' && rightTopValue === 'replay'))) {

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        leftTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        leftMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        leftBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let leftTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let middleReelIndex = 21 - reelCounts[1];
                    let middleTopValue = reels[1].children[middleReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[1].children[middleReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[1].children[middleReelIndex + 1].getAttribute('data-val');

                    let rightReelIndex = 21 - reelCounts[2];
                    let rightTopValue = reels[2].children[rightReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[2].children[rightReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[2].children[rightReelIndex + 1].getAttribute('data-val');

                    while (!((leftTopValue === 'replay' && middleTopValue === 'replay' && rightTopValue === 'replay') ||
                        (leftMiddleValue === 'replay' && middleMiddleValue === 'replay' && rightMiddleValue === 'replay') ||
                        (leftBottomValue === 'replay' && middleBottomValue === 'replay' && rightBottomValue === 'replay') ||
                        (leftTopValue === 'replay' && middleMiddleValue === 'replay' && rightBottomValue === 'replay') ||
                        (leftBottomValue === 'replay' && middleMiddleValue === 'replay' && rightTopValue === 'replay'))) {

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        leftTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        leftMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        leftBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }
            }

            if (i == 1) {
                stopReelFlag[i] = true;
                checkReelFlag[i] = true;
                if (!stopReelFlag[0] && stopReelFlag[1] && !stopReelFlag[2]) {

                    let currentReelIndex = 21 - reelCounts[i];
                    let topValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let bottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    // ブドウが上段/中段/下段のいずれかにない場合
                    while (topValue !== 'replay' && middleValue !== 'replay' && bottomValue !== 'replay') {
                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        topValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        middleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        bottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && stopReelFlag[1] && !stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let middleTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let leftReelIndex = 21 - reelCounts[0];
                    let leftTopValue = reels[0].children[leftReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[0].children[leftReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[0].children[leftReelIndex + 1].getAttribute('data-val');

                    while (!((leftTopValue === 'replay' && middleTopValue === 'replay') ||
                        (leftMiddleValue === 'replay' && middleMiddleValue === 'replay') ||
                        (leftBottomValue === 'replay' && middleBottomValue === 'replay') ||
                        (leftTopValue === 'replay' && middleMiddleValue === 'replay') ||
                        (leftBottomValue === 'replay' && middleMiddleValue === 'replay'))) {

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        middleTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        middleMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        middleBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (!stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let middleTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let rightReelIndex = 21 - reelCounts[2];
                    let rightTopValue = reels[2].children[rightReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[2].children[rightReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[2].children[rightReelIndex + 1].getAttribute('data-val');

                    while (!((middleTopValue === 'replay' && rightTopValue === 'replay') ||
                        (middleMiddleValue === 'replay' && rightMiddleValue === 'replay') ||
                        (middleBottomValue === 'replay' && rightBottomValue === 'replay') ||
                        (middleMiddleValue === 'replay' && rightTopValue === 'replay') ||
                        (middleMiddleValue === 'replay' && rightBottomValue === 'replay'))) {

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        middleTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        middleMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        middleBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let middleTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let leftReelIndex = 21 - reelCounts[0];
                    let leftTopValue = reels[0].children[leftReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[0].children[leftReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[0].children[leftReelIndex + 1].getAttribute('data-val');

                    let rightReelIndex = 21 - reelCounts[2];
                    let rightTopValue = reels[2].children[rightReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[2].children[rightReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[2].children[rightReelIndex + 1].getAttribute('data-val');

                    while (!((leftTopValue === 'replay' && middleTopValue === 'replay' && rightTopValue === 'replay') ||
                        (leftMiddleValue === 'replay' && middleMiddleValue === 'replay' && rightMiddleValue === 'replay') ||
                        (leftBottomValue === 'replay' && middleBottomValue === 'replay' && rightBottomValue === 'replay') ||
                        (leftTopValue === 'replay' && middleMiddleValue === 'replay' && rightBottomValue === 'replay') ||
                        (leftBottomValue === 'replay' && middleMiddleValue === 'replay' && rightTopValue === 'replay'))) {

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        middleTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        middleMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        middleBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }
            }

            if (i == 2) {
                stopReelFlag[i] = true;
                checkReelFlag[i] = true;
                if (!stopReelFlag[0] && !stopReelFlag[1] && stopReelFlag[2]) {

                    let currentReelIndex = 21 - reelCounts[i];
                    let topValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let bottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    // ブドウが上段/中段/下段のいずれかにない場合
                    while (topValue !== 'replay' && middleValue !== 'replay' && bottomValue !== 'replay') {
                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        topValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        middleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        bottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && !stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let rightTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let leftReelIndex = 21 - reelCounts[0];
                    let leftTopValue = reels[0].children[leftReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[0].children[leftReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[0].children[leftReelIndex + 1].getAttribute('data-val');

                    while (!((leftTopValue === 'replay' && rightTopValue === 'replay') ||
                        (leftMiddleValue === 'replay' && rightMiddleValue === 'replay') ||
                        (leftBottomValue === 'replay' && rightBottomValue === 'replay') ||
                        (leftTopValue === 'replay' && rightBottomValue === 'replay') ||
                        (leftBottomValue === 'replay' && rightTopValue === 'replay'))) {

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        rightTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        rightMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        rightBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (!stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let rightTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let middleReelIndex = 21 - reelCounts[1];
                    let middleTopValue = reels[1].children[middleReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[1].children[middleReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[1].children[middleReelIndex + 1].getAttribute('data-val');

                    while (!((middleTopValue === 'replay' && rightTopValue === 'replay') ||
                        (middleMiddleValue === 'replay' && rightMiddleValue === 'replay') ||
                        (middleBottomValue === 'replay' && rightBottomValue === 'replay') ||
                        (middleMiddleValue === 'replay' && rightTopValue === 'replay') ||
                        (middleMiddleValue === 'replay' && rightBottomValue === 'replay'))) {

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        rightTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        rightMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        rightBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let rightTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let leftReelIndex = 21 - reelCounts[0];
                    let leftTopValue = reels[0].children[leftReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[0].children[leftReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[0].children[leftReelIndex + 1].getAttribute('data-val');

                    let middleReelIndex = 21 - reelCounts[1];
                    let middleTopValue = reels[1].children[middleReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[1].children[middleReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[1].children[middleReelIndex + 1].getAttribute('data-val');

                    while (!((leftTopValue === 'replay' && middleTopValue === 'replay' && rightTopValue === 'replay') ||
                        (leftMiddleValue === 'replay' && middleMiddleValue === 'replay' && rightMiddleValue === 'replay') ||
                        (leftBottomValue === 'replay' && middleBottomValue === 'replay' && rightBottomValue === 'replay') ||
                        (leftTopValue === 'replay' && middleMiddleValue === 'replay' && rightBottomValue === 'replay') ||
                        (leftBottomValue === 'replay' && middleMiddleValue === 'replay' && rightTopValue === 'replay'))) {

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        rightTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        rightMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        rightBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }
            }
        }
        
        //ピエロ非成立時、第1停止と第2停止でピエロがテンパイしている場合、第3停止でピエロが揃わないように調整
        if ($('#result').html() != 'pierrot') {
            //第3停止時、第1停止と第2停止のチェック
            if (stopReelFlag[0] && stopReelFlag[1] && !stopReelFlag[2]) {
                let leftReelIndex = 21 - reelCounts[0];
                let middleReelIndex = 21 - reelCounts[1];

                let leftTopValue = reels[0].children[leftReelIndex - 1].getAttribute('data-val');
                let leftMiddleValue = reels[0].children[leftReelIndex].getAttribute('data-val');
                let leftBottomValue = reels[0].children[leftReelIndex + 1].getAttribute('data-val');

                let middleTopValue = reels[1].children[middleReelIndex - 1].getAttribute('data-val');
                let middleMiddleValue = reels[1].children[middleReelIndex].getAttribute('data-val');
                let middleBottomValue = reels[1].children[middleReelIndex + 1].getAttribute('data-val');

                if ((leftTopValue === 'pierrot' && middleTopValue === 'pierrot') ||
                    (leftMiddleValue === 'pierrot' && middleMiddleValue === 'pierrot') ||
                    (leftBottomValue === 'pierrot' && middleBottomValue === 'pierrot') ||
                    (leftTopValue === 'pierrot' && middleMiddleValue === 'pierrot') ||
                    (leftBottomValue === 'pierrot' && middleMiddleValue === 'pierrot')) {

                    checkReelFlag[2] = true;
                    let currentReelIndex = 21 - reelCounts[2];
                    let rightTopValue = reels[2].children[currentReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[2].children[currentReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[2].children[currentReelIndex + 1].getAttribute('data-val');

                    while ((leftTopValue === 'pierrot' && middleTopValue === 'pierrot' && rightTopValue === 'pierrot') ||
                        (leftMiddleValue === 'pierrot' && middleMiddleValue === 'pierrot' && rightMiddleValue === 'pierrot') ||
                        (leftBottomValue === 'pierrot' && middleBottomValue === 'pierrot' && rightBottomValue === 'pierrot') ||
                        (leftTopValue === 'pierrot' && middleMiddleValue === 'pierrot' && rightBottomValue === 'pierrot') ||
                        (leftBottomValue === 'pierrot' && middleMiddleValue === 'pierrot' && rightTopValue === 'pierrot')) {

                        reelCounts[2]++;
                        if (reelCounts[2] >= 21) {
                            reelCounts[2] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[2];
                        rightTopValue = reels[2].children[currentReelIndex - 1].getAttribute('data-val');
                        rightMiddleValue = reels[2].children[currentReelIndex].getAttribute('data-val');
                        rightBottomValue = reels[2].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(2);
                    }
                }

            } else if (stopReelFlag[0] && !stopReelFlag[1] && stopReelFlag[2]) {
                let leftReelIndex = 21 - reelCounts[0];
                let rightReelIndex = 21 - reelCounts[2];

                let leftTopValue = reels[0].children[leftReelIndex - 1].getAttribute('data-val');
                let leftMiddleValue = reels[0].children[leftReelIndex].getAttribute('data-val');
                let leftBottomValue = reels[0].children[leftReelIndex + 1].getAttribute('data-val');

                let rightTopValue = reels[2].children[rightReelIndex - 1].getAttribute('data-val');
                let rightMiddleValue = reels[2].children[rightReelIndex].getAttribute('data-val');
                let rightBottomValue = reels[2].children[rightReelIndex + 1].getAttribute('data-val');

                if ((leftTopValue === 'pierrot' && rightTopValue === 'pierrot') ||
                    (leftMiddleValue === 'pierrot' && rightMiddleValue === 'pierrot') ||
                    (leftBottomValue === 'pierrot' && rightBottomValue === 'pierrot') ||
                    (leftTopValue === 'pierrot' && rightBottomValue === 'pierrot') ||
                    (leftBottomValue === 'pierrot' && rightTopValue === 'pierrot')) {

                    checkReelFlag[1] = true;
                    let currentReelIndex = 21 - reelCounts[1];
                    let middleTopValue = reels[1].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[1].children[currentReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[1].children[currentReelIndex + 1].getAttribute('data-val');

                    while ((leftTopValue === 'pierrot' && middleTopValue === 'pierrot' && rightTopValue === 'pierrot') ||
                        (leftMiddleValue === 'pierrot' && middleMiddleValue === 'pierrot' && rightMiddleValue === 'pierrot') ||
                        (leftBottomValue === 'pierrot' && middleBottomValue === 'pierrot' && rightBottomValue === 'pierrot') ||
                        (leftTopValue === 'pierrot' && middleMiddleValue === 'pierrot' && rightBottomValue === 'pierrot') ||
                        (leftBottomValue === 'pierrot' && middleMiddleValue === 'pierrot' && rightTopValue === 'pierrot')) {

                        reelCounts[1]++;
                        if (reelCounts[1] >= 21) {
                            reelCounts[1] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[1];
                        middleTopValue = reels[1].children[currentReelIndex - 1].getAttribute('data-val');
                        middleMiddleValue = reels[1].children[currentReelIndex].getAttribute('data-val');
                        middleBottomValue = reels[1].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(1);
                    }
                }

            } else if (!stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
                let middleReelIndex = 21 - reelCounts[1];
                let rightReelIndex = 21 - reelCounts[2];

                let middleTopValue = reels[1].children[middleReelIndex - 1].getAttribute('data-val');
                let middleMiddleValue = reels[1].children[middleReelIndex].getAttribute('data-val');
                let middleBottomValue = reels[1].children[middleReelIndex + 1].getAttribute('data-val');

                let rightTopValue = reels[2].children[rightReelIndex - 1].getAttribute('data-val');
                let rightMiddleValue = reels[2].children[rightReelIndex].getAttribute('data-val');
                let rightBottomValue = reels[2].children[rightReelIndex + 1].getAttribute('data-val');

                if ((middleTopValue === 'pierrot' && rightTopValue === 'pierrot') ||
                    (middleMiddleValue === 'pierrot' && rightMiddleValue === 'pierrot') ||
                    (middleBottomValue === 'pierrot' && rightBottomValue === 'pierrot') ||
                    (middleMiddleValue === 'pierrot' && rightBottomValue === 'pierrot') ||
                    (middleMiddleValue === 'pierrot' && rightTopValue === 'pierrot')) {

                    checkReelFlag[0] = true;
                    let currentReelIndex = 21 - reelCounts[0];
                    let leftTopValue = reels[0].children[currentReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[0].children[currentReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[0].children[currentReelIndex + 1].getAttribute('data-val');

                    while ((leftTopValue === 'pierrot' && middleTopValue === 'pierrot' && rightTopValue === 'pierrot') ||
                        (leftMiddleValue === 'pierrot' && middleMiddleValue === 'pierrot' && rightMiddleValue === 'pierrot') ||
                        (leftBottomValue === 'pierrot' && middleBottomValue === 'pierrot' && rightBottomValue === 'pierrot') ||
                        (leftTopValue === 'pierrot' && middleMiddleValue === 'pierrot' && rightBottomValue === 'pierrot') ||
                        (leftBottomValue === 'pierrot' && middleMiddleValue === 'pierrot' && rightTopValue === 'pierrot')) {

                        reelCounts[0]++;
                        if (reelCounts[0] >= 21) {
                            reelCounts[0] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[0];
                        leftTopValue = reels[0].children[currentReelIndex - 1].getAttribute('data-val');
                        leftMiddleValue = reels[0].children[currentReelIndex].getAttribute('data-val');
                        leftBottomValue = reels[0].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(0);
                    }
                }
            }
        }

        //ベル非成立時、第1停止と第2停止でベルがテンパイしている場合、第3停止でベルが揃わないように調整
        if ($('#result').html() != 'bell') {
            //第3停止時、第1停止と第2停止のチェック
            if (stopReelFlag[0] && stopReelFlag[1] && !stopReelFlag[2]) {
                let leftReelIndex = 21 - reelCounts[0];
                let middleReelIndex = 21 - reelCounts[1];

                let leftTopValue = reels[0].children[leftReelIndex - 1].getAttribute('data-val');
                let leftMiddleValue = reels[0].children[leftReelIndex].getAttribute('data-val');
                let leftBottomValue = reels[0].children[leftReelIndex + 1].getAttribute('data-val');

                let middleTopValue = reels[1].children[middleReelIndex - 1].getAttribute('data-val');
                let middleMiddleValue = reels[1].children[middleReelIndex].getAttribute('data-val');
                let middleBottomValue = reels[1].children[middleReelIndex + 1].getAttribute('data-val');

                if ((leftTopValue === 'bell' && middleTopValue === 'bell') ||
                    (leftMiddleValue === 'bell' && middleMiddleValue === 'bell') ||
                    (leftBottomValue === 'bell' && middleBottomValue === 'bell') ||
                    (leftTopValue === 'bell' && middleMiddleValue === 'bell') ||
                    (leftBottomValue === 'bell' && middleMiddleValue === 'bell')) {

                    checkReelFlag[2] = true;
                    let currentReelIndex = 21 - reelCounts[2];
                    let rightTopValue = reels[2].children[currentReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[2].children[currentReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[2].children[currentReelIndex + 1].getAttribute('data-val');

                    while ((leftTopValue === 'bell' && middleTopValue === 'bell' && rightTopValue === 'bell') ||
                        (leftMiddleValue === 'bell' && middleMiddleValue === 'bell' && rightMiddleValue === 'bell') ||
                        (leftBottomValue === 'bell' && middleBottomValue === 'bell' && rightBottomValue === 'bell') ||
                        (leftTopValue === 'bell' && middleMiddleValue === 'bell' && rightBottomValue === 'bell') ||
                        (leftBottomValue === 'bell' && middleMiddleValue === 'bell' && rightTopValue === 'bell')) {

                        reelCounts[2]++;
                        if (reelCounts[2] >= 21) {
                            reelCounts[2] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[2];
                        rightTopValue = reels[2].children[currentReelIndex - 1].getAttribute('data-val');
                        rightMiddleValue = reels[2].children[currentReelIndex].getAttribute('data-val');
                        rightBottomValue = reels[2].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(2);
                    }
                }

            } else if (stopReelFlag[0] && !stopReelFlag[1] && stopReelFlag[2]) {
                let leftReelIndex = 21 - reelCounts[0];
                let rightReelIndex = 21 - reelCounts[2];

                let leftTopValue = reels[0].children[leftReelIndex - 1].getAttribute('data-val');
                let leftMiddleValue = reels[0].children[leftReelIndex].getAttribute('data-val');
                let leftBottomValue = reels[0].children[leftReelIndex + 1].getAttribute('data-val');

                let rightTopValue = reels[2].children[rightReelIndex - 1].getAttribute('data-val');
                let rightMiddleValue = reels[2].children[rightReelIndex].getAttribute('data-val');
                let rightBottomValue = reels[2].children[rightReelIndex + 1].getAttribute('data-val');

                if ((leftTopValue === 'bell' && rightTopValue === 'bell') ||
                    (leftMiddleValue === 'bell' && rightMiddleValue === 'bell') ||
                    (leftBottomValue === 'bell' && rightBottomValue === 'bell') ||
                    (leftTopValue === 'bell' && rightBottomValue === 'bell') ||
                    (leftBottomValue === 'bell' && rightTopValue === 'bell')) {

                    checkReelFlag[1] = true;
                    let currentReelIndex = 21 - reelCounts[1];
                    let middleTopValue = reels[1].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[1].children[currentReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[1].children[currentReelIndex + 1].getAttribute('data-val');

                    while ((leftTopValue === 'bell' && middleTopValue === 'bell' && rightTopValue === 'bell') ||
                        (leftMiddleValue === 'bell' && middleMiddleValue === 'bell' && rightMiddleValue === 'bell') ||
                        (leftBottomValue === 'bell' && middleBottomValue === 'bell' && rightBottomValue === 'bell') ||
                        (leftTopValue === 'bell' && middleMiddleValue === 'bell' && rightBottomValue === 'bell') ||
                        (leftBottomValue === 'bell' && middleMiddleValue === 'bell' && rightTopValue === 'bell')) {

                        reelCounts[1]++;
                        if (reelCounts[1] >= 21) {
                            reelCounts[1] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[1];
                        middleTopValue = reels[1].children[currentReelIndex - 1].getAttribute('data-val');
                        middleMiddleValue = reels[1].children[currentReelIndex].getAttribute('data-val');
                        middleBottomValue = reels[1].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(1);
                    }
                }

            } else if (!stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
                let middleReelIndex = 21 - reelCounts[1];
                let rightReelIndex = 21 - reelCounts[2];

                let middleTopValue = reels[1].children[middleReelIndex - 1].getAttribute('data-val');
                let middleMiddleValue = reels[1].children[middleReelIndex].getAttribute('data-val');
                let middleBottomValue = reels[1].children[middleReelIndex + 1].getAttribute('data-val');

                let rightTopValue = reels[2].children[rightReelIndex - 1].getAttribute('data-val');
                let rightMiddleValue = reels[2].children[rightReelIndex].getAttribute('data-val');
                let rightBottomValue = reels[2].children[rightReelIndex + 1].getAttribute('data-val');

                if ((middleTopValue === 'bell' && rightTopValue === 'bell') ||
                    (middleMiddleValue === 'bell' && rightMiddleValue === 'bell') ||
                    (middleBottomValue === 'bell' && rightBottomValue === 'bell') ||
                    (middleMiddleValue === 'bell' && rightBottomValue === 'bell') ||
                    (middleMiddleValue === 'bell' && rightTopValue === 'bell')) {

                    checkReelFlag[0] = true;
                    let currentReelIndex = 21 - reelCounts[0];
                    let leftTopValue = reels[0].children[currentReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[0].children[currentReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[0].children[currentReelIndex + 1].getAttribute('data-val');

                    while ((leftTopValue === 'bell' && middleTopValue === 'bell' && rightTopValue === 'bell') ||
                        (leftMiddleValue === 'bell' && middleMiddleValue === 'bell' && rightMiddleValue === 'bell') ||
                        (leftBottomValue === 'bell' && middleBottomValue === 'bell' && rightBottomValue === 'bell') ||
                        (leftTopValue === 'bell' && middleMiddleValue === 'bell' && rightBottomValue === 'bell') ||
                        (leftBottomValue === 'bell' && middleMiddleValue === 'bell' && rightTopValue === 'bell')) {

                        reelCounts[0]++;
                        if (reelCounts[0] >= 21) {
                            reelCounts[0] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[0];
                        leftTopValue = reels[0].children[currentReelIndex - 1].getAttribute('data-val');
                        leftMiddleValue = reels[0].children[currentReelIndex].getAttribute('data-val');
                        leftBottomValue = reels[0].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(0);
                    }
                }
            }
        }

        console.log(big_flag);
        console.log(reg_flag);
        //ボーナス非成立時、第1停止と第2停止で7がテンパイしている場合、第3停止で7とbarが揃わないように調整
        if (!big_flag && !reg_flag) {
            //第3停止時、第1停止と第2停止のチェック
            if (stopReelFlag[0] && stopReelFlag[1] && !stopReelFlag[2]) {
                let leftReelIndex = 21 - reelCounts[0];
                let middleReelIndex = 21 - reelCounts[1];

                let leftTopValue = reels[0].children[leftReelIndex - 1].getAttribute('data-val');
                let leftMiddleValue = reels[0].children[leftReelIndex].getAttribute('data-val');
                let leftBottomValue = reels[0].children[leftReelIndex + 1].getAttribute('data-val');

                let middleTopValue = reels[1].children[middleReelIndex - 1].getAttribute('data-val');
                let middleMiddleValue = reels[1].children[middleReelIndex].getAttribute('data-val');
                let middleBottomValue = reels[1].children[middleReelIndex + 1].getAttribute('data-val');

                if ((leftTopValue === 'seven' && middleTopValue === 'seven') ||
                    (leftMiddleValue === 'seven' && middleMiddleValue === 'seven') ||
                    (leftBottomValue === 'seven' && middleBottomValue === 'seven') ||
                    (leftTopValue === 'seven' && middleMiddleValue === 'seven') ||
                    (leftBottomValue === 'seven' && middleMiddleValue === 'seven')) {

                    checkReelFlag[2] = true;
                    let currentReelIndex = 21 - reelCounts[2];
                    let rightTopValue = reels[2].children[currentReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[2].children[currentReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[2].children[currentReelIndex + 1].getAttribute('data-val');

                    while ((leftTopValue === 'seven' && middleTopValue === 'seven' && rightTopValue === 'seven') ||
                        (leftMiddleValue === 'seven' && middleMiddleValue === 'seven' && rightMiddleValue === 'seven') ||
                        (leftBottomValue === 'seven' && middleBottomValue === 'seven' && rightBottomValue === 'seven') ||
                        (leftTopValue === 'seven' && middleMiddleValue === 'seven' && rightBottomValue === 'seven') ||
                        (leftBottomValue === 'seven' && middleMiddleValue === 'seven' && rightTopValue === 'seven') ||
                        (leftTopValue === 'seven' && middleTopValue === 'seven' && rightTopValue === 'bar') ||
                        (leftMiddleValue === 'seven' && middleMiddleValue === 'seven' && rightMiddleValue === 'bar') ||
                        (leftBottomValue === 'seven' && middleBottomValue === 'seven' && rightBottomValue === 'bar') ||
                        (leftTopValue === 'seven' && middleMiddleValue === 'seven' && rightBottomValue === 'bar') ||
                        (leftBottomValue === 'seven' && middleMiddleValue === 'seven' && rightTopValue === 'bar')) {

                        reelCounts[2]++;
                        if (reelCounts[2] >= 21) {
                            reelCounts[2] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[2];
                        rightTopValue = reels[2].children[currentReelIndex - 1].getAttribute('data-val');
                        rightMiddleValue = reels[2].children[currentReelIndex].getAttribute('data-val');
                        rightBottomValue = reels[2].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(2);
                    }
                }

            } else if (stopReelFlag[0] && !stopReelFlag[1] && stopReelFlag[2]) {
                let leftReelIndex = 21 - reelCounts[0];
                let rightReelIndex = 21 - reelCounts[2];

                let leftTopValue = reels[0].children[leftReelIndex - 1].getAttribute('data-val');
                let leftMiddleValue = reels[0].children[leftReelIndex].getAttribute('data-val');
                let leftBottomValue = reels[0].children[leftReelIndex + 1].getAttribute('data-val');

                let rightTopValue = reels[2].children[rightReelIndex - 1].getAttribute('data-val');
                let rightMiddleValue = reels[2].children[rightReelIndex].getAttribute('data-val');
                let rightBottomValue = reels[2].children[rightReelIndex + 1].getAttribute('data-val');

                if ((leftTopValue === 'seven' && rightTopValue === 'seven') ||
                    (leftMiddleValue === 'seven' && rightMiddleValue === 'seven') ||
                    (leftBottomValue === 'seven' && rightBottomValue === 'seven') ||
                    (leftTopValue === 'seven' && rightBottomValue === 'seven') ||
                    (leftBottomValue === 'seven' && rightTopValue === 'seven') ||
                    (leftTopValue === 'seven' && rightTopValue === 'bar') ||
                    (leftMiddleValue === 'seven' && rightMiddleValue === 'bar') ||
                    (leftBottomValue === 'seven' && rightBottomValue === 'bar') ||
                    (leftTopValue === 'seven' && rightBottomValue === 'bar') ||
                    (leftBottomValue === 'seven' && rightTopValue === 'bar')) {

                    checkReelFlag[1] = true;
                    let currentReelIndex = 21 - reelCounts[1];
                    let middleTopValue = reels[1].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[1].children[currentReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[1].children[currentReelIndex + 1].getAttribute('data-val');

                    while ((leftTopValue === 'seven' && middleTopValue === 'seven' && rightTopValue === 'seven') ||
                        (leftMiddleValue === 'seven' && middleMiddleValue === 'seven' && rightMiddleValue === 'seven') ||
                        (leftBottomValue === 'seven' && middleBottomValue === 'seven' && rightBottomValue === 'seven') ||
                        (leftTopValue === 'seven' && middleMiddleValue === 'seven' && rightBottomValue === 'seven') ||
                        (leftBottomValue === 'seven' && middleMiddleValue === 'seven' && rightTopValue === 'seven') ||
                        (leftTopValue === 'seven' && middleTopValue === 'seven' && rightTopValue === 'bar') ||
                        (leftMiddleValue === 'seven' && middleMiddleValue === 'seven' && rightMiddleValue === 'bar') ||
                        (leftBottomValue === 'seven' && middleBottomValue === 'seven' && rightBottomValue === 'bar') ||
                        (leftTopValue === 'seven' && middleMiddleValue === 'seven' && rightBottomValue === 'bar') ||
                        (leftBottomValue === 'seven' && middleMiddleValue === 'seven' && rightTopValue === 'bar')) {

                        reelCounts[1]++;
                        if (reelCounts[1] >= 21) {
                            reelCounts[1] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[1];
                        middleTopValue = reels[1].children[currentReelIndex - 1].getAttribute('data-val');
                        middleMiddleValue = reels[1].children[currentReelIndex].getAttribute('data-val');
                        middleBottomValue = reels[1].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(1);
                    }
                }

            } else if (!stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
                let middleReelIndex = 21 - reelCounts[1];
                let rightReelIndex = 21 - reelCounts[2];

                let middleTopValue = reels[1].children[middleReelIndex - 1].getAttribute('data-val');
                let middleMiddleValue = reels[1].children[middleReelIndex].getAttribute('data-val');
                let middleBottomValue = reels[1].children[middleReelIndex + 1].getAttribute('data-val');

                let rightTopValue = reels[2].children[rightReelIndex - 1].getAttribute('data-val');
                let rightMiddleValue = reels[2].children[rightReelIndex].getAttribute('data-val');
                let rightBottomValue = reels[2].children[rightReelIndex + 1].getAttribute('data-val');

                if ((middleTopValue === 'seven' && rightTopValue === 'seven') ||
                    (middleMiddleValue === 'seven' && rightMiddleValue === 'seven') ||
                    (middleBottomValue === 'seven' && rightBottomValue === 'seven') ||
                    (middleMiddleValue === 'seven' && rightBottomValue === 'seven') ||
                    (middleMiddleValue === 'seven' && rightTopValue === 'seven') ||
                    (middleTopValue === 'seven' && rightTopValue === 'bar') ||
                    (middleMiddleValue === 'seven' && rightMiddleValue === 'bar') ||
                    (middleBottomValue === 'seven' && rightBottomValue === 'bar') ||
                    (middleMiddleValue === 'seven' && rightBottomValue === 'bar') ||
                    (middleMiddleValue === 'seven' && rightTopValue === 'bar')) {

                    checkReelFlag[0] = true;
                    let currentReelIndex = 21 - reelCounts[0];
                    let leftTopValue = reels[0].children[currentReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[0].children[currentReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[0].children[currentReelIndex + 1].getAttribute('data-val');

                    while ((leftTopValue === 'seven' && middleTopValue === 'seven' && rightTopValue === 'seven') ||
                        (leftMiddleValue === 'seven' && middleMiddleValue === 'seven' && rightMiddleValue === 'seven') ||
                        (leftBottomValue === 'seven' && middleBottomValue === 'seven' && rightBottomValue === 'seven') ||
                        (leftTopValue === 'seven' && middleMiddleValue === 'seven' && rightBottomValue === 'seven') ||
                        (leftBottomValue === 'seven' && middleMiddleValue === 'seven' && rightTopValue === 'seven') ||
                        (leftTopValue === 'seven' && middleTopValue === 'seven' && rightTopValue === 'bar') ||
                        (leftMiddleValue === 'seven' && middleMiddleValue === 'seven' && rightMiddleValue === 'bar') ||
                        (leftBottomValue === 'seven' && middleBottomValue === 'seven' && rightBottomValue === 'bar') ||
                        (leftTopValue === 'seven' && middleMiddleValue === 'seven' && rightBottomValue === 'bar') ||
                        (leftBottomValue === 'seven' && middleMiddleValue === 'seven' && rightTopValue === 'bar')) {

                        reelCounts[0]++;
                        if (reelCounts[0] >= 21) {
                            reelCounts[0] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[0];
                        leftTopValue = reels[0].children[currentReelIndex - 1].getAttribute('data-val');
                        leftMiddleValue = reels[0].children[currentReelIndex].getAttribute('data-val');
                        leftBottomValue = reels[0].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(0);
                    }
                }
            }
        }

        //BEGフラグ成立中、2図柄分引き込む
        else if (big_flag) {
            if (i == 0) {
                stopReelFlag[i] = true;
                checkReelFlag[i] = true;

                if (stopReelFlag[0] && !stopReelFlag[1] && !stopReelFlag[2]) {

                    let currentReelIndex = 21 - reelCounts[i];
                    let topValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let bottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    // 7が上段/中段/下段のいずれかにない場合
                    let AdjustCount = 0;
                    while ((topValue !== 'seven' && middleValue !== 'seven' && bottomValue !== 'seven') &&
                        AdjustCount < AdjustMaxNum) {
                        AdjustCount++;
                        
                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        topValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        middleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        bottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && stopReelFlag[1] && !stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let leftTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let middleReelIndex = 21 - reelCounts[1];
                    let middleTopValue = reels[1].children[middleReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[1].children[middleReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[1].children[middleReelIndex + 1].getAttribute('data-val');

                    let AdjustCount = 0;
                    while (!((leftTopValue === 'seven' && middleTopValue === 'seven') ||
                        (leftMiddleValue === 'seven' && middleMiddleValue === 'seven') ||
                        (leftBottomValue === 'seven' && middleBottomValue === 'seven') ||
                        (leftTopValue === 'seven' && middleMiddleValue === 'seven') ||
                        (leftBottomValue === 'seven' && middleMiddleValue === 'seven')) &&
                        AdjustCount < AdjustMaxNum) {
                        AdjustCount++;

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        leftTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        leftMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        leftBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && !stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let leftTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let rightReelIndex = 21 - reelCounts[2];
                    let rightTopValue = reels[2].children[rightReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[2].children[rightReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[2].children[rightReelIndex + 1].getAttribute('data-val');

                    let AdjustCount = 0;
                    while (!((leftTopValue === 'seven' && rightTopValue === 'seven') ||
                        (leftMiddleValue === 'seven' && rightMiddleValue === 'seven') ||
                        (leftBottomValue === 'seven' && rightBottomValue === 'seven') ||
                        (leftTopValue === 'seven' && rightBottomValue === 'seven') ||
                        (leftBottomValue === 'seven' && rightTopValue === 'seven')) &&
                        AdjustCount < AdjustMaxNum) {
                        AdjustCount++;

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        leftTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        leftMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        leftBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let leftTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let middleReelIndex = 21 - reelCounts[1];
                    let middleTopValue = reels[1].children[middleReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[1].children[middleReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[1].children[middleReelIndex + 1].getAttribute('data-val');

                    let rightReelIndex = 21 - reelCounts[2];
                    let rightTopValue = reels[2].children[rightReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[2].children[rightReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[2].children[rightReelIndex + 1].getAttribute('data-val');

                    let AdjustCount = 0;
                    while (!((leftTopValue === 'seven' && middleTopValue === 'seven' && rightTopValue === 'seven') ||
                        (leftMiddleValue === 'seven' && middleMiddleValue === 'seven' && rightMiddleValue === 'seven') ||
                        (leftBottomValue === 'seven' && middleBottomValue === 'seven' && rightBottomValue === 'seven') ||
                        (leftTopValue === 'seven' && middleMiddleValue === 'seven' && rightBottomValue === 'seven') ||
                        (leftBottomValue === 'seven' && middleMiddleValue === 'seven' && rightTopValue === 'seven')) &&
                        (AdjustCount < AdjustMaxNum ||
                            ((leftTopValue === 'seven' && middleTopValue === 'seven' && rightTopValue === 'bar') ||
                                (leftMiddleValue === 'seven' && middleMiddleValue === 'seven' && rightMiddleValue === 'bar') ||
                                (leftBottomValue === 'seven' && middleBottomValue === 'seven' && rightBottomValue === 'bar') ||
                                (leftTopValue === 'seven' && middleMiddleValue === 'seven' && rightBottomValue === 'bar') ||
                                (leftBottomValue === 'seven' && middleMiddleValue === 'seven' && rightTopValue === 'bar'))
                        )) {
                        AdjustCount++;

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        leftTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        leftMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        leftBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }
            }
            if (i == 1) {
                stopReelFlag[i] = true;
                checkReelFlag[i] = true;
                if (!stopReelFlag[0] && stopReelFlag[1] && !stopReelFlag[2]) {

                    let currentReelIndex = 21 - reelCounts[i];
                    let topValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let bottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    // 7が上段/中段/下段のいずれかにない場合
                    let AdjustCount = 0;
                    while ((topValue !== 'seven' && middleValue !== 'seven' && bottomValue !== 'seven') &&
                        AdjustCount < AdjustMaxNum) {
                        AdjustCount++;

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        topValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        middleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        bottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && stopReelFlag[1] && !stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let middleTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let leftReelIndex = 21 - reelCounts[0];
                    let leftTopValue = reels[0].children[leftReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[0].children[leftReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[0].children[leftReelIndex + 1].getAttribute('data-val');

                    let AdjustCount = 0;
                    while (!((leftTopValue === 'seven' && middleTopValue === 'seven') ||
                        (leftMiddleValue === 'seven' && middleMiddleValue === 'seven') ||
                        (leftBottomValue === 'seven' && middleBottomValue === 'seven') ||
                        (leftTopValue === 'seven' && middleMiddleValue === 'seven') ||
                        (leftBottomValue === 'seven' && middleMiddleValue === 'seven')) &&
                        AdjustCount < AdjustMaxNum) {
                        AdjustCount++;

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        middleTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        middleMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        middleBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (!stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let middleTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let rightReelIndex = 21 - reelCounts[2];
                    let rightTopValue = reels[2].children[rightReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[2].children[rightReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[2].children[rightReelIndex + 1].getAttribute('data-val');

                    let AdjustCount = 0;
                    while (!((middleTopValue === 'seven' && rightTopValue === 'seven') ||
                        (middleMiddleValue === 'seven' && rightMiddleValue === 'seven') ||
                        (middleBottomValue === 'seven' && rightBottomValue === 'seven') ||
                        (middleMiddleValue === 'seven' && rightTopValue === 'seven') ||
                        (middleMiddleValue === 'seven' && rightBottomValue === 'seven')) &&
                        AdjustCount < AdjustMaxNum) {
                        AdjustCount++;

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        middleTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        middleMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        middleBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let middleTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let leftReelIndex = 21 - reelCounts[0];
                    let leftTopValue = reels[0].children[leftReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[0].children[leftReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[0].children[leftReelIndex + 1].getAttribute('data-val');

                    let rightReelIndex = 21 - reelCounts[2];
                    let rightTopValue = reels[2].children[rightReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[2].children[rightReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[2].children[rightReelIndex + 1].getAttribute('data-val');

                    let AdjustCount = 0;
                    while (!((leftTopValue === 'seven' && middleTopValue === 'seven' && rightTopValue === 'seven') ||
                        (leftMiddleValue === 'seven' && middleMiddleValue === 'seven' && rightMiddleValue === 'seven') ||
                        (leftBottomValue === 'seven' && middleBottomValue === 'seven' && rightBottomValue === 'seven') ||
                        (leftTopValue === 'seven' && middleMiddleValue === 'seven' && rightBottomValue === 'seven') ||
                        (leftBottomValue === 'seven' && middleMiddleValue === 'seven' && rightTopValue === 'seven')) &&
                        (AdjustCount < AdjustMaxNum ||
                            ((leftTopValue === 'seven' && middleTopValue === 'seven' && rightTopValue === 'bar') ||
                                (leftMiddleValue === 'seven' && middleMiddleValue === 'seven' && rightMiddleValue === 'bar') ||
                                (leftBottomValue === 'seven' && middleBottomValue === 'seven' && rightBottomValue === 'bar') ||
                                (leftTopValue === 'seven' && middleMiddleValue === 'seven' && rightBottomValue === 'bar') ||
                                (leftBottomValue === 'seven' && middleMiddleValue === 'seven' && rightTopValue === 'bar'))
                        )) {
                        AdjustCount++;

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        middleTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        middleMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        middleBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }
            }

            if (i == 2) {
                stopReelFlag[i] = true;
                checkReelFlag[i] = true;
                if (!stopReelFlag[0] && !stopReelFlag[1] && stopReelFlag[2]) {

                    let currentReelIndex = 21 - reelCounts[i];
                    let topValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let bottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    // 7が上段/中段/下段のいずれかにない場合
                    let AdjustCount = 0;
                    while ((topValue !== 'seven' && middleValue !== 'seven' && bottomValue !== 'seven') &&
                        AdjustCount < AdjustMaxNum) {
                        AdjustCount++;

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        topValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        middleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        bottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && !stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let rightTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let leftReelIndex = 21 - reelCounts[0];
                    let leftTopValue = reels[0].children[leftReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[0].children[leftReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[0].children[leftReelIndex + 1].getAttribute('data-val');

                    let AdjustCount = 0;
                    while (!((leftTopValue === 'seven' && rightTopValue === 'seven') ||
                        (leftMiddleValue === 'seven' && rightMiddleValue === 'seven') ||
                        (leftBottomValue === 'seven' && rightBottomValue === 'seven') ||
                        (leftTopValue === 'seven' && rightBottomValue === 'seven') ||
                        (leftBottomValue === 'seven' && rightTopValue === 'seven')) &&
                        AdjustCount < AdjustMaxNum) {
                        AdjustCount++;

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        rightTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        rightMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        rightBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (!stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let rightTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let middleReelIndex = 21 - reelCounts[1];
                    let middleTopValue = reels[1].children[middleReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[1].children[middleReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[1].children[middleReelIndex + 1].getAttribute('data-val');

                    let AdjustCount = 0;
                    while (!((middleTopValue === 'seven' && rightTopValue === 'seven') ||
                        (middleMiddleValue === 'seven' && rightMiddleValue === 'seven') ||
                        (middleBottomValue === 'seven' && rightBottomValue === 'seven') ||
                        (middleMiddleValue === 'seven' && rightTopValue === 'seven') ||
                        (middleMiddleValue === 'seven' && rightBottomValue === 'seven')) &&
                        AdjustCount < AdjustMaxNum) {
                        AdjustCount++;

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        rightTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        rightMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        rightBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let rightTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let leftReelIndex = 21 - reelCounts[0];
                    let leftTopValue = reels[0].children[leftReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[0].children[leftReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[0].children[leftReelIndex + 1].getAttribute('data-val');

                    let middleReelIndex = 21 - reelCounts[1];
                    let middleTopValue = reels[1].children[middleReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[1].children[middleReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[1].children[middleReelIndex + 1].getAttribute('data-val');

                    let AdjustCount = 0;
                    while (!((leftTopValue === 'seven' && middleTopValue === 'seven' && rightTopValue === 'seven') ||
                        (leftMiddleValue === 'seven' && middleMiddleValue === 'seven' && rightMiddleValue === 'seven') ||
                        (leftBottomValue === 'seven' && middleBottomValue === 'seven' && rightBottomValue === 'seven') ||
                        (leftTopValue === 'seven' && middleMiddleValue === 'seven' && rightBottomValue === 'seven') ||
                        (leftBottomValue === 'seven' && middleMiddleValue === 'seven' && rightTopValue === 'seven')) &&
                        (AdjustCount < AdjustMaxNum ||
                        ((leftTopValue === 'seven' && middleTopValue === 'seven' && rightTopValue === 'bar') ||
                            (leftMiddleValue === 'seven' && middleMiddleValue === 'seven' && rightMiddleValue === 'bar') ||
                            (leftBottomValue === 'seven' && middleBottomValue === 'seven' && rightBottomValue === 'bar') ||
                            (leftTopValue === 'seven' && middleMiddleValue === 'seven' && rightBottomValue === 'bar') ||
                            (leftBottomValue === 'seven' && middleMiddleValue === 'seven' && rightTopValue === 'bar'))
                        )) {
                        AdjustCount++;

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        rightTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        rightMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        rightBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }
            }

        }

        else if (reg_flag) {
            if (i == 0) {
                stopReelFlag[i] = true;
                checkReelFlag[i] = true;

                if (stopReelFlag[0] && !stopReelFlag[1] && !stopReelFlag[2]) {

                    let currentReelIndex = 21 - reelCounts[i];
                    let topValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let bottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    // 7が上段/中段/下段のいずれかにない場合
                    let AdjustCount = 0;
                    while ((topValue !== 'seven' && middleValue !== 'seven' && bottomValue !== 'seven') &&
                        AdjustCount < AdjustMaxNum) {
                        AdjustCount++;

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        topValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        middleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        bottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && stopReelFlag[1] && !stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let leftTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let middleReelIndex = 21 - reelCounts[1];
                    let middleTopValue = reels[1].children[middleReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[1].children[middleReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[1].children[middleReelIndex + 1].getAttribute('data-val');

                    let AdjustCount = 0;
                    while (!((leftTopValue === 'seven' && middleTopValue === 'seven') ||
                        (leftMiddleValue === 'seven' && middleMiddleValue === 'seven') ||
                        (leftBottomValue === 'seven' && middleBottomValue === 'seven') ||
                        (leftTopValue === 'seven' && middleMiddleValue === 'seven') ||
                        (leftBottomValue === 'seven' && middleMiddleValue === 'seven')) &&
                        AdjustCount < AdjustMaxNum) {
                        AdjustCount++;

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        leftTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        leftMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        leftBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && !stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let leftTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let rightReelIndex = 21 - reelCounts[2];
                    let rightTopValue = reels[2].children[rightReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[2].children[rightReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[2].children[rightReelIndex + 1].getAttribute('data-val');

                    let AdjustCount = 0;
                    while (!((leftTopValue === 'seven' && rightTopValue === 'bar') ||
                        (leftMiddleValue === 'seven' && rightMiddleValue === 'bar') ||
                        (leftBottomValue === 'seven' && rightBottomValue === 'bar') ||
                        (leftTopValue === 'seven' && rightBottomValue === 'bar') ||
                        (leftBottomValue === 'seven' && rightTopValue === 'bar')) &&
                        AdjustCount < AdjustMaxNum) {
                        AdjustCount++;

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        leftTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        leftMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        leftBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let leftTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let middleReelIndex = 21 - reelCounts[1];
                    let middleTopValue = reels[1].children[middleReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[1].children[middleReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[1].children[middleReelIndex + 1].getAttribute('data-val');

                    let rightReelIndex = 21 - reelCounts[2];
                    let rightTopValue = reels[2].children[rightReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[2].children[rightReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[2].children[rightReelIndex + 1].getAttribute('data-val');

                    let AdjustCount = 0;
                    while (!((leftTopValue === 'seven' && middleTopValue === 'seven' && rightTopValue === 'bar') ||
                        (leftMiddleValue === 'seven' && middleMiddleValue === 'seven' && rightMiddleValue === 'bar') ||
                        (leftBottomValue === 'seven' && middleBottomValue === 'seven' && rightBottomValue === 'bar') ||
                        (leftTopValue === 'seven' && middleMiddleValue === 'seven' && rightBottomValue === 'bar') ||
                        (leftBottomValue === 'seven' && middleMiddleValue === 'seven' && rightTopValue === 'bar')) &&
                        (AdjustCount < AdjustMaxNum ||
                            ((leftTopValue === 'seven' && middleTopValue === 'seven' && rightTopValue === 'seven') ||
                                (leftMiddleValue === 'seven' && middleMiddleValue === 'seven' && rightMiddleValue === 'seven') ||
                                (leftBottomValue === 'seven' && middleBottomValue === 'seven' && rightBottomValue === 'seven') ||
                                (leftTopValue === 'seven' && middleMiddleValue === 'seven' && rightBottomValue === 'seven') ||
                                (leftBottomValue === 'seven' && middleMiddleValue === 'seven' && rightTopValue === 'seven'))
                        )) {
                        AdjustCount++;

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        leftTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        leftMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        leftBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }
            }

            if (i == 1) {
                stopReelFlag[i] = true;
                checkReelFlag[i] = true;
                if (!stopReelFlag[0] && stopReelFlag[1] && !stopReelFlag[2]) {

                    let currentReelIndex = 21 - reelCounts[i];
                    let topValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let bottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    // 7が上段/中段/下段のいずれかにない場合
                    let AdjustCount = 0;
                    while ((topValue !== 'seven' && middleValue !== 'seven' && bottomValue !== 'seven') &&
                        AdjustCount < AdjustMaxNum) {
                        AdjustCount++;

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        topValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        middleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        bottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && stopReelFlag[1] && !stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let middleTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let leftReelIndex = 21 - reelCounts[0];
                    let leftTopValue = reels[0].children[leftReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[0].children[leftReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[0].children[leftReelIndex + 1].getAttribute('data-val');

                    let AdjustCount = 0;
                    while (!((leftTopValue === 'seven' && middleTopValue === 'seven') ||
                        (leftMiddleValue === 'seven' && middleMiddleValue === 'seven') ||
                        (leftBottomValue === 'seven' && middleBottomValue === 'seven') ||
                        (leftTopValue === 'seven' && middleMiddleValue === 'seven') ||
                        (leftBottomValue === 'seven' && middleMiddleValue === 'seven')) &&
                        AdjustCount < AdjustMaxNum) {
                        AdjustCount++;

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        middleTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        middleMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        middleBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (!stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let middleTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let rightReelIndex = 21 - reelCounts[2];
                    let rightTopValue = reels[2].children[rightReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[2].children[rightReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[2].children[rightReelIndex + 1].getAttribute('data-val');

                    let AdjustCount = 0;
                    while (!((middleTopValue === 'seven' && rightTopValue === 'bar') ||
                        (middleMiddleValue === 'seven' && rightMiddleValue === 'bar') ||
                        (middleBottomValue === 'seven' && rightBottomValue === 'bar') ||
                        (middleMiddleValue === 'seven' && rightTopValue === 'bar') ||
                        (middleMiddleValue === 'seven' && rightBottomValue === 'bar')) &&
                        AdjustCount < AdjustMaxNum) {
                        AdjustCount++;

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        middleTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        middleMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        middleBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let middleTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let leftReelIndex = 21 - reelCounts[0];
                    let leftTopValue = reels[0].children[leftReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[0].children[leftReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[0].children[leftReelIndex + 1].getAttribute('data-val');

                    let rightReelIndex = 21 - reelCounts[2];
                    let rightTopValue = reels[2].children[rightReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[2].children[rightReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[2].children[rightReelIndex + 1].getAttribute('data-val');

                    let AdjustCount = 0;
                    while (!((leftTopValue === 'seven' && middleTopValue === 'seven' && rightTopValue === 'bar') ||
                        (leftMiddleValue === 'seven' && middleMiddleValue === 'seven' && rightMiddleValue === 'bar') ||
                        (leftBottomValue === 'seven' && middleBottomValue === 'seven' && rightBottomValue === 'bar') ||
                        (leftTopValue === 'seven' && middleMiddleValue === 'seven' && rightBottomValue === 'bar') ||
                        (leftBottomValue === 'seven' && middleMiddleValue === 'seven' && rightTopValue === 'bar')) &&
                        (AdjustCount < AdjustMaxNum ||
                            ((leftTopValue === 'seven' && middleTopValue === 'seven' && rightTopValue === 'seven') ||
                                (leftMiddleValue === 'seven' && middleMiddleValue === 'seven' && rightMiddleValue === 'seven') ||
                                (leftBottomValue === 'seven' && middleBottomValue === 'seven' && rightBottomValue === 'seven') ||
                                (leftTopValue === 'seven' && middleMiddleValue === 'seven' && rightBottomValue === 'seven') ||
                                (leftBottomValue === 'seven' && middleMiddleValue === 'seven' && rightTopValue === 'seven'))
                        )) {
                        AdjustCount++;

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        middleTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        middleMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        middleBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }
            }

            if (i == 2) {
                stopReelFlag[i] = true;
                checkReelFlag[i] = true;
                if (!stopReelFlag[0] && !stopReelFlag[1] && stopReelFlag[2]) {

                    let currentReelIndex = 21 - reelCounts[i];
                    let topValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let middleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let bottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    // barが上段/中段/下段のいずれかにない場合
                    let AdjustCount = 0;
                    while ((topValue !== 'bar' && middleValue !== 'bar' && bottomValue !== 'bar') &&
                        AdjustCount < AdjustMaxNum) {
                        AdjustCount++;

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        topValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        middleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        bottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && !stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let rightTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let leftReelIndex = 21 - reelCounts[0];
                    let leftTopValue = reels[0].children[leftReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[0].children[leftReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[0].children[leftReelIndex + 1].getAttribute('data-val');

                    let AdjustCount = 0;
                    while (!((leftTopValue === 'seven' && rightTopValue === 'bar') ||
                        (leftMiddleValue === 'seven' && rightMiddleValue === 'bar') ||
                        (leftBottomValue === 'seven' && rightBottomValue === 'bar') ||
                        (leftTopValue === 'seven' && rightBottomValue === 'bar') ||
                        (leftBottomValue === 'seven' && rightTopValue === 'bar')) &&
                        AdjustCount < AdjustMaxNum) {
                        AdjustCount++;

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        rightTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        rightMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        rightBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (!stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let rightTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let middleReelIndex = 21 - reelCounts[1];
                    let middleTopValue = reels[1].children[middleReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[1].children[middleReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[1].children[middleReelIndex + 1].getAttribute('data-val');

                    let AdjustCount = 0;
                    while (!((middleTopValue === 'seven' && rightTopValue === 'bar') ||
                        (middleMiddleValue === 'seven' && rightMiddleValue === 'bar') ||
                        (middleBottomValue === 'seven' && rightBottomValue === 'bar') ||
                        (middleMiddleValue === 'seven' && rightTopValue === 'bar') ||
                        (middleMiddleValue === 'seven' && rightBottomValue === 'bar')) &&
                        AdjustCount < AdjustMaxNum) {
                        AdjustCount++;

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        rightTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        rightMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        rightBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }

                else if (stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
                    let currentReelIndex = 21 - reelCounts[i];
                    let rightTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                    let rightMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                    let rightBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');

                    let leftReelIndex = 21 - reelCounts[0];
                    let leftTopValue = reels[0].children[leftReelIndex - 1].getAttribute('data-val');
                    let leftMiddleValue = reels[0].children[leftReelIndex].getAttribute('data-val');
                    let leftBottomValue = reels[0].children[leftReelIndex + 1].getAttribute('data-val');

                    let middleReelIndex = 21 - reelCounts[1];
                    let middleTopValue = reels[1].children[middleReelIndex - 1].getAttribute('data-val');
                    let middleMiddleValue = reels[1].children[middleReelIndex].getAttribute('data-val');
                    let middleBottomValue = reels[1].children[middleReelIndex + 1].getAttribute('data-val');

                    let AdjustCount = 0;
                    while (!((leftTopValue === 'seven' && middleTopValue === 'seven' && rightTopValue === 'bar') ||
                        (leftMiddleValue === 'seven' && middleMiddleValue === 'seven' && rightMiddleValue === 'bar') ||
                        (leftBottomValue === 'seven' && middleBottomValue === 'seven' && rightBottomValue === 'bar') ||
                        (leftTopValue === 'seven' && middleMiddleValue === 'seven' && rightBottomValue === 'bar') ||
                        (leftBottomValue === 'seven' && middleMiddleValue === 'seven' && rightTopValue === 'bar')) &&
                        (AdjustCount < AdjustMaxNum ||
                            ((leftTopValue === 'seven' && middleTopValue === 'seven' && rightTopValue === 'seven') ||
                                (leftMiddleValue === 'seven' && middleMiddleValue === 'seven' && rightMiddleValue === 'seven') ||
                                (leftBottomValue === 'seven' && middleBottomValue === 'seven' && rightBottomValue === 'seven') ||
                                (leftTopValue === 'seven' && middleMiddleValue === 'seven' && rightBottomValue === 'seven') ||
                                (leftBottomValue === 'seven' && middleMiddleValue === 'seven' && rightTopValue === 'seven'))
                        )) {
                        AdjustCount++;

                        reelCounts[i]++;
                        if (reelCounts[i] >= 21) {
                            reelCounts[i] = 0;
                        }
                        currentReelIndex = 21 - reelCounts[i];
                        rightTopValue = reels[i].children[currentReelIndex - 1].getAttribute('data-val');
                        rightMiddleValue = reels[i].children[currentReelIndex].getAttribute('data-val');
                        rightBottomValue = reels[i].children[currentReelIndex + 1].getAttribute('data-val');
                        // リールの位置を更新
                        await Slot.controlReel(i);
                    }
                }
            }
        }

        stopReelFlag[i] = true;  //animateのループから抜け出せる
        
        if (stopReelFlag[0]) {
            pattern[0][0] = reels[0].children[21 - reelCounts[0] - 1].getAttribute('data-val');
            pattern[0][1] = reels[0].children[21 - reelCounts[0]].getAttribute('data-val');
            pattern[0][2] = reels[0].children[21 - reelCounts[0] + 1].getAttribute('data-val');
        }
        if (stopReelFlag[1]) {
            pattern[1][0] = reels[1].children[21 - reelCounts[1] - 1].getAttribute('data-val');
            pattern[1][1] = reels[1].children[21 - reelCounts[1]].getAttribute('data-val');
            pattern[1][2] = reels[1].children[21 - reelCounts[1] + 1].getAttribute('data-val');
        }
        if (stopReelFlag[2]) {
            pattern[2][0] = reels[2].children[21 - reelCounts[2] - 1].getAttribute('data-val');
            pattern[2][1] = reels[2].children[21 - reelCounts[2]].getAttribute('data-val');
            pattern[2][2] = reels[2].children[21 - reelCounts[2] + 1].getAttribute('data-val');
        }

        if (stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
            start_btn.removeAttribute("disabled"); //スタートボタンの機能を機能させる
            console.log(pattern);

            if ((pattern[0][0] == 'grape' && pattern[1][0] == 'grape' && pattern[2][0] == 'grape') || (pattern[0][0] == 'grape' && pattern[1][1] == 'grape' && pattern[2][2] == 'grape') || (pattern[0][1] == 'grape' && pattern[1][1] == 'grape' && pattern[2][1] == 'grape') || (pattern[0][2] == 'grape' && pattern[1][1] == 'grape' && pattern[2][0] == 'grape') || (pattern[0][2] == 'grape' && pattern[1][2] == 'grape' && pattern[2][2] == 'grape')) {
                while (payout < 8) {
                    payout++;
                    credit++;
                    $('#payout').html(payout);
                    $('#credit').html(credit);
                }

                flag_bet = 0;
            }

            else if ((pattern[0][0] == 'pierrot' && pattern[1][0] == 'pierrot' && pattern[2][0] == 'pierrot') || (pattern[0][0] == 'pierrot' && pattern[1][1] == 'pierrot' && pattern[2][2] == 'pierrot') || (pattern[0][1] == 'pierrot' && pattern[1][1] == 'pierrot' && pattern[2][1] == 'pierrot') || (pattern[0][2] == 'pierrot' && pattern[1][1] == 'pierrot' && pattern[2][0] == 'pierrot') || (pattern[0][2] == 'pierrot' && pattern[1][2] == 'pierrot' && pattern[2][2] == 'pierrot')) {
                while (payout < 10) {
                    payout++;
                    credit++;
                    $('#payout').html(payout);
                    $('#credit').html(credit);
                }

                flag_bet = 0;
            }

            else if ((pattern[0][0] == 'replay' && pattern[1][0] == 'replay' && pattern[2][0] == 'replay') || (pattern[0][0] == 'replay' && pattern[1][1] == 'replay' && pattern[2][2] == 'replay') || (pattern[0][1] == 'replay' && pattern[1][1] == 'replay' && pattern[2][1] == 'replay') || (pattern[0][2] == 'replay' && pattern[1][1] == 'replay' && pattern[2][0] == 'replay') || (pattern[0][2] == 'replay' && pattern[1][2] == 'replay' && pattern[2][2] == 'replay')) {

            }

            else if (pattern[0][0] == 'cherry' || pattern[0][1] == 'cherry' || pattern[0][2] == 'cherry') {
                while (payout < 2) {
                    payout++;
                    credit++;
                    $('#payout').html(payout);
                    $('#credit').html(credit);
                }

                flag_bet = 0;
            }

            else if ((pattern[0][0] == 'bell' && pattern[1][0] == 'bell' && pattern[2][0] == 'bell') || (pattern[0][0] == 'bell' && pattern[1][1] == 'bell' && pattern[2][2] == 'bell') || (pattern[0][1] == 'bell' && pattern[1][1] == 'bell' && pattern[2][1] == 'bell') || (pattern[0][2] == 'bell' && pattern[1][1] == 'bell' && pattern[2][0] == 'bell') || (pattern[0][2] == 'bell' && pattern[1][2] == 'bell' && pattern[2][2] == 'bell')) {
                while (payout < 14) {
                    payout++;
                    credit++;
                    $('#payout').html(payout);
                    $('#credit').html(credit);
                }

                flag_bet = 0;
            }

            else if ((pattern[0][0] == 'seven' && pattern[1][0] == 'seven' && pattern[2][0] == 'seven') || (pattern[0][0] == 'seven' && pattern[1][1] == 'seven' && pattern[2][2] == 'seven') || (pattern[0][1] == 'seven' && pattern[1][1] == 'seven' && pattern[2][1] == 'seven') || (pattern[0][2] == 'seven' && pattern[1][1] == 'seven' && pattern[2][0] == 'seven') || (pattern[0][2] == 'seven' && pattern[1][2] == 'seven' && pattern[2][2] == 'seven')) {
                while (payout < 252) {
                    payout++;
                    credit++;
                    $('#payout').html(payout);
                    $('#credit').html(credit);
                }

                flag_bet = 0;
                big_flag = false;
                gogo_lamp = 1;
                $('#image').attr('src', 'img/gogo1.png');
            }

            else if ((pattern[0][0] == 'seven' && pattern[1][0] == 'seven' && pattern[2][0] == 'bar') || (pattern[0][0] == 'seven' && pattern[1][1] == 'seven' && pattern[2][2] == 'bar') || (pattern[0][1] == 'seven' && pattern[1][1] == 'seven' && pattern[2][1] == 'bar') || (pattern[0][2] == 'seven' && pattern[1][1] == 'seven' && pattern[2][0] == 'bar') || (pattern[0][2] == 'seven' && pattern[1][2] == 'seven' && pattern[2][2] == 'bar')) {
                while (payout < 96) {
                    payout++;
                    credit++;
                    $('#payout').html(payout);
                    $('#credit').html(credit);
                }

                flag_bet = 0;
                reg_flag = false;
                gogo_lamp = 1;
                $('#image').attr('src', 'img/gogo1.png');
            }

            else {
                flag_bet = 0;
            }

            if (credit > 50) {
                let tmp = credit - 50;
                credit = 50;
                $('#credit').html(credit);

                balance = balance + tmp * 20;
                $('#balance').html(balance);
            }

        }
    },
    
    resetLocationInfo: function () { //最初の位置を設定
        slotFrameHeight = slot_frame.offsetHeight;
        //offsetHeight　= height + padding（上下） + border（上下)
        //console.log(slotFrameHeight); //502(=500 + 0 + 2)
        slotReelsHeight = reels[0].offsetHeight;
        //フレームの中にある画像全体の大きさ
        //console.log(slotReelsHeight); //2700(=270px×10個)
        slotReelItemHeight = reel[0].offsetHeight;
        //フレームの中にある１つ分の画像全体の大きさ
        //console.log(slotReelItemHeight); //270
        slotReelStartHeight = -slotReelsHeight; // -2700
        slotReelStartHeight = slotReelStartHeight + slotFrameHeight
            //画像末端がフレームのトップ　　　画像末端がフレームの末端
            - (slotFrameHeight / 2) + slotReelItemHeight * 3 / 2;
        //画像末端がフレームの中央　　　　画像1.5枚分下げる
        for (let i = 0; i < reels.length; i++) {
            reels[i].style.top = String(slotReelStartHeight) + "px";
        }
    },
    animation: function (index) { //スロットを動かす
        if (reelCounts[index] >= 21) {
            reelCounts[index] = 0;
        }
        //animate( CSSプロパティ, 速度, イージング関数名, アニメーション完了後に実行する関数 );
        $('.reels').eq(index).animate({
            'top': slotReelStartHeight + (reelCounts[index] * slotReelItemHeight)
            //indexが増えるたびに、画像１つ分下がる
        }, {
            duration: sec, //回転速度
            easing: 'linear', //常に一定の速度
            complete: function () {
                if (stopReelFlag[index]) { //stopReelFlag[index]がtrueになるまでループ
                    return;
                }
                if (checkReelFlag[index]) {
                    return;
                }
                reelCounts[index]++;
                Slot.animation(index);
            }
        });
    },
};

window.onload = function () {
    Slot.init();
    Slot.resetLocationInfo();
    start_btn.addEventListener("click", function (e) {
        if (flag_bet == 0) {
        } else if (flag_bet == 1) {
            e.target.setAttribute("disabled", true); // スタートボタンを無効化
            Slot.start();
            for (let i = 0; i < stop_btn.length; i++) {
                stop_btn[i].removeAttribute("disabled"); // ストップボタンを有効化
            }

            // reg_flag = true;
            // gogo_lamp = 2;
            game_count++;
            $('#game_count').html(game_count);

            const r = Math.ceil(Math.random() * 65536);
            //console.log(r);
            if (!big_flag && !reg_flag) {
                if (r < thr[0]) {
                    $('#result').html('単独BIG');
                    big_flag = true;
                    gogo_lamp = 2;
                } else if (r >= thr[0] && r < thr[1]) {
                    $('#result').html('単独REG');
                    reg_flag = true;
                    gogo_lamp = 2;
                } else if (r >= thr[1] && r < thr[2]) {
                    $('#result').html('通常チェリー+BIG');
                    big_flag = true;
                    gogo_lamp = 2;
                } else if (r >= thr[2] && r < thr[3]) {
                    $('#result').html('チェリー+REG');
                    reg_flag = true;
                    gogo_lamp = 2;
                } else if (r >= thr[3] && r < thr[4]) {
                    $('#result').html('レアチェリーA+BIG');
                    big_flag = true;
                    gogo_lamp = 2;
                } else if (r >= thr[4] && r < thr[5]) {
                    $('#result').html('レアチェリーB+BIG');
                    big_flag = true;
                    gogo_lamp = 2;
                } else if (r >= thr[5] && r < thr[6]) {
                    $('#result').html('レアチェリーC+BIG');
                    big_flag = true;
                    gogo_lamp = 2;
                } else if (r >= thr[6] && r < thr[7]) {
                    $('#result').html('リプレイ');
                } else if (r >= thr[7] && r < thr[8]) {
                    $('#result').html('ブドウ');
                } else if (r >= thr[8] && r < thr[9]) {
                    $('#result').html('通常チェリー');
                } else if (r >= thr[9] && r < thr[10]) {
                    $('#result').html('ピエロ');
                } else if (r >= thr[10] && r < thr[11]) {
                    $('#result').html('ベル');
                } else {
                    $('#result').html('ハズレ');
                }
            }
            
            else if (big_flag) {
                $('#bonus').html('BIG');
                $('#result').html('ハズレ');
            }
            else if (reg_flag) {
                $('#bonus').html('REG');
                $('#result').html('ハズレ');
            }
        }
        // gogo_lamp変数を参照して画像を切り替える
        if (gogo_lamp == 2) {
            $('#image').attr('src', 'img/gogo2.png');
        } else {
            $('#image').attr('src', 'img/gogo1.png');
        }
    });
    for (let i = 0; i < stop_btn.length; i++) {
        stop_btn[i].addEventListener("click", function (e) {
            Slot.stop(e.target.getAttribute('data-val')); // どのボタンをストップさせるか
        });
    }
};