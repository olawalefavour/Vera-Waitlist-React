"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { BookOpen, Check, CheckCircle2, CircleHelp, FlaskConical, Globe2, Layers3, Lightbulb, Loader2, Menu, MessageSquare, Pause, Play, Search, ShieldCheck, Sparkles, Users, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { submitWaitlist } from "@/lib/waitlist";

type Modal = "waitlist" | "video" | "privacy" | "terms" | null;
const faqs = [
  ["What is Vera Ecosystem?", "Vera is an ecosystem for people building meaningful solutions. We connect learning, research, and idea validation, starting in Africa with a global outlook. Vera Foundry is the idea-validation platform we’re building within that ecosystem."],
  ["What will I be able to do with Vera Foundry?", "Discover problems through research and real-world data, challenge an idea with AI, explore possible product scenarios, and gather feedback from real people. The goal is to help you decide what to build, what to change, and what to test next."],
  ["Does AI replace talking to real people?", "No. An AI simulation is a way to explore assumptions, not proof of demand. Vera brings research, simulation, and human feedback together so you can see what is supported by evidence and what still needs testing."],
  ["Who can join the waitlist?", "Founders, builders, researchers, investors, students, and anyone curious about solving real problems. You can join with an early idea, an existing product, or simply an interest in the ecosystem."],
  ["When will Vera launch?", "We’re currently building Vera Foundry. A launch date has not been announced. Join the waitlist for progress updates and an invitation when early access becomes available."],
  ["Is joining the waitlist free?", "Yes. Joining the waitlist is free and does not commit you to a paid plan. Product pricing will be shared when it is ready."],
];

function Brand() {
  return <a className="brand" href="#home" aria-label="Vera Ecosystem home"><span className="brand-crop"><img src="/assets/vera-logo.png" alt="Vera Ecosystem" width="2000" height="2000" /></span></a>;
}

function CardText({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return <span className="card-text-reveal" style={{ "--text-delay": `${delay}ms` } as CSSProperties}>{children}</span>;
}

function PartnerCarousel() {
  const [paused, setPaused] = useState(false);
  return <section className="partners" aria-label="Vera community and partners">
    <div className="partner-heading"><p>Good things are built together.</p><button className="partner-motion-toggle" aria-label={paused ? "Resume logo animation" : "Pause logo animation"} title={paused ? "Resume logo animation" : "Pause logo animation"} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play size={14} /> : <Pause size={14} />}</button></div>
    <div className="partner-carousel">
      <div className="partner-track" data-paused={paused}>
        {[0, 1, 2].map(copy => <div className="partner-line" key={copy} aria-hidden={copy > 0 ? true : undefined}>
          <a href="https://skillswapafrica.com" target="_blank" rel="noreferrer" className="skillswap-crop" aria-label="SkillSwap Africa website" tabIndex={copy === 0 ? 0 : -1}><img src="/assets/skillswap-logo.png" alt={copy === 0 ? "SkillSwap Africa" : ""} width="2000" height="2000" /></a>
          <span className="partner-divider" />
          <div className="partner-group"><img src="/assets/partner-logos.png" alt={copy === 0 ? "FUTA Techies, Global Trust Energy, Chase Financial Services, and Nino.ww" : ""} width="1080" height="1350" /></div>
        </div>)}
      </div>
    </div>
  </section>;
}

function WaitlistForm() {
  const [role, setRole] = useState("Founder");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const busy = useRef(false);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    if (values.get("botcheck")) return;
    busy.current = true; setStatus("loading"); setError("");
    try {
      await submitWaitlist({ name: String(values.get("name") || "").trim(), email: String(values.get("email") || "").trim(), role, idea: String(values.get("idea") || "").trim() });
      setStatus("success"); form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn’t confirm your signup. Please try again."); setStatus("error");
    } finally { busy.current = false; }
  }
  if (status === "success") return <div className="signup-success" role="status"><span className="success-icon"><CheckCircle2 /></span><h3>You’re on the list.</h3><p>Thanks for being part of Vera’s beginning. We’ll email you when there’s news about early access.</p><span className="success-note">Your next chapter starts with evidence.</span></div>;
  return <form className="waitlist-form" onSubmit={handleSubmit}>
    <div className="form-pair"><label htmlFor="waitlist-name">Your name<input id="waitlist-name" name="name" autoComplete="name" placeholder="Your full name" required maxLength={100} disabled={status === "loading"} /></label><label htmlFor="waitlist-email">Email address<input id="waitlist-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} disabled={status === "loading"} /></label></div>
    <div className="field"><label htmlFor="waitlist-role">I’m joining as a</label><Select value={role} onValueChange={setRole} disabled={status === "loading"}><SelectTrigger id="waitlist-role" className="role-select"><SelectValue /></SelectTrigger><SelectContent position="popper">{["Founder", "Builder", "Researcher", "Investor", "Student", "Other"].map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select></div>
    <label htmlFor="waitlist-idea">What are you exploring? <span className="optional">Optional</span><textarea id="waitlist-idea" name="idea" placeholder="A problem, an idea, or something you’re curious about…" rows={3} maxLength={1500} disabled={status === "loading"} /></label>
    <div className="honeypot" aria-hidden="true"><label>Leave this empty<input name="botcheck" type="checkbox" tabIndex={-1} autoComplete="off" /></label></div>
    {error && <p className="form-error" role="alert">{error}</p>}
    <button type="submit" className="button blue full" disabled={status === "loading"}>{status === "loading" ? <><Loader2 className="spinner" size={18} /> Joining…</> : "Join the waitlist"}</button>
    <p className="form-note"><ShieldCheck size={16} /> We’ll use your details for Vera updates and early access.</p>
  </form>;
}

function ProductPreview() {
  return <div className="product-window">
    <div className="window-top"><div className="window-controls" aria-hidden="true"><i /><i /><i /></div><span>Vera Foundry</span><span className="preview-label">Concept preview</span></div>
    <Tabs defaultValue="research" className="product-tabs">
      <div className="product-sidebar"><span className="sidebar-title">YOUR IDEA, EXAMINED.</span><TabsList className="preview-nav" aria-label="Explore the Vera Foundry concept"><TabsTrigger value="research"><BookOpen size={17} /> Discover</TabsTrigger><TabsTrigger value="simulate"><Sparkles size={17} /> Simulate</TabsTrigger><TabsTrigger value="feedback"><Users size={17} /> Validate</TabsTrigger></TabsList><div className="sidebar-tip"><Lightbulb size={21} /><p>A better question is a good place to start.</p></div></div>
      <div className="preview-main">
        <TabsContent value="research"><span className="small-label">01 / DISCOVER THE PROBLEM</span><h3>Start with what’s real.</h3><p className="preview-intro">Connect an observation to research, then find the question worth exploring.</p><div className="example-query"><Search size={17} /><span>Making everyday deliveries more reliable</span></div><div className="example-research"><span className="tag">Illustrative example</span><h4>When finding the address becomes the problem</h4><p>Explore the gap between a customer’s location and a delivery that reaches their door.</p><div className="research-tags"><span>Logistics</span><span>Customer experience</span><span>Urban mobility</span></div></div><div className="insight-note"><BookOpen size={18} /><span>Research and sources would appear here in the product.</span></div></TabsContent>
        <TabsContent value="simulate"><span className="small-label">02 / CHALLENGE THE IDEA</span><h3>Explore the “what if”.</h3><p className="preview-intro">Use AI to uncover assumptions before you build around them.</p><div className="scenario"><span className="tag">Illustrative scenario</span><h4>A shareable location ID for online orders</h4><div><span>Assumption</span><p>Customers will share a location ID at checkout.</p></div><div><span>What to explore</span><p>Trust, setup effort, phone access, and delivery habits.</p></div><div><span>Next test</span><p>Compare a simple prototype with the current address flow.</p></div></div><div className="insight-note"><CircleHelp size={18} /><span>A simulation suggests questions. It does not prove demand.</span></div></TabsContent>
        <TabsContent value="feedback"><span className="small-label">03 / LISTEN TO REAL PEOPLE</span><h3>Let people challenge it.</h3><p className="preview-intro">Bring the idea to the people who actually experience the problem.</p><div className="feedback-example"><span className="tag">Example interview plan</span><h4>Understand the last delivery that went wrong.</h4><ul><li><CheckCircle2 size={17} /> Speak with buyers and online vendors.</li><li><CheckCircle2 size={17} /> Ask about a real, recent experience.</li><li><CheckCircle2 size={17} /> Test the smallest useful prototype.</li><li><CheckCircle2 size={17} /> Compare feedback with the assumptions.</li></ul></div><div className="insight-note"><MessageSquare size={18} /><span>Capture evidence that helps you build, rethink, or test again.</span></div></TabsContent>
      </div>
    </Tabs>
  </div>;
}

export default function Home() {
  const [modal, setModal] = useState<Modal>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const lastFocus = useRef<HTMLElement | null>(null);
  const openModal = (value: Exclude<Modal, null>) => { lastFocus.current = document.activeElement as HTMLElement; setVideoError(false); setModal(value); setMenuOpen(false); };
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: 0.12 });
    document.querySelectorAll(".reveal, .hero-cards").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    type ToolRegistry = { registerTool: (tool: { name: string; description: string; inputSchema: object; annotations: { readOnlyHint: boolean }; execute: (input: unknown) => Promise<object> }, options: { signal: AbortSignal }) => void | Promise<void> };
    const registry = (document as Document & { modelContext?: ToolRegistry }).modelContext;
    if (!registry?.registerTool) return;
    const lifecycle = new AbortController();
    try {
      void Promise.resolve(registry.registerTool({
        name: "start_vera_waitlist_signup", description: "Open Vera’s waitlist form for the visitor to review and complete. Does not submit any information.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false }, annotations: { readOnlyHint: false },
        async execute(input) {
          if (!input || typeof input !== "object" || Array.isArray(input) || Object.keys(input).length) throw new Error("Expected an empty object.");
          lastFocus.current = document.activeElement as HTMLElement;
          setModal("waitlist"); setMenuOpen(false);
          await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
          return { formOpen: document.getElementById("waitlist-name") !== null, submitted: false };
        },
      }, { signal: lifecycle.signal })).catch(() => {});
    } catch { /* Optional browser enhancement. The visible form stays available. */ }
    return () => lifecycle.abort();
  }, []);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div id="home" className="site-shell">
      <header className="site-header"><Brand /><nav className="desktop-nav" aria-label="Main navigation"><a href="#about">Why Vera</a><a href="#how-it-works">How it works</a><a href="#foundry">The Foundry</a><a href="#faq">FAQs</a></nav><button className="button blue nav-cta" onClick={() => openModal("waitlist")}>Get early access</button><button className="menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></header>
      {menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{[["Why Vera", "about"], ["How it works", "how-it-works"], ["The Foundry", "foundry"], ["FAQs", "faq"]].map(([name,id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{name}</a>)}<button className="button blue" onClick={() => openModal("waitlist")}>Get early access</button></nav>}
      <main id="main">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-top"><div><span className="eyebrow light"><span className="status-dot" /> A new beginning for bold ideas</span><h1 id="hero-heading">Great ideas.<br />Real evidence.<br /><span>Better beginnings.</span></h1></div><div className="hero-copy"><p>The world doesn’t need more guesswork.<br />It needs what you’re building.</p><p className="hero-description">Turn a promising idea into something people need. Discover real problems, explore possibilities with AI, and learn from real people.</p><button className="button white" onClick={() => openModal("waitlist")}>Join the waitlist</button><span className="access-note">Free to join. Built for what comes next.</span></div></div>
          <div className="hero-pillars"><span><BookOpen /> Real-world research</span><span><Sparkles /> AI-powered exploration</span><span><Users /> Real human feedback</span></div>
          <div className="hero-cards">
            <div className="research-card">
              <div className="card-kicker"><CardText>FIND YOUR STARTING POINT</CardText><BookOpen size={18} /></div>
              <h2><CardText delay={140}>Big solutions start</CardText><br /><CardText delay={260}>with better questions.</CardText></h2>
              <div className="research-line"><span className="mini-icon"><Search size={17} /></span><div><strong><CardText delay={380}>Find a real problem</CardText></strong><span><CardText delay={470}>Research before assumptions.</CardText></span></div></div>
              <div className="research-line"><span className="mini-icon cyan"><FlaskConical size={17} /></span><div><strong><CardText delay={570}>Make room for discovery</CardText></strong><span><CardText delay={660}>Test before going all in.</CardText></span></div></div>
            </div>
            <button className="video-card" onClick={() => openModal("video")} aria-label="Play the Vera Ecosystem explainer, 42 seconds">
              <img className="video-cover" src="/assets/vera-poster.jpg" alt="A scene from the Vera Ecosystem film" width="1280" height="720" />
              <span className="film-top"><CardText delay={80}>THE VERA STORY</CardText><span>00:42</span></span>
              <span className="play-circle"><Play fill="currentColor" size={23} /></span>
              <span className="film-bottom"><strong><CardText delay={310}>A little clarity.</CardText><br /><CardText delay={440}>A world of possibility.</CardText></strong><span><CardText delay={650}>Watch what we’re building</CardText></span></span>
            </button>
            <div className="idea-card">
              <div className="card-kicker"><CardText delay={140}>FROM IDEA TO EVIDENCE</CardText><Sparkles size={18} /></div>
              <div className="idea-flow"><div><span>01</span><strong><CardText delay={320}>Discover a problem</CardText></strong><BookOpen size={16} /></div><div><span>02</span><strong><CardText delay={490}>Challenge your idea</CardText></strong><Sparkles size={16} /></div><div><span>03</span><strong><CardText delay={660}>Listen to real people</CardText></strong><Users size={16} /></div></div>
              <span className="card-foot"><CheckCircle2 size={16} /><CardText delay={820}>Build with a clearer direction.</CardText></span>
            </div>
          </div><div className="hero-bottom"><span>ROOTED IN AFRICA. OPEN TO THE WORLD.</span><Globe2 size={17} /></div>
        </section>
        <PartnerCarousel />
        <section id="about" className="section about-section reveal"><div className="section-heading"><div><span className="eyebrow"><Layers3 size={14} /> The reason we’re here</span><h2>Build something<br />the world actually needs.</h2></div><p>Passion gets an idea started.<br />Evidence helps it go somewhere.</p></div><div className="about-grid"><div className="statement-card"><span className="giant-quote" aria-hidden="true">“</span><p>What if you could understand the problem <em>before</em> spending months building the solution?</p><span>THAT’S THE QUESTION BEHIND VERA.</span></div><div className="about-content"><h3>Less guessing.<br />More understanding.</h3><p>Too many good builders spend their time solving problems they haven’t had a chance to understand. We want to change where that journey begins.</p><p>Vera brings research, AI exploration, and human insight into one connected process, so your next step comes from a clearer picture.</p><div className="principle"><ShieldCheck size={22} /><span>AI opens possibilities.<br /><strong>Real evidence keeps us grounded.</strong></span></div></div></div></section>
        <section id="how-it-works" className="section how-section reveal"><div className="section-heading"><div><span className="eyebrow"><FlaskConical size={14} /> A clearer path forward</span><h2>Curiosity in.<br />Clarity out.</h2></div><p>Three connected ways to move<br />your idea closer to the real world.</p></div><div className="steps">{[
          {num:"01", Icon:BookOpen, title:"Find the real problem.", text:"Explore research papers and real-world data. Start with a need worth understanding, whether you have an idea already or not.", tag:"RESEARCH & DISCOVERY"},
          {num:"02", Icon:Sparkles, title:"Challenge the idea.", text:"Use AI to question your assumptions and explore how a solution might work. Find the gaps, trade-offs, and next questions.", tag:"AI & SIMULATION"},
          {num:"03", Icon:Users, title:"Bring in real people.", text:"Test what matters with the people you want to serve. Turn their feedback into a decision to build, rethink, or explore further.", tag:"FEEDBACK & VALIDATION"},
        ].map(({num,Icon,title,text,tag}) => <article className="step" key={num}><div className="step-top"><span>{num}</span><Icon size={26} /></div><h3>{title}</h3><p>{text}</p><span className="step-tag">{tag}</span></article>)}</div></section>
        <section id="foundry" className="foundry-section reveal"><div className="foundry-copy"><span className="eyebrow light"><Sparkles size={14} /> Inside the ecosystem</span><h2>Meet<br />Vera Foundry.</h2><p>Your idea’s first proving ground. A place to turn “I think” into “let’s find out”.</p><div className="foundry-benefits"><span><Check size={18} /> Discover evidence worth building on</span><span><Check size={18} /> Put assumptions under the microscope</span><span><Check size={18} /> Keep human feedback in the loop</span></div><button className="button white" onClick={() => openModal("waitlist")}>Be part of the beginning</button><span className="development-note">Currently in development</span></div><div className="preview-wrapper"><ProductPreview /><p className="prototype-note">An early look at the direction. The examples above are illustrative.</p></div></section>
        <section className="section ecosystem-section reveal"><span className="eyebrow"><Globe2 size={14} /> More than one product</span><div className="ecosystem-row"><h2>Learn. Explore.<br />Build what matters.</h2><div><p>Vera is growing an ecosystem around the people behind the ideas. SkillSwap Africa brings learning and community into that journey, while Vera Foundry focuses on discovery and validation.</p><p className="muted">Different starting points. A shared ambition.</p><a className="text-link" href="https://skillswapafrica.com" target="_blank" rel="noreferrer">Explore SkillSwap Africa</a></div></div></section>
        <section id="faq" className="section faq-section reveal"><div className="faq-heading"><span className="eyebrow"><MessageSquare size={14} /> A little more clarity</span><h2>Good questions.<br />Honest answers.</h2><p>Here’s what to know<br />before you join us.</p></div><Accordion type="single" collapsible className="faq-list">{faqs.map(([question,answer],index) => <AccordionItem key={question} value={`question-${index}`}><AccordionTrigger>{question}</AccordionTrigger><AccordionContent>{answer}</AccordionContent></AccordionItem>)}</Accordion></section>
        <section className="final-cta reveal"><div><span className="eyebrow light">THE NEXT CHAPTER STARTS HERE</span><h2>Your idea could be<br />someone’s breakthrough.</h2><p>Let’s find out what it can become.</p></div><div><button className="button white" onClick={() => openModal("waitlist")}>Join the Vera waitlist</button><span>For the curious. The builders. The what-if people.</span></div></section>
      </main>
      <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><Brand /><p>Helping bold ideas find<br />their place in the real world.</p></div><div className="footer-links"><span>EXPLORE</span><a href="#about">Why Vera</a><a href="#how-it-works">How it works</a><a href="#foundry">Vera Foundry</a></div><div className="footer-links"><span>BE PART OF IT</span><button onClick={() => openModal("waitlist")}>Join the waitlist</button><button onClick={() => openModal("video")}>Watch our story</button><a href="https://skillswapafrica.com" target="_blank" rel="noreferrer">SkillSwap Africa</a></div><div className="footer-note"><Globe2 size={24} /><p>Built from Africa.<br />For a world of possibilities.</p></div></div><div className="footer-bottom"><span>© 2026 Vera Ecosystem. Building with evidence.</span><div><button onClick={() => openModal("privacy")}>Privacy</button><button onClick={() => openModal("terms")}>Terms</button><a href="#home">Back to top</a></div></div></footer>
    </div>
    <Dialog open={modal !== null} onOpenChange={open => { if (!open) setModal(null); }}><DialogContent className={`vera-dialog ${modal === "video" ? "video-dialog" : ""}`} onCloseAutoFocus={event => { event.preventDefault(); lastFocus.current?.focus(); }}>
      {modal === "waitlist" && <><span className="eyebrow"><Sparkles size={14} /> Be part of the beginning</span><DialogTitle className="modal-title">Big things start<br />with a little curiosity.</DialogTitle><DialogDescription>Join Vera’s waitlist for product updates and early access.</DialogDescription><WaitlistForm /></>}
      {modal === "video" && <><DialogTitle className="modal-title">The Vera story</DialogTitle><DialogDescription>From a promising idea to something the world needs. A 42-second introduction.</DialogDescription><video className="explainer-video" src="/assets/vera-explainer.mp4" poster="/assets/vera-poster.jpg" controls autoPlay playsInline preload="metadata" onError={() => setVideoError(true)}>{"Your browser does not support video playback."}</video>{videoError && <p role="alert">The video could not load. <a href="/assets/vera-explainer.mp4" download>Download the video</a> to watch it.</p>}<p className="video-summary">Vera brings research, AI exploration, and feedback from real people together to help founders make better decisions before they build.</p></>}
      {modal === "privacy" && <><DialogTitle className="modal-title">Waitlist privacy</DialogTitle><DialogDescription>How information from this form is used.</DialogDescription><div className="legal-copy"><p>When you join, your name, email, selected role, and anything you choose to write about your idea are sent to Vera’s form collector.</p><p>The Vera team can use these details to manage the waitlist, understand who is interested, and send product updates or early-access invitations. Please don’t include confidential information about an idea.</p><p>This page does not use advertising trackers or store your form details in browser storage. You can request removal by replying to a Vera update.</p><p>Joining is optional. Only provide details you are comfortable sharing with the Vera team.</p></div></>}
      {modal === "terms" && <><DialogTitle className="modal-title">Waitlist terms</DialogTitle><DialogDescription>A few things to know about joining.</DialogDescription><div className="legal-copy"><p>Vera Foundry is in development. The page explains the intended direction; the interactive preview contains illustrative examples, not results from a live product.</p><p>Joining the waitlist is free. It does not guarantee access on a particular date, reserve a specific feature, or commit you to a paid service. Plans and features may change as we learn.</p><p>AI exploration and simulation can help frame questions. They do not prove demand, predict business success, or replace research and conversations with real people.</p></div></>}
    </DialogContent></Dialog>
  </>;
}
