'use client';
import {useEffect,useRef} from 'react';
import * as THREE from 'three';

/** A scroll-led passage through three rooms of the collection. */
export default function PaintedNight({progress,paused}:{progress:React.RefObject<number>;paused:boolean}){
 const mount=useRef<HTMLDivElement>(null),pauseRef=useRef(paused);
 useEffect(()=>{pauseRef.current=paused},[paused]);
 useEffect(()=>{
  const el=mount.current;if(!el)return;let renderer:THREE.WebGLRenderer;
  try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:false})}catch{return}
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));el.appendChild(renderer.domElement);renderer.domElement.style.opacity='0';renderer.domElement.style.transition='opacity .6s';
  const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);camera.position.z=1;
  const texture=new THREE.TextureLoader().load('/starry-night.webp',()=>{renderer.domElement.style.opacity='1'});texture.colorSpace=THREE.SRGBColorSpace;
  const wave=new THREE.TextureLoader().load('/art/wave.webp');wave.colorSpace=THREE.SRGBColorSpace;
  const abstract=new THREE.TextureLoader().load('/art/kandinsky.webp');abstract.colorSpace=THREE.SRGBColorSpace;
  const uniforms={uImage:{value:texture},uWave:{value:wave},uAbstract:{value:abstract},uTime:{value:0},uProgress:{value:0},uAspect:{value:1},uPointer:{value:new THREE.Vector2()}};
  const geometry=new THREE.PlaneGeometry(2,2);
  const material=new THREE.ShaderMaterial({uniforms,vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`,
  fragmentShader:`varying vec2 vUv;uniform sampler2D uImage,uWave,uAbstract;uniform float uTime,uProgress,uAspect;uniform vec2 uPointer;
  vec2 frame(float aspect){vec2 cover=vec2(min(1.,uAspect/aspect),min(1.,aspect/uAspect));return clamp((vUv-.5)*cover/(1.+uProgress*.22)+.5+uPointer*.005, .001,.999);}
  void main(){vec2 uv=frame(1.263);float sky=smoothstep(.3,.55,uv.y);uv.x+=sin(uv.y*18.+uTime*.13)*.0018*sky;uv.y+=sin(uv.x*16.-uTime*.11)*.0014*sky;
  vec3 a=texture2D(uImage,uv).rgb,b=texture2D(uWave,frame(1.5)).rgb,c=texture2D(uAbstract,frame(1.374)).rgb;
  vec3 color=mix(a,b,smoothstep(.23,.38,uProgress));color=mix(color,c,smoothstep(.59,.75,uProgress));gl_FragColor=vec4(color,1.);}`});
  const painting=new THREE.Mesh(geometry,material);scene.add(painting);
  const resize=()=>{renderer.setSize(el.clientWidth,el.clientHeight);uniforms.uAspect.value=el.clientWidth/el.clientHeight};resize();window.addEventListener('resize',resize);
  const pointer=new THREE.Vector2();const move=(e:PointerEvent)=>pointer.set(e.clientX/innerWidth-.5,e.clientY/innerHeight-.5);window.addEventListener('pointermove',move,{passive:true});
  let frame=0,time=0,current=0,last=0,visible=true;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const visibility=()=>{visible=!document.hidden};document.addEventListener('visibilitychange',visibility);
  const render=(now:number)=>{frame=requestAnimationFrame(render);if(!visible||now-last<32)return;last=now;if(!pauseRef.current&&!reduced){time+=.025;current+=((progress.current||0)-current)*.045;uniforms.uPointer.value.lerp(pointer,.025)}uniforms.uTime.value=time;uniforms.uProgress.value=reduced?0:current;renderer.render(scene,camera)};frame=requestAnimationFrame(render);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('resize',resize);window.removeEventListener('pointermove',move);document.removeEventListener('visibilitychange',visibility);texture.dispose();wave.dispose();abstract.dispose();geometry.dispose();material.dispose();renderer.dispose();renderer.domElement.remove()};
 },[progress]);
 return <div className="particle-canvas painted-night" ref={mount} aria-hidden="true"/>;
}
