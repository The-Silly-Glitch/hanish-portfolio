'use client';
import {useEffect,useRef,useState} from 'react';
import GlitchText from './GlitchText';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {ArrowDown,Pause,Play} from 'lucide-react';
export default function VerticalDescent(){
 const section=useRef<HTMLElement>(null),city=useRef<HTMLDivElement>(null),progress=useRef<HTMLDivElement>(null);
 const [chapter,setChapter]=useState(0),[paused,setPaused]=useState(false);
 useEffect(()=>{
  gsap.registerPlugin(ScrollTrigger);
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const ctx=gsap.context(()=>{
   const messages=gsap.utils.toArray<HTMLElement>('.descent-message',section.current!);
   let accessibleChapter=0;
   gsap.set(messages,{x:0,xPercent:-50,y:20,autoAlpha:0});
   gsap.set(messages[0],{y:0,autoAlpha:1});
   const journey=gsap.timeline({
    scrollTrigger:{trigger:section.current,start:'top top',end:'bottom bottom',scrub:.8,invalidateOnRefresh:true},
    onUpdate(){
     const p=this.progress(),next=p<.31?0:p<.67?1:2;
     if(next!==accessibleChapter){accessibleChapter=next;setChapter(next)}
     if(progress.current)progress.current.style.transform=`scaleY(${p})`;
    }
   });
   journey.to(city.current,{yPercent:()=>innerWidth<700?-38:-55,duration:1,ease:'none'},0)
    .to(messages[0],{autoAlpha:0,y:-18,duration:.065,ease:'power1.inOut'},.245)
    .fromTo(messages[1],{autoAlpha:0,y:20},{autoAlpha:1,y:0,duration:.085,ease:'power2.out',immediateRender:false},.31)
    .to(messages[1],{autoAlpha:0,y:-18,duration:.065,ease:'power1.inOut'},.605)
    .fromTo(messages[2],{autoAlpha:0,y:20},{autoAlpha:1,y:0,duration:.085,ease:'power2.out',immediateRender:false},.67);
   gsap.to('.descent-billboard',{y:-250,ease:'none',scrollTrigger:{trigger:section.current,start:'top top',end:'bottom bottom',scrub:1}});
  },section);
  return()=>ctx.revert();
 },[]);
 return <section ref={section} className={'vertical-descent'+(paused?' animations-paused':'')} id="home" aria-label="A vertical descent into Hanish’s work"><div className="descent-viewport"><div className="descent-city" ref={city}><img src="/descent-city.webp" alt="" fetchPriority="high"/><div className="descent-billboard billboard-one"><span>APPLIED CRYPTOGRAPHY</span><strong>ACCESS<br/>IS CONTEXT.</strong><small>SECUREGEOCRYPT / 2026</small></div><div className="descent-billboard billboard-two"><span>RESEARCH / ENGINEERING</span><strong>QUESTION.<br/>BUILD.<br/>REPEAT.</strong><small>HANISH VIGNESHWAR</small></div><div className="descent-billboard billboard-three"><span>SYSTEMS / INDEPENDENT BUILD</span><strong>BELOW<br/>THE SURFACE.</strong><small>GLITCHIX OS / LINUX FROM SCRATCH</small></div></div><div className="descent-overlay"/>
 <div className={'descent-message '+(chapter===0?'active':'')} aria-hidden={chapter!==0}><h1 className="wide-heading"><GlitchText>CURIOUS MIND.</GlitchText><GlitchText>CRITICAL THINKING.</GlitchText><GlitchText className="lavender">SYSTEMS BUILDER.</GlitchText></h1><p>HANISH VIGNESHWAR / SECURITY, AI & SYSTEMS</p><a className="cut-button" href="#work" tabIndex={chapter===0?0:-1}>Explore my work <ArrowDown size={15}/></a></div>
 <div className={'descent-message '+(chapter===1?'active':'')} aria-hidden={chapter!==1}><h2 className="wide-heading"><GlitchText>UNDERSTAND</GlitchText><GlitchText>THE SYSTEM.</GlitchText><GlitchText className="lavender">FIND ITS EDGES.</GlitchText></h2><p>APPLIED CRYPTOGRAPHY. DISTRIBUTED COMPUTING. CONTINUAL LEARNING.</p><a className="cut-button" href="#work" tabIndex={chapter===1?0:-1}>Explore my work <ArrowDown size={15}/></a></div>
 <div className={'descent-message '+(chapter===2?'active':'')} aria-hidden={chapter!==2}><h2 className="wide-heading"><GlitchText>IDEAS MEAN MORE</GlitchText><GlitchText>WHEN YOU</GlitchText><GlitchText className="lavender">BUILD THEM.</GlitchText></h2><p>IMPLEMENTED, TESTED AND DOCUMENTED — INCLUDING THE LIMITS.</p><a className="cut-button" href="#work" tabIndex={chapter===2?0:-1}>Inside the work <ArrowDown size={15}/></a></div>
 <span className="descent-coordinate">13.0837° N / 80.2707° E &nbsp; CHENNAI</span><div className="descent-rail"><div ref={progress}/></div><span className="descent-instruction">SCROLL TO DESCEND <ArrowDown size={12}/></span><button className="descent-pause" onClick={()=>setPaused(!paused)} aria-pressed={paused}>{paused?<Play size={12}/>:<Pause size={12}/>} {paused?'Resume lights':'Pause lights'}</button><div className="descent-fade"/></div></section>
}
