/*
 * 2022 © MaoHuPi
 * sheetPlayer.js v1.0.0
 */
'use strict';
class sheetPlayer{
    constructor(){
        this.self = this;
        let context = new AudioContext();
        class basic{
            static getHz(name, level, toInt = false){
                var heightDict = {'c': -9, 'd': -7, 'e': -5, 'f': -4, 'g': -2, 'a': 0, 'b': 2};
                if(typeof(name) == 'string' && name.length > 0){
                    var height = heightDict[name[0].toLowerCase()]
                        + (name.match(/#/g) || []).length
                        - (name.match(/b/g) || []).length;
                    // var floorNow = (440 * (2**(level-4)));
                    // var floorNext = (440 * (2**(level-3)));
                    // var hz = floorNow + (floorNext - floorNow)/12*height;
                    var hz = (440 * (2**(level-4 + height/12)));
                    return(toInt ? parseInt(hz) : hz);
                }
                return(0);
            }
        }
        this.sound = class sp_sound{
            constructor(args = {}){
                this.name = 'name' in args ? args['name'] : 'c';
                this.level = 'level' in args ? args['level'] : 0;
                this.length = 'length' in args ? args['length'] : 0;
                this.type = 'type' in args ? args['type'] : 'sine';
                this.context = undefined;
                this.oscillator = undefined;
                this.gain = undefined;
            }
            play(){
                // this.context = new AudioContext(); // 測試結果：AudioContext的上限為50個
                this.context = context; // 將context看成總output
                this.oscillator = this.context.createOscillator();
                this.gain = this.context.createGain();
                // types = ['sine', 'square', 'triangle', 'sawtooth'];
                this.oscillator.type = this.type;
                this.oscillator.frequency.value = basic.getHz(this.name, this.level);
                console.log(this.oscillator.frequency.value);
                this.oscillator.connect(this.gain);
                this.gain.connect(this.context.destination);
                this.oscillator.start(0);
                setTimeout(() => {
                    this.stop();
                }, this.length - 0.4*1e3);
            }
            stop(){
                var a = 1e-5;
                var b = 0.4;
                if(this.gain != undefined){
                    this.gain.gain.exponentialRampToValueAtTime(
                        a, this.context.currentTime + b // 淡出
                    );
                }
                setTimeout(() => {
                    if(this.oscillator != undefined){
                        this.oscillator.stop();
                        delete this.context;
                    }
                }, b*1e3);
            }
        }
        this.timeline = class sp_timeline{
            constructor(){
                this.soundList = [];
                this.timePoint = 0;
                this.lastTime = new Date().getTime();
                this.paused = true;
            }
            add(time, sound){
                this.soundList.push({
                    'time': time, 
                    'sound': sound, 
                    'played': false
                });
            }
            play(){
                this.lastTime = new Date().getTime();
                this.paused = false;
                this._play();
            }
            _play(){
                var timeNow = new Date().getTime();
                this.timePoint += timeNow - this.lastTime;
                this.lastTime = timeNow;
                for(let i = 0; i < this.soundList.length; i++){
                    if(!this.soundList[i]['played'] && this.soundList[i]['time'] < this.timePoint){
                        this.soundList[i]['sound'].play();
                        this.soundList[i]['played'] = true;
                    }
                }
                setTimeout(() => {
                    if(!this.paused){
                        this._play();
                    }
                }, 10);
            }
            pause(){
                this.paused = true;
                for(let i = 0; i < this.soundList.length; i++){
                    if('stop' in this.soundList[i]['sound']){
                        this.soundList[i]['sound'].stop();
                    }
                }
            }
            stop(){
                this.paused = true;
                for(let i = 0; i < this.soundList.length; i++){
                    if('stop' in this.soundList[i]['sound']){
                        this.soundList[i]['sound'].stop();
                        this.timePoint = 0;
                        this.soundList[i]['played'] = false;
                    }
                }
            }
        }
    }
}