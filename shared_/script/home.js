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
        $('#data').appendChild(p);
    }
});