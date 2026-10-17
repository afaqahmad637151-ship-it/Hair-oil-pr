import {useEffect,useState} from 'react';
import {motion,AnimatePresence,useScroll,useReducedMotion} from 'framer-motion';
import {ShoppingBag,Leaf,Sparkles,Droplets,ShieldCheck,Sun,Play,X,Plus,Minus,Trash2,ChevronDown} from 'lucide-react';
import {CONFIG as C} from '../config.js';

const IMG='/images/genz-product.jpeg';
const money=n=>n==null?'Price TBC':`${C.currency} ${n.toLocaleString()}`;
const NAV=['Home','Story','Benefits','Ingredients','Videos','FAQs','Contact'];
const BEN=[[Sparkles,'Supports Stronger-Looking Hair'],[Droplets,'Helps Nourish the Hair'],[ShieldCheck,'Helps Reduce the Appearance of Dandruff'],[Sun,'Adds Natural-Looking Shine'],[Leaf,'Helps Care for the Scalp'],[Leaf,'Herbal-Inspired Haircare']];
const FAQ=[['What size is the bottle?','200 ml (as printed on the pack).'],['How do I use it?','[Awaiting manufacturer instructions]'],['What are the ingredients?','[Awaiting full ingredient list from brand owner]'],['Delivery?','[Awaiting delivery areas, charges and times]'],['Payment methods?',C.paymentOptions],['Returns & exchanges?','[Awaiting return policy]']];
const STEPS=['Step 1 — [to be confirmed]','Step 2 — [to be confirmed]','Step 3 — [to be confirmed]'];
const go=id=>document.getElementById(id.toLowerCase())?.scrollIntoView({behavior:'smooth'});

const Reveal=({children,d=0})=>{const r=useReducedMotion();return <motion.div initial={r?false:{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-80px'}} transition={{duration:.8,delay:d}}>{children}</motion.div>};
const Logo=()=><span className="logo"><b>Gen Z</b> Care</span>;

function Video({src,title}){
  const [play,setPlay]=useState(false),[ok,setOk]=useState(true);
  return <div className="video">{play&&ok?<video src={src} controls autoPlay playsInline preload="none" poster={IMG} onError={()=>setOk(false)}/>:
    <button onClick={()=>setPlay(true)} aria-label={`Play ${title}`} style={{backgroundImage:`url(${IMG})`}}><span><Play/></span><em>{title}</em>
    {!ok&&<small>Video file not added yet — see README</small>}</button>}</div>;
}

export default function App(){
  const [cart,setCart]=useState(()=>{try{return JSON.parse(localStorage.getItem('genz-cart'))||0}catch{return 0}});
  const [qty,setQty]=useState(1),[open,setOpen]=useState(false),[solid,setSolid]=useState(false),[bump,setBump]=useState(0),[faq,setFaq]=useState(-1);
  const [form,setForm]=useState({name:'',phone:'',city:'',address:'',notes:''}),[err,setErr]=useState({}),[done,setDone]=useState('');
  const {scrollYProgress}=useScroll();
  useEffect(()=>{try{localStorage.setItem('genz-cart',JSON.stringify(cart))}catch{}},[cart]);
  useEffect(()=>{const f=()=>setSolid(scrollY>60);f();addEventListener('scroll',f);return()=>removeEventListener('scroll',f)},[]);
  const add=()=>{setCart(c=>c+qty);setBump(b=>b+1);setOpen(true)};
  const sub=C.price==null?null:cart*C.price;
  const validate=()=>{const e={};if(form.name.trim().length<2)e.name='Enter your name';if(!/^(\+?92|0)3\d{9}$/.test(form.phone.replace(/[\s-]/g,'')))e.phone='Enter a valid Pakistani mobile (e.g. 03XX XXXXXXX)';if(!form.city.trim())e.city='Enter your city';if(form.address.trim().length<10)e.address='Enter your complete address';setErr(e);return!Object.keys(e).length};
  const order=ev=>{ev.preventDefault();if(!cart){setDone('Your cart is empty.');return}if(!validate())return;
    const t=`New Gen Z Care order\nQty: ${cart} x Gen Z Natural Herbal Hair Oil 200ml\nSubtotal: ${money(sub)}\nName: ${form.name}\nPhone: ${form.phone}\nCity: ${form.city}\nAddress: ${form.address}\nNotes: ${form.notes||'-'}`;
    window.open(`https://wa.me/${C.whatsappNumber}?text=${encodeURIComponent(t)}`,'_blank');setDone('Order details opened in WhatsApp. Please press Send to confirm. (No online payment or order storage is active.)')};
  const F=(k,l,ta)=><label>{l}{ta?<textarea rows="2" value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}/>:<input value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}/>}{err[k]&&<small role="alert">{err[k]}</small>}</label>;

  return <>
    <motion.div className="progress" style={{scaleX:scrollYProgress}}/>
    <header className={solid?'nav solid':'nav'}><Logo/><nav aria-label="Main">{NAV.map(n=><a key={n} href={`#${n.toLowerCase()}`} onClick={e=>{e.preventDefault();go(n)}}>{n}</a>)}</nav>
      <div className="navr"><motion.button key={bump} animate={{scale:[1,1.3,1]}} className="icon" aria-label={`Cart, ${cart} items`} onClick={()=>setOpen(true)}><ShoppingBag size={20}/>{cart>0&&<i>{cart}</i>}</motion.button>
      <button className="btn sm" onClick={()=>go('product')}>Shop Now</button></div></header>

    <main>
    <section id="home" className="hero"><div className="fog"/>{[...Array(14)].map((_,i)=><span key={i} className="spark" style={{left:`${(i*37)%100}%`,animationDelay:`${i*.7}s`,animationDuration:`${6+i%5}s`}}/>)}
      <div className="hero-in"><div>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} className="eyebrow">Natural Herbal Hair Oil · Made in Pakistan</motion.p>
        <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:1,delay:.2}}>Nature's Power.<br/><em>Stronger Hair.</em></motion.h1>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.7}} className="lead">Gen Z Natural Herbal Hair Oil — an herbal-inspired formula in a 200 ml bottle, crafted for everyday hair and scalp care.</motion.p>
        <div className="row"><button className="btn" onClick={()=>go('product')}>SHOP NOW</button><button className="btn ghost" onClick={()=>go('ingredients')}>DISCOVER OUR FORMULA</button></div></div>
        <motion.img src={IMG} alt="Gen Z Natural Herbal Hair Oil 200 ml bottle floating above a rock with mountains behind" className="hero-img" initial={{opacity:0,scale:.9,y:60}} animate={{opacity:1,scale:1,y:0}} transition={{duration:1.4,ease:'easeOut'}}/></div>
      <ChevronDown className="scroll" aria-hidden/></section>

    <section id="story" className="sec"><Reveal><p className="eyebrow">Our Story</p><h2>Herbal-inspired care, <em>made in Pakistan</em></h2>
      <p className="lead c">Gen Z Care was created to bring a modern, botanical approach to everyday hair oiling. <span className="tbc">[Brand story to be supplied/confirmed by brand owner]</span></p></Reveal></section>

    <section id="benefits" className="sec dark"><h2>Benefits</h2><div className="grid">{BEN.map(([I,t],i)=><Reveal key={t} d={i*.08}><div className="card"><I color="#D6A64F"/><h3>{t}</h3></div></Reveal>)}</div>
      <p className="note">Individual results vary. Statements are not medical claims.</p></section>

    <section id="ingredients" className="sec"><h2>Ingredients</h2><Reveal><div className="card wide"><Leaf color="#D6A64F"/><p>The pack states it is <i>infused with 13 natural oils &amp; 20 herbs</i>. <span className="tbc">[Awaiting full ingredient list from brand owner — not invented here.]</span></p></div></Reveal></section>

    <section id="product" className="sec dark"><h2>The Product</h2><Reveal><div className="product"><img loading="lazy" src={IMG} alt="Gen Z Natural Herbal Hair Oil"/><div>
      <Logo/><h3>Gen Z Natural Herbal Hair Oil</h3><p>200 ml · Made in Pakistan</p><p className="price">{money(C.price)}</p>
      <div className="qty"><button aria-label="Decrease" onClick={()=>setQty(q=>Math.max(1,q-1))}><Minus size={16}/></button><b>{qty}</b><button aria-label="Increase" onClick={()=>setQty(q=>q+1)}><Plus size={16}/></button></div>
      <div className="row"><button className="btn" onClick={add}>Add to Cart</button><button className="btn ghost" onClick={()=>{setCart(c=>c+qty);setOpen(true)}}>Buy Now</button></div></div></div></Reveal></section>

    <section id="videos" className="sec"><h2>Watch</h2><div className="grid2"><Video src={C.videos.main} title="Main Advertisement"/><Video src={C.videos.showcase} title="Product Showcase"/></div></section>

    <section className="sec dark"><h2>How to Use</h2><div className="grid">{STEPS.map(s=><div className="card" key={s}><h3>{s}</h3></div>)}</div></section>

    <section className="sec"><h2>Testimonials</h2><p className="tbc c">Genuine customer feedback will appear here once collected.</p></section>

    <section id="faqs" className="sec dark"><h2>FAQs</h2><div className="faq">{FAQ.map(([q,a],i)=><div key={q}><button aria-expanded={faq===i} onClick={()=>setFaq(faq===i?-1:i)}>{q}<ChevronDown size={18}/></button>{faq===i&&<p>{a}</p>}</div>)}</div></section>

    <section className="sec cta"><h2>Nature's Power. <em>Stronger Hair.</em></h2><button className="btn" onClick={()=>go('product')}>GET YOUR GEN Z HAIR OIL</button></section>
    </main>

    <footer id="contact"><Logo/><p>WhatsApp: {C.whatsappNumber} · Email, address &amp; social links: [to be added]</p><p>Shipping · Privacy · Returns policy: [to be added]</p></footer>

    <AnimatePresence>{open&&<>
      <motion.div className="veil" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setOpen(false)}/>
      <motion.aside className="drawer" role="dialog" aria-modal="true" aria-label="Cart" initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'tween',duration:.35}}>
        <div className="dh"><h3>Your Cart</h3><button className="icon" aria-label="Close cart" onClick={()=>setOpen(false)}><X/></button></div>
        {cart===0?<p>Your cart is empty.</p>:<>
        <div className="line"><img src={IMG} alt=""/><div><b>Gen Z Natural Herbal Hair Oil 200ml</b><p>{money(C.price)}</p>
          <div className="qty"><button aria-label="Decrease" onClick={()=>setCart(c=>Math.max(1,c-1))}><Minus size={14}/></button><b>{cart}</b><button aria-label="Increase" onClick={()=>setCart(c=>c+1)}><Plus size={14}/></button>
          <button aria-label="Remove" onClick={()=>setCart(0)}><Trash2 size={14}/></button></div></div></div>
        <p>Subtotal: <b>{sub==null?'Price TBC':money(sub)}</b></p><p className="note">Delivery: {C.deliveryCharge==null?'confirmed on order':money(C.deliveryCharge)}</p>
        <form onSubmit={order} noValidate>{F('name','Full name')}{F('phone','Phone number')}{F('city','City')}{F('address','Complete address',1)}{F('notes','Order notes (optional)',1)}
          <button className="btn" type="submit">Order via WhatsApp</button></form></>}
        {done&&<p role="status" className="ok">{done}</p>}
      </motion.aside></>}</AnimatePresence>
  </>;
}
