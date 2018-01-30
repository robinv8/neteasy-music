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
      const operate = this.getSlot('operate_type');
      console.log(operate);
      if (operate === 'play') {
        const directive = new Bot.Directive.AudioPlayer.Play('http://zhangmenshiting.qianqian.com/data2/music/fdc0f7d7a9c20fdfdd4951fa4a661ed8/305637166/305637166.mp3?xcode=1ce034001535c06c3d7cab37c0a62272', 'REPLACE_ALL');
        return Promise.resolve({
          directives: [ directive ],
          outputSpeech: '开始播放',
        });
      } else if (operate === 'pause') {
        const directive = new Bot.Directive.AudioPlayer.Stop();
        return Promise.resolve({
          directives: [ directive ],
          outputSpeech: '',
        });
      }

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
