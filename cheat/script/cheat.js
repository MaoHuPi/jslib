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
            }
            else if(type == 'post'){
                xmlhttp.open("POST", name,true);
                xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xmlhttp.send(value);
            }
        }
        new(){ // 在新分頁開啟
            window.open('https://github.com/MaoHuPi/cheat.js/');
        }
    }
    class cheatClass_sanmin{
        getQuestions(){ // 取得所有題目
            let questions = [];
            $$('tbody > tr:nth-child(2) > td:nth-child(2)').forEach(td => {
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
            cheat.sendXmlhttp('https://exam.sanmin.com.tw/exam/home/default.aspx', '?FN=logout', () => {});
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
            $ = function(element, parent = document){return(parent.querySelector(element));}; 
            $$ = function(element, parent = document){return(parent.querySelectorAll(element));}; 
            let texts = document.querySelectorAll('.oIy2qc');
            let text = texts[texts.length-1];
            if(texts.length > 0 && text && parseInt(parseFloat(text.innerText)) == num-1){
                $('#bfTqV').value = num;
                var sendButton = $('button', $$('span', $('.BC4V9b', $("#bfTqV").offsetParent.offsetParent.offsetParent))[3]);
                sendButton.removeAttribute('disabled');
                sendButton.click();
                console.log(`已傳送「${num}」！`);
            }
            else{
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
        new(){ // 在新分頁開啟
            window.open('https://meet.google.com/');
        }
    }
    Array.prototype.search = function(start = '', end = ''){
        let accords = [];
        this.forEach(text => {
           if((start == '' || text.indexOf(start) == 0) && (end == '' || text.indexOf(end) == text.length - end.length)){
               accords.push(text);
           } 
        });
        return(accords);
    }
    Array.prototype.orderedList = function(){
        return(this.map((text, index) => `${index+1}. ${text}`).join('\n'));
    }
    Array.prototype.unorderedList = function(){
        return(this.map(text => `- ${text}`).join('\n'));
    }
    var object = new cheat();
    object.sanmin = new cheatClass_sanmin();
    object.googleMeet = new cheatClass_googleMeet();
    return(object);
}