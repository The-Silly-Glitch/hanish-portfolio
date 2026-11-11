'use client';
import {useEffect,useRef} from 'react';
import * as THREE from 'three';
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment.js';
type Props={progress:React.RefObject<number>;paused:boolean;onReady:()=>void};
export default function JourneyWorld({progress,paused,onReady}:Props){
 const host=useRef<HTMLDivElement>(null),pause=useRef(paused),ready=useRef(onReady);
 useEffect(()=>{pause.current=paused},[paused]);
 useEffect(()=>{
  const el=host.current;if(!el)return;let renderer:THREE.WebGLRenderer;
  try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'})}catch{ready.current();return}
  let mobile=innerWidth<700;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.15:1.6));renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;el.appendChild(renderer.domElement);
  const scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x343858,.008);const camera=new THREE.PerspectiveCamera(52,1,.1,220);
  const disposal:{dispose:()=>void}[]=[];const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment(),env=pmrem.fromScene(room,.06);scene.environment=env.texture;disposal.push(env,pmrem);room.dispose();
  const mat=(color:number,metalness=.8,roughness=.3,emissive=0,intensity=0)=>{const m=new THREE.MeshStandardMaterial({color,metalness,roughness,emissive,emissiveIntensity:intensity});disposal.push(m);return m};
  const steel=mat(0x27243c),dark=mat(0x141627),silver=mat(0xc5c6de,1,.17),violet=mat(0x8653bd,.6,.25,0x8c39ff,1.1),cyan=mat(0x76dce9,.5,.3,0x55bce5,2.3);
  const box=(w:number,h:number,d:number,m:THREE.Material,parent:THREE.Object3D,x=0,y=0,z=0)=>{const g=new THREE.BoxGeometry(w,h,d);disposal.push(g);const mesh=new THREE.Mesh(g,m);mesh.position.set(x,y,z);parent.add(mesh);return mesh};
  const rand=(i:number)=>{const v=Math.sin(i*127.1+31.7)*43758.5453;return v-Math.floor(v)};
  scene.add(new THREE.HemisphereLight(0xc3b6f1,0x112e4b,2));const sun=new THREE.DirectionalLight(0xffd9b2,4);sun.position.set(10,18,25);scene.add(sun);const rim=new THREE.DirectionalLight(0x7940ff,4);rim.position.set(-10,3,-15);scene.add(rim);
  // Authored foreground architecture moves at a different depth from the city matte.
  const tower=(x:number,z:number,h:number,w:number)=>{const g=new THREE.Group();g.position.set(x,-12,z);scene.add(g);box(w,h,4,dark,g,0,h/2);box(w-.12,h-.2,.15,dark,g,0,h/2,2.05);
   for(let y=1;y<h;y+=1.2){box(w,.035,.08,steel,g,0,y,2.18);for(let k=0;k<5;k++){box(.025,1.1,.05,dark,g,-w/2+(k+1)*w/6,y+.55,2.2);if(rand(y*7+k+x)>.76)box(.32,.04,.04,cyan,g,-w/2+(k+1)*w/6,y+.4,2.25)}}
   [-1,1].forEach(s=>{box(.15,h+.2,.3,steel,g,s*w/2,h/2,2.3);box(.035,h,.03,violet,g,s*(w/2-.2),h/2,2.5)});box(w*.7,.15,4.5,silver,g,0,h*.67);box(.06,5,.06,cyan,g,w*.3,h+2);return g};
  tower(-19,3,60,8);tower(19,-1,68,8);
  const beamGeo=new THREE.CylinderGeometry(.018,.018,135,6);disposal.push(beamGeo);[].forEach(s=>{const beam=new THREE.Mesh(beamGeo,cyan);beam.rotation.x=Math.PI/2;beam.position.set(s*9,-8,-48);scene.add(beam)});
  // A floating security core: bevelled chrome, illuminated seams, orbiting key rings.
  const vault=new THREE.Group();vault.position.set(5,1,-33);scene.add(vault);
  const coreGeo=new THREE.OctahedronGeometry(2.8,0);disposal.push(coreGeo);const core=new THREE.Mesh(coreGeo,silver);vault.add(core);
  const coreInner=new THREE.Mesh(new THREE.OctahedronGeometry(2.85,0),new THREE.MeshBasicMaterial({color:0xb180ff,wireframe:true}));disposal.push(coreInner.geometry,coreInner.material);vault.add(coreInner);
  const rings:THREE.Mesh[]=[];for(let i=0;i<3;i++){const geo=new THREE.TorusGeometry(4+i*.4,.055,8,120);disposal.push(geo);const r=new THREE.Mesh(geo,i===1?violet:silver);r.rotation.set(i*.7,.4+i*.6,.2);vault.add(r);rings.push(r)}
  for(let i=0;i<12;i++){const a=i/12*Math.PI*2;const m=box(.15,.5,.15,i%3?steel:cyan,vault,Math.cos(a)*5.3,Math.sin(a)*5.3);m.rotation.z=a}
  const glow=new THREE.PointLight(0x9c5bff,65,24);glow.position.copy(vault.position);scene.add(glow);
  // Worker network, a physical lattice of independently moving compute units.
  const net=new THREE.Group();net.position.set(4,0,-66);scene.add(net);const nodes:THREE.Group[]=[];const positions:THREE.Vector3[]=[];
  for(let i=0;i<9;i++){const a=i/9*Math.PI*2,r=i===0?0:4.7,p=new THREE.Vector3(Math.cos(a)*r,Math.sin(a)*r,(i%3-1)*1.8);positions.push(p);const g=new THREE.Group();g.position.copy(p);net.add(g);box(1.15,1.6,.75,silver,g);box(.95,1.4,.05,dark,g,0,0,.41);for(let j=0;j<5;j++)box(.7,.03,.03,j%3?cyan:violet,g,0,.5-j*.25,.46);nodes.push(g)}
  const packetGeo=new THREE.SphereGeometry(.07,8,8);disposal.push(packetGeo);const packets:{mesh:THREE.Mesh;a:THREE.Vector3;b:THREE.Vector3;offset:number}[]=[];
  for(let i=1;i<9;i++){const a=positions[0],b=positions[i],geo=new THREE.BufferGeometry().setFromPoints([a,b]),m=new THREE.LineBasicMaterial({color:0xa892d7,transparent:true,opacity:.5});disposal.push(geo,m);net.add(new THREE.Line(geo,m));const mesh=new THREE.Mesh(packetGeo,cyan);net.add(mesh);packets.push({mesh,a,b,offset:i/9})}
  // Continual-learning memory represented by a layered, metallic data sculpture.
  const memory=new THREE.Group();memory.position.set(4,0,-101);scene.add(memory);const layers:THREE.Mesh[]=[];
  for(let i=0;i<13;i++){const geo=new THREE.TorusGeometry(1.8+Math.sin(i/12*Math.PI)*1.7,.14,8,80);disposal.push(geo);const m=new THREE.Mesh(geo,i%4===0?violet:silver);m.position.y=(i-6)*.45;m.rotation.x=Math.PI/2;memory.add(m);layers.push(m)}
  const dotCount=mobile?300:700,pos=new Float32Array(dotCount*3);for(let i=0;i<dotCount;i++)pos.set([(rand(i+40)-.5)*65,(rand(i+60)-.5)*35,15-rand(i+80)*140],i*3);const dustGeo=new THREE.BufferGeometry();dustGeo.setAttribute('position',new THREE.BufferAttribute(pos,3));const dustMat=new THREE.PointsMaterial({color:0xc7c1f7,size:.035,transparent:true,opacity:.6});disposal.push(dustGeo,dustMat);scene.add(new THREE.Points(dustGeo,dustMat));
  const path=new THREE.CatmullRomCurve3([new THREE.Vector3(0,2,25),new THREE.Vector3(0,1,10),new THREE.Vector3(-1,1,-9),new THREE.Vector3(-1,1,-22),new THREE.Vector3(0,0,-34),new THREE.Vector3(1,1,-43),new THREE.Vector3(-1,1,-53),new THREE.Vector3(-1,0,-66),new THREE.Vector3(0,1,-79),new THREE.Vector3(0,1,-87),new THREE.Vector3(0,0,-90)]);
  let frame=0,time=0,current=progress.current||0,last=0,inView=true;const pointer=new THREE.Vector2(),smoothed=new THREE.Vector2();const move=(e:PointerEvent)=>pointer.set((e.clientX/innerWidth-.5)*2,(e.clientY/innerHeight-.5)*2);window.addEventListener('pointermove',move,{passive:true});
  const resize=()=>{mobile=innerWidth<700;renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.15:1.6));renderer.setSize(el.clientWidth,el.clientHeight);camera.aspect=el.clientWidth/el.clientHeight;camera.updateProjectionMatrix()};resize();window.addEventListener('resize',resize);
  const render=(now:number)=>{frame=requestAnimationFrame(render);if(!inView||document.hidden||now-last<(mobile?33:25))return;const dt=Math.min((now-last)/1000,.05);last=now;
   if(!reduced){current+=((progress.current||0)-current)*.075;if(!pause.current){time+=dt;smoothed.lerp(pointer,.025)}}
   const p=reduced?0:current;camera.position.copy(path.getPointAt(p));camera.position.x+=smoothed.x*.28;camera.position.y-=smoothed.y*.18;if(mobile)camera.position.z+=6;camera.lookAt(camera.position.x+.15,camera.position.y-.2,camera.position.z-20);camera.rotateZ(Math.sin(p*Math.PI*2)*.025);
   // The matte travels slowly while foreground architecture rushes past.
   el.style.setProperty('--city-scale',String(1.04+p*.22));el.style.setProperty('--city-drift',`${p*-7}%`);
   vault.position.set(mobile?0:5,mobile?7:1,-33);net.position.set(mobile?0:4,mobile?6:0,-66);memory.position.set(mobile?0:4,mobile?6:0,-101);vault.scale.setScalar(mobile?.55:1);net.scale.setScalar(mobile?.7:1);memory.scale.setScalar(mobile?.65:1);vault.visible=p>.14&&p<.53;net.visible=p>.4&&p<.8;memory.visible=p>.67;core.rotation.set(time*.12,time*.18,.2);coreInner.rotation.copy(core.rotation);rings.forEach((r,i)=>r.rotation.z=time*(i%2?.1:-.1));net.rotation.y=Math.sin(time*.16)*.12;nodes.forEach((n,i)=>n.position.y=positions[i].y+Math.sin(time*.7+i)*.08);packets.forEach(v=>v.mesh.position.lerpVectors(v.a,v.b,(time*.18+v.offset)%1));memory.rotation.y=time*.12;memory.rotation.z=.25;layers.forEach((l,i)=>l.rotation.z=time*.1+i*.1);renderer.render(scene,camera);
  };frame=requestAnimationFrame(render);const observer=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting},{rootMargin:'100px'});observer.observe(el);
  const image=new Image();image.onload=()=>ready.current();image.onerror=()=>ready.current();image.src='/cybercity-v1.webp';
  return()=>{cancelAnimationFrame(frame);observer.disconnect();image.onload=null;image.onerror=null;window.removeEventListener('resize',resize);window.removeEventListener('pointermove',move);disposal.forEach(x=>x.dispose());renderer.dispose();renderer.domElement.remove()};
 },[progress]);
 return <div ref={host} className="journey-world" aria-hidden="true"/>;
}
