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
        this.maskMask.addEventListener('click', this.maskClose);
        this.maskGrid.setAttribute('id', 's1_GDiv');
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
    }
    maskClose(){
        this.maskMask.style.opacity = '0';
        this.maskMask.style.pointerEvents = 'none';
        this.maskGrid.innerHTML = '';
    }
    whileGDI(){
        this.maskGrid.style.fontSize = '2px';
        while(this.maskGrid.offsetWidth < this.maskBox.offsetWidth && this.maskGrid.offsetHeight < this.maskBox.offsetHeight){
            this.maskGrid.style.fontSize = parseInt(this.maskGrid.style.fontSize.replace('px', '')) + 1 + 'px';
        }
        this.maskGrid.style.fontSize = parseInt(this.maskGrid.style.fontSize.replace('px', '')) - 1 + 'px';
    }
    init(){
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
                        this.maskOpen(header.content);
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
    }
}