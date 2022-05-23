/*
 * Copyright © 2022 by MaoHuPi
 * cheat.js - v1.0.0
 */
class cheat{
    'use strict'
    constructor(){
        class cheatString extends String{
        }
        cheatString.prototype.replaceAll = function(keyword = '', replacement = ''){
            return(this.split(keyword).join(replacement));
        };
        class cheatArray extends Array{
        }
        cheatArray.prototype.search = function(start = '', end = ''){
            let accords = [];
            this.forEach(text => {
                text = text.toString();
                if((start == '' || text.indexOf(start) == 0) && (end == '' || text.indexOf(end) == text.length - end.length)){
                    accords.push(text);
                } 
            });
            return(accords);
        };
        cheatArray.prototype.orderedList = function(){
            return(this.map((text, index) => `${index+1}. ${text}`).join('\n'));
        };
        cheatArray.prototype.unorderedList = function(index = '*'){
            return(this.map(text => `${index} ${text}`).join('\n'));
        };
        class cheatObject {
            constructor(dict = {}){
                for(let key in dict){
                    this[key] = dict[key];
                }
            }
        }
        cheatObject.prototype.toString = function(){
            return(JSON.stringify(this));
        };
        cheatObject.prototype.keyOf = function(value){
            for(key in this){
                if(this[key] == value){
                    return(key);
                }
            }
            return(undefined);
        };
        class cheatClass_sanmin{ // exam.sanmin.com.tw
            getQuestions(){ // 取得所有題目
                let questions = [];
                cheat.$$('tbody > tr:nth-child(2) > td:nth-child(2)').forEach(td => {
                    let text = td.innerText;
                    if(text.indexOf('(請於考場公佈這組序號給學生)') == -1){
                        questions.push(text.replace(' ', ''))
                    }
                });
                return(questions);
            }
            logout(){ // 登出
                /*
                    只能在https://exam.sanmin.com.tw中使用
                */
                try{
                    cheat.sendXmlhttp('https://exam.sanmin.com.tw/exam/home/default.aspx', '?FN=logout', () => {});
                    return(true);
                }
                catch(error){return(false);}
            }
            new(){ // 在新分頁開啟
                window.open('https://exam.sanmin.com.tw/exam/home/');
            }
        }
        class cheatClass_googleMeet{ // meet.google.com
            numberCheck(num){ // 聊天室座號簽到
                /*
                    1號 無法使用
                */
                if(location.href.indexOf('://meet.google.com/') > -1){
                    let texts = document.querySelectorAll('.oIy2qc');
                    let text = texts[texts.length-1];
                    if(texts.length > 0 && text && parseInt(parseFloat(text.innerText)) == num-1){
                        cheat.$('#bfTqV').value = num;
                        var sendButton = cheat.$('button', cheat.$$('span', cheat.$('.BC4V9b', cheat.$("#bfTqV").offsetParent.offsetParent.offsetParent))[3]);
                        sendButton.removeAttribute('disabled');
                        sendButton.click();
                        console.log(`已傳送「${num}」！`);
                    }else{
                        setTimeout((n = num) => {
                            try{
                                this.numberCheck(n);
                            }
                            catch(error){
                                console.error(error);
                            }
                        }, 100);
                    }
                    return(true);
                }
            }
            new(){ // 在新分頁開啟
                window.open('https://meet.google.com/');
            }
        }
        class cheatClass_white200{ // tumoiyorozu.github.io/white200
            action(){ // 開始回合
                let isElement = cheat.$$('.start_btn').length > 0;
                if(isElement){
                    cheat.$('.start_btn').click();
                }
                return(isElement);
            }
            make(num = 200, dif = 1){ // 布置並開始新回合
                let isFunction = 'make_problem' in window;
                if(isFunction){
                    make_problem(num, dif);
                }
                return(isFunction);
            }
            getProblemColor(){ // 取得題目(string)
                var color = cheat.$("#problem_color_box").style.backgroundColor;
                return(color);
            }
            getProblemArray(){ // 取得題目(array)
                var color = this.getProblemColor();
                color = new cheatString(color);
                color = color.split('(')[1].split(')')[0].replaceAll(' ', '').split(',');
                color = color.map((text) => parseInt(text));
                return(color);
            }
            submit(...any){ // 送出答案
                var type = undefined, 
                    color = undefined, 
                    flag = false, 
                    error = undefined;
                let isFunction = 'submit' in window;
                if(isFunction){
                    switch(any.length){
                        case 1:
                            color = any[0];
                            if(typeof color == 'string'){
                                type = 'string'
                                color = new cheatString(color);
                                color = color.split('(')[1].split(')')[0].replaceAll(' ', '').split(',');
                                color = color.map((text) => parseInt(text));
                            }else if(typeof color == 'object' && 'lenght' in color && color.lenght === 3){
                                type = 'array';
                            }
                            flag = true;
                            break;
                        case 3:
                            type = 'rgb';
                            color = any;
                            flag = true;
                            break;
                    }
                    if(flag){
                        try{
                            window['submit'](...color);
                        }catch(errorMessage){
                            error = errorMessage;
                        }
                    }
                }
                return({
                    status: isFunction && (type !== undefined), 
                    type: type, 
                    color: color, 
                    error: error
                });
            }
            correct(clickMode = false){ // 送出正確答案
                if(clickMode){
                    let isElement = cheat.$$('#problem_text').length > 0;
                    if(isElement){
                        var colorCode = cheat.$('#problem_text').innerText.split('\n')[1], 
                            color = colorCode.replace('#', '');
                        isElement = cheat.$$(`#col_${color}`).length > 0;
                        if(isElement){
                            cheat.$(`#col_${color}`).click();
                        }
                    }
                    return(isElement);
                }else{
                    var color = this.getProblemColor();
                    var submit = this.submit(color);
                    return({
                        color: color, 
                        submit: submit
                    });
                }
            }
            new(){ // 在新分頁開啟
                window.open('https://tumoiyorozu.github.io/white200/');
            }
        }
        class cheatClass_twitch{ // www.twitch.tv
            constructor(){
                this.cleanLoyaltyPoints_auto = false;
                this.cleanLoyaltyPoints_count = 0;
            }
            cleanLoyaltyPoints(auto = this.cleanLoyaltyPoints_auto){ // 領取忠誠點數
                this.cleanLoyaltyPoints_auto = auto;
                var pointButtons = cheat.$$('[aria-label="領取額外獎勵"]');
                if(pointButtons.length > 0){
                    pointButtons.forEach(button => {
                        button.click();
                        // cheat.$$('h1.tw-title')[0].innerHTML += '[c]';
                        this.cleanLoyaltyPoints_count += 1;
                        console.log('已自動領取忠誠點數！');
                    });
                }
                if(auto){
                    setTimeout(() => {this.cleanLoyaltyPoints();}, 1e3);
                }
            }
            stopAutoClean(){ // 停止自動領取忠誠點數
                this.cleanLoyaltyPoints_auto = false;
            }
            new(){ // 在新分頁開啟
                window.open('https://www.twitch.tv/');
            }
        }
        this.cheatString = cheatString;
        this.cheatArray = cheatArray;
        this.cheatObject = cheatObject;
        this.sanmin = new cheatClass_sanmin();
        this.googleMeet = new cheatClass_googleMeet();
        this.white200 = new cheatClass_white200();
        this.twitch = new cheatClass_twitch();
    }
    static sendXmlhttp(name = '', value = '', responseFunction = t => {console.log(t);}, type = 'get'){
        let xmlhttp = new XMLHttpRequest();
        let rf = function (){
            if (xmlhttp.readyState==4) {
                responseFunction(xmlhttp.responseText);
            }
        }
        type = type.toLowerCase();
        xmlhttp.addEventListener("readystatechange", rf);
        if(type == 'get'){
            xmlhttp.open("GET", name+value);
            xmlhttp.send();
        }else if(type == 'post'){
            xmlhttp.open("POST", name,true);
            xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xmlhttp.send(value);
        }
    }
    static $ = function(element, parent = document){return(parent.querySelector(element));}; 
    static $$ = function(element, parent = document){return(parent.querySelectorAll(element));};
    string(...any){
        return(new (this.cheatString)(...any));
    }
    array(...items){
        return(new (this.cheatArray)(...items));
    }
    object(...items){
        return(new (this.cheatObject)(...items));
    }
    new(){ // 在新分頁開啟
        window.open('https://github.com/MaoHuPi/cheat.js/');
    }
}