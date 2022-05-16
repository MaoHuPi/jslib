/*
 * Copyright © 2022 by MaoHuPi
 * school1.js - v1.0.0
 */
'use strict'
class school1{
    constructor(settings = {}){
        // basic variable
        this.path = 'https://maohupi.riarock.com/web/tool/318station/file';
        this.body = document.body;
        this.$_GET = {};
        if(location.href.indexOf('?') > -1){
            location.href.split('?')[1].split('&').forEach(kv => {
                kv = kv.split('=');
                this.$_GET[kv[0]] = kv[1];
            });
        }
        var sh = location.href.split('/');
        this.page = sh[sh.length-1].split('.')[0];
        this.homeworkMode = 'op' in this.$_GET ? this.$_GET['op'] : 'view';// view | edit_form
        // copy element
        this.copyP = this.createElement('p');
        this.copyA = this.createElement('a');
        this.copyP.style.margin = '0px';
        this.copyP.style.padding = '0px';
        this.copyP.style.width = '0px';
        this.copyP.style.height = '0px';
        this.copyP.style.position = 'fixed';
        this.copyP.style.top = '0px';
        this.copyP.style.left = '0px';
        this.copyP.style.fontSize = '0px';
        this.copyP.style.color = 'transparent';
        this.copyP.style.opacity = '0';
        this.copyP.style.pointerEvents = 'none';
        this.copyP.style.userSelect = 'text';
        this.copyP.style.zIndex = '1';
        this.copyA.style.userSelect = 'text';
        this.copyP.appendChild(this.copyA);
        this.body.appendChild(this.copyP);
        // mask element
        this.maskMask = this.createElement('div');
        this.maskBox = this.createElement('div');
        this.maskGrid = this.createElement('ol');
        this.maskMask.style.backgroundColor = '#00000088';
        this.maskMask.style.position = 'fixed';
        this.maskMask.style.width = '100vw';
        this.maskMask.style.height = '100vh';
        this.maskMask.style.left = '0px';
        this.maskMask.style.top = '0px';
        this.maskMask.style.zIndex = '9999';
        this.maskMask.style.opacity = '0';
        this.maskMask.style.pointerEvents = 'none';
        this.maskMask.style.transition = '0.5s';
        this.maskMask.style.border = 'none';
        this.maskMask.style.boxSizing = 'border-box';
        this.maskMask.style.margin = '0px';
        this.maskBox.style.backgroundColor = '#ffffff';
        this.maskBox.style.position = 'absolute';
        this.maskBox.style.width = '95vw';
        this.maskBox.style.height = 'calc(100vh - 5vw)';
        this.maskBox.style.left = '2.5vw';
        this.maskBox.style.top = '2.5vw';
        this.maskBox.style.zIndex = '10000';
        this.maskBox.style.borderRadius = '1vw';
        this.maskBox.style.border = 'none';
        this.maskBox.style.boxSizing = 'border-box';
        this.maskBox.style.margin = '0px';
        this.maskGrid.style.border = 'none';
        this.maskGrid.style.boxSizing = 'border-box';
        this.maskGrid.style.margin = '0px 0px 0px 1em';
        this.maskMask.addEventListener('click', () => {this.maskClose();});
        this.maskBox.addEventListener('click', (event) => {event.stopPropagation();});
        window.addEventListener('keydown', (event) => {
            if(this.maskMask.opened && event.key == 'Escape'){
                event.preventDefault();
                event.stopPropagation();
                this.maskClose();
            }
        });
        this.maskMask.className = 's1_maskMask';
        this.maskBox.className = 's1_maskBox';
        this.maskGrid.className = 's1_maskGrid';
        this.maskBox.appendChild(this.maskGrid);
        this.maskMask.appendChild(this.maskBox);
        this.body.appendChild(this.maskMask);
        // homework tool
        this.homeworkTool = {
            fullScreen: false, 
            copyContent: false
        };
        if('homeworkTool' in settings){
            for(let key in this.homeworkTool){
                if(key in settings['homeworkTool']){
                    this.homeworkTool[key] = settings['homeworkTool'][key];
                }
            }
        }
        // editor tool
        this.editorTool = {};
        if('editorTool' in settings){
            for(let key in this.editorTool){
                if(key in settings['editorTool']){
                    this.editorTool[key] = settings['editorTool'][key];
                }
            }
        }
        // tool show bool
        this.show = {
            homeworkTool: false, 
            editorTool: false
        };
    }
    // basic function
    $(e, f = document){return(f.querySelector(e));}
    $$(e, f = document){return(f.querySelectorAll(e));}
    vw(){return(window.innerWidth/100);}
    vh(){return(window.innerHeight/100);}
    createElement(...e){return(document.createElement(...e));}
    dictFilter(dict, fun){
        var newDict = {};
        for(let key in dict){
            if(fun(dict[key])){
                newDict[key] = dict[key];
            }
        }
        return(newDict);
    }
    copy(type, text){
        if(type == 'text'){
            this.copyA.innerText = text;
        }
        var selection = window.getSelection(), 
            selectRange = document.createRange();
        selectRange.selectNode(this.copyA);
        selection.removeAllRanges();
        selection.addRange(selectRange);
        document.execCommand('copy');
    }
    maskOpen(text){
        this.maskGrid.innerHTML = text;
        this.whileGDI();
        this.maskMask.style.opacity = '1';
        this.maskMask.style.pointerEvents = 'auto';
        this.maskMask.opened = true;
    }
    maskClose(){
        this.maskMask.style.opacity = '0';
        this.maskMask.style.pointerEvents = 'none';
        this.maskGrid.innerHTML = '';
        this.maskMask.opened = false;
    }
    whileGDI(){
        this.maskGrid.style.fontSize = '2px';
        while(this.maskGrid.offsetWidth < this.maskBox.offsetWidth && this.maskGrid.offsetHeight < this.maskBox.offsetHeight){
            this.maskGrid.style.fontSize = parseInt(this.maskGrid.style.fontSize.replace('px', '')) + 1 + 'px';
        }
        this.maskGrid.style.fontSize = parseInt(this.maskGrid.style.fontSize.replace('px', '')) - 1 + 'px';
    }
    isZoom(w = 0, h = 0){
        if(w !== 100*this.vw() || h !== 100*this.vh()){
            w = 100*this.vw();
            h = 100*this.vh();
            if(this.maskGrid.innerHTML !== ''){
                this.whileGDI();
            }
        }
        setTimeout((a = w, b = h) => {
            this.isZoom(a, b);
        }, 30);
    }
    addNewHomeworkMarkTool(){
        let groups = this.$$('span.cke_toolbox > .cke_toolbar > .cke_toolgroup');
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
                        frame = this.$('[role="presentation"].cke_contents > iframe', parent)
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
                        frame = this.$('[role="presentation"].cke_contents > iframe', parent)
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
    waitForCreatEditTool(functions){
        if(this.$$('span.cke_toolbox > .cke_toolbar > .cke_toolgroup').length/5 == 4){
            for(let index in functions){
                console.log(this); // what the fuck?
                functions[index].bind(this)();
            }
        }
        else{
            setTimeout(this.waitForCreatEditTool, 100, functions);
        }
    }
    init(){
        this.isZoom();
        if(this.page == 'homework'){
            this.show['homeworkTool'] = this.homeworkMode == 'view' ? (Object.keys(this.dictFilter(this.homeworkTool, key => key)).length > 0) : false;
            this.show['editorTool'] = this.homeworkMode == 'edit_form' ? (Object.keys(this.dictFilter(this.editorTool, key => key)).length > 0) : false;
        }
        if(this.show['homeworkTool']){
            let blockHeaders = this.$$('.breadcrumb ~ div .row > div > div:nth-child(1)');
            blockHeaders.forEach(header => {
                header.style.position = 'relative';
                header.content = header.parentElement.innerText;
                // toolBar
                let toolBar = this.createElement('div');
                toolBar.className = 's1_toolBar';
                toolBar.style.height = '100%';
                toolBar.style.position = 'absolute';
                toolBar.style.top = '0px';
                toolBar.style.right = '0px';
                toolBar.style.display = 'flex';
                toolBar.style.flexDirection = 'row-reverse';
                toolBar.style.alignContent = 'center';
                toolBar.style.justifyContent = 'flex-start';
                toolBar.style.flexWrap = 'nowrap';
                toolBar.style.alignItems = 'center';
                toolBar.style.boxSizing = 'content-box';
                toolBar.innerButtonStyle = (button) => {
                    button.style.outline = 'none';
                    button.style.margin = '10.6px 10.6px 10.6px 0px';
                    button.style.padding = '0px';
                    button.style.width = '31.8px';
                    button.style.height = '31.8px';
                    button.style.borderRadius = '50%';
                    button.style.backgroundSize = '100%';
                    button.style.backgroundColor = 'white';
                    button.style.backgroundRepeat = 'no-repeat';
                    button.style.backgroundPosition = 'center';
                }
                if(this.homeworkTool['fullScreen']){
                    let button = this.createElement('button');
                    toolBar.innerButtonStyle(button);
                    button.style.backgroundImage = `url(${this.path}/fullscreen.svg)`;
                    button.style.backgroundSize = '100%';
                    button.onclick = () => {
                        this.maskOpen('<li>' + header.content.split('\n').join('</li><li>') + '</li>');
                    }
                    toolBar.appendChild(button);
                }
                if(this.homeworkTool['copyContent']){
                    let button = this.createElement('button');
                    toolBar.innerButtonStyle(button);
                    button.style.backgroundImage = `url(${this.path}/content_copy.svg)`;
                    button.style.backgroundSize = '75%';
                    button.onclick = () => {
                        this.copy('text', header.content.split('\n').map((k, i) => `${i+1}. ${k}`).join('\n'));
                    };
                    toolBar.appendChild(button);
                }
                header.appendChild(toolBar);
            });
        }
        if(this.show['editorTool']){
            let functions = [];
            if(this.homeworkTool['newhomeworkmark']){
                functions.push(this.addNewHomeworkMarkTool);
            }
            this.waitForCreatEditTool(functions);
        }
    }
}