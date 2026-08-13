"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";

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
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState<(typeof curtains)[number] | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const update = () => setProgress(Math.min(1, window.scrollY / Math.max(420, window.innerHeight * 0.82)));
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  const panelStyle = useMemo(() => ({ "--open": progress } as CSSProperties), [progress]);

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
        <div className="hero-sticky">
          <div className="hero-room" />
          <div className="hero-copy" style={{ opacity: Math.max(0, (progress - .18) * 1.7), transform: `translateY(${24 - progress * 24}px)` }}>
            <p className="eyebrow">וילונות שנתפרים בשביל הבית שלך</p>
            <h1>האור הנכון.<br /><em>בדיוק במידה.</em></h1>
            <p className="hero-sub">מהמדידה הראשונה ועד הקפל האחרון — אני תופר ומתקין כל וילון בעצמי, בהתאמה מלאה לחלל.</p>
            <a className="primary-button" href="#collection">לגלות את הקולקציה <span>↓</span></a>
          </div>
          <div className="curtain-panel curtain-left" style={panelStyle}><div className="curtain-edge" /></div>
          <div className="curtain-panel curtain-right" style={panelStyle}><div className="curtain-edge" /></div>
          <div className="scroll-hint" style={{ opacity: 1 - progress * 2 }}><span>גלו את הבית מחדש</span><i /></div>
        </div>
      </section>

      <section id="about" className="intro section-pad">
        <div className="section-index">01</div>
        <div className="intro-title"><p className="eyebrow">נעים להכיר</p><h2>לא עוד וילון מהמדף.<br />עבודת יד לבית שלך.</h2></div>
        <div className="intro-copy"><p>אני מלווה כל פרויקט באופן אישי — מגיע למדידה, עוזר לבחור את הבד והגוון הנכון, תופר לפי המידות המדויקות ומתקין עד שהנפילה מושלמת.</p><p>כך אין פער בין מי שתכנן למי שתפר ולמי שהתקין. יש כתובת אחת, יד אחת ותוצאה שנראית חלק מהבית.</p><div className="signature">נמדד ביד · נתפר בסטודיו · מותקן בבית</div></div>
      </section>

      <section id="process" className="process section-pad">
        <div className="process-head"><div><p className="eyebrow">איך זה עובד</p><h2>ארבעה צעדים.<br />תוצאה אחת מדויקת.</h2></div><p>תהליך מסודר ושקוף, עם לוחות זמנים ברורים מהרגע הראשון.</p></div>
        <div className="steps">
          <article><span>01</span><div className="step-icon">⌂</div><h3>ייעוץ ומדידה</h3><p>פגישה בבית, מדידה מדויקת של רוחב וגובה, בדיקת הקירות והתאמת סוג המסילה.</p><small>כ־45–60 דקות</small></article>
          <article><span>02</span><div className="step-icon">◫</div><h3>בחירת בד</h3><p>מתאימים יחד בד, צבע, רמת שקיפות וסוג קפל לאור, לריהוט ולאופי החלל.</p><small>במהלך הפגישה</small></article>
          <article><span>03</span><div className="step-icon">✂</div><h3>תפירה אישית</h3><p>כל וילון נגזר ונתפר בסטודיו לפי המידה, כולל מכפלות, סרט וקפלים בגימור ידני.</p><small>7–14 ימי עבודה</small></article>
          <article><span>04</span><div className="step-icon">✓</div><h3>התקנה וגימור</h3><p>התקנת המסילה, תלייה, אידוי וכיוון הקפלים עד שהתוצאה יושבת בדיוק במקום.</p><small>כשעה–שלוש שעות</small></article>
        </div>
      </section>

      <section className="craft section-pad">
        <div className="craft-image"><div className="craft-badge"><b>100%</b><span>תפירה אישית</span></div></div>
        <div className="craft-copy"><p className="eyebrow">הפרטים עושים את ההבדל</p><h2>תפור למידה.<br /><em>עד הסנטימטר האחרון.</em></h2><p>אני מחשב את כמות הבד לפי רוחב החלון, גובה התקרה וסוג הקפל — כדי לקבל נפילה מלאה, ישרה ומאוזנת. כל מכפלת, חיבור ושול נשקלים לפי הבד והחלל.</p><ul><li><span>01</span>התאמה לחלונות גדולים, פינתיים ולא סטנדרטיים</li><li><span>02</span>מסילות תקרה, מסילות נסתרות ומוטות דקורטיביים</li><li><span>03</span>דיוק בגובה עד הרצפה וביחס הקפלים</li></ul><a href="#contact" className="text-link">בואו נתכנן את הווילון שלכם <span>←</span></a></div>
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
