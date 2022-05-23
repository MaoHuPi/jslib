sendXmlhttp('script/cheat.js', '', (script) => {
    window['cheat.js'] = script;
}, 'get');
function setOutput(){
    var path = location.href.split('/');
    path[path.length-1] = '';
    path = path.join('/');
    $('#output').value = {
        'html(script)': 
`<script src="${path}script/cheat.js"></script>`, 
        'js(xmlhttp)': 
`((func = (cheat) => {window['cheat'] = cheat;}) => {
    let xmlhttp = new XMLHttpRequest();
    let rf = () => {
        if(xmlhttp.readyState == 4){
            let name = \`provisionalVariable_cheat\`;
            new Function(\`window['\$\{name\}'] = \` + xmlhttp.responseText)();
            func(window[name]);
        }
    }
    xmlhttp.addEventListener("readystatechange", rf);
    xmlhttp.open("GET", '${path}script/cheat.js');
    xmlhttp.send();
})();`, 
        'js(cheat)': window['cheat.js']
    }[$('input[name="outputType"]:checked').value];
}
function copyOutput(){
    $('#output').focus();
    $('#output').setSelectionRange(0, $('#output').value.length);
    document.execCommand('copy');
}
setOutput();