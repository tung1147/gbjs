;(function() { window.TWIST = window.TWIST || {}; TWIST.HTMLTemplate = {'canvas':'<canvas id="testCanvas" width="1000" height="580" ></canvas>',
'errorPanel':'<div class="error-panel">\r\n    \r\n</div>',
'buttonBar/callSamButton':'<div class="button fourth red" id="call-sam">B\xE1o s\xE2m</div>',
'buttonBar/eatCardButton':'<div class="button second red" id="eat-card">\u0102n</div>',
'buttonBar/entiretyButton':'<div class="button second red" id="entirety-card">\xD9</div>',
'buttonBar/foldSamButton':'<div class="button third blue" id="fold-sam">B\u1ECF s\xE2m</div>',
'buttonBar/foldTurnButton':'<div class="button fourth red" id="fold-turn">B\u1ECF l\u01B0\u1EE3t</div>\r\n',
'buttonBar/getCardButton':'<div class="button first red" id="get-card">B\xE1o s\xE2m</div>',
'buttonBar/hitButton':'<div class="button second yellow" id="hit-card">\u0110\xE1nh b\xE0i</div>',
'buttonBar/sendCardButton':'<div class="button second red" id="send-card">G\u1EEDi b\xE0i</div>',
'buttonBar/showPhomButton':'<div class="button second red" id="eat-card">H\u1EA1 b\xE0i</div>',
'buttonBar/sortCardButton':'<div class="button third blue" id="sort-card">X\u1EAFp x\u1EBFp</div>',
'buttonBar/startButton':'<div class="button first green" id="start-button">B\u1EAFt \u0111\u1EA7u</div>',
'buttonBar/wrapper':'<div class="button-bar"></div>',
'effect/explodePot':'<div class="explorer-pot">\n    <span class="effect"></span>\n    <span class="txt"></span>\n</div>\n<div class="money-falling">\n    <div class="text-light pos-1">\n        <i class="l-obj lobj-1"></i>\n        <i class="l-obj lobj-2"></i>\n        <i class="l-obj lobj-3"></i>\n        <i class="l-obj lobj-4"></i>\n        <i class="l-obj lobj-5"></i>\n        <i class="l-obj lobj-6"></i>\n        <i class="l-obj lobj-7"></i>\n        <i class="l-obj lobj-8"></i>\n    </div>\n    <div class="text-light pos-2">\n        <i class="l-obj lobj-1"></i>\n        <i class="l-obj lobj-2"></i>\n        <i class="l-obj lobj-3"></i>\n        <i class="l-obj lobj-4"></i>\n        <i class="l-obj lobj-5"></i>\n        <i class="l-obj lobj-6"></i>\n        <i class="l-obj lobj-7"></i>\n        <i class="l-obj lobj-8"></i>\n    </div>\n    <div class="text-light pos-3">\n        <i class="l-obj lobj-1"></i>\n        <i class="l-obj lobj-2"></i>\n        <i class="l-obj lobj-3"></i>\n        <i class="l-obj lobj-4"></i>\n        <i class="l-obj lobj-5"></i>\n        <i class="l-obj lobj-6"></i>\n        <i class="l-obj lobj-7"></i>\n        <i class="l-obj lobj-8"></i>\n    </div>\n    <div class="text-light pos-4">\n        <i class="l-obj lobj-1"></i>\n        <i class="l-obj lobj-2"></i>\n        <i class="l-obj lobj-3"></i>\n        <i class="l-obj lobj-4"></i>\n        <i class="l-obj lobj-5"></i>\n        <i class="l-obj lobj-6"></i>\n        <i class="l-obj lobj-7"></i>\n        <i class="l-obj lobj-8"></i>\n    </div>\n</div>',
'effect/wrapper':'<div class="effect"></div>',
'hightLow/bottom':'<div class="bottom">\n    <div class="profile-hight-low">\n\n    </div>\n    <div class="chips-hight-low">\n\n    </div>\n    <div class="new-turn-button">L\u01B0\u1EE3t m\u1EDBi</div>\n</div>\n',
'hightLow/center':'<div class="center">\n    <div class="text-support">Qu\xE2n b\xE0i ti\u1EBFp theo l\xE0 cao hay th\u1EA5p ?</div>\n    <div class="remain-time"></div>\n    <div class="canvas-wrapper">\n        <div class="game-button left-button">\n            <div class="low-button"></div>\n            <div class="low-value">0</div>\n        </div>\n        <div class="game-button right-button">\n            <div class="hight-button"></div>\n            <div class="hight-value">0</div>\n        </div>\n        <div class="virtual-card">\n            <div class="new-turn-text">\n                B\u1ED1c b\xE0i\n            </div>\n        </div>\n    </div>\n</div>\n',
'hightLow/top':'<div class="top">\n    <div class="pot">\n        <div class="title">H\u0169 th\u01B0\u1EDFng</div>\n        <div class="pot-value">0</div>\n    </div>\n    <div class="bank">\n        <div class="title">Bank</div>\n        <div class="bank-value">0</div>\n    </div>\n    <div class="pot-cards">\n        <div class="pot-card"></div>\n        <div class="pot-card"></div>\n        <div class="pot-card"></div>\n    </div>\n</div>\n',
'hightLow/wrapper':'<div class="hight-low"></div>\n',
'miniPoker/autospin':'<div class="autospin">\n    <input id="autospin" type="checkbox" />\n    <label for="autospin"></label>\n    <span>T\u1EF1 \u0111\u1ED9ng quay</span>\n</div>\n',
'miniPoker/button':'<div class="button-spin"></div>',
'miniPoker/chips':'<div class="chip-group">\n    <div class="chip violet">1K</div>\n    <div class="chip green">10k</div>\n    <div class="chip blue">100k</div>\n</div>\n',
'miniPoker/errorPanel':'<div class="error-panel-mini">\r\n    \r\n</div>',
'miniPoker/pot':'<div class="pot">\n    H\u0169 th\u01B0\u1EDFng\n    <div class="pot-value"></div>\n</div>',
'miniPoker/resultItem':'<div class="result-mini-item">\n    <span class="icon"></span>\n    <%- name %> \n    <div class="value"><%- value %> </div>\n</div>',
'miniPoker/resultTab':'<div class="result-mini-poker-tab"></div>',
'miniPoker/resultText':'<div class="result-text"></div>',
'miniPoker/sessionId':'<div class="session-id"></div>',
'miniPoker/user':'<div class="profile">\n    <div class="profile-left">\n        <div class="user avatar" ></div>\n    </div>\n    <div class="profile-right">\n        <div class="username "></div>\n        <div class="money "></div>\n    </div>\n</div>',
'miniPoker/winMoney':'<div class="win-money"></div>',
'miniPoker/wrapper':'<div class="mini-poker-bg"></div>\n',
'resultPanel/card':'<div class="card card<%- id %>"></div>',
'resultPanel/user':'<div class="result-item <%- isWinnerClass %>">\n    <div class="result-item-info"> \n        <div class="result-item-username"><%- username %> </div>\n        <div class="result-item-result-info">\n            <span class="result-item-money"><%- moneyChange %></span>\n            <div class="user-result-string"x><%- resultText %></div>\n        </div>\n    </div>\n    <div class="result-card-list-container">\n        <%= cardList %>\n    </div>\n</div>',
'resultPanel/wrapper':'<div class="game-result">\n    <div class="global-mask"></div>\n    <div class="game-result-popup">\n        <div class="popup-header">\n            <div class="popup-icon"></div> \n            <div class="close-popup">X</div>\n        </div>\n        <div class="popup-content">\n            <div class="container">\n                <div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>',
'videoPoker/doubleButton':'<div class="button-spin double-button"></div>',
'videoPoker/getWinButton':'<div class="get-win-button">\n    Nh\u1EADn th\u01B0\u1EDFng\n</div>',
'videoPoker/moveChip':'<div class="move-chip">\n    <i class="chip1"></i>\n    <i class="chip2"></i>\n    <i class="chip3"></i>\n    <i class="chip4"></i>\n    <i class="chip5"></i>\n    <i class="chip6"></i>\n    <i class="chip7"></i>\n    <i class="chip8"></i>\n</div>',
'videoPoker/supportText':'<div class="support-text"></div>',
'videoPoker/virtualCards':'<div class="virtualCards">\n    <div class="card vitualCard1">\n        \n    </div>\n    <div class="card vitualCard2">\n        \n    </div>\n    <div class="card vitualCard3">\n        \n    </div>\n    <div class="card vitualCard4">\n        \n    </div>\n    <div class="card vitualCard5">\n        \n    </div>\n</div>',
'videoPoker/wrapper':'<div class="mini-poker-bg video-poker"></div>\n',}})();