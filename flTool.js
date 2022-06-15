function bpm2value(bpmNum){
    return((bpmNum-60)/(180-60));
}
function value2bpm(valueNum){
    return(valueNum * (180-60)  + 60);
}
// 133: 0.608333349227905
// 88: 0.23333333333

videoElement = document.querySelectorAll('video')[0];
for(let key in videoElement){
    if(key.toLowerCase().indexOf('requestfullscreen') > -1){
        videoElement[key]();
    }
}