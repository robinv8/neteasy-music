'use strict';

const BaseBot = require('bot-sdk');

class musicService extends BaseBot {
  constructor(postData) {
    super(postData);
    this.addLaunchHandler(() => {
      this.waitAnswer();
      return {
        outputSpeech: '欢迎使用设备控制!',
      };
    });
    this.addSessionEndedHandler(() => {
      this.endSession();
      return {
        outputSpeech: '谢谢使用设备控制！',
      };
    });
  }
}
module.exports = musicService;
