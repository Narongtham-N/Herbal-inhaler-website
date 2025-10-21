const scrollButtons = document.querySelectorAll('[data-scroll-to]');
const aromaCards = document.querySelectorAll('.aroma-card');
const accordionItems = document.querySelectorAll('.accordion-item');
const navbar = document.getElementById('navbar');

function updateYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

updateYear();

scrollButtons.forEach(button => {
    button.addEventListener('click', event => {
        const selector = event.currentTarget.getAttribute('data-scroll-to');
        const target = document.querySelector(selector);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            navbar.classList.add('navbar--compact');
        } else {
            navbar.classList.remove('navbar--compact');
        }
    });
}, { threshold: 0.1 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    observer.observe(heroSection);
}

aromaCards.forEach(card => {
    card.addEventListener('click', () => {
        const isActive = card.classList.contains('active');
        aromaCards.forEach(item => item.classList.remove('active'));
        if (!isActive) {
            card.classList.add('active');
        }
    });
    card.addEventListener('keypress', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            card.click();
        }
    });
    card.setAttribute('tabindex', '0');
});

accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');
    trigger.addEventListener('click', () => toggleAccordion(item, panel, trigger));
    trigger.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleAccordion(item, panel, trigger);
        }
    });
});

function toggleAccordion(item, panel, trigger) {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    accordionItems.forEach(otherItem => {
        const otherTrigger = otherItem.querySelector('.accordion-trigger');
        const otherPanel = otherItem.querySelector('.accordion-panel');
        otherItem.classList.remove('active');
        otherTrigger.setAttribute('aria-expanded', 'false');
        otherPanel.style.maxHeight = null;
    });

    if (!expanded) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
    }
}

// subtle parallax on hero stats and cards
const parallaxElements = document.querySelectorAll('.card, .aroma-card, .timeline-card, .product-card');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!prefersReducedMotion.matches && parallaxElements.length) {
    document.addEventListener('mousemove', event => {
        const { innerWidth, innerHeight } = window;
        const xPos = (event.clientX / innerWidth - 0.5) * 10;
        const yPos = (event.clientY / innerHeight - 0.5) * 10;

        parallaxElements.forEach(el => {
            el.style.setProperty('--tilt-x', `${yPos}`);
            el.style.setProperty('--tilt-y', `${-xPos}`);
        });
    });

    // apply the tilt transform in CSS via perspective
    parallaxElements.forEach(el => {
        el.style.transition = 'transform 0.3s ease';
        el.addEventListener('mouseenter', () => {
            el.style.transform = `perspective(800px) rotateX(calc(var(--tilt-x, 0) * 1deg)) rotateY(calc(var(--tilt-y, 0) * 1deg)) translateY(-6px)`;
        });
        el.addEventListener('mousemove', () => {
            el.style.transform = `perspective(800px) rotateX(calc(var(--tilt-x, 0) * 1deg)) rotateY(calc(var(--tilt-y, 0) * 1deg)) translateY(-6px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translateY(0)';
        });
    });
}

const translations = {
    en: {
        'nav.benefits': 'Benefits',
        'nav.aromas': 'Aromas',
        'nav.science': 'Science',
        'nav.experience': 'Experience',
        'nav.faq': 'FAQ',
        'nav.preorder': 'Pre-order',
        'nav.language.aria': 'Switch to Thai',
        'hero.eyebrow': 'All-natural, always ready',
        'hero.title': 'Meet <span class="brand-highlight">Puri</span> – the herbal inhaler that transforms your breath into a ritual.',
        'hero.body': 'Crafted with a clinical blend of eucalyptus, holy basil, and peppermint, Puri clears your senses and elevates your mood in seconds. No cords, no clutter—just a pocket-sized sanctuary.',
        'hero.primaryCta': 'Reserve my Puri',
        'hero.secondaryCta': 'Watch experience',
        'hero.stat1': 'Breaths refreshed',
        'hero.stat2': 'User satisfaction',
        'hero.stat3': 'Average review',
        'hero.productTitle': 'Puri Herbal Inhaler',
        'hero.productSubtitle': 'Micro-misted botanicals that travel with you.',
        'hero.badge1': 'Clinically blended',
        'hero.badge2': 'Zero nicotine',
        'hero.badge3': 'Refillable pods',
        'hero.scroll': 'Scroll to explore',
        'benefits.heading': 'Why customers breathe with Puri',
        'benefits.card1.title': 'Pure botanicals',
        'benefits.card1.body': 'Organic herbs extracted at low temperatures preserve therapeutic compounds that soothe your respiratory system.',
        'benefits.card2.title': 'Instant clarity',
        'benefits.card2.body': 'Menthol and camphor vapors open airways in under 90 seconds, helping you focus and breathe easier.',
        'benefits.card3.title': 'Gentle defense',
        'benefits.card3.body': 'Holy basil and turmeric support your immune response, providing a natural shield during high-stress days.',
        'aromas.heading': 'Choose your aroma ritual',
        'aromas.subheading': 'Tap an aroma card to reveal the botanical story crafted by our aromatherapists.',
        'aromas.cards.clarity.title': 'Clarity Burst',
        'aromas.cards.clarity.summary': 'Eucalyptus · Peppermint · Menthol',
        'aromas.cards.clarity.details': 'Designed for deep breathing moments—great for morning routines or pre-work focus sessions.',
        'aromas.cards.zen.title': 'Zen Garden',
        'aromas.cards.zen.summary': 'Lavender · Holy Basil · Green Tea',
        'aromas.cards.zen.details': 'Your evening exhale: wind down with calming adaptogens that help lower cortisol responses.',
        'aromas.cards.glow.title': 'Golden Glow',
        'aromas.cards.glow.summary': 'Turmeric · Lemongrass · Ginger',
        'aromas.cards.glow.details': 'Warm citrus spice keeps you energized while supporting natural defense pathways.',
        'aromas.cards.bloom.title': 'Bloom Rise',
        'aromas.cards.bloom.summary': 'Rosemary · Grapefruit · Neroli',
        'aromas.cards.bloom.details': 'Bright botanicals harmonize hormones and uplift mood on grey mornings.',
        'experience.heading': 'Breathing made intuitive',
        'experience.list1': '<span>Magnetic cap</span> keeps botanicals potent and ready for micro-dosing mist.',
        'experience.list2': '<span>Featherweight alloy body</span> balances luxury feel with everyday durability.',
        'experience.list3': '<span>Rechargeable nebulizer core</span> delivers 400 guided breaths per charge.',
        'experience.testimonial.quote': '“I reach for Puri before every meditation session. The aromas anchor me instantly.”',
        'experience.testimonial.author': '— Mira S., Breathwork Coach',
        'science.heading': 'Science-backed calm in every inhale',
        'science.card1.title': 'Clinical sourcing',
        'science.card1.body': 'Partner farms cultivate botanicals using regenerative methods and triple lab testing for purity.',
        'science.card2.title': 'Micro mist technology',
        'science.card2.body': 'Ultrasonic diffusion breaks herbs into breathable particles that absorb quickly without irritation.',
        'science.card3.title': 'Holistic validation',
        'science.card3.body': 'Validated by aromatherapists and naturopaths to ensure synergy between each botanical blend.',
        'preorder.heading': 'Be the first to feel the ritual',
        'preorder.body': 'Reserve your Puri inhaler today and receive an exclusive Founders’ Set with all four aroma pods.',
        'preorder.form.name.label': 'Full name',
        'preorder.form.name.placeholder': 'Aiyana Flores',
        'preorder.form.email.label': 'Email address',
        'preorder.form.email.placeholder': 'you@example.com',
        'preorder.form.aroma.label': 'Preferred aroma',
        'preorder.form.aroma.options.clarity': 'Clarity Burst',
        'preorder.form.aroma.options.zen': 'Zen Garden',
        'preorder.form.aroma.options.glow': 'Golden Glow',
        'preorder.form.aroma.options.bloom': 'Bloom Rise',
        'preorder.form.submit': 'Join the waitlist',
        'preorder.form.legal': 'By submitting, you agree to receive updates from Puri. We respect your inbox and your privacy.',
        'preorder.meter': 'Founder batch 82% reserved',
        'preorder.perks.item1': '<strong>Complimentary</strong> aroma discovery kit',
        'preorder.perks.item2': '<strong>Early access</strong> to guided breathing app',
        'preorder.perks.item3': '<strong>Lifetime</strong> refill discount of 15%',
        'faq.heading': 'Frequently asked',
        'faq.q1.question': 'Is Puri safe for daily use?',
        'faq.q1.answer': 'Absolutely. Each blend is free from nicotine, synthetic fragrances, and propellants. We follow IFRA safety standards and third-party testing.',
        'faq.q2.question': 'How long does one pod last?',
        'faq.q2.answer': 'Each pod delivers roughly 160 herbal breaths. Most customers enjoy a pod for 3-4 weeks with mindful use.',
        'faq.q3.question': 'Can I travel with Puri?',
        'faq.q3.answer': 'Yes! Puri is TSA-friendly and designed for carry-on and daily commute travel. The magnetic case protects it from leaks and pressure changes.',
        'footer.tagline': 'Breathe the purity of botanicals crafted for modern wellbeing.',
        'footer.rights': '© <span id="year"></span> Puri Wellness. All rights reserved.'
    },
    th: {
        'nav.benefits': 'คุณประโยชน์',
        'nav.aromas': 'กลิ่น',
        'nav.science': 'วิทยาศาสตร์',
        'nav.experience': 'ประสบการณ์',
        'nav.faq': 'คำถามที่พบบ่อย',
        'nav.preorder': 'จองล่วงหน้า',
        'nav.language.aria': 'สลับภาษาเป็นภาษาอังกฤษ',
        'hero.eyebrow': 'ธรรมชาติแท้ พร้อมผ่อนคลายเสมอ',
        'hero.title': 'ทำความรู้จัก <span class="brand-highlight">Puri</span> – สูดสมุนไพรที่เปลี่ยนทุกลมหายใจให้เป็นพิธีผ่อนคลาย',
        'hero.body': 'ผสมผสานยูคาลิปตัส กะเพรา และเปปเปอร์มินต์ในสัดส่วนที่ผ่านการวิจัย Puri ช่วยเปิดรับสัมผัสและยกระดับอารมณ์ในไม่กี่วินาที พกง่าย ไม่ต้องเสียบปลั๊ก—มุมสงบขนาดพกพาสำหรับคุณ',
        'hero.primaryCta': 'จอง Puri ของฉัน',
        'hero.secondaryCta': 'ชมประสบการณ์',
        'hero.stat1': 'ลมหายใจที่สดชื่น',
        'hero.stat2': 'ความพึงพอใจของผู้ใช้',
        'hero.stat3': 'คะแนนรีวิวเฉลี่ย',
        'hero.productTitle': 'เครื่องสูดสมุนไพร Puri',
        'hero.productSubtitle': 'ละอองสมุนไพรละเอียดที่ไปกับคุณได้ทุกที่',
        'hero.badge1': 'สูตรผสมโดยผู้เชี่ยวชาญ',
        'hero.badge2': 'ไร้นิโคติน',
        'hero.badge3': 'ตลับเติมได้',
        'hero.scroll': 'เลื่อนเพื่อสำรวจ',
        'benefits.heading': 'ทำไมใครๆ จึงเลือกสูด Puri',
        'benefits.card1.title': 'สมุนไพรบริสุทธิ์',
        'benefits.card1.body': 'สกัดอุณหภูมิต่ำจากสมุนไพรออร์แกนิก เก็บรักษาสารออกฤทธิ์ที่ช่วยปลอบประโลมระบบทางเดินหายใจ',
        'benefits.card2.title': 'เคลียร์ทันใจ',
        'benefits.card2.body': 'ไอเมนทอลและการบูรช่วยเปิดโพรงจมูกภายใน 90 วินาที ให้คุณโฟกัสและหายใจโล่ง',
        'benefits.card3.title': 'ปกป้องอย่างอ่อนโยน',
        'benefits.card3.body': 'กะเพราและขมิ้นเสริมภูมิคุ้มกัน ให้เกราะธรรมชาติในวันที่ตึงเครียด',
        'aromas.heading': 'เลือกพิธีแห่งกลิ่นหอมของคุณ',
        'aromas.subheading': 'แตะการ์ดแต่ละกลิ่นเพื่อค้นเรื่องราวสมุนไพรที่นักอโรมาเธอราปีบรรจงสร้าง',
        'aromas.cards.clarity.title': 'Clarity Burst',
        'aromas.cards.clarity.summary': 'ยูคาลิปตัส · เปปเปอร์มินต์ · เมนทอล',
        'aromas.cards.clarity.details': 'ออกแบบสำหรับการหายใจลึก เหมาะกับเช้าเริ่มวันหรือก่อนทำงานเพื่อโฟกัส',
        'aromas.cards.zen.title': 'Zen Garden',
        'aromas.cards.zen.summary': 'ลาเวนเดอร์ · กะเพรา · ชาเขียว',
        'aromas.cards.zen.details': 'ผ่อนลมหายใจยามเย็นด้วยสมุนไพรปรับสมดุลที่ช่วยลดการตอบสนองของคอร์ติซอล',
        'aromas.cards.glow.title': 'Golden Glow',
        'aromas.cards.glow.summary': 'ขมิ้น · ตะไคร้ · ขิง',
        'aromas.cards.glow.details': 'ความหอมอบอุ่นของซิตรัสช่วยเติมพลังพร้อมสนับสนุนระบบป้องกันตามธรรมชาติ',
        'aromas.cards.bloom.title': 'Bloom Rise',
        'aromas.cards.bloom.summary': 'โรสแมรี่ · เกรปฟรุต · เนโรลี',
        'aromas.cards.bloom.details': 'พืชหอมสดชื่นช่วยปรับฮอร์โมนและยกระดับอารมณ์ในเช้าที่หม่นหมอง',
        'experience.heading': 'ลมหายใจที่เป็นธรรมชาติ',
        'experience.list1': '<span>ฝาปิดแม่เหล็ก</span> รักษาความเข้มข้นของสมุนไพรพร้อมพ่นละอองทุกเมื่อ',
        'experience.list2': '<span>ตัวเครื่องอะลูมิเนียมน้ำหนักเบา</span> ผสานสัมผัสหรูหรากับความทนทานใช้ทุกวัน',
        'experience.list3': '<span>แกนพ่นละอองแบบชาร์จได้</span> มอบ 400 ลมหายใจนำทางต่อการชาร์จหนึ่งครั้ง',
        'experience.testimonial.quote': '“ฉันหยิบ Puri ก่อนเริ่มทำสมาธิทุกครั้ง กลิ่นช่วยพาฉันเข้าสู่สมาธิทันที”',
        'experience.testimonial.author': '— มิรา เอส., โค้ชการหายใจ',
        'science.heading': 'ความสงบที่ผ่านงานวิจัยในทุกลมหายใจ',
        'science.card1.title': 'คัดสรรระดับคลินิก',
        'science.card1.body': 'ทำงานกับฟาร์มที่ปลูกแบบฟื้นฟูดินและตรวจแล็บสามรอบเพื่อความบริสุทธิ์',
        'science.card2.title': 'เทคโนโลยีไมโครมิสต์',
        'science.card2.body': 'การพ่นอัลตราโซนิกย่อยสมุนไพรให้เป็นละอองหายใจได้ ดูดซึมไวไม่ระคายเคือง',
        'science.card3.title': 'รับรองโดยองค์รวม',
        'science.card3.body': 'ผู้เชี่ยวชาญอโรมาและแพทย์ทางเลือกทดสอบความผสานกันของสมุนไพรแต่ละสูตร',
        'preorder.heading': 'เป็นคนแรกที่สัมผัสพิธีแห่งลมหายใจ',
        'preorder.body': 'จอง Puri วันนี้ รับเซ็ตผู้ก่อตั้งพร้อมตลับกลิ่นทั้งสี่',
        'preorder.form.name.label': 'ชื่อ-นามสกุล',
        'preorder.form.name.placeholder': 'สุปราณี ใจดี',
        'preorder.form.email.label': 'อีเมล',
        'preorder.form.email.placeholder': 'คุณ@อีเมล.com',
        'preorder.form.aroma.label': 'กลิ่นที่ชื่นชอบ',
        'preorder.form.aroma.options.clarity': 'Clarity Burst – ปลุกสมองโล่ง',
        'preorder.form.aroma.options.zen': 'Zen Garden – ผ่อนคลายสงบใจ',
        'preorder.form.aroma.options.glow': 'Golden Glow – พลังอุ่นสดชื่น',
        'preorder.form.aroma.options.bloom': 'Bloom Rise – เติมประกายสดใส',
        'preorder.form.submit': 'เข้าร่วมรายชื่อรอ',
        'preorder.form.legal': 'เมื่อส่งข้อมูล แสดงว่าคุณยินยอมรับข่าวสารจาก Puri เราเคารพกล่องจดหมายและความเป็นส่วนตัวของคุณ',
        'preorder.meter': 'ล็อตผู้ก่อตั้งถูกจองแล้ว 82%',
        'preorder.perks.item1': '<strong>รับฟรี</strong> ชุดค้นหากลิ่นอโรมา',
        'preorder.perks.item2': '<strong>เข้าถึงก่อน</strong> แอปฝึกการหายใจนำทาง',
        'preorder.perks.item3': '<strong>ส่วนลดตลอดชีพ</strong> เติมตลับ 15%',
        'faq.heading': 'คำถามที่พบบ่อย',
        'faq.q1.question': 'Puri ใช้ทุกวันได้ไหม?',
        'faq.q1.answer': 'ได้เลย สูตรแต่ละกลิ่นปลอดนิโคติน น้ำหอมสังเคราะห์ และสารขับดัน เราปฏิบัติตามมาตรฐาน IFRA และตรวจสอบโดยห้องแล็บอิสระ',
        'faq.q2.question': 'ตลับหนึ่งใช้นานแค่ไหน?',
        'faq.q2.answer': 'หนึ่งตลับให้ละอองสมุนไพรประมาณ 160 ครั้ง ลูกค้าส่วนใหญ่อยู่ได้นาน 3-4 สัปดาห์เมื่อใช้แบบรู้ตัว',
        'faq.q3.question': 'พก Puri ขึ้นเครื่องได้หรือไม่?',
        'faq.q3.answer': 'ได้ Puri ผ่านข้อกำหนด TSA และออกแบบให้เหมาะกับการพกขึ้นเครื่องและเดินทางทุกวัน กล่องแม่เหล็กช่วยป้องกันการรั่วและแรงดัน',
        'footer.tagline': 'สูดความบริสุทธิ์ของสมุนไพรที่ออกแบบเพื่อสุขภาวะยุคใหม่',
        'footer.rights': '© <span id="year"></span> Puri Wellness สงวนสิทธิ์ทุกประการ'
    }
};

const languageToggle = document.querySelector('[data-action="toggle-language"]');
const defaultLanguage = 'en';
let activeLanguage = defaultLanguage;

function translatePage(lang) {
    if (!translations[lang]) {
        return;
    }

    activeLanguage = lang;
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = translations[lang][key];
        if (translation !== undefined) {
            element.innerHTML = translation;
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const translation = translations[lang][key];
        if (translation !== undefined) {
            element.setAttribute('placeholder', translation);
        }
    });

    document.querySelectorAll('[data-i18n-option]').forEach(element => {
        const key = element.getAttribute('data-i18n-option');
        const translation = translations[lang][key];
        if (translation !== undefined) {
            element.textContent = translation;
        }
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
        const key = element.getAttribute('data-i18n-aria-label');
        const translation = translations[lang][key];
        if (translation !== undefined) {
            element.setAttribute('aria-label', translation);
        }
    });

    if (languageToggle) {
        languageToggle.textContent = lang === 'en' ? 'TH' : 'EN';
        languageToggle.setAttribute('data-lang-target', lang === 'en' ? 'th' : 'en');
    }

    updateYear();
}

translatePage(defaultLanguage);

if (languageToggle) {
    languageToggle.addEventListener('click', () => {
        const nextLang = activeLanguage === 'en' ? 'th' : 'en';
        translatePage(nextLang);
    });
}
