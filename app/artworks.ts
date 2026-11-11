export const artworks=[
 {id:'starry',title:'The Starry Night',artist:'Vincent van Gogh',year:'1889',image:'/starry-night.webp',file:'Van Gogh - Starry Night - Google Art Project.jpg',note:'A beginning in motion. The opening room.'},
 {id:'wave',title:'The Great Wave off Kanagawa',artist:'Katsushika Hokusai',year:'c. 1831',image:'/art/wave.webp',file:'Great Wave off Kanagawa2.jpg',note:'Energy, structure and the systems beneath the surface.'},
 {id:'leonardo',title:'Vitruvian Man',artist:'Leonardo da Vinci',year:'c. 1490',image:'/art/leonardo.webp',file:'Leonardo da Vinci- Vitruvian Man.JPG',note:'Observation, proportion and the discipline of asking why.'},
 {id:'monet',title:'Waterlilies',artist:'Claude Monet',year:'c. 1906',image:'/art/monet.webp',file:'Claude Monet - Waterlilies - Google Art Project.jpg',note:'A quieter room. Space for the person behind the work.'},
 {id:'kiss',title:'The Kiss',artist:'Gustav Klimt',year:'1908',image:'/art/kiss.webp',file:'The Kiss - Gustav Klimt - Google Cultural Institute.jpg',note:'Pattern, detail and a little warmth between disciplines.'},
 {id:'kandinsky',title:'Composition VIII',artist:'Wassily Kandinsky',year:'1923',image:'/art/kandinsky.webp',file:'Kandinsky - Composition 8, July 1923.jpg',note:'Independent elements, brought into one composition.'},
 {id:'pearl',title:'Girl with a Pearl Earring',artist:'Johannes Vermeer',year:'c. 1665',image:'/art/pearl.webp',file:'1665 Girl with a Pearl Earring.jpg',note:'Light, attention and the power of a small detail.'},
 {id:'venus',title:'The Birth of Venus',artist:'Sandro Botticelli',year:'c. 1485',image:'/art/venus.webp',file:'Sandro Botticelli - La nascita di Venere - Google Art Project.jpg',note:'A study in rhythm, line and new beginnings.'},
];
export const artworkSource=(file:string)=>'https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(file);
