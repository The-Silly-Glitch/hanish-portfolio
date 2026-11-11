export default function GlitchText({children,className=''}:{children:string;className?:string}){
 return <span className={'glitch-text '+className}>{children}<span className="glitch-copy glitch-cyan" aria-hidden="true">{children}</span><span className="glitch-copy glitch-violet" aria-hidden="true">{children}</span></span>
}
