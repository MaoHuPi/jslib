'use strict';
let data = {};
sendXmlhttp('shared_/json/home.json', '', json => {
    data = JSON.parse(json);
    for(let path in data){
        let h2 = document.createElement('h2'), 
            p = document.createElement('p');
        h2.innerText = data[path]['name'];
        p.innerText = data[path]['illustrate'];
        $('#data').appendChild(h2);
        $('#data').appendChild(div);
    }
});

function check(){
    pointButtons = document.querySelectorAll('[aria-label="領取額外獎勵"]');
    if(pointButtons.length > 0){
        pointButtons.forEach(button => {
            button.click();
            document.querySelectorAll('h1.tw-title')[0].innerHTML += 'c';
            console.log('cccccccccc');
        });
    }
    console.log('cs');
    setTimeout(check, 1e3);
}