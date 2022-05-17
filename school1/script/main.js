'use strict';
let data = {};
sendXmlhttp('json/data.json', '', json => {
    data = JSON.parse(json);
    for(let titleId in data){
        let h2 = document.createElement('h2'), 
            div = document.createElement('div');
        h2.innerText = data[titleId]['name'];
        div.id = titleId;
        div.className = 'checks';
        for(let buttonId in data[titleId]['check']){
            let button = document.createElement('div');
            button.innerText = data[titleId]['check'][buttonId]['name'];
            button.setAttribute(titleId, buttonId);
            button.onclick = function(){
                var newValue = !(this.getAttribute('checked') == 'true');
                this.setAttribute('checked', newValue);
                data[titleId]['check'][buttonId]['value'] = newValue;
                setOutput();
            };
            if('attribute' in data[titleId]['check'][buttonId]){
                for(let attributeId in data[titleId]['check'][buttonId]['attribute']){
                    let input = document.createElement('input');
                    input.setAttribute(buttonId, attributeId);
                    input.type = data[titleId]['check'][buttonId]['attribute'][attributeId]['type'];
                    input.onchange = function(){
                        data[titleId]['check'][buttonId]['attribute'][attributeId]['value'] = this.value;
                    };
                    button.appendChild(input);
                }
            }
            div.appendChild(button);
        }
        $('#data').appendChild(h2);
        $('#data').appendChild(div);
        setOutput();
    }
});
function setOutput(){
    const newData = {};
    for(let titleId in data){
        newData[titleId] = {}
        for(let buttonId in data[titleId]['check']){
            if(data[titleId]['check'][buttonId]['value']){
                newData[titleId][buttonId] = true;
            }
            if('attribute' in data[titleId]['check'][buttonId]){
                newData[titleId][buttonId] = {};
                for(let attributeId in data[titleId]['check'][buttonId]['attribute']){
                    newData[titleId][buttonId][attributeId] = data[titleId]['check'][buttonId]['attribute'][attributeId]['value'];
                }
            }
        }
    }
    let output = $('#output');
    var path = location.href.split('/');
    path[path.length-1] = '';
    path = path.join('/');
    output.value = `<script src="${path}script/school1.js"></script>
<script>
    setTimeout(() => {
        let mySchool1 = new school1(${JSON.stringify(newData)});
        mySchool1.init();
    }, 30);
</script>`;
}
function copyOutput(){
    $('#output').focus();
    $('#output').setSelectionRange(0, $('#output').value.length);
    document.execCommand('copy');
}