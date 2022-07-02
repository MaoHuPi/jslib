/* data */
groupList = [ // 和弦組
    "C G Am Em F C Dm G", 
    "C Em F G C Em F G"
]
class random{
    static range(min, max){
       return(Math.floor(min + Math.random()*(max - min)));
    };
    static pick(list){
        return(list[Math.floor(random.range(0, list.length))]);
     };
}
function isNum(input){
    return(parseInt(input) != NaN);
};
function getComposition(name){
    if(typeof(name) == 'string' && name.length > 0){
        var basic = name[0];
        var type = name.toLowerCase().includes('maj') || name.includes('M') || name.includes('Δ') ? 'major' : 
        name.toLowerCase().includes('min') || name.includes('m') || name.includes('M') ? 'minor' : 
        isNum(name) ? 'dominant' : 'major';
        var num = isNum(name) ? parseInt(name) : 0;
        var notes = 'C C# D D# E F F# G G# A A# B'.split(' ');
        var composition = [];
        basicIndex = notes.findIndex(item => item == basic);

        composition.push(basicIndex);
        if(type == 'minor'){
            composition.push((basicIndex + 3) % notes.length);
        }
        else{
            composition.push((basicIndex + 4) % notes.length);
        }
        composition.push((basicIndex + 7) % notes.length);
        if(num >= 7){
            if(type == 'major'){
                composition.push((basicIndex + 11) % notes.length);
            }
            else{
                composition.push((basicIndex + 10) % notes.length);
            }
        }
        if(num >= 9){
            composition.push((basicIndex + 14) % notes.length);
        }
        if(num >= 11){
            composition.push((basicIndex + 17) % notes.length);
        }
        if(num >= 13){
            composition.push((basicIndex + 21) % notes.length);
        }
        composition = composition.map(index => notes[index]);
        return(composition);
    }
    else{
        return([]);
    }
}

/* random */
sheetData = {};
sheetData['group'] = random.pick(groupList);
sheetData['notes'] = sheetData['group'].split(' ').map(chordName => getComposition(chordName));
console.log(sheetData);

/* play */
function randomAndPlay(){
    sp = new sheetPlayer();
    tl = new (sp.timeline)();
    for(let i = 0; i < sheetData['notes'].length; i++){
        for(let j = 0; j < sheetData['notes'][i].length; j++){
            let sd = new(sp.sound)({
                name: sheetData['notes'][i][j], 
                level: 4, 
                length: 1e2*2, 
                type: 'triangle'
            });
            tl.add(1e2*2*(i*4 + j), sd);
            tl.add(1e2*2*(i*4), new(sp.sound)({...sd, length: 1e2*8, type: 'sine'}));
        }
    }
    tl.timePoint = 0;
    tl.play();
}
window.addEventListener('click', randomAndPlay);


// 情感：https://wiwi.video/w/azUYGfQ1QaBQ6DPKMLULMY