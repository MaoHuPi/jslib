$('#output').value = `((variableName) => {
    let xmlhttp = new XMLHttpRequest();
    let rf = function (){
        if (xmlhttp.readyState==4) {
            eval(xmlhttp.responseText+\`window.\$\{variableName\} = new cheat();console.log(window);\`);
        }
    }
    xmlhttp.addEventListener("readystatechange", rf);
    xmlhttp.open("GET", 'https://maohupi.github.io/jslib/cheat/script/cheat.js');
    xmlhttp.send();
})('cheat');`;
function copyOutput(){
    $('#output').focus();
    $('#output').setSelectionRange(0, $('#output').value.length);
    document.execCommand('copy');
}