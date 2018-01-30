'use strict';

const BaseBot = require('bot-sdk');

class Bot extends BaseBot {
  constructor(postData) {
    super(postData);
    this.addLaunchHandler(() => {
      this.waitAnswer();
      return {
        outputSpeech: '欢迎使用设备控制!',
      };
    });
    this.addIntentHandler('palymusic163', () => {
      const card = new Bot.Directive.AudioPlayer.Play('http://m10.music.126.net/20180130171651/891295312686922d7fa2e970559fc482/ymusic/8e74/a24f/39a9/fac7654066a9e3822162adca6678db54.mp3', 'REPLACE_ALL');
      return Promise.resolve({
        card,
        outputSpeech: '开始播放',
      });
    });
    this.addSessionEndedHandler(() => {
      this.endSession();
      return {
        outputSpeech: '谢谢使用设备控制！',
      };
    });
  }
}

module.exports = Bot;
