$('#output').value = `(() => {
    let xmlhttp = new XMLHttpRequest();
    let rf = function (){
        if (xmlhttp.readyState==4) {
            eval(xmlhttp.responseText+'\nwindow.cheat = new cheat();\nconsole.log(window);');
        }
    }
    xmlhttp.addEventListener("readystatechange", rf);
    xmlhttp.open("GET", 'https://maohupi.github.io/jslib/cheat/script/cheat.js');
    xmlhttp.send();
})();`;