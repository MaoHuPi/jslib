/*
 * Copyright © 2022 by MaoHuPi
 * cheet.js - v1.0.0
 */
function cheat(){
    class cheat{
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
            return(new cheatString(...any));
        }
        array(...array){
            return(new cheatArray(...array));
        }
        new(){ // 在新分頁開啟
            window.open('https://github.com/MaoHuPi/cheat.js/');
        }
    }
    class cheatString extends String{
    }
    cheatString.prototype.replaceAll = function(keyword, replacement){
        return(this.split(keyword).join(replacement));
    }
    class cheatArray extends Array{
    }
    cheatArray.prototype.search = function(start = '', end = ''){
        let accords = [];
        this.forEach(text => {
           if((start == '' || text.indexOf(start) == 0) && (end == '' || text.indexOf(end) == text.length - end.length)){
               accords.push(text);
           } 
        });
        return(accords);
    }
    cheatArray.prototype.orderedList = function(){
        return(this.map((text, index) => `${index+1}. ${text}`).join('\n'));
    }
    cheatArray.prototype.unorderedList = function(){
        return(this.map(text => `- ${text}`).join('\n'));
    }
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
    class white200{ // tumoiyorozu.github.io/white200
        action(){
            isFunction = 'make_problem' in window;
            if(isFunction){
                make_problem(200, 1);
            }
            return(isFunction);
        }
        getProblemColor(){
            var color = cheat.$("#problem_color_box").style.backgroundColor;
            return(color);
        }
        getProblemArray(){
            var color = this.getProblemColor();
            color = new cheatString(color);
            color = color.split('(')[1].split(')')[0].replaceAll(' ', '').split(',');
        }
        submit(...any){
            var type = undefined, 
                color = undefined, 
                flag = false;
            isFunction = 'submit' in window;
            if(isFunction){
                switch(any.length){
                    case 1:
                        any = any[0];
                        if(typeof any == 'string'){
                            type = 'string'
                            color = new cheatString(any);
                            color = color.split('(')[1].split(')')[0].replaceAll(' ', '').split(',');
                        }else if('lenght' in any && any.lenght === 3){
                            type = 'array'
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
                    window['submit'](...any);
                }
            }
            return({
                status: isFunction && (type !== undefined), 
                type: type
            });
        }
    }
    var object = new cheat();
    object.sanmin = new cheatClass_sanmin();
    object.googleMeet = new cheatClass_googleMeet();
    return(object);
}

// (() => {
//     make_problem(200, 1);
//     colorCode = document.querySelector('#problem_text').innerText.split('\n')[1];
//     document.querySelector(`#col_${colorCode.replace('#', '')}`).click();
// })();