// BeeBloom v1 interactive application
// This file is loaded externally so static hosts and preview environments can initialize it.

"use strict";
const demo=[
{word:"metamorphosis",definition:"A major change in form or appearance.",sentence:"The butterfly undergoes metamorphosis."},
{word:"perseverance",definition:"Continuing despite difficulty.",sentence:"Her perseverance helped her finish the challenge."},
{word:"conscientious",definition:"Careful and responsible about doing things well.",sentence:"The conscientious student checked her work."},
{word:"miscellaneous",definition:"Containing several different kinds of things.",sentence:"The drawer held miscellaneous supplies."},
{word:"acquaintance",definition:"A person you know but not very closely.",sentence:"I met an acquaintance at the library."},
{word:"rhythm",definition:"A repeated pattern of sounds or movements.",sentence:"The drummer kept a steady rhythm."},
{word:"entrepreneur",definition:"A person who starts and runs a business.",sentence:"The entrepreneur opened a bakery."},
{word:"extraordinary",definition:"Very unusual or remarkable.",sentence:"The scientist made an extraordinary discovery."},
{word:"bureaucracy",definition:"A system managed by many administrative officials.",sentence:"The permit went through the city bureaucracy."},
{word:"onomatopoeia",definition:"A word that imitates a sound.",sentence:"Buzz is an example of onomatopoeia."}
];
const unseen=[
{word:"chrysanthemum",definition:"A flowering plant with many petals.",sentence:"A chrysanthemum bloomed in the garden."},
{word:"idiosyncrasy",definition:"An unusual habit or characteristic of someone.",sentence:"Her cheerful humming was an idiosyncrasy."},
{word:"juxtaposition",definition:"Placing things beside each other for comparison.",sentence:"The painting showed a juxtaposition of light and dark."},
{word:"photosynthesis",definition:"How plants use sunlight to make food.",sentence:"Leaves carry out photosynthesis."},
{word:"equilibrium",definition:"A state of balance.",sentence:"The gymnast regained her equilibrium."},
{word:"iridescent",definition:"Showing colors that seem to change with the viewing angle.",sentence:"The shell had an iridescent surface."},
{word:"inconspicuous",definition:"Not easily noticed.",sentence:"The small insect remained inconspicuous."},
{word:"philanthropy",definition:"Efforts to help others, often by donating money or time.",sentence:"Their philanthropy supported the school."}
];
const patterns=[
["🏛️","Greek-derived spelling","ph, ch, y, ps","Greek-derived words can preserve combinations such as ph for /f/, ch for /k/, and y in places where the sound alone does not reveal spelling.","photograph, chrysanthemum, photosynthesis","Origin clues narrow possibilities but do not determine an exact spelling."],
["🏺","Latin roots and word families","position, con-, trans-","Recognize a meaningful base or related word before spelling a long word. Position appears within juxtaposition.","position → juxtaposition; conscious → conscientious","Not every apparent letter group is an independently useful root; verify the family."],
["🧩","Advanced suffixes","-tion, -sion, -cious","The shun sound may be written -tion or -sion. The shus sound can be -cious or -tious. Compare related words.","position → juxtaposition; conscience → conscientious","Pronunciation alone usually cannot tell you which ending is correct."],
["🌍","Language-of-origin clues","French, Latin, Greek","A word's history can explain unusual spelling. French-influenced English vocabulary often keeps spellings that don't follow simple sound rules.","bureaucracy, entrepreneur, acquaintance","Do not infer the origin from sound alone; ask for an authoritative etymology in real contests."],
["🥁","Unusual consonant clusters","rh, mn, sc, gn","Some words preserve historical consonant combinations that are difficult to hear. Learn the sequence visually and through related words.","rhythm, mnemonic, conscientious","Clusters vary by word and origin; this is a noticing strategy, not a universal rule."],
["🪜","Chunking long words","syllables + meaningful parts","Break difficult words into pronounceable chunks, then verify each chunk against the whole spelling.","met-a-mor-pho-sis; mis-cel-la-ne-ous; juxta-position","Chunking helps memory but does not guarantee that sounds reveal every letter."],
["🌱","Prefixes and suffixes","in-, extra-, -ous, -ance","Meaningful word parts help you retain spelling across word families.","ordinary → extraordinary; persevere → perseverance; conspicuous → inconspicuous","Adding affixes can change letters and stress; confirm the final form."],
["🔬","Word origin versus sound","silent and unexpected letters","When the spoken word has more than one plausible spelling, look for morphology and origin instead of guessing each letter from sound.","acquaintance, idiosyncrasy, onomatopoeia","Some spellings must be learned individually; origin is supporting evidence, not a perfect rule."],
["🔡","Foundation: silent letters","kn, wr","Some initial letters are written but not pronounced.","knee, knit, write","Not all silent letters follow the same rule."],
["🌈","Foundation: vowel teams","ai, ay, ea, ee","Two vowel letters sometimes represent one sound.","rain, play, team, sheep","Vowel teams vary, as in bread and break."],
["🪄","Foundation: silent e","final e","Final e often changes a preceding vowel sound.","cap/cape, kit/kite","Useful clue, not a universal rule."],
["🧱","Foundation: doubling","-ing, -ed","A short stressed vowel-consonant base often doubles its final consonant before a vowel suffix.","hop/hopping, plan/planned","Compare open/opening and other exceptions."]
];
const wordTeaching={
chrysanthemum:["Greek-derived spelling","Break the word into remembered chunks; the opening chrys- is easy to miss."],
idiosyncrasy:["Word origin versus sound","The unusual sequence requires direct study; recognizing idio- and syn- may help."],
juxtaposition:["Latin roots and word families","The familiar word position is preserved at the end."],
photosynthesis:["Greek-derived spelling","Notice ph for the /f/ sound in photo-."],
equilibrium:["Chunking long words","Practice the middle -libri- carefully; several vowels are hard to predict."],
iridescent:["Advanced suffixes","Notice the -escent ending and compare related words."],
inconspicuous:["Prefixes and suffixes","Find in- + conspicuous. The base spelling remains recognizable."],
philanthropy:["Greek-derived spelling","The ph in phil- and -throp- are useful clues."],
metamorphosis:["Greek-derived spelling","The ph in morph is a useful Greek-derived spelling clue."],
perseverance:["Prefixes and suffixes","Connect persevere to perseverance, observing the changed ending."],
conscientious:["Advanced suffixes","Connect conscience and conscientious, and study -tious."],
miscellaneous:["Chunking long words","Chunk the word and pay attention to the double l."],
acquaintance:["Language-of-origin clues","The ac-quaint- sequence is easy to miss; learn the exact letter order."],
rhythm:["Unusual consonant clusters","Remember initial rh and the unusual use of y."],
entrepreneur:["Language-of-origin clues","A French-derived word whose vowel sequence needs careful study."],
extraordinary:["Prefixes and suffixes","Find extra- + ordinary."],
bureaucracy:["Language-of-origin clues","French-influenced bureau has an unusual vowel sequence."],
onomatopoeia:["Word origin versus sound","Practice the exact Greek-derived vowel sequence in -poeia."]
};
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

const VOICE_KEY="beebloom_voice_preferences_v1";
let voicePreference={name:"",rate:0.83};
try{voicePreference={...voicePreference,...JSON.parse(localStorage.getItem(VOICE_KEY)||"{}")}}catch{}
let availableVoices=[];
let allUSVoices=[];
function loadVoices(){
 const status=$("voiceStatus");
 const selector=$("voiceSelect");
 if(!status||!selector)return;
 selector.disabled=false;
 status.textContent="Checking voices on this device…";
 if(!window.speechSynthesis||typeof window.speechSynthesis.getVoices!=="function"){
  status.textContent="Voice list unavailable on this browser. Device default voice may still work.";
  return;
 }
 try{
  const voices=window.speechSynthesis.getVoices()||[];
  // Only explicitly US English voices; never silently substitute UK/AU accents.
  const us=v=>/^en[-_]US$/i.test(v.lang||"");
  // iOS mixes novelty/effect voices with ordinary speech. Exclude effects for
  // spelling practice; this is a conservative name-based filter.
  const novelty=/^(albert|bad news|bahh|bells|boing|bubbles|cellos|fred|good news|hysterical|jester|junior|kathy|organ|pipe organ|princess|superstar|trinoids|whisper|zarvox|wobble|rocko|sandy|grandma|grandpa)$/i;
  const ordinary=v=>!novelty.test((v.name||"").trim());
  const rank=v=>{
   const n=v.name||"";
   if(/siri/i.test(n))return 0;
   if(/premium|enhanced|natural|neural/i.test(n))return 1;
   if(/^(samantha|ava|allison|joelle|nicky|susan|tom|alex|daniel)(\b|$)/i.test(n))return 2;
   return 3;
  };
  allUSVoices=voices.filter(v=>v&&us(v)).sort((a,b)=>rank(a)-rank(b)||(a.name||"").localeCompare(b.name||""));
  const showAll=!!$("showAllVoices")?.checked;
  availableVoices=showAll?allUSVoices:allUSVoices.filter(ordinary);
  while(selector.firstChild)selector.removeChild(selector.firstChild);
  const automatic=document.createElement("option");
  automatic.value="";
  automatic.textContent="🐝 Recommended U.S. voice";
  selector.appendChild(automatic);
  for(const voice of availableVoices){
   const option=document.createElement("option");
   option.value=voice.voiceURI;
   option.textContent=voice.name+" ("+voice.lang+")";
   selector.appendChild(option);
  }
  selector.value=availableVoices.some(v=>v.voiceURI===voicePreference.name)?voicePreference.name:"";
  const hidden=allUSVoices.length-availableVoices.length;
  status.textContent=availableVoices.length
   ?availableVoices.length+" U.S. voices shown"+(hidden?" ("+hidden+" novelty/effect voices hidden).":"") + " Preview to choose the clearest."
   :"No U.S. English voices exposed by Safari. Try device voice settings or the automatic voice.";
 }catch(error){
  status.textContent="Voice list unavailable on this iPad. Default voice and Preview voice may still work.";
 }
}
function saveVoice(){try{localStorage.setItem(VOICE_KEY,JSON.stringify(voicePreference))}catch{}}
function speak(text){
 if(!("speechSynthesis" in window)){$("voiceNote").textContent="Audio unavailable. Try Chrome or Edge.";return}
 try{
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  const voice=availableVoices.find(v=>v.voiceURI===voicePreference.name)||availableVoices.find(v=>/^samantha$/i.test(v.name||""))||availableVoices[0];
  if(voice){u.voice=voice;u.lang="en-US"}else u.lang="en-US";
  u.rate=Number(voicePreference.rate)||0.83;
  speechSynthesis.speak(u);
 }catch(e){$("voiceNote").textContent="Audio could not start. Check sound settings or select a different voice."}
}
$("voiceSelect").onchange=e=>{voicePreference.name=e.target.value;saveVoice()};
$("showAllVoices").onchange=loadVoices;
$("voiceSpeed").value=String(voicePreference.rate);
$("voiceSpeed").onchange=e=>{voicePreference.rate=Number(e.target.value);saveVoice()};
$("previewVoice").onclick=()=>speak("Hello, spelling star! I am your spelling bee coach. Your word is butterfly.");
loadVoices();
if(window.speechSynthesis){
 try{
  if(typeof window.speechSynthesis.addEventListener==="function")window.speechSynthesis.addEventListener("voiceschanged",loadVoices);
  else window.speechSynthesis.onvoiceschanged=loadVoices;
 }catch(error){}
}
setTimeout(loadVoices,800);
setTimeout(()=>{const status=$("voiceStatus");if(status&&/^(Loading|Checking)/.test(status.textContent))status.textContent="Voice selection unavailable. The device default may still work.";},2500);

function norm(s){return s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z]/g,"")}
function letterNorm(s){let t=s.toLowerCase().trim().replace(/^(i spell|spelling|my spelling is|the word is)\s+/,"");const names={ay:"a",bee:"b",be:"b",cee:"c",see:"c",dee:"d",ee:"e",eff:"f",gee:"g",aitch:"h",eye:"i",jay:"j",kay:"k",ell:"l",em:"m",en:"n",oh:"o",pee:"p",cue:"q",queue:"q",are:"r",ess:"s",tee:"t",you:"u",vee:"v",doubleyou:"w",ex:"x",why:"y",zee:"z",zed:"z"};const tokens=t.replace(/[-.,]/g," ").split(/\s+/).filter(Boolean);return tokens.length>1?tokens.map(x=>names[x]||x).join("").replace(/[^a-z]/g,""):norm(t)}

function parseOralSpelling(transcript,targetWord){
 // A repeated word is context, never evidence of correctly spoken letters.
 const target=targetWord.toLowerCase().trim();
 let phrase=transcript.toLowerCase().trim().replace(/^(i spell|spelling|my spelling is|the word is)\s+/,"");
 const cleanup=t=>t.replace(/[,.!?;:—–-]+/g," ").replace(/\s+/g," ").trim();
 phrase=cleanup(phrase);
 const saidWord=phrase===target||phrase.startsWith(target+" ");
 if(phrase===target)return {kind:"word-only",letters:""};
 if(phrase.startsWith(target+" "))phrase=phrase.slice(target.length).trim();
 if(phrase.endsWith(" "+target))phrase=phrase.slice(0,-target.length).trim();
 const names={a:"a",ay:"a",b:"b",bee:"b",be:"b",c:"c",cee:"c",see:"c",sea:"c",d:"d",dee:"d",e:"e",ee:"e",f:"f",eff:"f",g:"g",gee:"g",h:"h",aitch:"h",i:"i",eye:"i",j:"j",jay:"j",k:"k",kay:"k",l:"l",ell:"l",m:"m",em:"m",n:"n",en:"n",o:"o",oh:"o",p:"p",pee:"p",q:"q",cue:"q",queue:"q",r:"r",are:"r",s:"s",ess:"s",t:"t",tee:"t",tea:"t",u:"u",you:"u",v:"v",vee:"v",w:"w",doubleyou:"w",x:"x",ex:"x",y:"y",why:"y",z:"z",zee:"z",zed:"z"};
 const tokens=phrase.split(" ").filter(Boolean);
 if(tokens.length>=2&&tokens.every(t=>Object.prototype.hasOwnProperty.call(names,t)))
   return {kind:"letters",letters:tokens.map(t=>names[t]).join("").toUpperCase()};
 if(saidWord&&!phrase)return {kind:"word-only",letters:""};
 return {kind:"unclear",letters:""};
}

let round=[],idx=0,current=null,scored=false,session=false,active=0,lastActivity=Date.now();
function touch(){lastActivity=Date.now()}
["click","keydown","pointerdown","touchstart"].forEach(e=>document.addEventListener(e,touch,{passive:true}));
document.addEventListener("visibilitychange",()=>{if(document.hidden)lastActivity=0;else touch()});
setInterval(()=>{if(session&&!document.hidden&&Date.now()-lastActivity<60000){active++;const d=today();store.time[d]=(store.time[d]||0)+1;if(active%10===0)save()}const v=Math.floor(active/60);$("timer").textContent="⏱ "+String(v).padStart(2,"0")+":"+String(active%60).padStart(2,"0")+" active"},1000);
// The official 450-word school list is arranged in increasing challenge.
 // Restrict every practice mode to the advanced end (entries 249–450).
 // For imported CSV/TXT without numbered entries, use the final 45% of its
 // existing order as a *proxy* only; this assumes the list was ordered by difficulty.
function hardImported(){
 const items=store.words||[];
 if(!items.length)return [];
 const numbered=items.filter(w=>Number.isInteger(Number(w.number))&&Number(w.number)>0);
 if(numbered.length===items.length)return items.filter(w=>Number(w.number)>=249);
 const cutoff=Math.max(0,Math.floor(items.length*0.55));
 return items.slice(cutoff);
}
function difficulty(w){
 if(w.difficulty==="very-hard"||w.difficulty==="hard")return w.difficulty;
 if(w.source==="unseen"||demo.some(d=>d.word===w.word)||unseen.some(d=>d.word===w.word))return ["idiosyncrasy","onomatopoeia","entrepreneur","bureaucracy","chrysanthemum","miscellaneous","conscientious","acquaintance","equilibrium"].includes(w.word)?"very-hard":"hard";
 if(Number.isInteger(Number(w.number))&&Number(w.number)>0)return Number(w.number)>=351?"very-hard":"hard";
 return "unrated";
}
function pool(){
 const set=$("set").value, listed=hardImported();
 const extras=unseen.map(w=>({...w,source:"unseen"}));
 const tier=$("difficulty")?.value||"all";
 const choose=items=>tier==="all"?items:items.filter(w=>difficulty(w)===tier||difficulty(w)==="unrated");
 if(set==="listed")return choose(listed.length?listed:store.words.length?[]:demo);
 if(set==="unseen")return choose(extras);
 if(set==="review"){
  const misses=new Set(store.attempts.filter(x=>!x.correct).map(x=>x.word));
  return choose([...listed,...(store.words.length?[]:demo),...extras].filter(w=>misses.has(w.word)));
 }
 return choose([...(store.words.length?listed:demo),...extras]);
}
function newRound(){let p=pool();if(!p.length){alert("No words in this set yet. Import a list or choose Mixed garden.");return}round=p.slice().sort(()=>Math.random()-.5).slice(0,+$("roundSize").value);idx=0;session=true;active=0;touch();nextWord()}
function nextWord(){scored=false;current=round[idx]||null;$("feedback").classList.add("hidden");$("next").classList.add("hidden");$("letters").value="";$("counter").textContent="Word "+(current?idx+1:round.length)+" of "+round.length;if(!current){session=false;$("prompt").textContent="Amazing work! 🌟";$("promptInfo").textContent="Round complete. Start another round to grow stronger.";save();render();return}$("prompt").textContent="Listen carefully 🐝";$("promptInfo").textContent="Say the word, spell it letter by letter, then say the word again.";$("letters").focus();speak("Your word is "+current.word)}
$("newRound").onclick=newRound;$("hear").onclick=()=>{if(!current){newRound();return} speak("Your word is "+current.word)};
$("definition").onclick=()=>{if(current)speak(current.definition||"No definition provided. Ask a parent for help.")};
$("sentence").onclick=()=>{if(current)speak(current.sentence||"No example sentence provided for this word.")};
$("skip").onclick=()=>{if(current){if(!scored)record(false,true);idx++;nextWord()}};
$("next").onclick=()=>{idx++;nextWord()};
function record(correct,skipped=false){store.attempts.push({word:current.word,correct,skipped,source:current.source||"listed",date:new Date().toISOString(),letters:$("letters").value,seconds:active});save()}
$("check").onclick=()=>{if(!current||scored)return;const entered=letterNorm($("letters").value);if(!entered){alert("Spell the word aloud or enter letters before checking.");return}const answers=[current.word,...(current.alternates||[])].map(norm);const good=answers.includes(entered);scored=true;record(good);const f=$("feedback");f.className="feedback"+(good?"":" bad");const clue=wordTeaching[norm(current.word)];f.textContent=(good?"🌟 Correct! ":"🌱 Nice try! ")+"The word is "+current.word+". "+(clue?"🧩 "+clue[0]+": "+clue[1]:(good?"":"Try a related spelling strategy in Pattern Garden."));$("next").classList.remove("hidden");speak(good?"Wonderful spelling!":"Good effort. The word was "+current.word);render()};
$("letters").addEventListener("keydown",e=>{if(e.key==="Enter")$("check").click()});
const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
$("mic").onclick=()=>{if(!current||scored)return;if(!Recognition){$("voiceNote").textContent="Speech recognition unavailable. Type letters instead.";return}
if("speechSynthesis" in window)speechSynthesis.cancel();
const r=new Recognition();r.lang="en-US";r.interimResults=false;r.maxAlternatives=1;
$("mic").classList.add("listening");$("voiceNote").textContent="Say the word, spell each letter slowly, then say the word again.";
r.onresult=e=>{const phrase=e.results[0][0].transcript.trim();$("mic").classList.remove("listening");
if(/^(definition|what does it mean|meaning)$/i.test(phrase))$("definition").click();
else if(/^(sentence|use it in a sentence)$/i.test(phrase))$("sentence").click();
else if(/^(repeat|repeat the word|say it again)$/i.test(phrase))$("hear").click();
else {const parsed=parseOralSpelling(phrase,current.word);
if(parsed.kind==="letters"){$("letters").value=parsed.letters.split("").join(" ");$("voiceNote").textContent='Heard: "'+phrase+'". Confirm the LETTERS below before checking. The repeated word was ignored.'}
else if(parsed.kind==="word-only"){$("voiceNote").textContent='Heard only the word "'+phrase+'". Now spell the individual letters. No score recorded.'}
else {$("voiceNote").textContent='Heard: "'+phrase+'". Individual letters were unclear. Try again slowly or type the letters. No score recorded.'}}
};
r.onerror=()=>{$("mic").classList.remove("listening");$("voiceNote").textContent="Microphone unavailable. Type letters instead."};
r.onend=()=>$("mic").classList.remove("listening");
try{r.start()}catch{$("voiceNote").textContent="Could not start microphone. Try Chrome or Edge."}
};
$("patternsGrid").innerHTML=patterns.map((p,i)=>'<button class="pattern" data-lesson="'+i+'"><span>'+p[0]+'</span><b>'+p[1]+'</b><small>'+p[2]+'</small></button>').join("");
document.querySelectorAll("[data-lesson]").forEach(b=>b.onclick=()=>{const p=patterns[+b.dataset.lesson];$("lesson").innerHTML="<h2>"+p[0]+" "+p[1]+"</h2><p><b>Clue:</b> "+p[3]+"</p><p><b>Examples:</b> "+p[4]+"</p><p><b>Be careful:</b> "+p[5]+"</p><button class='primary' id='lessonSpeak'>🔊 Hear explanation</button>";$("lessonSpeak").onclick=()=>speak(p[3]+" Examples: "+p[4]+". "+p[5])});
function render(){const a=store.attempts,correct=a.filter(x=>x.correct).length;const secs=Object.values(store.time).reduce((p,c)=>p+(Number(c)||0),0);$("homeWords").textContent=store.words.length?hardImported().length:demo.length;$("homeMinutes").textContent=Math.floor((store.time[today()]||0)/60)+" min";$("homeAccuracy").textContent=a.length?Math.round(100*correct/a.length)+"%":"0%";$("activeTotal").textContent=Math.floor(secs/60)+" min";$("attemptTotal").textContent=a.length;const un=a.filter(x=>x.source==="unseen");$("unseenRate").textContent=un.length?Math.round(100*un.filter(x=>x.correct).length/un.length)+"%":"0%";const days=Array.from({length:7},(_,i)=>{const d=new Date();d.setDate(d.getDate()-6+i);return {key:d.toLocaleDateString("en-CA"),label:d.toLocaleDateString("en-US",{weekday:"short"})}});const max=Math.max(1,...days.map(x=>store.time[x.key]||0));$("bars").innerHTML=days.map(x=>'<div class="bar-wrap"><div class="bar" style="height:'+Math.max(3,120*(store.time[x.key]||0)/max)+'px"></div>'+x.label+'<br>'+Math.floor((store.time[x.key]||0)/60)+'m</div>').join("");$("history").textContent="";a.slice(-15).reverse().forEach(x=>{let d=document.createElement("div");d.className="row";const left=document.createElement("span");left.textContent=x.word+" · "+(x.source||"listed");const right=document.createElement("b");right.textContent=x.skipped?"Skipped":x.correct?"✓ Correct":"✕ Missed";d.append(left,right);$("history").append(d)});if(!a.length)$("history").textContent="No attempts yet. Let's practice!"}
function csvRows(text){let out=[],row=[],field="",quote=false;for(let i=0;i<text.length;i++){let ch=text[i];if(ch==='"'){if(quote&&text[i+1]==='"'){field+='"';i++}else quote=!quote}else if(ch===","&&!quote){row.push(field);field=""}else if((ch==="\n"||ch==="\r")&&!quote){if(ch==="\r"&&text[i+1]==="\n")i++;row.push(field);if(row.some(x=>x.trim()))out.push(row);row=[];field=""}else field+=ch}row.push(field);if(row.some(x=>x.trim()))out.push(row);return out}
$("import").onchange=async e=>{const file=e.target.files[0];if(!file)return;const text=await file.text();let words;if(file.name.toLowerCase().endsWith(".csv")){let rows=csvRows(text),headers=rows[0].map(x=>x.trim().toLowerCase());const hasHeader=headers.includes("word");const ix=hasHeader?headers.indexOf("word"):0,di=hasHeader?headers.indexOf("definition"):1,si=hasHeader?headers.indexOf("sentence"):2,ni=hasHeader?headers.indexOf("number"):-1;words=rows.slice(hasHeader?1:0).map(r=>({word:(r[ix]||"").trim(),definition:di>=0?(r[di]||"").trim():"",sentence:si>=0?(r[si]||"").trim():"",number:ni>=0?Number(r[ni]):undefined}))}else{words=text.split(/\r?\n/).map(x=>({word:x.trim(),definition:"",sentence:""}))}words=words.filter(x=>x.word&&/^[\p{L}\p{M}\s'-]+$/u.test(x.word));if(!words.length){$("importNote").textContent="No valid words found. Check the file format.";return}store.words=words.map(x=>({...x,source:"listed"}));save();$("importNote").textContent=words.length+" words loaded privately; "+hardImported().length+" selected for harder-only practice.";renderLibrary();render()};
function renderLibrary(){const words=store.words;const search=$("search").value.toLowerCase();$("wordCount").textContent="("+words.length+")";$("preview").textContent="";words.filter(x=>x.word.toLowerCase().includes(search)).slice(0,60).forEach(x=>{let d=document.createElement("div");d.className="row";const name=document.createElement("b");name.textContent=x.word;const detail=document.createElement("span");detail.textContent=x.definition||"Definition not provided";detail.className="muted";d.append(name,detail);$("preview").append(d)});if(!words.length)$("preview").textContent="No personal words imported."}
$("search").oninput=renderLibrary;
$("export").onclick=()=>{save();const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(store,null,2)],{type:"application/json"}));a.download="beebloom-private-progress.json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};
$("restore").onchange=async e=>{try{const obj=JSON.parse(await e.target.files[0].text());if(!Array.isArray(obj.words)||!Array.isArray(obj.attempts)||typeof obj.time!=="object")throw Error("Invalid backup");if(!confirm("Replace current local progress with this backup?"))return;store=obj;save();render();renderLibrary()}catch{alert("Invalid backup file.")}};
render();renderLibrary();

const bootStatus=document.getElementById("bootStatus");if(bootStatus){bootStatus.textContent="✓ Coach ready";bootStatus.style.color="#327a65"}
