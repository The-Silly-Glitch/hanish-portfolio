'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/** An artistic particle accretion disk and lensed halo, rather than a physical simulation. */
export default function ParticleFlight({progress,paused}:{progress:React.RefObject<number>;paused:boolean}) {
 const mount=useRef<HTMLDivElement>(null),pauseRef=useRef(paused);
 useEffect(()=>{pauseRef.current=paused},[paused]);
 useEffect(()=>{
  const el=mount.current;if(!el)return;
  let renderer:THREE.WebGLRenderer;
  try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:false,powerPreference:'high-performance'})}catch{return}
  const mobile=innerWidth<700;
  renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.2:1.7));el.appendChild(renderer.domElement);
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(48,1,.1,150);
  const uniforms={uTime:{value:0},uProgress:{value:0},uPixel:{value:renderer.getPixelRatio()},uTravel:{value:0},uVelocity:{value:0}};
  const count=mobile?17000:42000,positions=new Float32Array(count*3),seeds=new Float32Array(count*2);
  const random=(n:number)=>{const v=Math.sin(n*127.1+311.7)*43758.5453;return v-Math.floor(v)};
  for(let i=0;i<count;i++){
   const y=1-2*(i+.5)/count,r=Math.sqrt(1-y*y),a=i*2.39996323;
   positions.set([Math.cos(a)*r*3.3,y*3.3,Math.sin(a)*r*3.3],i*3);
   seeds.set([random(i+1),random(i+count)],i*2);
  }
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(positions,3));geo.setAttribute('seed',new THREE.BufferAttribute(seeds,2));
  const material=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,uniforms,
   vertexShader:`attribute vec2 seed;uniform float uTime,uProgress,uPixel;varying float vHeat,vAlpha;
   void main(){float m=smoothstep(.18,.72,uProgress);float r=1.66+pow(seed.x,1.65)*4.8;float a=seed.y*6.283185+uTime*(.12+1.5/pow(r,1.5));float ripple=sin(a*3.+r*9.-uTime*.7);float thickness=(seed.y-.5)*.08+sin(a*5.+r*3.)*.035;
   vec3 disk=vec3(cos(a)*r,sin(a)*r*.22+thickness,sin(a)*r*.976);float tilt=-.13;disk.xy=mat2(cos(tilt),-sin(tilt),sin(tilt),cos(tilt))*disk.xy;
   vec3 sphere=position;float spin=uTime*.035; sphere.xz=mat2(cos(spin),-sin(spin),sin(spin),cos(spin))*sphere.xz;
   vec3 p=mix(sphere,disk,m);p.x+=mix(2.4,3.25,m);p.y+=.12;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;
   gl_PointSize=clamp(uPixel*(1.+seed.y*.7)*(17./max(3.,-mv.z)),.65,4.);vHeat=1.-(r-1.66)/4.8;vAlpha=mix(.38,.62,m)*( .4+seed.y*.6)*( .85+ripple*.15);}`,
   fragmentShader:`varying float vHeat,vAlpha;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;vec3 c=mix(vec3(.48,.22,.085),vec3(1.,.78,.44),pow(vHeat,.6));gl_FragColor=vec4(c,smoothstep(.5,.05,d)*vAlpha);}`});
  const disk=new THREE.Points(geo,material);disk.frustumCulled=false;scene.add(disk);
  const hole=new THREE.Mesh(new THREE.SphereGeometry(1.43,64,40),new THREE.MeshBasicMaterial({color:0x020305}));hole.position.set(3.25,.12,0);scene.add(hole);
  // The image of the far disk bends above and below the central shadow.
  const lensCount=mobile?6500:16000,lensPos=new Float32Array(lensCount*3),lensSeeds=new Float32Array(lensCount);
  for(let i=0;i<lensCount;i++){
   const a=random(i+count*3)*Math.PI*2,spread=random(i+count*4),r=1.49+Math.pow(spread,2.6)*.9;
   lensPos.set([Math.cos(a)*r,Math.sin(a)*r,1.0],i*3);lensSeeds[i]=spread;
  }
  const lg=new THREE.BufferGeometry();lg.setAttribute('position',new THREE.BufferAttribute(lensPos,3));lg.setAttribute('seed',new THREE.BufferAttribute(lensSeeds,1));
  const lm=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,uniforms,
   vertexShader:`attribute float seed;uniform float uTime,uProgress,uPixel;varying float vA,vHeat;void main(){vec3 p=position;float a=atan(p.y,p.x);float arc=pow(abs(sin(a)),.65);p.y*=.87;float pulse=sin(a*7.+uTime*.55+seed*8.);p.x+=3.25;p.y+=.12;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=uPixel*(.75+seed*.65)*(16./max(3.,-mv.z));vA=smoothstep(.35,.75,uProgress)*(1.-seed*.8)*(.28+arc*.65)*(.8+pulse*.2);vHeat=1.-seed;}`,
   fragmentShader:`varying float vA,vHeat;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(mix(vec3(.8,.36,.11),vec3(1.,.88,.64),vHeat),smoothstep(.5,.04,d)*vA);}`});
  const lens=new THREE.Points(lg,lm);lens.frustumCulled=false;scene.add(lens);
  const photon=new THREE.Mesh(new THREE.RingGeometry(1.435,1.46,160),new THREE.MeshBasicMaterial({color:0xffd9a0,transparent:true,opacity:0,side:THREE.DoubleSide,depthWrite:false,blending:THREE.AdditiveBlending}));photon.position.set(3.25,.12,1.02);photon.scale.y=.87;scene.add(photon);
  // Nearby dust passes the viewer; the distant field anchors the depth.
  const starCount=mobile?1900:4200,stars=new Float32Array(starCount*3),starSeeds=new Float32Array(starCount);
  for(let i=0;i<starCount;i++){
   const angle=random(i+80000)*Math.PI*2,r=3.8+Math.pow(random(i+90000),.7)*62;
   stars.set([Math.cos(angle)*r,Math.sin(angle)*r,-110+random(i+100000)*140],i*3);starSeeds[i]=random(i+110000);
  }
  const sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.BufferAttribute(stars,3));sg.setAttribute('seed',new THREE.BufferAttribute(starSeeds,1));
  const sm=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,uniforms,
   vertexShader:`attribute float seed;uniform float uTravel,uPixel,uTime;varying float vA,vSeed;void main(){vec3 p=position;p.z=mod(p.z+uTravel+uTime*.18+110.,140.)-110.;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp((.6+seed*1.5)*uPixel*22./max(3.,-mv.z),.65,4.);vA=smoothstep(0.,8.,-mv.z)*(.3+seed*.7);vSeed=seed;}`,
   fragmentShader:`varying float vA,vSeed;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(mix(vec3(.43,.64,1.),vec3(1.,.92,.78),vSeed),smoothstep(.5,0.,d)*vA);}`});
  const field=new THREE.Points(sg,sm);field.frustumCulled=false;scene.add(field);
  const trailCount=mobile?180:550,trailPos=new Float32Array(trailCount*6),ends=new Float32Array(trailCount*2);
  for(let i=0;i<trailCount;i++){
   const angle=random(i+120000)*Math.PI*2,r=5+random(i+130000)*37,z=-110+random(i+140000)*140;
   trailPos.set([Math.cos(angle)*r,Math.sin(angle)*r,z,Math.cos(angle)*r,Math.sin(angle)*r,z],i*6);ends.set([0,1],i*2);
  }
  const tg=new THREE.BufferGeometry();tg.setAttribute('position',new THREE.BufferAttribute(trailPos,3));tg.setAttribute('end',new THREE.BufferAttribute(ends,1));
  const tm=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,uniforms,
   vertexShader:`attribute float end;uniform float uTravel,uTime,uVelocity;varying float vA;void main(){vec3 p=position;p.z=mod(p.z+uTravel+uTime*.18+110.,140.)-110.;p.z-=end*(.03+uVelocity*3.5);vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;vA=(1.-end*.85)*uVelocity*.48*smoothstep(0.,9.,-mv.z);}`,
   fragmentShader:`varying float vA;void main(){gl_FragColor=vec4(.64,.78,1.,vA);}`});
  const trails=new THREE.LineSegments(tg,tm);trails.frustumCulled=false;scene.add(trails);
  const pointer=new THREE.Vector2(),pointerSmooth=new THREE.Vector2();
  const move=(event:PointerEvent)=>{pointer.set((event.clientX/innerWidth-.5)*2,(event.clientY/innerHeight-.5)*2)};
  const reset=()=>pointer.set(0,0);window.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerleave',reset);
  const resize=()=>{renderer.setSize(el.clientWidth,el.clientHeight);camera.aspect=el.clientWidth/el.clientHeight;camera.updateProjectionMatrix()};resize();window.addEventListener('resize',resize);
  let frame=0,time=0,current=progress.current||0,last=0,visible=true;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const visibility=()=>{visible=!document.hidden};document.addEventListener('visibilitychange',visibility);
  const render=(now:number)=>{frame=requestAnimationFrame(render);if(!visible||now-last<25)return;const dt=Math.min((now-last)/1000,.05);last=now;
   if(!pauseRef.current&&!reduced)time+=dt;
   const previous=current;
   if(!pauseRef.current)current+=((progress.current||0)-current)*.055;
   const p=reduced?.76:current,m=THREE.MathUtils.smoothstep(p,.18,.72);
   uniforms.uTime.value=time;uniforms.uProgress.value=p;
   const journey=THREE.MathUtils.smoothstep(p,0,1);
   const velocity=(!pauseRef.current&&!reduced)?Math.min(Math.abs(current-previous)/Math.max(dt,.01)*12,1):0;
   uniforms.uVelocity.value+=(velocity-uniforms.uVelocity.value)*.12;uniforms.uTravel.value=reduced?0:p*85;
   pointerSmooth.lerp(pointer,(!pauseRef.current&&!reduced)?.035:0);
   const sway=reduced?0:Math.sin(p*Math.PI*2)*.8;
   camera.position.set(journey*1.4+pointerSmooth.x*.32,sway+pointerSmooth.y*.2,19-journey*12+(mobile?3:0));
   camera.lookAt(journey*1.5,.12,0);camera.rotateZ(reduced?0:Math.sin(p*Math.PI)*.065);
   camera.fov=48+Math.sin(p*Math.PI)*5;camera.updateProjectionMatrix();
   el.style.setProperty('--journey',String(p));
   hole.scale.setScalar(m);hole.visible=m>.02;photon.material.opacity=m*.5;
   field.rotation.z=p*.11;trails.rotation.z=p*.11;renderer.render(scene,camera);
  };frame=requestAnimationFrame(render);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('resize',resize);document.removeEventListener('visibilitychange',visibility);window.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',reset);[geo,lg,sg,tg,hole.geometry,photon.geometry].forEach(g=>g.dispose());[material,lm,sm,tm,hole.material,photon.material].forEach(m=>m.dispose());renderer.dispose();renderer.domElement.remove()};
 },[progress]);
 return <div ref={mount} className="particle-canvas" aria-hidden="true"/>;
}
