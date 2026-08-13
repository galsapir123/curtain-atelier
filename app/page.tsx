"use client";

import { useEffect, useRef, useState } from "react";

const curtains = [
  { name: "לינן טבעי", style: "קפל גל", color: "אבן בהירה", fabric: "פשתן רחוץ", opacity: "חצי שקוף", image: "/curtains/01-natural-linen.png", note: "פשתן רחוץ בגוון אבן בהירה, עם אריגה טבעית גלויה וקפלי גל רכים שמסננים את האור." },
  { name: "רוך לבן", style: "קפל מכווץ", color: "לבן שבור", fabric: "ווואל פרימיום", opacity: "שקוף", image: "/curtains/02-white-voile.png", note: "ווואל לבן שבור, קליל ושקוף, בתפירת כיווץ עדינה שמכניסה אור טבעי ושומרת על פרטיות רכה." },
  { name: "חול מדברי", style: "קפל שטוח", color: "בז׳ חול חם", fabric: "כותנה ארוגה", opacity: "חצי אטום", image: "/curtains/03-sand-cotton.png", note: "כותנה ארוגה בגוון חול חם, עם קפלים שטוחים ומוגדרים ומרקם עשיר שמתאים לחלל מינימליסטי." },
  { name: "הצללה שקטה", style: "קפל גל", color: "גרייז׳ כהה", fabric: "Blackout תלת־שכבתי", opacity: "האפלה מלאה", image: "/curtains/04-greige-blackout.png", note: "בד האפלה כבד בגרייז׳ כהה, עם קפלי גל עמוקים. אטום לחלוטין ומתאים במיוחד לחדרי שינה." },
  { name: "גל אירופאי", style: "קפל גל אחיד", color: "שמנת", fabric: "אריג טקסטורה", opacity: "חצי שקוף", image: "/curtains/05-cream-wave.png", note: "אריג שמנת חצי שקוף עם גלי S אחידים מראש הווילון ועד המכפלת, למראה מדויק של מלון בוטיק." },
  { name: "רומאי רך", style: "וילון רומאי", color: "מוקה חם", fabric: "פשתן מעורב", opacity: "חצי אטום", image: "/curtains/06-mocha-roman.png", note: "וילון רומאי מפשתן מעורב בגוון מוקה, עם קיפולים אופקיים רחבים ושליטה נוחה בכמות האור." },
  { name: "קטיפה עמוקה", style: "קפל משולש", color: "קרמל עמוק", fabric: "קטיפה רכה", opacity: "אטום", image: "/curtains/07-caramel-velvet.png", note: "קטיפה אטומה בגוון קרמל עמוק, בעלת ברק טבעי וקפלים משולשים תפורים ביד למראה עשיר." },
  { name: "שכבות אור", style: "מערכת כפולה", color: "לבן וטאופ", fabric: "ווואל + האפלה", opacity: "מתכווננת", image: "/curtains/08-double-layer.png", note: "שתי שכבות נפרדות: ווואל לבן שקוף לשעות היום ובד טאופ אטום להצללה מלאה בערב." },
  { name: "מינימל אפור", style: "קפל גל במסילה נסתרת", color: "אפור פנינה", fabric: "אריג טקסטורה", opacity: "חצי אטום", image: "/curtains/09-pearl-grey.png", note: "אריג טקסטורה באפור פנינה, קפלי גל שקטים ומסילה סמויה בקו התקרה למראה מודרני ונקי." },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<(typeof curtains)[number] | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [lightLevel, setLightLevel] = useState(62);
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    let target = Math.min(1, window.scrollY / Math.max(520, window.innerHeight * 0.95));
    let current = target;
    let previous = current;
    let frame = 0;
    const update = () => { target = Math.min(1, window.scrollY / Math.max(520, window.innerHeight * 0.95)); };
    const animate = () => {
      current += (target - current) * 0.075;
      const velocity = Math.max(-1, Math.min(1, (current - previous) * 85));
      previous = current;
      hero.style.setProperty("--open", current.toFixed(4));
      hero.style.setProperty("--sway", velocity.toFixed(3));
      hero.style.setProperty("--gather", (1 - current * 0.72).toFixed(4));
      hero.style.setProperty("--room-light", (0.62 + current * 0.38).toFixed(4));
      hero.style.setProperty("--room-scale", (1.06 - current * 0.06).toFixed(4));
      const titleIn = Math.max(0, Math.min(1, (current - 0.12) * 2.1));
      const titleOut = 1 - Math.max(0, Math.min(1, (current - 0.64) / 0.2));
      const aboutProgress = Math.max(0, Math.min(1, (current - 0.6) / 0.4));
      hero.style.setProperty("--hero-opacity", (titleIn * titleOut).toFixed(4));
      hero.style.setProperty("--hero-y", `${((1 - current) * 30).toFixed(2)}px`);
      hero.style.setProperty("--hero-scale", (0.97 + current * 0.03).toFixed(4));
      hero.style.setProperty("--glow-opacity", (current * 0.8).toFixed(4));
      hero.style.setProperty("--panel-light", (1 - current * 0.08).toFixed(4));
      hero.style.setProperty("--fold-opacity", (0.18 + current * 0.5).toFixed(4));
      hero.style.setProperty("--hint-opacity", Math.max(0, 1 - current * 3).toFixed(4));
      hero.style.setProperty("--sway-left", `${(-velocity * 0.28).toFixed(3)}deg`);
      hero.style.setProperty("--sway-right", `${(velocity * 0.28).toFixed(3)}deg`);
      hero.style.setProperty("--edge-shift", `${(velocity * 8).toFixed(2)}px`);
      hero.style.setProperty("--about-opacity", aboutProgress.toFixed(4));
      hero.style.setProperty("--about-y", `${((1 - aboutProgress) * 110).toFixed(2)}px`);
      hero.style.setProperty("--about-scale", (0.94 + aboutProgress * 0.06).toFixed(4));
      frame = requestAnimationFrame(animate);
    };
    update();
    animate();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <main dir="rtl">
      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="חזרה להתחלה">
          <span className="brand-mark">ו</span>
          <span><b>וילון</b><small>תפירה · מדידה · התקנה</small></span>
        </a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="פתיחת תפריט" aria-expanded={menuOpen}>☰</button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"} onClick={() => setMenuOpen(false)}>
          <a href="#about">אודות</a><a href="#process">התהליך</a><a href="#collection">הקולקציה</a><a href="#contact">יצירת קשר</a>
        </nav>
        <a className="nav-cta" href="#contact">לתיאום מדידה <span>←</span></a>
      </header>

      <section id="top" className="curtain-stage" aria-label="פתיחת וילון בגלילה">
        <div className="hero-sticky" ref={heroRef}>
          <div className="hero-room" />
          <div className="reveal-glow" />
          <div className="curtain-track"><span /></div>
          <div className="hero-copy">
            <p className="eyebrow">וילונות שנתפרים בשביל הבית שלך</p>
            <h1>האור הנכון.<br /><em>בדיוק במידה.</em></h1>
            <p className="hero-sub">מהמדידה הראשונה ועד הקפל האחרון — אני תופר ומתקין כל וילון בעצמי, בהתאמה מלאה לחלל.</p>
            <a className="primary-button" href="#collection">לגלות את הקולקציה <span>↓</span></a>
          </div>
          <div id="about" className="reveal-about">
            <div className="reveal-about-image">
              <img src="/curtains/01-natural-linen.png" alt="וילון פשתן טבעי בתפירה אישית" />
              <span className="measure-chip">± 1 ס״מ<br /><small>דיוק במדידה</small></span>
            </div>
            <div className="reveal-about-copy">
              <p className="eyebrow">מאחורי הווילון</p>
              <h2>יד אחת.<br />מהמדידה עד התלייה.</h2>
              <p>אני מגיע לבית, מודד, מתאים את הבד לאור ולחלל, תופר בסטודיו ומתקין בעצמי. כך כל פרט נשאר מדויק — מהרוחב והגובה ועד הקפל האחרון.</p>
              <div className="about-facts"><span><b>01</b> מדידה בבית</span><span><b>02</b> תפירה אישית</span><span><b>03</b> התקנה וגימור</span></div>
              <a href="#process" className="glass-button">לראות איך זה קורה <span>↓</span></a>
            </div>
          </div>
          <div className="curtain-panel curtain-left"><div className="curtain-folds" /><div className="curtain-edge" /></div>
          <div className="curtain-panel curtain-right"><div className="curtain-folds" /><div className="curtain-edge" /></div>
          <div className="scroll-hint"><span>גלו את הבית מחדש</span><i /></div>
        </div>
      </section>

      <section id="process" className="process section-pad">
        <div className="process-head"><div><p className="eyebrow">הסטודיו בפעולה</p><h2>לא רק לקרוא.<br />להרגיש את הבד.</h2></div><p>שחקו עם כמות האור, עברו בין השלבים וראו איך וילון נולד — מהחלון הריק ועד לנפילה המדויקת.</p></div>
        <div className="process-grid">
          <div className="light-lab">
            <div className="lab-visual">
              <img src="/curtains/02-white-voile.png" alt="הדמיית מעבר אור דרך וילון ווואל" />
              <div className="lab-shade" style={{ opacity: (100 - lightLevel) / 118 }} />
              <span className="live-pill"><i /> הדמיית אור חיה</span>
              <div className="light-readout"><b>{lightLevel}%</b><span>אור בחלל</span></div>
            </div>
            <div className="lab-controls">
              <div><p className="eyebrow">בקרת שקיפות</p><h3>כמה אור תרצו להכניס?</h3></div>
              <input aria-label="כמות האור בחלל" type="range" min="8" max="100" value={lightLevel} onChange={(e) => setLightLevel(Number(e.target.value))} />
              <div className="light-presets"><button onClick={() => setLightLevel(92)} className={lightLevel === 92 ? "active" : ""}>ווואל</button><button onClick={() => setLightLevel(55)} className={lightLevel === 55 ? "active" : ""}>מסונן</button><button onClick={() => setLightLevel(12)} className={lightLevel === 12 ? "active" : ""}>האפלה</button></div>
            </div>
          </div>
          <div className="process-steps">
            <article className="process-step"><img src="/curtains/09-pearl-grey.png" alt="בדיקת וילון בזמן מדידה" /><span>01</span><div><h3>מודדים בבית</h3><p>רוחב, גובה, תקרה ומסילה — עד הסנטימטר.</p><small>45–60 דקות</small></div></article>
            <article className="process-step"><img src="/curtains/03-sand-cotton.png" alt="בחירת בד כותנה בגוון חול" /><span>02</span><div><h3>בוחרים בד</h3><p>גוון, אריגה ושקיפות מול האור האמיתי בבית.</p><small>דוגמאות אצלכם</small></div></article>
            <article className="process-step"><img src="/curtains/07-caramel-velvet.png" alt="קפלים תפורים בבד קטיפה" /><span>03</span><div><h3>תופרים בסטודיו</h3><p>גזירה, מכפלות וקפלים בעבודת יד.</p><small>7–14 ימי עבודה</small></div></article>
            <article className="process-step"><img src="/curtains/08-double-layer.png" alt="וילון כפול לאחר התקנה" /><span>04</span><div><h3>מתקינים ומכוונים</h3><p>מסילה, תלייה, אידוי ובדיקת הנפילה.</p><small>1–3 שעות</small></div></article>
          </div>
        </div>
      </section>

      <section className="projects section-pad">
        <div className="projects-head"><div><p className="eyebrow">בתים שקיבלו מסגרת חדשה</p><h2>הווילון משנה<br />את כל החדר.</h2></div><div><p>שלושה חללים, שלוש רמות אור ושלושה סוגי בד. עברו בין הפרויקטים וראו איך בחירה נכונה הופכת את הווילון לחלק מהאדריכלות.</p><a href="#contact" className="outline-button">לתכנון החלל שלכם <span>←</span></a></div></div>
        <div className="project-stage">
          {[
            { image: "/projects/living-linen.png", title: "אור טבעי בסלון", place: "בית פרטי · סלון", fabric: "פשתן רחוץ", color: "אבן בהירה", light: "אור מסונן", story: "וילון פשתן רחב מקיר לקיר, שמרכך את אור הבוקר ונותן לחלל גובה, תנועה ושקט." },
            { image: "/projects/living-double-layer.png", title: "שתי שכבות, שליטה מלאה", place: "דירה עירונית · סלון", fabric: "ווואל + האפלה", color: "לבן וטאופ", light: "יום ולילה", story: "שתי מסילות נסתרות מאפשרות לעבור משקיפות מלאה לפרטיות והאפלה בלי לשנות את שפת החדר." },
            { image: "/projects/living-velvet.png", title: "קטיפה באור ערב", place: "בית מודרני · פינת אירוח", fabric: "קטיפה רכה", color: "קרמל עמוק", light: "האפלה מלאה", story: "קטיפה עשירה יוצרת קיר טקסטיל חם, משפרת את האקוסטיקה ומעניקה לחלל נוכחות בשעות הערב." },
          ].map((project, index) => <article className={activeProject === index ? "project-slide active" : "project-slide"} key={project.title} aria-hidden={activeProject !== index}>
            <img src={project.image} alt={`${project.title} — ${project.fabric} בגוון ${project.color}`} />
            <div className="project-gradient" />
            <div className="project-number">0{index + 1}</div>
            <div className="project-info"><p>{project.place}</p><h3>{project.title}</h3><span>{project.story}</span><dl><div><dt>בד</dt><dd>{project.fabric}</dd></div><div><dt>גוון</dt><dd>{project.color}</dd></div><div><dt>אור</dt><dd>{project.light}</dd></div></dl></div>
          </article>)}
          <div className="project-tabs" role="tablist" aria-label="בחירת פרויקט">
            {["סלון פשתן", "שכבות אור", "קטיפה בערב"].map((label, index) => <button role="tab" aria-selected={activeProject === index} className={activeProject === index ? "active" : ""} onClick={() => setActiveProject(index)} key={label}><span>0{index + 1}</span>{label}<i /></button>)}
          </div>
          <button className="project-next" aria-label="לפרויקט הבא" onClick={() => setActiveProject((activeProject + 1) % 3)}>←</button>
        </div>
      </section>

      <section id="collection" className="collection section-pad">
        <div className="collection-head"><div><p className="eyebrow">דוגמאות וסגנונות</p><h2>הקולקציה</h2></div><p>לחצו על כל וילון כדי לראות את סוג הבד, הצבע ורמת ההצללה.</p></div>
        <div className="gallery">
          {curtains.map((curtain, index) => <button className="curtain-card" key={curtain.name} onClick={() => setSelected(curtain)} aria-label={`פרטים על ${curtain.name}`}>
            <img src={curtain.image} alt={`${curtain.name} — ${curtain.fabric}`} />
            <div className="card-overlay"><span>0{index + 1}</span><div><h3>{curtain.name}</h3><p>{curtain.style} · {curtain.color}</p></div><b>↗</b></div>
          </button>)}
        </div>
      </section>

      <section id="contact" className="contact section-pad">
        <div className="contact-copy"><p className="eyebrow">מתחילים מהחלון שלכם</p><h2>רוצים לראות איך הבית<br /><em>יכול להרגיש?</em></h2><p>השאירו פרטים לתיאום מדידה וייעוץ בבית. נחזור אליכם עם כל מה שצריך כדי להתחיל.</p><div className="contact-facts"><span>✓ ייעוץ אישי בבית</span><span>✓ הצעת מחיר מסודרת</span><span>✓ בלי התחייבות</span></div></div>
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          {sent ? <div className="success"><b>תודה, הפרטים התקבלו.</b><p>נחזור אליכם בהקדם לתיאום המדידה.</p><button type="button" onClick={() => setSent(false)}>שליחת פנייה נוספת</button></div> : <><label>שם מלא<input required placeholder="איך לפנות אליכם?" /></label><label>טלפון<input required type="tel" placeholder="050-0000000" /></label><label>אזור בארץ<input placeholder="עיר / יישוב" /></label><label>מה תרצו לעשות?<select defaultValue=""><option value="" disabled>בחרו סוג פרויקט</option><option>וילונות לסלון</option><option>וילונות לחדרי שינה</option><option>בית שלם</option><option>ייעוץ והתאמה</option></select></label><button className="submit-button">לתיאום מדידה <span>←</span></button><small>הפרטים נשמרים רק לצורך יצירת קשר</small></>}
        </form>
      </section>

      <footer><a className="brand footer-brand" href="#top"><span className="brand-mark">ו</span><span><b>וילון</b><small>תפירה · מדידה · התקנה</small></span></a><p>וילונות בעבודת יד ובהתאמה אישית</p><div><a href="#about">אודות</a><a href="#process">התהליך</a><a href="#collection">קולקציה</a></div><span>© 2026 כל הזכויות שמורות</span></footer>

      {selected && <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}><div className="modal" role="dialog" aria-modal="true" aria-label={`פרטי ${selected.name}`} onMouseDown={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="סגירה">×</button><img src={selected.image} alt={selected.name} /><div className="modal-copy"><p className="eyebrow">{selected.style}</p><h2>{selected.name}</h2><p>{selected.note}</p><dl><div><dt>סוג בד</dt><dd>{selected.fabric}</dd></div><div><dt>גוון</dt><dd>{selected.color}</dd></div><div><dt>רמת הצללה</dt><dd>{selected.opacity}</dd></div></dl><a href="#contact" onClick={() => setSelected(null)} className="primary-button">רוצה כזה בבית <span>←</span></a></div></div></div>}
    </main>
  );
}
