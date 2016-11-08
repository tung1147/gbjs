

(function () {
  "use strict";
  TWIST.Sound.init();
  var InstanceGame = new TWIST.XocDia('.wrapper');

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
      event: "gameInfo",
      data: {
        status: 3,
        bettingPositions: [{
            id: 0, //(0-chẵn, 1-lẻ, 2-4đen, 3-3đen, 4-4trắng, 5-3trắng, 6-2đenđỏ)
            //client (0-chẵn, 1-lẻ, 2-Bốn Trắng, 3-Bốn Đỏ, 4-Ba Trắng, 5-Ba đỏ, 6-2đenđỏ)
            totalBetting: 1003,
            mineBetting: 299,
            ratio: 1
          }, {
            id: 1,
            totalBetting: 1014,
            mineBetting: 301,
            ratio: 1
          }, {
            id: 2,
            totalBetting: 1025,
            mineBetting: 302,
            ratio: 1
          }, {
            id: 3,
            totalBetting: 1036,
            mineBetting: 303,
            ratio: 1
          }, {
            id: 4,
            totalBetting: 1047,
            mineBetting: 304,
            ratio: 1
          }, {
            id: 5,
            totalBetting: 1305,
            mineBetting: 305,
            ratio: 1
          }, {
            id: 6,
            totalBetting: 15506,
            mineBetting: 306,
            ratio: 1
          }],
        remainingTime: 12,
        host: "tieukiemtien",
        betting: 100
      },
      nextTime: 1000
    }
    , {
      event: "changeStatus",
      data: {
        newStatus: 2
      },
      nextTime: 1000
    }
    , {
      event: "xocDia",
      data: {
      },
      nextTime: 100
    }
    , {
      event: "changeStatus",
      data: {
        newStatus: 3
      },
      nextTime: 5000
    }
    , {
      event: "openDisk",
      data: {
        map: [0,1,0,1],
        bettingSlots : [1,2]
      },
      nextTime: 100
    }
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



  InstanceGame.on("betting", function (data) {
    setTimeout(function () {
      InstanceGame.emit("userBetting", {
        totalBetting: Math.random() * 10600,
        mineBetting: Math.random() * 30600,
        id: data.slotBettingId
      });
    }, 100);
    count++;
  });

  mockupData.forEach(function (item, index) {

    var nextTime = item.nextTime || 1000;
    startTime += nextTime;

    setTimeout(function () {
      InstanceGame.emit(item.event, item.data);
    }, startTime);


  });




})();