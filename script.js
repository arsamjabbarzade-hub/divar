(() => {
    'use strict';

    // ==========================================
    // ابزارهای عمومی
    // ==========================================

    const $ = selector => document.querySelector(selector);
    const $$ = selector => [...document.querySelectorAll(selector)];

    const money = number =>
        number === 0
            ? 'توافقی'
            : new Intl.NumberFormat('fa-IR').format(number) + ' تومان';


    // ==========================================
    // دسته‌بندی‌های آگهی
    // ==========================================

    const CATEGORIES = [
        {
            name: 'املاک',
            icon: '🏠',
            titles: [
                'آپارتمان نوساز', 'خانه ویلایی', 'زمین مسکونی',
                'مغازه تجاری', 'دفتر کار', 'سوئیت نقلی',
                'باغ و ویلا', 'آپارتمان دو خواب',
                'زمین کشاورزی', 'واحد اداری'
            ],
            prices: [
                1800000000, 3200000000, 5700000000,
                8900000000, 12500000000
            ]
        },
        {
            name: 'وسایل نقلیه',
            icon: '🚗',
            titles: [
                'پژو ۲۰۶ تیپ ۲', 'پژو ۲۰۷ اتومات',
                'دنا پلاس توربو', 'سمند LX', 'پراید ۱۳۱',
                'تویوتا کرولا', 'هیوندای النترا',
                'کیا سراتو', 'شاهین G', 'تارا اتومات'
            ],
            prices: [
                280000000, 450000000, 680000000,
                950000000, 1450000000
            ]
        },
        {
            name: 'کالای دیجیتال',
            icon: '📱',
            titles: [
                'آیفون ۱۳', 'سامسونگ S23',
                'شیائومی Redmi Note', 'آیفون ۱۵ پرو',
                'تبلت سامسونگ', 'ساعت هوشمند',
                'هدفون بی‌سیم', 'گوشی پوکو X6',
                'آیفون ۱۲', 'گوشی نوکیا'
            ],
            prices: [
                4500000, 8500000, 14500000,
                22500000, 38500000
            ]
        },
        {
            name: 'لپ‌تاپ و کامپیوتر و موبایل',
            icon: '💻',
            titles: [
                'لپ‌تاپ ایسوس', 'لپ‌تاپ لنوو',
                'کامپیوتر گیمینگ', 'مانیتور ۲۷ اینچ',
                'مک‌بوک ایر', 'کیبورد مکانیکال',
                'کارت گرافیک', 'هارد اکسترنال',
                'لپ‌تاپ HP', 'پرینتر خانگی'
            ],
            prices: [
                8500000, 14500000, 22500000,
                38500000, 62000000
            ]
        },
        {
            name: 'خانه و آشپزخانه',
            icon: '🛋️',
            titles: [
                'مبل راحتی ۷ نفره', 'یخچال فریزر',
                'ماشین لباسشویی', 'تلویزیون ۵۵ اینچ',
                'میز ناهارخوری', 'فرش ۱۲ متری',
                'سرویس خواب', 'اجاق گاز',
                'جاروبرقی', 'ظرفشویی'
            ],
            prices: [
                1800000, 4500000, 8500000,
                14500000, 22500000
            ]
        },
        {
            name: 'لوازم بازی و کنسول',
            icon: '🎮',
            titles: [
                'پلی‌استیشن ۵', 'ایکس‌باکس سری اس',
                'دسته PS5', 'Nintendo Switch',
                'مانیتور گیمینگ', 'صندلی گیمینگ',
                'هدست گیمینگ', 'بازی FIFA',
                'کنسول PS4', 'فرمان بازی'
            ],
            prices: [
                2500000, 5500000, 9500000,
                14500000, 22500000
            ]
        },
        {
            name: 'پوشاک و مد',
            icon: '👕',
            titles: [
                'کفش اسپرت مردانه', 'مانتو زنانه',
                'کاپشن زمستانی', 'ساعت مچی',
                'کیف دستی', 'کت و شلوار',
                'عینک آفتابی', 'کوله‌پشتی',
                'لباس ورزشی', 'کفش پیاده‌روی'
            ],
            prices: [
                350000, 650000, 950000,
                1450000, 2250000
            ]
        },
        {
            name: 'حیوانات',
            icon: '🐶',
            titles: [
                'لوازم نگهداری سگ', 'غذای گربه',
                'آکواریوم کامل', 'قفس پرنده',
                'ظرف غذای حیوانات', 'اسباب‌بازی حیوانات',
                'باکس حمل', 'لوازم بهداشتی',
                'قلاده سگ', 'لانه حیوانات'
            ],
            prices: [
                250000, 450000, 850000,
                1250000, 1850000
            ]
        },
        {
            name: 'خدمات',
            icon: '🧰',
            titles: [
                'نصب و تعمیر کولر', 'لوله‌کشی ساختمان',
                'نقاشی ساختمان', 'تعمیرات موبایل',
                'سرویس پکیج', 'نظافت منزل',
                'باربری و حمل‌ونقل', 'تعمیر لپ‌تاپ',
                'آموزش زبان', 'طراحی سایت'
            ],
            prices: [
                0, 250000, 450000,
                850000, 1250000
            ]
        },
        {
            name: 'استخدام',
            icon: '💼',
            titles: [
                'استخدام برنامه‌نویس', 'کارشناس فروش',
                'منشی و مسئول دفتر', 'حسابدار',
                'طراح گرافیک', 'راننده پایه دو',
                'کارگر انبار', 'ادمین شبکه اجتماعی',
                'بازاریاب', 'پشتیبان مشتریان'
            ],
            prices: [
                0, 12000000, 18000000,
                25000000, 35000000
            ]
        },
        {
            name: 'موتورسیکلت',
            icon: '🏍️',
            titles: [
                'هوندا کلیک ۱۵۰', 'آپریلیا ۱۵۰',
                'باجاج پالس', 'کویر S2',
                'وسپا کلاسیک', 'موتور طرح هوندا',
                'موتور تریل', 'موتور برقی',
                'یاماها MT', 'موتور TVS'
            ],
            prices: [
                18000000, 35000000, 55000000,
                85000000, 125000000
            ]
        },
        {
            name: 'ورزش و سرگرمی',
            icon: '⚽',
            titles: [
                'دوچرخه کوهستان', 'تردمیل خانگی',
                'دمبل و وزنه', 'اسکوتر برقی',
                'توپ فوتبال', 'راکت تنیس',
                'میز پینگ‌پنگ', 'چادر مسافرتی',
                'لوازم کمپینگ', 'اسکیت'
            ],
            prices: [
                350000, 850000, 1450000,
                2500000, 4500000
            ]
        }
    ];


    // ==========================================
    // استان‌ها
    // ==========================================

    const PROVINCES = [
        'مرکزی', 'گیلان', 'مازندران',
        'آذربایجان شرقی', 'آذربایجان غربی',
        'کرمانشاه', 'خوزستان', 'فارس', 'کرمان',
        'خراسان رضوی', 'اصفهان',
        'سیستان و بلوچستان', 'کردستان', 'همدان',
        'چهارمحال و بختیاری', 'لرستان', 'ایلام',
        'کهگیلویه و بویراحمد', 'بوشهر', 'زنجان',
        'سمنان', 'یزد', 'هرمزگان', 'تهران',
        'اردبیل', 'قم', 'قزوین', 'گلستان',
        'خراسان شمالی', 'خراسان جنوبی', 'البرز'
    ];


    // ==========================================
    // شهرهای استان‌ها
    // ==========================================

    const FALLBACK = {
        'مرکزی': [
            'اراک', 'ساوه', 'خمین', 'محلات',
            'دلیجان', 'تفرش', 'آشتیان', 'شازند'
        ],

        'گیلان': [
            'رشت', 'بندر انزلی', 'لاهیجان',
            'لنگرود', 'آستارا', 'تالش',
            'فومن', 'صومعه‌سرا', 'رودسر'
        ],

        'مازندران': [
            'ساری', 'آمل', 'بابل', 'بابلسر',
            'قائم‌شهر', 'چالوس', 'نوشهر',
            'تنکابن', 'بهشهر', 'رامسر'
        ],

        'آذربایجان شرقی': [
            'تبریز', 'مراغه', 'مرند', 'اهر',
            'میانه', 'بناب', 'اسکو', 'شبستر'
        ],

        'آذربایجان غربی': [
            'ارومیه', 'خوی', 'مهاباد', 'بوکان',
            'میاندوآب', 'سلماس', 'نقده', 'پیرانشهر'
        ],

        'کرمانشاه': [
            'کرمانشاه', 'اسلام‌آباد غرب',
            'کنگاور', 'سنقر', 'هرسین',
            'پاوه', 'جوانرود'
        ],

        'خوزستان': [
            'اهواز', 'دزفول', 'آبادان',
            'خرمشهر', 'ماهشهر', 'بندر امام',
            'بهبهان', 'اندیمشک', 'شوشتر'
        ],

        'فارس': [
            'شیراز', 'مرودشت', 'کازرون',
            'جهرم', 'فسا', 'لار', 'داراب',
            'آباده', 'نی‌ریز'
        ],

        'کرمان': [
            'کرمان', 'رفسنجان', 'سیرجان',
            'جیرفت', 'بم', 'زرند',
            'بردسیر', 'کهنوج'
        ],

        'خراسان رضوی': [
            'مشهد', 'نیشابور', 'سبزوار',
            'تربت حیدریه', 'کاشمر', 'قوچان',
            'تربت جام', 'گناباد'
        ],

        'اصفهان': [
            'اصفهان', 'کاشان', 'خمینی‌شهر',
            'نجف‌آباد', 'شاهین‌شهر',
            'فلاورجان', 'زرین‌شهر', 'فولادشهر'
        ],

        'سیستان و بلوچستان': [
            'زاهدان', 'چابهار', 'زابل',
            'ایرانشهر', 'سراوان', 'خاش', 'کنارک'
        ],

        'کردستان': [
            'سنندج', 'سقز', 'مریوان',
            'بانه', 'قروه', 'بیجار', 'کامیاران'
        ],

        'همدان': [
            'همدان', 'ملایر', 'نهاوند',
            'تویسرکان', 'اسدآباد', 'بهار'
        ],

        'چهارمحال و بختیاری': [
            'شهرکرد', 'بروجن', 'فارسان',
            'لردگان', 'اردل'
        ],

        'لرستان': [
            'خرم‌آباد', 'بروجرد', 'دورود',
            'الیگودرز', 'ازنا', 'کوهدشت', 'نورآباد'
        ],

        'ایلام': [
            'ایلام', 'دهلران', 'مهران',
            'آبدانان', 'دره‌شهر'
        ],

        'کهگیلویه و بویراحمد': [
            'یاسوج', 'دوگنبدان', 'دهدشت', 'لیکک'
        ],

        'بوشهر': [
            'بوشهر', 'برازجان', 'گناوه',
            'دیر', 'کنگان', 'جم', 'عسلویه'
        ],

        'زنجان': [
            'زنجان', 'ابهر', 'خرمدره',
            'قیدار', 'سلطانیه'
        ],

        'سمنان': [
            'سمنان', 'شاهرود', 'دامغان',
            'گرمسار', 'مهدی‌شهر'
        ],

        'یزد': [
            'یزد', 'میبد', 'اردکان',
            'بافق', 'مهریز', 'ابرکوه'
        ],

        'هرمزگان': [
            'بندرعباس', 'قشم', 'کیش',
            'میناب', 'بندر لنگه', 'جاسک', 'بستک'
        ],

        'تهران': [
            'تهران', 'ری', 'اسلامشهر',
            'شهریار', 'قدس', 'ملارد',
            'دماوند', 'ورامین', 'پاکدشت',
            'رباط کریم', 'پردیس'
        ],

        'اردبیل': [
            'اردبیل', 'پارس‌آباد',
            'مشگین‌شهر', 'خلخال', 'نمین', 'گرمی'
        ],

        'قم': [
            'قم', 'جعفریه', 'کهک'
        ],

        'قزوین': [
            'قزوین', 'تاکستان', 'آبیک',
            'الوند', 'بوئین‌زهرا', 'محمدیه'
        ],

        'گلستان': [
            'گرگان', 'گنبدکاووس',
            'علی‌آباد کتول', 'بندر ترکمن',
            'آق‌قلا', 'مینودشت'
        ],

        'خراسان شمالی': [
            'بجنورد', 'شیروان', 'اسفراین',
            'جاجرم', 'فاروج'
        ],

        'خراسان جنوبی': [
            'بیرجند', 'قائن', 'فردوس',
            'طبس', 'نهبندان', 'طبس'
        ],

        'البرز': [
            'کرج', 'فردیس', 'نظرآباد',
            'هشتگرد', 'محمدشهر', 'کمال‌شهر'
        ]
    };


    // ==========================================
    // متغیرهای اصلی برنامه
    // ==========================================

    const catNames = CATEGORIES.map(category => category.name);

    const icons = Object.fromEntries(
        CATEGORIES.map(category => [
            category.name,
            category.icon
        ])
    );

    const cityCacheKey = 'divar_iran_cities_v1';

    let cityData = { ...FALLBACK };

    let currentProvince = '';
    let currentCity = '';

    let activeCat = 'همه';
    let query = '';

    let page = 1;
    let onlyFav = false;
    let toastTimer;


    // ==========================================
    // ساخت آگهی‌های نمونه
    // ==========================================

    const seed = [];
    let seq = 100;

    CATEGORIES.forEach((cat, ci) => {

        for (let i = 0; i < 50; i++) {

            const cityList =
                FALLBACK[PROVINCES[(i + ci * 3) % PROVINCES.length]]
                || ['تهران'];

            const province =
                PROVINCES[(i * 3 + ci * 5) % PROVINCES.length];

            const city =
                (FALLBACK[province] || ['تهران'])[
                    (i + ci) % (FALLBACK[province] || ['تهران']).length
                ];

            const title =
                cat.titles[(i + ci) % cat.titles.length]
                + (i % 4 === 0 ? '، مدل ' + (1398 + i % 7) : '');

            const price =
                cat.prices[(i * 3 + ci) % cat.prices.length]
                + (i % 5) * 125000;

            seed.push({
                id: seq++,
                title,
                price,
                cat: cat.name,
                city,
                province,

                area: [
                    'مرکزی',
                    'فرهنگیان',
                    'بلوار اصلی',
                    'محدوده بازار',
                    'شهرک بهارستان',
                    'مرکز شهر'
                ][(i + ci) % 6],

                time: [
                    'لحظاتی پیش',
                    '۱ ساعت پیش',
                    'امروز',
                    'دیروز'
                ][i % 4],

                condition: [
                    'تمیز',
                    'در حد نو',
                    'کارکرده',
                    'نو'
                ][i % 4],

                image:
                    ci === 1 && i === 0 ? 'gg.png'
                    : ci === 1 && i === 1 ? 'images.jpg'
                    : ci === 1 && i === 2 ? 'kk.jpg'
                    : '',

                desc: `آگهی نمونه ${cat.name} در شهر ${city}، استان ${province}. توضیحات کامل و شرایط معامله با هماهنگی قابل بررسی است.`
            });
        }
    });


    // ==========================================
    // اطلاعات ذخیره‌شده
    // ==========================================

    let ads = JSON.parse(
        localStorage.getItem('divar_ads') || 'null'
    );

    if (!Array.isArray(ads) || ads.length < seed.length) {
        ads = seed;
    }

    let favs = JSON.parse(
        localStorage.getItem('divar_favs') || '[]'
    );


    // ==========================================
    // ذخیره اطلاعات
    // ==========================================

    const save = () => {

        try {

            localStorage.setItem(
                'divar_ads',
                JSON.stringify(ads)
            );

            localStorage.setItem(
                'divar_favs',
                JSON.stringify(favs)
            );

        } catch (e) {

            notify('فضای ذخیره مرورگر پر شده است');

        }
    };


    // ==========================================
    // نمایش پیام
    // ==========================================

    function notify(msg) {

        const toast = $('#toast');

        if (!toast) return;

        toast.textContent = msg;
        toast.classList.add('show');

        clearTimeout(toastTimer);

        toastTimer = setTimeout(
            () => toast.classList.remove('show'),
            2400
        );
    }


    // ==========================================
    // ایمن‌سازی متن
    // ==========================================

    function safe(s) {

        return String(s ?? '').replace(
            /[&<>"']/g,
            c => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            }[c])
        );
    }


    function norm(s) {

        return String(s || '')
            .replace(/ي/g, 'ی')
            .replace(/ك/g, 'ک')
            .trim();
    }


    // ==========================================
    // نمایش دسته‌بندی‌ها
    // ==========================================

    function renderCats() {

        const side = $('.sidebar');
        const first = side.querySelector('.cat');

        first.insertAdjacentHTML(
            'afterend',
            CATEGORIES.map(category => `
                <button class="cat" data-cat="${safe(category.name)}">
                    ${category.icon}
                    ${safe(category.name)}
                    <small>۵۰+</small>
                </button>
            `).join('')
        );

        const chips = $('.chips');

        chips.innerHTML = `
            <button class="chip selected" data-cat="همه">
                همه
            </button>
            ${CATEGORIES.map(category => `
                <button class="chip" data-cat="${safe(category.name)}">
                    ${category.icon}
                    ${safe(category.name)}
                </button>
            `).join('')}
        `;

        $$('.cat, .chip').forEach(button => {

            button.addEventListener('click', () => {
                setCat(button.dataset.cat);
            });

        });
    }


    // ==========================================
    // فیلتر آگهی‌ها
    // ==========================================

    function filtered() {

        let list = ads.filter(ad =>

            (activeCat === 'همه' || ad.cat === activeCat)

            && (!onlyFav || favs.includes(ad.id))

            && (
                !currentCity
                    ? (!currentProvince || ad.province === currentProvince)
                    : ad.city === currentCity
            )

            && (
                !query
                || norm(`
                    ${ad.title}
                    ${ad.cat}
                    ${ad.city}
                    ${ad.province}
                    ${ad.area}
                    ${ad.desc}
                `).toLowerCase().includes(
                    norm(query).toLowerCase()
                )
            )

        );

        const min = Number($('#minPrice')?.value || 0);
        const max = Number($('#maxPrice')?.value || 0);

        if (min) {
            list = list.filter(ad => ad.price >= min);
        }

        if (max) {
            list = list.filter(ad => ad.price === 0 || ad.price <= max);
        }

        if ($('#onlyPhoto')?.checked) {
            list = list.filter(ad => ad.image);
        }

        const sort = $('#sortSelect')?.value || 'new';

        if (sort === 'cheap') {
            list.sort((a, b) =>
                (a.price || Infinity) - (b.price || Infinity)
            );
        }

        if (sort === 'expensive') {
            list.sort((a, b) => b.price - a.price);
        }

        return list;
    }


    // ==========================================
    // نمایش آگهی‌ها
    // ==========================================

    function render() {

        const list = filtered();

        const pageSize = 24;

        const pages = Math.max(
            1,
            Math.ceil(list.length / pageSize)
        );

        if (page > pages) {
            page = pages;
        }

        const shown = list.slice(
            (page - 1) * pageSize,
            page * pageSize
        );

        $('#resultCount').textContent =
            `${list.length.toLocaleString('fa-IR')} آگهی پیدا شد · ${CATEGORIES.length} دسته‌بندی`;

        $('#listingGrid').innerHTML = shown.map(ad => `

            <article class="ad-card" data-id="${ad.id}">

                <div class="ad-info">

                    <h2>${safe(ad.title)}</h2>

                    <span class="tag">
                        ${safe(ad.cat)}
                    </span>

                    <div class="ad-price">
                        ${money(ad.price)}
                    </div>

                    <div class="ad-meta">
                        ${safe(ad.city)}، ${safe(ad.province)}
                        · ${safe(ad.time)}
                    </div>

                    <div class="ad-actions">

                        <span class="ad-meta">
                            ${safe(ad.condition || '')}
                        </span>

                        <button
                            class="fav ${favs.includes(ad.id) ? 'on' : ''}"
                            data-fav="${ad.id}"
                            aria-label="علاقه‌مندی"
                        >
                            ${favs.includes(ad.id) ? '♥' : '♡'}
                        </button>

                    </div>

                </div>

                ${
                    ad.image
                        ? `<img class="ad-image" src="${safe(ad.image)}" alt="${safe(ad.title)}">`
                        : `<div class="ad-image placeholder">${icons[ad.cat] || '🛍️'}</div>`
                }

            </article>

        `).join('');

        $('#emptyState').classList.toggle(
            'hidden',
            list.length > 0
        );

        $('#listingGrid').classList.toggle(
            'hidden',
            list.length === 0
        );

        const pager = $('#pagination');

        if (pager) {

            pager.innerHTML = pages > 1 ? `

                <button
                    ${page === 1 ? 'disabled' : ''}
                    data-page="${page - 1}"
                >
                    قبلی
                </button>

                <span>
                    صفحه ${page.toLocaleString('fa-IR')}
                    از ${pages.toLocaleString('fa-IR')}
                </span>

                <button
                    ${page === pages ? 'disabled' : ''}
                    data-page="${page + 1}"
                >
                    بعدی
                </button>

            ` : '';

            pager.querySelectorAll('button').forEach(button => {

                button.onclick = () => {

                    page = Number(button.dataset.page);

                    render();

                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });

                };

            });
        }
    }


    // ==========================================
    // پنجره‌های مودال
    // ==========================================

    function modal(content) {

        $('#modalContent').innerHTML = content;

        $('#modalRoot').classList.remove('hidden');
    }


    function closeModal() {

        $('#modalRoot').classList.add('hidden');
    }


    // ==========================================
    // جزئیات آگهی
    // ==========================================

    function adDetail(id) {

        const ad = ads.find(item => item.id === id);

        if (!ad) return;

        modal(`

            <h2>${safe(ad.title)}</h2>

            ${
                ad.image
                    ? `<img class="detail-image" src="${safe(ad.image)}">`
                    : `<div class="detail-image placeholder">${icons[ad.cat] || '🛍️'}</div>`
            }

            <div class="detail-price">
                ${money(ad.price)}
            </div>

            <div class="detail-meta">
                📍 ${safe(ad.city)}، ${safe(ad.province)}
                · ${safe(ad.time)}
            </div>

            <p>${safe(ad.desc)}</p>

            <button
                class="apply-btn form-submit"
                id="contactSeller"
            >
                ☎ نمایش شماره تماس
            </button>

            <button
                class="reset-btn"
                id="detailFav"
            >
                ${favs.includes(ad.id)
                    ? 'حذف از علاقه‌مندی‌ها'
                    : 'افزودن به علاقه‌مندی‌ها'
                } ♥            </button>

            <p class="detail-meta">
                این آگهی نمونه و آزمایشی است و از فروشنده واقعی دریافت نشده است.
            </p>

        `);

        $('#contactSeller').onclick = () => {
            notify('شماره تماس برای آگهی‌های نمونه ثبت نشده است.');
        };

        $('#detailFav').onclick = () => {

            toggleFav(id);

            closeModal();

        };
    }


    // ==========================================
    // علاقه‌مندی‌ها
    // ==========================================

    function toggleFav(id) {

        favs = favs.includes(id)
            ? favs.filter(item => item !== id)
            : [...favs, id];

        save();

        render();

        notify(
            favs.includes(id)
                ? 'به علاقه‌مندی‌ها اضافه شد ❤️'
                : 'از علاقه‌مندی‌ها حذف شد'
        );
    }


    // ==========================================
    // فرم ثبت آگهی
    // ==========================================

    function postForm() {

        modal(`

            <h2>ثبت آگهی جدید</h2>

            <form id="adForm">

                <label class="form-field">
                    عنوان آگهی *

                    <input
                        name="title"
                        required
                        maxlength="75"
                        placeholder="مثلاً گوشی سامسونگ تمیز"
                    >
                </label>

                <label class="form-field">
                    دسته‌بندی

                    <select name="cat">
                        ${CATEGORIES.map(category => `
                            <option>${safe(category.name)}</option>
                        `).join('')}
                    </select>
                </label>

                <label class="form-field">
                    استان

                    <select name="province" id="postProvince">
                        ${PROVINCES.map(province => `
                            <option>${safe(province)}</option>
                        `).join('')}
                    </select>
                </label>

                <label class="form-field">
                    شهر

                    <select name="city" id="postCity"></select>
                </label>

                <label class="form-field">
                    محله

                    <input
                        name="area"
                        placeholder="مثلاً مرکز شهر"
                    >
                </label>

                <label class="form-field">
                    قیمت به تومان

                    <input
                        name="price"
                        type="number"
                        min="0"
                        placeholder="برای توافقی خالی بگذارید"
                    >
                </label>

                <label class="form-field">
                    وضعیت

                    <select name="condition">
                        <option>نو</option>
                        <option>در حد نو</option>
                        <option>کارکرده</option>
                        <option>توافقی</option>
                    </select>
                </label>

                <label class="form-field">
                    توضیحات

                    <textarea
                        name="desc"
                        required
                        maxlength="700"
                        placeholder="توضیحات کامل آگهی..."
                    ></textarea>
                </label>

                <label class="form-field">
                    عکس آگهی

                    <input
                        name="photo"
                        type="file"
                        accept="image/*"
                    >
                </label>

                <button class="apply-btn form-submit">
                    انتشار آگهی
                </button>

            </form>

        `);

        const provinceSelect = $('#postProvince');
        const citySelect = $('#postCity');

        function fillPost() {

            citySelect.innerHTML = (
                cityData[provinceSelect.value] || [provinceSelect.value]
            ).map(city => `
                <option>${safe(city)}</option>
            `).join('');

        }

        provinceSelect.onchange = fillPost;

        fillPost();

        $('#adForm').onsubmit = async event => {

            event.preventDefault();

            const form = event.target;
            const fd = new FormData(form);

            const file = form.photo.files[0];

            let image = '';

            if (file) {

                if (file.size > 2 * 1024 * 1024) {

                    notify('حجم عکس باید کمتر از ۲ مگابایت باشد');

                    return;
                }

                image = await new Promise(resolve => {

                    const reader = new FileReader();

                    reader.onload = () => resolve(reader.result);

                    reader.readAsDataURL(file);

                });
            }

            ads.unshift({

                id: Date.now(),

                title: fd.get('title'),
                cat: fd.get('cat'),

                price: Number(fd.get('price')) || 0,

                city: fd.get('city'),
                province: fd.get('province'),

                area: fd.get('area') || 'مرکزی',

                condition: fd.get('condition'),

                desc: fd.get('desc'),

                image,

                time: 'همین الان'

            });

            save();

            closeModal();

            activeCat = 'همه';

            page = 1;

            render();

            notify('آگهی در همین مرورگر ثبت شد 🎉');
        };
    }


    // ==========================================
    // پروفایل کاربر
    // ==========================================

    function showProfile() {

        if (document.body.dataset.loggedIn !== '1') {
            window.location.href = 'login.php';
            return;
        }

        modal(`
            <h2>👤 دیوار من</h2>
            <div class="profile-row"><b>آگهی‌های ثبت‌شده</b><p>${Math.max(0, ads.length - seed.length)} آگهی در این مرورگر</p></div>
            <div class="profile-row"><b>علاقه‌مندی‌ها ❤️</b><p>${favs.length} آگهی ذخیره‌شده در این مرورگر</p></div>
            <button class="apply-btn form-submit" id="myFavs">نمایش علاقه‌مندی‌ها</button>
            <form method="post" action="logout.php">
                <input type="hidden" name="csrf_token" value="${document.body.dataset.csrf}">
                <button class="reset-btn" type="submit">خروج از حساب</button>
            </form>
        `);
        $('#myFavs').onclick = () => {
            activeCat = 'همه';
            onlyFav = true;
            page = 1;
            closeModal();
            render();
        };
     }


    // ==========================================
    // چت
    // ==========================================

    function showChat() {

        modal(`

            <h2>💬 چت دیوار</h2>

            <div class="chat-row">

                <b>گفتگوهای شما</b>

                <p>
                    برای آگهی‌های نمونه گفتگوی واقعی وجود ندارد.
                    چت آنلاین بین کاربران به سرور نیاز دارد.
                </p>

            </div>

        `);
    }


    // ==========================================
    // انتخاب شهر و استان
    // ==========================================

    function cityModal() {

        modal(`

            <h2>📍 انتخاب موقعیت</h2>

            <label class="form-field">

                استان

                <select id="provinceSelect">

                    <option value="">همه استان‌ها</option>

                    ${PROVINCES.map(province => `
                        <option>${safe(province)}</option>
                    `).join('')}

                </select>

            </label>

            <label class="form-field">

                شهر

                <select id="citySelect">

                    <option value="">همه شهرها</option>

                </select>

            </label>

            <p class="detail-meta" id="cityStatus">
                فهرست شهرها در حال آماده‌سازی است.
            </p>

            <button
                class="apply-btn form-submit"
                id="saveCity"
            >
                نمایش آگهی‌های این شهر
            </button>

        `);

        const provinceSelect = $('#provinceSelect');
        const citySelect = $('#citySelect');

        provinceSelect.value = currentProvince || '';

        function fill() {

            const cities = provinceSelect.value
                ? (cityData[provinceSelect.value] || [])
                : [];

            citySelect.innerHTML = `

                <option value="">
                    همه شهرهای استان
                </option>

                ${cities.map(city => `
                    <option>${safe(city)}</option>
                `).join('')}

            `;

            if (
                provinceSelect.value === currentProvince
                && cities.includes(currentCity)
            ) {

                citySelect.value = currentCity;

            }
        }

        provinceSelect.onchange = fill;

        fill();

        $('#cityStatus').textContent =

            Object.values(cityData)
                .reduce((total, cities) => total + cities.length, 0)
                .toLocaleString('fa-IR')
            + ' شهر/مورد بارگذاری‌شده';

        $('#saveCity').onclick = () => {

            currentProvince = provinceSelect.value;

            currentCity = citySelect.value;

            $('#cityBtn').innerHTML = `
                📍 ${currentCity || currentProvince || 'همه ایران'}
                <span>⌄</span>
            `;

            closeModal();

            page = 1;

            render();

            notify('موقعیت جستجو به‌روزرسانی شد');

        };
    }


    // ==========================================
    // تغییر دسته‌بندی
    // ==========================================

    function setCat(cat) {

        activeCat = cat;

        onlyFav = false;

        page = 1;

        $$('.cat, .chip').forEach(button => {

            button.classList.toggle(
                'active',
                button.dataset.cat === cat
            );

        });

        $('#pageTitle').textContent =
            cat === 'همه'
                ? 'آگهی‌های ' + (currentCity || 'ایران')
                : `${cat} در ${currentCity || 'ایران'}`;

        render();
    }


    // ==========================================
    // جستجو
    // ==========================================

    function search(value) {

        query = value;

        page = 1;

        $('#searchInput').value = value;

        $('#mobileSearch').value = value;

        render();
    }


    // ==========================================
    // دریافت فهرست شهرهای ایران
    // ==========================================

    function loadAllIranCities() {

        const cached = localStorage.getItem(cityCacheKey);

        if (cached) {

            try {

                cityData = JSON.parse(cached);

            } catch (e) {}

        }

        const base =
            'https://raw.githubusercontent.com/sajaddp/list-of-cities-in-Iran/main/dist/json/';

        Promise.all([

            fetch(base + 'provinces.json').then(response =>
                response.ok
                    ? response.json()
                    : Promise.reject()
            ),

            fetch(base + 'cities-filtered.json').then(response =>
                response.ok
                    ? response.json()
                    : Promise.reject()
            )

        ])

            .then(([provinces, cities]) => {

                const map = {};

                provinces.forEach(province => {
                    map[province.name] = [];
                });

                cities.forEach(city => {

                    const province = provinces.find(
                        item => item.id === city.province_id
                    );

                    if (
                        province
                        && map[province.name]
                        && !map[province.name].includes(city.name)
                    ) {

                        map[province.name].push(city.name);

                    }

                });

                Object.keys(map).forEach(key => {

                    map[key].sort((a, b) =>
                        a.localeCompare(b, 'fa')
                    );

                });

                cityData = map;

                try {

                    localStorage.setItem(
                        cityCacheKey,
                        JSON.stringify(map)
                    );

                } catch (e) {}

                if ($('#cityStatus')) {

                    $('#cityStatus').textContent =
                        'فهرست کامل شهرهای ایران بارگذاری شد: '
                        + Object.values(map)
                            .reduce((total, cities) => total + cities.length, 0)
                            .toLocaleString('fa-IR')
                        + ' شهر';

                }

            })

            .catch(() => {

                if ($('#cityStatus')) {

                    $('#cityStatus').textContent =
                        'اتصال به منبع شهرها برقرار نشد؛ فهرست شهرهای پرکاربرد در دسترس است.';

                }

            });
    }


    // ==========================================
    // راه‌اندازی اولیه برنامه
    // ==========================================

    renderCats();


    // کلیک روی آگهی‌ها و علاقه‌مندی‌ها

    $('#listingGrid').addEventListener('click', event => {

        const fav = event.target.closest('[data-fav]');

        if (fav) {

            event.stopPropagation();

            toggleFav(Number(fav.dataset.fav));

            return;
        }

        const card = event.target.closest('[data-id]');

        if (card) {

            adDetail(Number(card.dataset.id));

        }
    });


    // جستجوی دسکتاپ و موبایل

    $('#searchInput').addEventListener('input', event => {
        search(event.target.value);
    });

    $('#mobileSearch').addEventListener('input', event => {
        search(event.target.value);
    });


    // پاک کردن جستجو

    $('#clearSearch').onclick =
    $('#mobileClear').onclick = () => {
        search('');
    };


    // فیلترها

    $('#applyFilters').onclick = () => {

        page = 1;

        render();

    };

    $('#resetFilters').onclick = () => {

        $('#minPrice').value = '';

        $('#maxPrice').value = '';

        $('#onlyPhoto').checked = false;

        page = 1;

        render();

    };


    // بازنشانی جستجو

    $('#emptyReset').onclick = () => {

        search('');

        setCat('');

        $('#resetFilters').click();

    };


    // مرتب‌سازی آگهی‌ها

    $('#sortSelect').onchange = render;


    // ثبت آگهی

    $('#postBtn').onclick =
    $('#mobilePost').onclick = postForm;




   


    // انتخاب موقعیت

    $('#cityBtn').onclick = cityModal;


    // ==========================================
    // تغییر پوسته روشن و تاریک
    // ==========================================

    $('#themeBtn').onclick = () => {

        document.body.classList.toggle('dark');

        const dark = document.body.classList.contains('dark');

        $('#themeBtn').textContent = dark ? '☀️' : '🌙';

        localStorage.setItem(
            'divar_theme',
            dark ? 'dark' : 'light'
        );

    };

    if (localStorage.getItem('divar_theme') === 'dark') {

        document.body.classList.add('dark');

        $('#themeBtn').textContent = '☀️';

    }


    // ==========================================
    // مدیریت مودال
    // ==========================================

    $('#modalRoot').addEventListener('click', event => {

        if (event.target.dataset.close) {

            closeModal();

        }

    });

    document.addEventListener('keydown', event => {

        if (event.key === 'Escape') {

            closeModal();

        }

    });


    $('#profileBtn').addEventListener('click', showProfile);

    // ==========================================
    // منوی پایین صفحه
    // ==========================================

    $$('.nav-item').forEach(button => {

        button.addEventListener('click', () => {

            if (button.dataset.page === 'chat') {
                showChat();
            }

            if (button.dataset.page === 'profile') {
                showProfile();
            }

            if (button.dataset.page === 'categories') {

                document.querySelector('.sidebar').style.display = 'block';

                document.querySelector('.sidebar').scrollIntoView({
                    behavior: 'smooth'
                });

            }

            if (button.dataset.page === 'home') {
                setCat('همه');
            }

            $$('.nav-item').forEach(item => {

                item.classList.toggle(
                    'active',
                    item === button
                );

            });

        });

    });


    // ==========================================
    // اجرای نهایی
    // ==========================================

    loadAllIranCities();

    $('#cityBtn').innerHTML = `
        📍 ${currentCity || currentProvince || 'همه ایران'}
        <span>⌄</span>
    `;

    $('#pageTitle').textContent =
        'آگهی‌های ' + (currentCity || currentProvince || 'ایران');

    render();

})();