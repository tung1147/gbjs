
this.TWIST = this.TWIST || {};

(function () {
    "use strict";

    function InRoomGame() {}

    InRoomGame.statusList = {
        '0': 'STATUS_WAITING_FOR_PLAYER',
        '1': 'STATUS_WAITING_FOR_START',
        '2': 'STATUS_PLAYING',
        '3': 'STATUS_ENDING',
        '4': 'STATUS_WAITING_FOR_READY',
        '6': 'STATUS_WAITING_FOR_DEALING',
        '7': 'STATUS_DEALING',
        '8': 'STATUS_SHAKE_DISK',
        '9': 'STATUS_BETTING',
        '10': 'STATUS_END_BETTING',
        '11': 'STATUS_OPEN_DISK',
        '12': 'STATUS_CLOSE_DISK',
        '13': 'STATUS_ARRANGING',
        '14': 'STATUS_NOTIFY_SAM',
        '15': 'STATUS_DEAL_MASTER'
    };


    var p = InRoomGame.prototype = new TWIST.BaseGame();

    p.initInRoomGame = function () {
        this.initBaseGame();
        this.drawRoom();
        this.pushInRoomGameEvent();
        this.initErrotPanel();
        this.initButtonBar();
        this.initResultPanel();
        this.observerEvent();
        this.userInfo = {};
        this.status = InRoomGame.statusList['0'];
        this.model = this.model || {};
    };

    p.initErrotPanel = function () {
        this.errorPanel = $(TWIST.HTMLTemplate.errorPanel);
        this.wrapper.append(this.errorPanel);
        this.errorList = this.errorList || {};
        $.extend(this.errorList, {
            0: "Lỗi hệ thống !",
            //sam Error
            34: "Không được để 2 cuối !",
            1470: "Chưa chọn cây bài !"
        });
    };

    p.initButtonBar = function () {
        this.buttonBar = $(TWIST.HTMLTemplate.buttonBar.wrapper);
        this.wrapper.append(this.buttonBar);
        this.startButton = $(TWIST.HTMLTemplate.buttonBar.startButton);
        this.buttonBar.append(this.startButton);
        this.buttonBar.hide();
    };

    p.drawRoom = function () {
        var canvas = this.wrapper.find('canvas');
        canvas.css("background", "url(" + TWIST.imagePath + "Desk-bg.png) 143px 55px no-repeat");
        this.playersContainer = new createjs.Container();
        this.desk = new TWIST.Desk(this.options);
        this.canvas.addChild(this.playersContainer, this.desk);
        this.wrapper.css({
            width: canvas.width(),
            height: canvas.height()
        });
    };

    p.pushInRoomGameEvent = function () {
        this.on("userInfo", this.setUserInfo);

        this.on("gameInfo", this.drawGameInfo);

        this.on("userJoin", this.addPlayer);

        this.on("userQuit", this.removePlayer);

        this.on("error", this.showError);

        this.on("changeMaster", this.changeRoomMaster);

        this.on("isolateUpdateMoney", this.isolateUpdateMoney);

        this.on("userChat", this.userChat);

        this.on("changeStatus", this.changeStatus);

        this.on("updateInfo", this.updateInfo);

//        gameplayer Event

        this.on("dealCards", this.dealCards);

        this.on("setDealCards", this.setDealCards);

        this.on("hitTurn", this.onHitTurn);

        this.on("draftCards", this.onDraftCards);

        this.on("endTurn", this.onEndTurn);

        this.on("foldTurn", this.foldTurn);

        this.on("endGame", this.endGame);

        this.on("reconnect", this.reconnect);

        this.on("updateUuid", this.updateUuid);

        this.on("notifyOne", this.onNotifyOne);
    };

    p.setUserInfo = function (data) {
        this.userInfo = data || {};
        this.userInfo.uuid = data.uuid || data.id;
    };

    p.observerEvent = function () {
        var _self = this;
        TWIST.Observer.on("cardSelected", function (card) {
            _self.handCardSelected(card);
        });
    };

    p.drawGameInfo = function (data) {
        this.model = this.model || {};
        $.extend(this.model, data);
        var playerList = this.model.players;
        for (var i = 0, length = playerList.length; i < length; i++) {
            if (playerList[i].username === this.userInfo.username) {
                this.userInfo.uuid = playerList[i].uuid;
            }
        }

        this.drawPlayers();

        if (this.status === 'STATUS_PLAYING') {
            this.drawPlayingState(data);
        } else if (this.status === 'STATUS_WAITING_FOR_START') {
            var playerData = this.getPlayerDataByUuid(this.userInfo.uuid);
            if (playerData && playerData.isRoomMaster) {
                this.startButton.show();
            }
        }
        if (data.remainingTime) {
            this.desk.setRemainingTime(data.remainingTime);
        }
    };

    p.removePlayer = function (data) {
        var player = this.getPlayerByUuid(data.uuid);
        if (player) {
            this.playersContainer.removeChild(player);
        }
        var playerData = this.removePlayerData(data.uuid);
    };

    p.showError = function (data) {
        var message = this.errorList[data.code];
        message = message || data.message;
        var errorItem = $('<div class="error-item">' + message + '</div>');
        $(errorItem).css({margin: "0 auto", display: "inline-block"});
        this.errorPanel.empty();
        this.errorPanel.append(errorItem);
        var _self = this;
        errorItem.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
            $(errorItem).remove();
        });
    };

    p.changeRoomMaster = function (data) {
        var oldRoomMasterPosition = this.roomMasterIcon.globalPosition;
        var uuid = data.uuid;
        var players = this.model.players || [];
        for (var i = 0, length = players.length; i < length; i++) {
            var player = players[i];
            var Player = this.getPlayerByUuid(player.uuid);
            if (player.uuid === uuid) {
                player.isRoomMaster = true;
                if (Player) {
                    this.roomMasterIcon = Player.setRoomMaster(true, oldRoomMasterPosition);
                }
            } else {
                player.isRoomMaster = false;
                if (Player)
                    Player.setRoomMaster(false);
            }
        }
    };

    p.updateInfo = function (data) {
        var player = this.getPlayerDataByUuid(this.userInfo.uuid);
        $.extend(player, data);
        var Player = this.getPlayerByUuid(this.userInfo.uuid);
        var _self = this;
        if (Player) {
            $.extend(Player, data);
            Player.render();
        }
    };

    p.isolateUpdateMoney = function (data) {
        var players = data.players;
        var _self = this;
        players.forEach(function (item, index) {
            var playerData = _self.getPlayerDataByUuid(item.uuid);
            if (playerData) {
                playerData.money = parseInt(item.money);
                var Player = _self.getPlayerByUuid(item.uuid);
                if (Player) {
                    Player.setMoney(playerData.money);
                    var type = item.changeMoney < 0 ? "lose" : "win";
                    Player.showMoneyExchageEffect(item.changeMoney, type);
                }
            }
        });
    };

    p.userChat = function (data) {

    };

    p.changeStatus = function (data) {
        this.desk.setRemainingTime(parseInt(data.remainingTime));
        this.status = InRoomGame.statusList[data.newStatus];
        var func = this[this.status];
        if (typeof func === "function") {
            func.call(this);
        }
        this.emit("ping");
    };

    p.endGame = function (data) {

    };

    p.reconnect = function (data) {

    };

    p.addPlayer = function (data) {

        var userPosition = this.userInfo.indexPosition;
        var playerPosition = data.indexPosition - userPosition;
        if (playerPosition < 0)
            playerPosition += this.options.maxPlayers;
        var config = this.desk.config;

        var currenConfig = {};
        for (var pro in config) {
            currenConfig[pro] = config[pro][playerPosition];
        }
        data.config = currenConfig;

        var playerPositions = this.desk.config.playerPositions;

        $.extend(data, playerPositions[playerPosition]);
        data.position = playerPosition;
        this.model.players.push(data);
        if (this.playersContainer.children.length < this.options.maxPlayers) {
            this.drawPlayer(data);
        }
    };

    p.drawPlayers = function () {
        var players = this.model.players || [];
        var _self = this;
        var userPosition = 0;
        players.forEach(function (item, index) {
            if (item.uuid === _self.userInfo.uuid) {
                userPosition = item.indexPosition;
                $.extend(_self.userInfo, item);
            }
        });
        players.sort(function (a, b) {
            var fistPosition = a.indexPosition - userPosition;
            if (fistPosition < 0) {
                fistPosition += _self.options.maxPlayers;
            }
            var seconPosition = b.indexPosition - userPosition;
            if (seconPosition < 0) {
                seconPosition += _self.options.maxPlayers;
            }
            return fistPosition - seconPosition;
        });

        var config = this.desk.config;
        players.forEach(function (item, index) {
            var currenConfig = {};
            item.position = item.indexPosition - userPosition;
            if (item.position < 0) {
                item.position += _self.options.maxPlayers;
            }
            for (var pro in config) {
                currenConfig[pro] = config[pro][item.position];
            }
            item.config = currenConfig;
            $.extend(item, config.playerPositions[item.position]);
            _self.drawPlayer(item);
        });
    };

    p.drawPlayer = function (playerData) {
        playerData.config = playerData.config || {};
        playerData.index = playerData.index || 0;

        var newPlayer = new TWIST.Player(playerData);
        this.playersContainer.addChild(newPlayer);

        if (playerData.isRoomMaster) {
            this.roomMasterIcon = newPlayer.setRoomMaster(true);
        }
    };

    p.getPlayerByUuid = function (uuid) {
        var players = this.playersContainer.children || [];
        for (var i = 0, length = players.length; i < length; i++) {
            var player = players[i];
            if (player.uuid === uuid)
                return player;
        }
    };

    p.getPlayerDataByUuid = function (uuid) {
        var players = this.model.players || [];
        for (var i = 0, length = players.length; i < length; i++) {
            var player = players[i];
            if (player.uuid === uuid)
                return player;
        }
    };

    p.getCurrentPlayer = function (uuid) {
        var currentUuid = this.userInfo.uuid;
        return this.getPlayerByUuid(currentUuid);
    };

    p.removePlayerData = function (uuid) {
        var players = this.model.players || [];
        var index = players.length;
        for (var i = 0, length = players.length; i < length; i++) {
            var player = players[i];
            if (player.uuid === uuid) {
                index = i;
                break;
            }
        }
        players.splice(index, 1);
    };

    p.initResultPanel = function () {
        var _self = this;
        
        this.resultPanel = $(TWIST.HTMLTemplate.resultPanel.wrapper);
        this.wrapper.append(this.resultPanel);

        var resultPanelCotainer = this.resultPanel.find('.container')[0];
        this.resultPanel.find('.container').css("height", "320px");
        this.resultPanel.hide();
        this.resultPanelScroll = new IScroll(resultPanelCotainer, {scrollX: true, freeScroll: true});
        this.resultPanelScroll.refresh();
        
        var closeButton = this.resultPanel.find('.close-popup');
        var popupMask = this.resultPanel.find('.global-mask');
        closeButton.on('click', function(){
            _self.resultPanel.hide();
        });
        popupMask.on('click', function(){
            _self.resultPanel.hide();
        });
    };

    p.showResult = function (resultData) {
        var _self = this;
        this.resultPanel.show();
        var resultIcon = this.resultPanel.find('.popup-icon');
        if (resultData.isWinner) {
            resultIcon.removeClass('lose');
        } else {
            resultIcon.addClass('lose');
        }
        
        var container = this.resultPanel.find('.container>div');
        
        resultData.listPlayers.forEach(function (item, index) {
            var cardList = "";
            var cardListIndex = item.remainCards;
            cardListIndex.forEach(function(item,index){
                var template = _.template(TWIST.HTMLTemplate.resultPanel.card);
                var resultTemplate = template({
                    id : item
                });
                cardList += resultTemplate;
            });
            
            var compiled = _.template(TWIST.HTMLTemplate.resultPanel.user);
            var resultText = compiled({
                username : item.username,
                moneyChange : Global.numberWithDot(item.changeMoney),
                resultText : item.gameResultString,
                cardList : cardList,
                isWinnerClass : item.isWinner ? "winner" : ""
            });
            
            container.append($(resultText));
        });
        this.resultPanelScroll.refresh();
    };
    
    p.endIngameEvent = function (){
        this.desk.setRemainingTime(0);
        this.buttonBar.hide();
        this.errorPanel.empty();
    };

    p.updateUuid = function (data) {
        var username = data.username;
        if (!this.model || !this.model.players)
            return;
        var playerList = this.model.players;
        for (var i = 0, length = playerList.length; i < length; i++) {
            if (playerList[i].username === username) {
                playerList[i].uuid = data.uuid;
            }
        }
        var PlayerList = this.playersContainer.children;
        for (var i = 0, length = PlayerList.length; i < length; i++) {
            if (PlayerList[i].username === username) {
                PlayerList[i].uuid = data.uuid;
            }
        }
    };

    TWIST.InRoomGame = InRoomGame;

})();