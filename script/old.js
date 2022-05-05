setTimeout(() => {
    $('#web_side_block > div').style.background = '#dce4ff';
    $$('#web_side_block .tad_web_block').forEach(e => {
        e.style.background = '#ffffff';
        e.style.padding = '0.5vw';
        e.style.borderRadius = '0.5vw';
    });
    $$('#web_center_block > div').forEach(e => {
        e.style.border = '0px';
    });
    $('div[style="margin-top: 10px;"]').style.marginTop = '0px';
    $('.tad_web_block > div').style.border = '0px';
    if($('#sort_side')){
        ['#\\36 469', '#\\36 546'].forEach(aid => {
            while($$(aid).length > 0){
                $$(aid).forEach(E => {
                    E.remove();
                });
            }
        });
    }
    if($('.col-md-12')){
        TDH = $$('.col-md-12');//[$$('.col-md-12').length-1]);
        setTDH(tf => {
            let t = $('div', tf);
            if(t){
                t.style.position = 'relative';
                let fd = FDiv(), cd = CDiv();
                let TDHOH = t.offsetHeight;
                fd.style.width = cd.style.width = TDHOH*0.6 + 'px';
                fd.style.height = cd.style.height = TDHOH*0.6 + 'px';
                fd.style.top = cd.style.top = TDHOH*0.2 + 'px';
                fd.style.right = TDHOH*0.2 + 'px';
                cd.style.right = TDHOH*0.2 + TDHOH*0.8 + 'px';
                let HW = tf.innerText?.split('\n');
                let HWT = [];
                for(let i = 0; i < HW.length; i++){
                    if(HW[i] == ''){
                        HW.splice(i, 1);
                        i--;
                    }
                }
                for(let i = 0; i < HW.length; i++){
                    HWT[i] = `${i+1}. ${HW[i]}`;
                    fd.i_html += `
                        <li>${HW[i]}</li>
                    `;
                }
                cd.i_html = HWT.join('\n');
                t.appendChild(fd);
                t.appendChild(cd);
            }
        });
        body.appendChild(MDiv);
    }
    // GDiv.style.fontSize = '0px';
    // while(GDiv.offsetWidth < BDiv.offsetWidth && GDiv.offsetHeight < BDiv.offsetHeight){
    //     GDiv.style.fontSize = parseInt(GDiv.style.fontSize.replace('px', '')) + 1 + 'px';
    // }
    // GDiv.style.fontSize = parseInt(GDiv.style.fontSize.replace('px', '')) - 1 + 'px';
    $$('li.list-group-item *').forEach(e => {
        if(e.style.border){
            e.style.border = 'none';
        }
    });
    windowTF();
    $$('.block_config_tool').forEach(e => {
        ['6469', '6544', '6546'].forEach(aid => {
            if($('a', e).href.search(aid) > -1){
                e.remove();
            }
        });
    });
}, 30);
function whileGDI(){
    GDiv.style.fontSize = '2px';
    while(GDiv.offsetWidth < BDiv.offsetWidth && GDiv.offsetHeight < BDiv.offsetHeight){
        GDiv.style.fontSize = parseInt(GDiv.style.fontSize.replace('px', '')) + 1 + 'px';
    }
    GDiv.style.fontSize = parseInt(GDiv.style.fontSize.replace('px', '')) - 1 + 'px';
}
function windowTF(w = 0, h = 0){
    if(w !== 100*vw() || h !== 100*vh()){
        w = 100*vw();
        h = 100*vh();
        if(GDiv.innerHTML !== ''){
            whileGDI();
        }
    }
    setTimeout(function(a = w, b = h){
        windowTF(a, b);
    }, 30);
}
function userCopy(type, text){
    if(type == 'text'){
        CopyInnerTextA.innerText = text;
    }
    var selection = window.getSelection();
    var selectRange = document.createRange();
    selectRange.selectNode(CopyInnerTextA);
    selection.removeAllRanges();
    selection.addRange(selectRange);
    document.execCommand('copy');
}
var evt = {
    getEvent:function (event) {
        return window.event || event;
    },
    getClientX:function (event) {
        return this.getEvent(event).clientX;
    },
    getClientY:function (event) {
        return this.getEvent(event).clientY;
    },
    getScrollLeft:function () {
        return document.body.scrollLeft||window.pageXOffset||document.documentElement.scrollLeft||0;
    },
    getScrollTop:function () {
        return document.body.scrollTop||window.pageYOffset||document.documentElement.scrollTop||0;
    },
    getPageX:function (event) {
      return this.getEvent(event).pageX?this.getEvent(event).pageX:this.getClientX(event)+this.getScrollLeft();
    },
    getPageY:function (event) {
        return this.getEvent(event).pageY?this.getEvent(event).pageY:this.getClientY(event)+this.getScrollTop();
    }
};
click_img_number = 0;
document.onmousedown = function(e){
    click_img_number += 1;
    var click_img = document.createElement('div');
    click_img.setAttribute('class', 'click_img');
    click_img.setAttribute('id', 'click_img'+click_img_number);
    click_img.style.left = evt.getPageX(e)-10+"px";
    click_img.style.top = evt.getPageY(e)-10+"px";
    document.body.appendChild(click_img);
    var click_img2 = document.getElementById('click_img'+click_img_number);
    setTimeout(() => {
        document.body.removeChild(click_img2)
    }, 1000);
}

function setMarkListTool(){
    let groups = $$('span.cke_toolbox > .cke_toolbar > .cke_toolgroup');
    for(let i = 4; i < groups.length; i+=5){
        let group = groups.length > i ? groups[i] : false;
        if(group != false){
            let line = document.createElement('span'), 
            button = document.createElement('a'), 
            icon = document.createElement('span');
            line.setAttribute('class', 'cke_toolbar_separator');
            line.setAttribute('role', 'separator');
            group.appendChild(line);
            button.setAttribute('class', 'cke_button cke_button__strike cke_button_off');
            button.setAttribute('href', 'javascript:void(\'新作業標籤\')');
            button.setAttribute('title', '新作業標籤');
            button.setAttribute('tabindex', '-1');
            button.setAttribute('hidefocus', 'true');
            button.setAttribute('role', 'button');
            button.setAttribute('aria-haspopup', 'false');
            function resetFocus(element){
                let parent = group.offsetParent, 
                frame = false;
                try{
                    frame = $('[role="presentation"].cke_contents > iframe', parent)
                }
                catch(e){
                    frame = false;
                }
                if(frame != false){
                    let subWindow = frame.contentWindow;
                    if('getSelection' in subWindow && 'extentNode' in subWindow.getSelection()){
                        let actionElement = subWindow.getSelection().extentNode.parentElement;
                        if(actionElement.tagName == 'A' && actionElement.getAttribute('new') === ''){
                            element.setAttribute('aria-pressed', 'true');
                            button.setAttribute('class', 'cke_button cke_button__strike cke_button_on');
                            
                        }
                        else{
                            element.removeAttribute('aria-pressed');
                            button.setAttribute('class', 'cke_button cke_button__strike cke_button_off');
                        }
                    }
                }
                setTimeout((E = element) => {
                    resetFocus(E);
                }, 30);
            }
            button.addEventListener('click', function(e){
                e.preventDefault();
                e.stopPropagation();
                if(this.getAttribute('aria-pressed') == 'true'){
                    this.removeAttribute('aria-pressed');
                    button.setAttribute('class', 'cke_button cke_button__strike cke_button_off');
                }
                else{
                    this.setAttribute('aria-pressed', 'true');
                    button.setAttribute('class', 'cke_button cke_button__strike cke_button_on');
                }
                let parent = group.offsetParent, 
                frame = false;
                try{
                    frame = $('[role="presentation"].cke_contents > iframe', parent)
                }
                catch(e){
                    frame = false;
                }
                if(frame != false && 'getSelection' in window){
                    let window = frame.contentWindow;
                    if(window.getSelection().extentNode){

                        let document = window.document, 
                        actionElement = window.getSelection().extentNode.parentElement, 
                        endElement = window.getSelection().anchorNode.parentElement;
                        console.log(actionElement)
                        console.log(endElement)
                        function markElement(element, type = 'set'){
                            if(type == 'set'){
                                if(element.tagName == 'A'){
                                    element.setAttribute('new', '');
                                }
                                else{
                                    let a = document.createElement('a');
                                    a.setAttribute('new', '');
                                    a.innerHTML = element.innerHTML;
                                    element.innerHTML = '';
                                    element.appendChild(a);
                                }
                            }
                            else{
                                element.removeAttribute('new');
                            }
                        }
                        let type = 'set';
                        if(actionElement.tagName == 'A' && actionElement.getAttribute('new') === ''){
                            actionElement.removeAttribute('new');
                            type = 'remove';
                        }
                        else{
                            type = 'set';
                        }
                        markElement(actionElement, type)
                        if(endElement != actionElement){
                            markElement(endElement, type)
                        }
                    }
                }
                return(false);
            });
            button.addEventListener('focus', function(){
                this.blur();
            });

            icon.innerHTML = '&nbsp;';
            icon.setAttribute('class', 'cke_button_icon')
            icon.style.backgroundImage = 'url(\'https://maohupi.riarock.com/web/tool/318station/file/markNEW.png\')';
            icon.style.backgroundSize = '100%';
            icon.style.backgroundPosition = 'center';
            button.appendChild(icon);

            group.appendChild(button);
            resetFocus(button);
        }
    }
}
function waitForCreatTool(){
    if($$('span.cke_toolbox > .cke_toolbar > .cke_toolgroup').length/5 == 4){
        setMarkListTool();
    }
    else{
        setTimeout(waitForCreatTool, 100);
    }
}
if('op' in $_GET && $_GET['op'] == 'edit_form'){
    waitForCreatTool();
}

// falling texts
(() => {
    function newText(){
        let text = document.createElement('span');
        text.innerText = document.title[Math.floor(Math.random() * (document.title.length-1) + 0)];
        text.style.position = 'fixed';
        text.style.top = '-10vw';
        text.style.color = 'black';
        text.style.transform = `rotateZ(${Math.random() * 360}deg)`;
        text.style.textShadow = '0px 0px 1vw white';
        text.style.left = `${Math.random() * 100 + 0}vw`;
        text.style.fontStyle = `${Math.random() * 5 + 1}vw`;
        document.body.appendChild(text);
        let num = Math.random() * 10 + 10;
        setTimeout(() => {
        text.style.transition = `${num}s`;
        text.style.top = '200vh';
            setTimeout(() => {
                text.remove();
            }, 1000*num);
        }, 1);
    }
    function a(){
        newText();
        setTimeout(a, 2000);
    }
    a();
})();