'use strict';
let data = {};
sendXmlhttp('shared_/json/home.json', '', json => {
    data = JSON.parse(json);
    for(let path in data){
        let h2 = document.createElement('h2'), 
            p = document.createElement('p'), 
            div = document.createElement('div');
        h2.innerText = data[path]['name'];
        p.innerHTML = data[path]['illustrate'];
        div.className = 'buttons';
        for(let name in data[path]['button']){
            let button = document.createElement('button')
            button.innerText = name;
            button.onclick = () => window.open(data[path]['button'][name]);
            div.appendChild(button);
        }
        $('#data').appendChild(h2);
        $('#data').appendChild(p);
        $('#data').appendChild(div);
    }
});