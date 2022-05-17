sendXmlhttp('script/cheat.js', '', (script) => {
    window['cheat.js'] = script;
}, 'get');
function setOutput(){
    var path = location.href.split('/');
    path[path.length-1] = '';
    path = path.join('/');
    $('#output').value = {
        'html(script)': 
`<script src="${path}script/cheat.js"></script>
<script>
    window['cheat'] = new cheat();
</script>`, 
        'js(xmlhttp)': 
`((variableName) => {
    let xmlhttp = new XMLHttpRequest();
    let rf = function (){
        if (xmlhttp.readyState==4) {
            eval(xmlhttp.responseText+\`window.\$\{variableName\} = new cheat();\`);
        }
    }
    xmlhttp.addEventListener("readystatechange", rf);
    xmlhttp.open("GET", '${path}script/cheat.js');
    xmlhttp.send();
})('cheat');`, 
        'js(cheet)': window['cheat.js']
    }[$('input[name="outputType"]:checked').value];
}
function copyOutput(){
    $('#output').focus();
    $('#output').setSelectionRange(0, $('#output').value.length);
    document.execCommand('copy');
}