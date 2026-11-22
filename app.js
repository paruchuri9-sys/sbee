// BeeBloom v1 interactive application
// This file is loaded externally so static hosts and preview environments can initialize it.

"use strict";
const demo=[
{word:"whistle",definition:"A device that makes a high sound when air passes through it.",sentence:"The coach blew a whistle."},
{word:"rabbit",definition:"A small animal with long ears.",sentence:"A rabbit hopped through the garden."},
{word:"sparkle",definition:"To shine with small flashes of light.",sentence:"The stars sparkle at night."},
{word:"library",definition:"A place where people can read and borrow books.",sentence:"She checked out a book from the library."},
{word:"cottage",definition:"A small house.",sentence:"They stayed in a cottage by the lake."},
{word:"cautious",definition:"Careful to avoid danger or mistakes.",sentence:"Be cautious when crossing the road."},
{word:"geology",definition:"The study of Earth and rocks.",sentence:"Geology helps us learn how mountains form."},
{word:"persevere",definition:"To keep trying despite difficulty.",sentence:"We persevere when learning is hard."}
];
const unseen=[
{word:"photograph",definition:"A picture made with a camera.",sentence:"We took a photograph of the bee."},
{word:"knee",definition:"The joint in the middle of the leg.",sentence:"She bent her knee."},
{word:"careless",definition:"Not careful.",sentence:"A careless mistake is easy to fix."},
{word:"hopping",definition:"Moving by short jumps.",sentence:"The frog was hopping."},
{word:"reusable",definition:"Able to be used again.",sentence:"She carried a reusable water bottle."},
{word:"telephone",definition:"A device for talking to people far away.",sentence:"The telephone rang."},
{word:"musician",definition:"A person who makes music.",sentence:"The musician played a song."},
{word:"unhappy",definition:"Not happy.",sentence:"He felt unhappy about the rainy day."}
];
const patterns=[
["🔡","Silent letters","kn, wr","Some initial letters are written but not pronounced.","knee, knit, write","Not all silent letters follow one single rule."],
["🌈","Vowel teams","ai, ay, ea, ee","Two vowel letters sometimes work together to represent one sound.","rain, play, team, sheep","A team can have different sounds, as in bread and break."],
["🪄","Magic e","final silent e","Final e often changes a preceding vowel sound.","cap/cape, kit/kite","This is a useful clue, not a universal rule."],
["🧱","Doubling","-ing, -ed","Often double the final consonant in a short stressed vowel-consonant word before adding a vowel suffix.","hop/hopping, plan/planned","Do not always double; compare open/opening."],
["🌿","Prefixes","un-, re-, pre-","A prefix adds meaning to the start of a word.","unhappy, replay, preview","Check how the word parts join and whether spelling changes."],
["🌸","Suffixes","-tion, -sion","Many nouns end with -tion or -sion; pronunciation alone may not determine which.","action, musician, decision","Word families and roots can be more reliable than sound alone."]
];
const KEY="beebloom_v1_data";
let store;
try{store=JSON.parse(localStorage.getItem(KEY)||"{}")}catch{store={}}
store.words=Array.isArray(store.words)?store.words:[];
store.attempts=Array.isArray(store.attempts)?store.attempts:[];
store.time=store.time&&typeof store.time==="object"?store.time:{};
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(store))}catch(e){alert("Unable to save. Export progress to protect your work.")}};
const $=x=>document.getElementById(x);
const today=()=>new Date().toLocaleDateString("en-CA");
$("date").textContent=new Date().toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"});
function go(page){document.querySelectorAll(".page").forEach(x=>x.classList.toggle("active",x.id===page));document.querySelectorAll(".nav").forEach(x=>x.classList.toggle("active",x.dataset.page===page));if(page==="progress"||page==="home")render();if(page==="library")renderLibrary();window.scrollTo(0,0)}
document.querySelectorAll("[data-page]").forEach(b=>b.onclick=()=>go(b.dataset.page));
document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>go(b.dataset.go));
function speak(text){if(!("speechSynthesis" in window)){ $("voiceNote").textContent="Audio unavailable. Try Chrome or Edge, or type with a parent.";return}try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="en-US";u.rate=.83;speechSynthesis.speak(u)}catch(e){$("voiceNote").textContent="Audio could not start. Tap Hear word again or check browser sound permissions."}}
function norm(s){return s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z]/g,"")}
function letterNorm(s){let t=s.toLowerCase().trim().replace(/^(i spell|spelling|my spelling is|the word is)\s+/,"");const names={ay:"a",bee:"b",be:"b",cee:"c",see:"c",dee:"d",ee:"e",eff:"f",gee:"g",aitch:"h",eye:"i",jay:"j",kay:"k",ell:"l",em:"m",en:"n",oh:"o",pee:"p",cue:"q",queue:"q",are:"r",ess:"s",tee:"t",you:"u",vee:"v",doubleyou:"w",ex:"x",why:"y",zee:"z",zed:"z"};const tokens=t.replace(/[-.,]/g," ").split(/\s+/).filter(Boolean);return tokens.length>1?tokens.map(x=>names[x]||x).join("").replace(/[^a-z]/g,""):norm(t)}
let round=[],idx=0,current=null,scored=false,session=false,active=0,lastActivity=Date.now();
function touch(){lastActivity=Date.now()}
["click","keydown","pointerdown","touchstart"].forEach(e=>document.addEventListener(e,touch,{passive:true}));
document.addEventListener("visibilitychange",()=>{if(document.hidden)lastActivity=0;else touch()});
setInterval(()=>{if(session&&!document.hidden&&Date.now()-lastActivity<60000){active++;const d=today();store.time[d]=(store.time[d]||0)+1;if(active%10===0)save()}const v=Math.floor(active/60);$("timer").textContent="⏱ "+String(v).padStart(2,"0")+":"+String(active%60).padStart(2,"0")+" active"},1000);
function pool(){const set=$("set").value;if(set==="listed")return store.words;if(set==="unseen")return unseen.map(x=>({...x,source:"unseen"}));if(set==="review"){const misses=new Set(store.attempts.filter(x=>!x.correct).map(x=>x.word));return [...store.words,...demo,...unseen].filter(x=>misses.has(x.word))}return [...(store.words.length?store.words:demo),...unseen.map(x=>({...x,source:"unseen"}))]}
function newRound(){let p=pool();if(!p.length){alert("No words in this set yet. Import a list or choose Mixed garden.");return}round=p.sort(()=>Math.random()-.5).slice(0,+$("roundSize").value);idx=0;session=true;active=0;touch();nextWord()}
function nextWord(){scored=false;current=round[idx]||null;$("feedback").classList.add("hidden");$("next").classList.add("hidden");$("letters").value="";$("counter").textContent="Word "+(current?idx+1:round.length)+" of "+round.length;if(!current){session=false;$("prompt").textContent="Amazing work! 🌟";$("promptInfo").textContent="Round complete. Start another round to grow stronger.";save();render();return}$("prompt").textContent="Listen carefully 🐝";$("promptInfo").textContent="Ask for the definition or sentence before spelling.";$("letters").focus();speak("Your word is "+current.word)}
$("newRound").onclick=newRound;$("hear").onclick=()=>{if(!current){newRound();return} speak("Your word is "+current.word)};
$("definition").onclick=()=>{if(current)speak(current.definition||"No definition provided. Ask a parent for help.")};
$("sentence").onclick=()=>{if(current)speak(current.sentence||"No example sentence provided for this word.")};
$("skip").onclick=()=>{if(current){if(!scored)record(false,true);idx++;nextWord()}};
$("next").onclick=()=>{idx++;nextWord()};
function record(correct,skipped=false){store.attempts.push({word:current.word,correct,skipped,source:current.source||"listed",date:new Date().toISOString(),letters:$("letters").value,seconds:active});save()}
$("check").onclick=()=>{if(!current||scored)return;const entered=letterNorm($("letters").value);if(!entered){alert("Spell the word aloud or enter letters before checking.");return}const answers=[current.word,...(current.alternates||[])].map(norm);const good=answers.includes(entered);scored=true;record(good);const f=$("feedback");f.className="feedback"+(good?"":" bad");f.textContent=(good?"🌟 Correct! ":"🌱 Nice try! ")+"The word is "+current.word+". "+(good?"":"Try remembering its pattern next time. ");$("next").classList.remove("hidden");speak(good?"Wonderful spelling!":"Good effort. The word was "+current.word);render()};
$("letters").addEventListener("keydown",e=>{if(e.key==="Enter")$("check").click()});
const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
$("mic").onclick=()=>{if(!current)return;if(!Recognition){$("voiceNote").textContent="Speech recognition unavailable. Please type letters instead.";return}const r=new Recognition();r.lang="en-US";r.interimResults=false;r.maxAlternatives=1;$("mic").classList.add("listening");$("voiceNote").textContent="Listening… say each letter clearly.";r.onresult=e=>{const phrase=e.results[0][0].transcript.trim();$("mic").classList.remove("listening");if(/^(definition|what does it mean|meaning)$/i.test(phrase))$("definition").click();else if(/^(sentence|use it in a sentence)$/i.test(phrase))$("sentence").click();else if(/^(repeat|repeat the word|say it again)$/i.test(phrase))$("hear").click();else{$("letters").value=letterNorm(phrase).toUpperCase().split("").join(" ");$("voiceNote").textContent='Heard: "'+phrase+'". Verify the letters before checking.'}};r.onerror=()=>{$("mic").classList.remove("listening");$("voiceNote").textContent="Microphone unavailable. Type the letters instead."};r.onend=()=>$("mic").classList.remove("listening");try{r.start()}catch{$("voiceNote").textContent="Cannot start microphone. Try Chrome or Edge."}};
$("patternsGrid").innerHTML=patterns.map((p,i)=>'<button class="pattern" data-lesson="'+i+'"><span>'+p[0]+'</span><b>'+p[1]+'</b><small>'+p[2]+'</small></button>').join("");
document.querySelectorAll("[data-lesson]").forEach(b=>b.onclick=()=>{const p=patterns[+b.dataset.lesson];$("lesson").innerHTML="<h2>"+p[0]+" "+p[1]+"</h2><p><b>Clue:</b> "+p[3]+"</p><p><b>Examples:</b> "+p[4]+"</p><p><b>Be careful:</b> "+p[5]+"</p><button class='primary' id='lessonSpeak'>🔊 Hear explanation</button>";$("lessonSpeak").onclick=()=>speak(p[3]+" Examples: "+p[4]+". "+p[5])});
function render(){const a=store.attempts,correct=a.filter(x=>x.correct).length;const secs=Object.values(store.time).reduce((p,c)=>p+(Number(c)||0),0);$("homeWords").textContent=store.words.length||demo.length;$("homeMinutes").textContent=Math.floor((store.time[today()]||0)/60)+" min";$("homeAccuracy").textContent=a.length?Math.round(100*correct/a.length)+"%":"0%";$("activeTotal").textContent=Math.floor(secs/60)+" min";$("attemptTotal").textContent=a.length;const un=a.filter(x=>x.source==="unseen");$("unseenRate").textContent=un.length?Math.round(100*un.filter(x=>x.correct).length/un.length)+"%":"0%";const days=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-6+i);return {key:d.toLocaleDateString("en-CA"),label:d.toLocaleDateString("en-US",{weekday:"short"})}});const max=Math.max(1,...days.map(x=>store.time[x.key]||0));$("bars").innerHTML=days.map(x=>'<div class="bar-wrap"><div class="bar" style="height:'+Math.max(3,120*(store.time[x.key]||0)/max)+'px"></div>'+x.label+'<br>'+Math.floor((store.time[x.key]||0)/60)+'m</div>').join("");$("history").textContent="";a.slice(-15).reverse().forEach(x=>{let d=document.createElement("div");d.className="row";const left=document.createElement("span");left.textContent=x.word+" · "+(x.source||"listed");const right=document.createElement("b");right.textContent=x.skipped?"Skipped":x.correct?"✓ Correct":"✕ Missed";d.append(left,right);$("history").append(d)});if(!a.length)$("history").textContent="No attempts yet. Let's practice!"}
function csvRows(text){let out=[],row=[],field="",quote=false;for(let i=0;i<text.length;i++){let ch=text[i];if(ch==='"'){if(quote&&text[i+1]==='"'){field+='"';i++}else quote=!quote}else if(ch===","&&!quote){row.push(field);field=""}else if((ch==="\n"||ch==="\r")&&!quote){if(ch==="\r"&&text[i+1]==="\n")i++;row.push(field);if(row.some(x=>x.trim()))out.push(row);row=[];field=""}else field+=ch}row.push(field);if(row.some(x=>x.trim()))out.push(row);return out}
$("import").onchange=async e=>{const file=e.target.files[0];if(!file)return;const text=await file.text();let words;if(file.name.toLowerCase().endsWith(".csv")){let rows=csvRows(text),headers=rows[0].map(x=>x.trim().toLowerCase());const hasHeader=headers.includes("word");const ix=hasHeader?headers.indexOf("word"):0,di=hasHeader?headers.indexOf("definition"):1,si=hasHeader?headers.indexOf("sentence"):2;words=rows.slice(hasHeader?1:0).map(r=>({word:(r[ix]||"").trim(),definition:di>=0?(r[di]||"").trim():"",sentence:si>=0?(r[si]||"").trim():""}))}else{words=text.split(/\r?\n/).map(x=>({word:x.trim(),definition:"",sentence:""}))}words=words.filter(x=>x.word&&/^[\p{L}\p{M}\s'-]+$/u.test(x.word));if(!words.length){$("importNote").textContent="No valid words found. Check the file format.";return}store.words=words.map(x=>({...x,source:"listed"}));save();$("importNote").textContent=words.length+" words loaded privately. Verify the preview.";renderLibrary();render()};
function renderLibrary(){const words=store.words;const search=$("search").value.toLowerCase();$("wordCount").textContent="("+words.length+")";$("preview").textContent="";words.filter(x=>x.word.toLowerCase().includes(search)).slice(0,60).forEach(x=>{let d=document.createElement("div");d.className="row";const name=document.createElement("b");name.textContent=x.word;const detail=document.createElement("span");detail.textContent=x.definition||"Definition not provided";detail.className="muted";d.append(name,detail);$("preview").append(d)});if(!words.length)$("preview").textContent="No personal words imported."}
$("search").oninput=renderLibrary;
$("export").onclick=()=>{save();const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(store,null,2)],{type:"application/json"}));a.download="beebloom-private-progress.json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};
$("restore").onchange=async e=>{try{const obj=JSON.parse(await e.target.files[0].text());if(!Array.isArray(obj.words)||!Array.isArray(obj.attempts)||typeof obj.time!=="object")throw Error("Invalid backup");if(!confirm("Replace current local progress with this backup?"))return;store=obj;save();render();renderLibrary()}catch{alert("Invalid backup file.")}};
render();renderLibrary();

const bootStatus=document.getElementById("bootStatus");if(bootStatus){bootStatus.textContent="✓ Coach ready";bootStatus.style.color="#327a65"}
