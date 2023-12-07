function clear(){
    if(document.getElementById("lines").textContent.length > 0){
        document.getElementById("lines").textContent = document.getElementById("lines").textContent.slice(0,document.getElementById("lines").textContent.length-1);
        setTimeout(()=>{
            clear();
        }, 50);
        // break
    }
    else{
        done("clear");
    }
}
function inputText(text){
    if(document.getElementById("lines").textContent.length < text.length){
        let len = document.getElementById("lines").textContent.length;
        if(text.slice(len, len+1) == "\xa0"){
            document.getElementById("lines").textContent += " ";
        }
        else{
            document.getElementById("lines").textContent += text.slice(len, len+1);
        }
        
        
        setTimeout(()=>{
            inputText(text);
        }, 50);
        // break
    }
    else{
        setTimeout(()=>{
            done("input");
        }, 1500)
        
    }
}

function done(what){
    if(what == "clear"){
        inputText(lines[Math.floor(Math.random()*lines.length)])
    }
    else{
        clear();
    }
}

let lines = [`Scalable\xa0architectures\xa0support\xa0growing\xa0data\xa0needs\xa0seamlessly.`,
    'Redundancy\xa0and\xa0replication\xa0ensure\xa0fault\xa0tolerance\xa0and\xa0data\xa0availability.',
    'Efficient\xa0load\xa0balancing\xa0optimizes\xa0resource\xa0utilization\xa0in\xa0storage\xa0systems.',
    'Data\xa0redundancy\xa0strategies,\xa0like\xa0mirroring,\xa0enhance\xa0overall\xa0reliability.',
    'Consistency\xa0protocols\xa0maintain\xa0uniform\xa0data\xa0views\xa0across\xa0distributed\xa0nodes.',
    'Robust\xa0security\xa0features,\xa0including\xa0encryption,\xa0protect\xa0against\xa0unauthorized\xa0access.',
    'Geographic\xa0distribution\xa0support\xa0reduces\xa0latency\xa0for\xa0stored\xa0and\xa0accessed\xa0data.',
    'Interoperability\xa0ensures\xa0compatibility\xa0with\xa0diverse\xa0platforms\xa0and\xa0operating\xa0systems.',
    'Scalable\xa0performance\xa0adapts\xa0to\xa0increasing\xa0demands\xa0for\xa0efficient\xa0data\xa0management.',
    'Automated\xa0management\xa0features,\xa0such\xa0as\xa0data\xa0tiering,\xa0optimize\xa0system\xa0performance.']

inputText(lines[0])