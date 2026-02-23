/**
 * ============================================================
 * ★ ENV 配置区 (你需要手动修改的地方) ★
 * ============================================================
 */
const ENV = {
    // 1. 营业时间 (直接修改文字，支持HTML)
    hoursText: "6:00PM - 10:30PM", 
    
    // 2. 休息天 (想改星期几，就直接改这里的字)
    restDayText: "星期一休息 (Closed on Monday)", 

    // 3. 联系人设置
    contact: {
        whatsappPhone: "601162835972", // 链接用的号码
        peggieName: "Peggie",
        peggieShow: "011-6283 5972",   // 显示的号码
        jerryName: "Jerry",
        jerryShow: "011-6283 5972"
    },

    // 4. 图片路径管理 (Seafood 1-6 的图片在这里改)
    images: {
        logo: "images/yuanhub_logo_clear.png",
        heroBackground: "images/laobanniang.JPG", 

        // 海鲜代号
        seafood_1: "images/grill_oyster.png",
        seafood_2: "images/grill_scallop.png",
        seafood_3: "images/grill_oyster2.png",
        seafood_4: "images/xiu_dan_chille.png",
        seafood_5: "images/smokin_ketam.png",
        seafood_6: "images/crab_sb.png",
        
        // 其他
        beer: "images/tiger_beer_can.png",
        noodle: "images/fry_mee.png",
        rice: "images/tomyam_fried_rice.png"
    }
};

/**
 * ============================================================
 * ★ 菜单数据配置 ★
 * ============================================================
 */
var allDishes = [
    // 螃蟹类
    { id: 1, name: '特色烤螃蟹', category: 'crab', price: 'RM 12 /100G', image: ENV.images.seafood_6 },
    { id: 2, name: '蒜蓉烤螃蟹', category: 'crab', price: 'RM 65', image: ENV.images.seafood_4 },
    { id: 3, name: '香辣烤螃蟹', category: 'crab', price: 'RM 65', image: ENV.images.seafood_5 },

    // 海鲜类
    { id: 4, name: '炭烤大虾', category: 'seafood', price: 'RM 45', image: ENV.images.seafood_3 },
    { id: 5, name: '炭烤扇贝', category: 'seafood', price: 'RM 38', image: ENV.images.seafood_2 },
    { id: 6, name: '炭烤生蚝', category: 'seafood', price: 'RM 24', image: ENV.images.seafood_1 },

    // 小炒
    { id: 7, name: '炒冬粉', category: 'stirfry', price: 'RM 26', image: "images/fry_glass_noodle.png" },
    { id: 8, name: '麻婆豆腐', category: 'stirfry', price: 'RM 22', image: "images/ah_po_taufu.png" },

    // 面/饭/饮料
    { id: 10, name: '招牌炒面', category: 'noodles', price: 'RM 18', image: ENV.images.noodle },
    { id: 13, name: '招牌炒饭', category: 'rice', price: 'RM 18', image: ENV.images.rice },
    { id: 16, name: '招牌老虎', category: 'drinks', price: 'RM 18', image: ENV.images.beer },
];

/**
 * ============================================================
 * ★ 功能逻辑区 (以下代码不需要经常修改) ★
 * ============================================================
 */

// 1. 页面加载初始化
window.onload = function() {
    // 加载图片
    const logo = document.getElementById('header-logo');
    if(logo) logo.src = ENV.images.logo;

    const hero = document.getElementById('hero-section');
    if(hero) hero.style.backgroundImage = `url('${ENV.images.heroBackground}')`;

    // 加载文字
    const hours = document.getElementById('display-hours');
    if(hours) hours.innerHTML = ENV.hoursText;

    const rest = document.getElementById('display-restday');
    if(rest) rest.innerHTML = ENV.restDayText;

    // 加载联系方式
    const contactArea = document.getElementById('contact-info-area');
    if(contactArea) {
        contactArea.innerHTML = `
            <p class="contact-detail">
                <a href="https://wa.me/${ENV.contact.whatsappPhone}" target="_blank" style="text-decoration:none; color:inherit;">
                    ${ENV.contact.peggieName} ${ENV.contact.peggieShow} 🟢
                </a>
            </p>
            <p class="contact-detail">${ENV.contact.jerryName} ${ENV.contact.jerryShow}</p>
        `;
    }

    // 渲染默认菜单
    renderDishes(allDishes);
};

// 2. 渲染菜单函数
function renderDishes(dishes) {
    const grid = document.getElementById('dishesGrid');
    if(!grid) return;

    grid.innerHTML = dishes.map(dish => `
        <div class="dish-card">
            <div class="dish-image" onclick="openModal('${dish.image}')">
                <img src="${dish.image}" alt="${dish.name}">
            </div>
            <div class="dish-info">
                <div class="dish-name">${dish.name}</div>
                <div class="dish-price">${dish.price}</div>
            </div>
        </div>
    `).join('');
}

// 3. 筛选功能
function filterDishes(category, btn) {
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');

    if (category === 'all') {
        renderDishes(allDishes);
    } else {
        const filtered = allDishes.filter(d => d.category === category);
        renderDishes(filtered);
    }
}

// 4. 图片放大功能
function openModal(src) {
    const modal = document.getElementById('imageModal');
    const img = document.getElementById('imgZoom');
    modal.style.display = "flex";
    img.src = src;
}

function closeModal() {
    document.getElementById('imageModal').style.display = "none";
}