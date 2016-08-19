

(function () {
    "use strict";
    var MiniPoker = new TWIST.MiniPoker('.wrapper');

    var mockupData = [{
            event: "userInfo",
            data: {
                username: "User Index 1",
                money: "11000",
                pot: {
                    1000: "445555",
                    10000: "4554522323",
                    100000: "121212121"
                }
            },
            nextTime: 100
        }
        , {
            event: "updatePots",
            data: {
                pots: {
                    1000: "445555",
                    10000: "4554522323",
                    100000: "121212121"
                }
            },
            nextTime: 1000
        }
//        , {
//            event: "updateMoney",
//            data: {
//                newMoney: "445565",
//                winMoney: "4554522"
//            },
//            nextTime: 3000
//        }
//        , {
//            event: "endSpin",
//            data: {
//                map: [1, 2, 3, 4, 5],
//                cardListRank: 3,
//                hightLightCards: [1, 1, 0, 1],
//                rankOfVerticalGroup: 2
//            },
//            nextTime: 2000
//        }
    ];

    var startTime = 0;
    var count = 0;
    setInterval(function () {
        MiniPoker.emit("updatePots", {
            pots: {
                1000: 445555 + count * 1000,
                10000: 4554522323 + count * 10000,
                100000: 121212121 + count * 100000
            }
        });
        count++
    }, 1000);

    MiniPoker.on("spin", function () {
        setTimeout(function () {
            console.log("setTime out");
            MiniPoker.emit("updateMoney", {
                newMoney: 445565 + 1000*count,
                winMoney: 4554522 + 10000*count,
            });
            MiniPoker.emit("endSpin", {
                map: TWIST.MiniPokerLogic.generateMap(),
                cardListRank: 9,
                hightLightCards: [1, 1, 0, 1],
                rankOfVerticalGroup: 2
            });
        }, 1000);
        count++;
    });

    mockupData.forEach(function (item, index) {

        var nextTime = item.nextTime || 1000;
        startTime += nextTime;

        setTimeout(function () {
            MiniPoker.emit(item.event, item.data);
        }, startTime);


    });




})();