let currentLang = 'jp';
let youtubeList = [
    "https://www.youtube.com/embed/ZViKbW7gQ6Q",
    "https://www.youtube.com/embed/cvv8x-PDD3w",
    "https://www.youtube.com/embed/bPgJ4xrWx1g",
    "https://www.youtube.com/embed/UlFaDqslQb4",
    "https://www.youtube.com/embed/XVHrqGHkhnI",
];
let siteList = [
    {
        grayImage: "image/img_youtube_logo_gray.png",
        image: "image/img_youtube_logo.png",
        link: "https://www.youtube.com/@yuuki_room"
    },
    {
        grayImage: "image/img_instagram_logo_gray.png",
        image: "image/img_instagram_logo.png",
        link: "https://www.instagram.com/yuuki__kinchiku/"
    },
    {
        grayImage: "image/img_x_main_logo_gray.png",
        image: "image/img_x_main_logo.png",
        link: "https://x.com/yuuki__kinchiku"
    },
    {
        grayImage: "image/img_x_sub_logo_gray.png",
        image: "image/img_x_sub_logo.png",
        link: "https://x.com/yuuki_sleeptalk"
    },
    {
        grayImage: "image/img_tiktok_logo_gray.png",
        image: "image/img_tiktok_logo.png",
        link: "https://www.tiktok.com/@yuuki__kinchiku"
    },
    {
        grayImage: "image/img_only_fans_logo_gray.png",
        image: "image/img_only_fans_logo.png",
        link: "https://onlyfans.com/yuuki_kinchiku"
    },
    {
        grayImage: "image/img_fantia_logo_gray.png",
        image: "image/img_fantia_logo.png",
        link: "https://fantia.jp/fanclubs/517038"
    },
    {
        grayImage: "image/img_line_logo_gray.png",
        image: "image/img_line_logo.png",
        link: "https://lin.ee/LDBHLtl"
    },
];
let subscriptionList = [];
let eventList = [];
let othersList = [];

document.addEventListener("DOMContentLoaded", function() {
    const lang = navigator.language || navigator.userLanguage;
    if (lang.startsWith('ko')) {
      currentLang = 'ko';
      document.getElementById("ko").classList.remove('not_select_language');
    } else if (lang.startsWith('ja')) {
      currentLang = 'ja';
      document.getElementById("ja").classList.remove('not_select_language');
    } else {
      currentLang = 'en';
      document.getElementById("en").classList.remove('not_select_language');
    }

    const site_list = document.getElementById("site_list");
    siteList.forEach(item => {
        const site_item = document.createElement('site_item');
        const image = document.createElement('img');
        image.src = item.grayImage;
        site_item.addEventListener('mouseover', () => {
            image.src = item.image;
        });

        site_item.addEventListener('mouseout', () => {
            image.src = item.grayImage;
        });
        site_item.addEventListener('click', () => {
            window.open(item.link);
        });

        site_item.classList.add('site_item');
        site_item.appendChild(image);
        site_list.appendChild(site_item);
    });

    const countries = document.querySelectorAll('.country');

    countries.forEach(item => {
      item.addEventListener('click', () => {
        countries.forEach(i => i.classList.add('not_select_language'));
        item.classList.remove('not_select_language');

        const country = item.getAttribute('data-name');
        currentLang = country;

        fetchList();
        fetchSubscriptionList();
        fetchEventList();
        fetchOtherList();
      });
    });

    window.addEventListener('scroll', () => {
        const body = document.getElementById('gnb');
        if (window.scrollY > 345) {
          body.style.backgroundColor = '#F7F7FB';
        } else {
          body.style.backgroundColor = '#00000000';
        }
    });

    settingYoutubeItems();
    fetchList();
    fetchSubscriptionList();
    fetchEventList();
    fetchOtherList();
});

function loadVideo(index) {
    const video = document.getElementById('video');
    video.src = youtubeList[index];
    updateIndicator(index);
}

function updateIndicator(activeIndex) {
    const indicators = document.querySelectorAll('.indicator div');
        indicators.forEach((el, idx) => {
        el.classList.toggle('active', idx === activeIndex);
    });
}

function settingYoutubeItems() {
    const indicatorContainer = document.getElementById('indicatorContainer');
    youtubeList.forEach((videoId, index) => {
      const div = document.createElement('div');
      div.addEventListener('click', () => loadVideo(index));
      indicatorContainer.appendChild(div);
    });

    loadVideo(0);
}

function fetchSubscriptionList() {
    const subscription_items = document.getElementById("subscription_items");
    subscription_items.replaceChildren();

    subscriptionList.forEach(item => {
        let html = `
          <div class="subscription_item">
              <div class="subscription_title">${item.title}</div>
              <div class="subscription_price">
                  <span>${item.price}</span>`
        if(item.title != "TikTok") {
            html += `<span>/ month</span>`
        }
        html += `</div>
              <div class="description_list">
                  ${item.items.map(data => `
                    <div class="description">
                      <img src=${data.isOk ? "image/ic_check.svg" : "image/ic_not.svg"}>
                      <span>${data.info}</span>
                    </div>
                  `).join('')}
              </div>
              <div class="precautions">${item.hint}</div>
              <div class="subscription_start" data-name="${item.link}">${i18n[currentLang].nowStart}</div>
          </div>
        `;

        subscription_items.insertAdjacentHTML('beforeend', html);
    });

    document.querySelectorAll('.subscription_start').forEach(item => {
      item.addEventListener('click', () => {
        const link = item.getAttribute('data-name');
        window.open(link);
      });
    });
}

function fetchEventList() {
    const event_item_list = document.getElementById('event_item_list');
    event_item_list.replaceChildren();

    eventList.forEach(item => {
        const html = `
          <div class="event_item">
              <img src=${item.image}>
              <div class="event_info">
                  <div class="badge">
                      <span class=${isPastDate(item.endDate행) ? "ongoing" : "completed"}>${isPastDate(item.endDate) ? i18n[currentLang].ongoing : i18n[currentLang].finished}</span>
                      <span class="brand">${item.brand}</span>
                  </div>
                  <span class="event_date">${item.startDate} ~ ${item.endDate}</span>
              </div>
              <div class="event_title">${item.title}</div>
              <div class="event_content">${item.content}</div>
              <div class="event_start" data-name="${item.link}">${isPastDate(item.endDate) ? i18n[currentLang].viewDetails : i18n[currentLang].EndOfSale}</div>
          </div>
        `;

        event_item_list.insertAdjacentHTML('beforeend', html);
    });

    document.querySelectorAll('.event_start').forEach(item => {
      item.addEventListener('click', () => {
        const link = item.getAttribute('data-name');
        window.open(link);
      });
    });
}

function isPastDate(dateString) {
  if (!dateString || dateString.trim() === '') {
    return true;
  }

  const formatted = dateString.replace(/\./g, '-');

  const today = new Date();
  const koreaToday = new Date(today.toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' }));

  const inputDate = new Date(`${formatted}T00:00:00+09:00`);

  return inputDate > koreaToday;
}

function fetchOtherList() {
    const others_item_list = document.getElementById('others_item_list');
    others_item_list.replaceChildren();

    othersList.forEach(item => {
        const html = `
            <div class="others_item">
                <div class="others_number">${item.number}</div>
                <div class="others_title">${item.title}</div>
                <div class="others_content">${item.content}</div>
                <div class="others_move" data-name="${item.link}">
                    <img src="image/ic_arrow.svg"/>
                </div>
            </div>
        `;

        others_item_list.insertAdjacentHTML('beforeend', html);
    });

    document.querySelectorAll('.others_move').forEach(item => {
      item.addEventListener('click', () => {
        const link = item.getAttribute('data-name');
        window.open(link);
      });
    });
}

function fetchList() {
    subscriptionList = [
        {
            title: "OnlyFans",
            price: "$6",
            items: [
                {
                    info: i18n[currentLang].onlyFansOk1,
                    isOk: true
                },
                {
                    info: i18n[currentLang].onlyFansOk2,
                    isOk: true
                },
                {
                    info: i18n[currentLang].onlyFansOk3,
                    isOk: true
                },
                {
                    info: i18n[currentLang].onlyFansOk4,
                    isOk: true
                },
                {
                    info: i18n[currentLang].onlyFansOk5,
                    isOk: true
                },
                {
                    info: i18n[currentLang].onlyFansNo1,
                    isOk: false
                },
                {
                    info: i18n[currentLang].onlyFansNo2,
                    isOk: false
                },
                {
                    info: i18n[currentLang].onlyFansNo3,
                    isOk: false
                }
            ],
            hint: i18n[currentLang].onlyFansNote,
            link: "https://onlyfans.com/yuuki_kinchiku"
        },
        {
            title: "Fantia",
            price: "900円",
            items: [
                {
                    info: i18n[currentLang].fantiaOk1,
                    isOk: true
                },
                {
                    info: i18n[currentLang].fantiaOk2,
                    isOk: true
                },
                {
                    info: i18n[currentLang].fantiaOk3,
                    isOk: true
                },
                {
                    info: i18n[currentLang].fantiaOk4,
                    isOk: true
                },
                {
                    info: i18n[currentLang].fantiaNo1,
                    isOk: false
                },
                {
                    info: i18n[currentLang].fantiaNo2,
                    isOk: false
                },
                {
                    info: i18n[currentLang].fantiaNo3,
                    isOk: false
                }
            ],
            hint: i18n[currentLang].fantiaNote,
            link: "https://fantia.jp/fanclubs/517038/plans"
        },
        {
            title: "Instagram",
            price: i18n[currentLang].instagramPrice,
            items: [
                {
                    info: i18n[currentLang].instagramOk1,
                    isOk: true
                },
                {
                    info: i18n[currentLang].instagramOk2,
                    isOk: true
                },
                {
                    info: i18n[currentLang].instagramOk3,
                    isOk: true
                },
                {
                    info: i18n[currentLang].instagramOk4,
                    isOk: true
                },
                {
                    info: i18n[currentLang].instagramOk5,
                    isOk: true
                },
                {
                    info: i18n[currentLang].instagramNo1,
                    isOk: false
                },
                {
                    info: i18n[currentLang].instagramNo2,
                    isOk: false
                }
            ],
            hint: i18n[currentLang].instagramNote,
            link: "https://www.instagram.com/yuuki__kinchiku/"
        },
        {
            title: "TikTok",
            price: i18n[currentLang].tiktokPrice,
            items: [
                {
                    info: i18n[currentLang].tiktokOk1,
                    isOk: true
                },
                {
                    info: i18n[currentLang].tiktokOk2,
                    isOk: true
                },
                {
                    info: i18n[currentLang].tiktokOk3,
                    isOk: true
                },
                {
                    info: i18n[currentLang].tiktokOk4,
                    isOk: true
                }
            ],
            hint: "",
            link: "https://www.tiktok.com/@yuuki__kinchiku"
        }
    ];
    eventList = [
        {
            image: "image/img_event08.png",
            brand: "Fan Meeting",
            startDate: "2025.10.05",
            endDate: "2025.10.05",
            title: i18n[currentLang].fanMeeting2Title,
            content: i18n[currentLang].fanMeeting2Content,
            link: "https://haveagood.holiday/travel/products/kinchikuyuuki"
        },
        {
            image: "image/img_event07.png",
            brand: "LASWON PRINT",
            startDate: "2025.04.23",
            endDate: "",
            title: i18n[currentLang].Laswon4Title,
            content: i18n[currentLang].Laswon4Content,
            link: "https://kangolreward.jp/SHOP/202372/241278/list.html"
        },
        {
            image: "image/img_event05.png",
            brand: "LASWON PRINT",
            startDate: "2024.12.30",
            endDate: "",
                    title: i18n[currentLang].Laswon3Title,
                    content: i18n[currentLang].Laswon3Content,
            link: "https://lawson-print.com/products/describe/1050790010"
        },
        {
            image: "image/img_event04.png",
            brand: "LASWON PRINT",
            startDate: "2024.10.22",
            endDate: "",
            title: i18n[currentLang].Laswon3Title,
            content: i18n[currentLang].Laswon3Content,
            link: "https://lawson-print.com/products/describe/1050790005"
        },
        {
            image: "image/img_event03.png",
            brand: "LASWON PRINT",
            startDate: "2024.04.23",
            endDate: "",
            title: i18n[currentLang].Laswon2Title,
            content: i18n[currentLang].Laswon2Content,
            link: "https://lawson-print.com/products/describe/1050790001"
        },
        {
            image: "image/img_event06.png",
            brand: "KANGOL",
            startDate: "2025.03.04",
            endDate: "2025.04.15",
            title: i18n[currentLang].kangol2Title,
            content: i18n[currentLang].kangol2content,
            link: "https://kangolreward.jp/SHOP/202372/241278/list.html"
        },
        {
            image: "image/img_event02.png",
            brand: "Fan Meeting",
            startDate: "2025.02.27",
            endDate: "2025.02.27",
            title: i18n[currentLang].fanMeeting1Title,
            content: i18n[currentLang].fanMeetingContent,
            link: "https://travel.haveagood.holiday/specials/yuuki__kinchiku"
        },
        {
            image: "image/img_event01.png",
            brand: "KANGOL",
            startDate: "2024.08.06",
            endDate: "2024.09.17",
            title: i18n[currentLang].kangol1Title,
            content: i18n[currentLang].kangol1content,
            link: "https://kangolreward.jp/SHOP/list.php?Search=筋築家&FROM_ENCODING=U"
        },
    ];
    othersList = [
        {
            number: "01",
            title: i18n[currentLang].gift,
            content:  i18n[currentLang].giftContent,
            link: "https://www.amazon.jp/hz/wishlist/ls/223KH2VBZTSQZ?ref_=wl_share"
        },
        {
            number: "02",
            title:  i18n[currentLang].goods,
            content:  i18n[currentLang].goodsContent,
            link: "https://ykinchiku.booth.pm"
        },
        {
            number: "03",
            title:  i18n[currentLang].email,
            content: i18n[currentLang].emailContent,
            link: "mailto:y.kinchiku@gmail.com"
        },
    ];

    document.querySelectorAll('.collaboration').forEach(item => {
        item.textContent = i18n[currentLang].event;
    });
    document.querySelectorAll('.subscription').forEach(item => {
        item.textContent = i18n[currentLang].subscription;
    });
    const home = document.getElementById('home');
    home.textContent = i18n[currentLang].home;

    const name = document.getElementById('name');
    name.textContent = i18n[currentLang].name;
    const main_message = document.getElementById('main_message');
    main_message.textContent = i18n[currentLang].mainMessage;
}