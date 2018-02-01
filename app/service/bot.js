'use strict';

const BaseBot = require('bot-sdk');
const _ = require('lodash');

class Bot extends BaseBot {
  constructor(postData, ctx) {
    super(postData);
    this.ctx = ctx;
    const NetEasyAuth = ctx.service.auth;
    this.addLaunchHandler(async () => {
      const personInfo = await NetEasyAuth.login('13893332941', 'ryb19930000');
      ctx.logger.info(personInfo);
      ctx.personInfo = personInfo;

      this.waitAnswer();
      return {
        outputSpeech: '欢迎使用设备控制!',
      };
    });
    this.addIntentHandler('palymusic163', async () => {
      const operate = this.getSlot('operate_type');
      console.log(operate);
      const { Stop } = Bot.Directive.AudioPlayer;
      if (operate === 'play') {
        const musics = await this.ctx.service.music.getPersonalFM();
        const musicUrls = await Promise.all(_.map(musics.data.data || [], async json => await this.ctx.service.music.getMusicUrl(json)));

        console.log(musicUrls);
        const musicQueue = _.map(musicUrls, this.buildMusicQueue);
        // const directive = new Play(musicUrls[ 0 ].data.data[ 0 ].url, 'REPLACE_ALL');
        return Promise.resolve({
          directives: musicQueue,
          outputSpeech: '开始播放',
        });
      } else if (operate === 'pause') {
        const directive = new Stop();
        return Promise.resolve({
          directives: [ directive ],
          outputSpeech: '',
        });
      }
    });
    this.addEventListener('AudioPlayer.PlaybackFinished', async () => {
      const musics = await this.ctx.service.music.getPersonalFM();
      const musicUrls = await Promise.all(_.map(musics.data.data || [], async json => await this.ctx.service.music.getMusicUrl(json)));

      console.log(musicUrls);
      const musicQueue = _.map(musicUrls, this.buildMusicQueue);
      return Promise.resolve({
        directives: musicQueue,
        outputSpeech: '下一曲',
      });
    })
    this.addSessionEndedHandler(() => {
      this.endSession();
      return {
        outputSpeech: '谢谢使用设备控制！',
      };
    });
  }

  buildMusicQueue(item) {
    const { Play } = Bot.Directive.AudioPlayer;
    return new Play(item.data.data[ 0 ].url, 'ENQUEUE');
  }
}

module.exports = Bot;
