let currentPage = 1;
function nextPage(){
  document.getElementById("page"+currentPage).classList.remove("active");
  currentPage++;
  document.getElementById("page"+currentPage).classList.add("active");
  if(currentPage===2){
    showTextPerWord("Selamat Ulang Tahun ke 20 🎉",()=>{
      document.getElementById("subtitle").classList.add("show");
      setTimeout(nextPage,2500); // auto lanjut ke page3
    });
  }
}

// animasi teks page2
function showTextPerWord(text,onDone){
  const container=document.getElementById("welcomeText");
  container.innerHTML="";
  const words=text.split(" ");
  words.forEach((w,i)=>{
    const span=document.createElement("span");
    span.textContent=w; span.classList.add("word");
    span.style.animationDelay=`${i*0.5}s`;
    container.appendChild(span);
  });
  const last=container.lastElementChild;
  if(last) last.addEventListener("animationend",()=>{ if(onDone)onDone(); },{once:true});
  else if(onDone) onDone();
}

/* === Page 3 Gulungan === */
const giftWrap=document.getElementById('giftWrap');
const giftBox=document.getElementById('giftBox');
const giftMsg=document.getElementById('giftMessage');
const giftGif=document.getElementById('giftGif');
const letter=document.getElementById('letter');
const btnClose=document.getElementById('btnClose');
const btnNext=document.getElementById('btnNext');
let clickCount=0,endMode=false,extraClicks=0;

const messages=["Ketuk gulungan misterius ini","hehe","Haha ga semudah itu",
"yah elah kurang cepet lu mencetnya","dah nih gua kasih, lu kelamaan baca daripada fokus nangkep gulungan ini"];
const positions=[{x:50,y:50},{x:20,y:80},{x:80,y:30},{x:25,y:40},{x:50,y:50}];

function moveWrapTo(p){ giftWrap.style.left=p.x+"%"; giftWrap.style.top=p.y+"%"; }
moveWrapTo(positions[0]);

giftBox.addEventListener('click',()=>{
  if(endMode)return;
  clickCount++;
  if(clickCount<5){
    moveWrapTo(positions[clickCount]);
    giftMsg.textContent=messages[clickCount];
  } else if(clickCount===5){
    giftMsg.textContent=messages[4];
    moveWrapTo(positions[4]);
    giftBox.classList.add("shake");
    giftBox.addEventListener('animationend',()=>{
      giftBox.classList.remove('shake');
      giftBox.src="https://github.com/kuhyakuya/Ultah-Pilus-20-tahun/blob/main/Image/gulungan%20terbuka.png?raw=true";
      giftGif.style.display="block"; // tampilkan gif rame
    },{once:true});
    startConfetti();
    setTimeout(()=>{ letter.classList.add("show"); endMode=true;
      setTimeout(()=>{document.addEventListener('click',spamHandler);},0);
    },600);
  }
});

function spamHandler(){
  if(!endMode)return; extraClicks++;
  if(extraClicks>=3){ document.removeEventListener('click',spamHandler); goNext(); }
}

btnClose.addEventListener('click',e=>{ e.stopPropagation(); letter.classList.remove('show'); });
btnNext.addEventListener('click',e=>{ e.stopPropagation(); goNext(); });

function goNext(){
  window.open("https://youtube.com/shorts/qvNbFcG8NeA?si=QRv5sqXoYqvdoJRi","_blank");
  setTimeout(()=>{ window.location.href="https://wa.me/6283199899161?text=Anjay%20gua%20semakin%20tua%20cuy!"; },3000);
}

/* Confetti */
function startConfetti(){
  const canvas=document.getElementById("confettiCanvas");
  const ctx=canvas.getContext("2d");
  function resize(){
    const dpr=window.devicePixelRatio||1;
    canvas.width=Math.floor(window.innerWidth*dpr);
    canvas.height=Math.floor(window.innerHeight*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  resize(); window.addEventListener('resize',resize);
  const pieces=[],COUNT=160;
  for(let i=0;i<COUNT;i++){
    pieces.push({x:Math.random()*window.innerWidth,y:(Math.random()*-window.innerHeight),
      size:6+Math.random()*10,color:`hsl(${Math.random()*360},95%,55%)`,
      vy:2+Math.random()*3,vx:(Math.random()-.5)*1.2,
      angle:Math.random()*Math.PI*2,rotateSpeed:(Math.random()-.5)*0.25,
      shape:["rect","circle","triangle"][Math.floor(Math.random()*3)]});
  }
  function draw(p){
    ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.angle); ctx.fillStyle=p.color;
    if(p.shape==="rect"){ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size);}
    else if(p.shape==="circle"){ctx.beginPath();ctx.arc(0,0,p.size/2,0,Math.PI*2);ctx.fill();}
    else{ctx.beginPath();ctx.moveTo(0,-p.size/2);ctx.lineTo(p.size/2,p.size/2);ctx.lineTo(-p.size/2,p.size/2);ctx.closePath();ctx.fill();}
    ctx.restore();
  }
  function tick(){
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    for(let p of pieces){
      p.y+=p.vy; p.x+=p.vx; p.angle+=p.rotateSpeed;
      if(p.y-p.size>window.innerHeight){p.y=-20;p.x=Math.random()*window.innerWidth;}
      if(p.x<-20)p.x=window.innerWidth+20; if(p.x>window.innerWidth+20)p.x=-20;
      draw(p);
    }
    requestAnimationFrame(tick);
  }
  tick();
}

