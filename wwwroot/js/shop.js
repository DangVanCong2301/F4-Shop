const shopMobileTitle = document.querySelectorAll(".shop__mobile-title-item");

// Auto Run Slider
let index = 0;
const sliderShopNumber = document.querySelectorAll(".shop__info-slider-item");
const dots = document.querySelector(".shop__info-slider-dot");

for (let i = 0; i < sliderShopNumber.length; i++) {
    const span = document.createElement("span");
    span.id = i;
    dots.appendChild(span);
}
document.getElementById("0").classList.add("slider-shop-cirle-fill");
const dot = document.querySelectorAll(".shop__info-slider-dot span");
// Dot click
for (let i = 0; i < dot.length; i++) {
    dot[i].addEventListener('click', () => {
        index = dot[i].id;
        document.querySelector(".shop__info-slider-list").style.right = index * 100 + "%"; 
        document.querySelector(".slider-shop-cirle-fill").classList.remove("slider-shop-cirle-fill");
        document.getElementById(index).classList.add("slider-shop-cirle-fill");
    });
}

function sliderShopAuto() {
    index = index + 1;
    if (index > sliderShopNumber.length - 1) {
        index = 0;
    }
    document.querySelector(".shop__info-slider-list").style.right = index * 100 + "%"; 
    document.querySelector(".slider-shop-cirle-fill").classList.remove("slider-shop-cirle-fill");
    document.getElementById(index).classList.add("slider-shop-cirle-fill");
}
setInterval(sliderShopAuto, 3000);

// Next/Prev Slider Shop
const btnNextSliderShop = document.querySelector(".shop__info-slider-arrow-next");
const btnPrevSliderShop = document.querySelector(".shop__info-slider-arrow-prev");

btnNextSliderShop.addEventListener('click', () => {
    index = index + 1;
    if (index > sliderShopNumber.length - 1) {
        index = 0;
    }
    document.querySelector(".shop__info-slider-list").style.right = index * 100 + "%"; 
    document.querySelector(".slider-shop-cirle-fill").classList.remove("slider-shop-cirle-fill");
    document.getElementById(index).classList.add("slider-shop-cirle-fill");
});

btnPrevSliderShop.addEventListener('click', () => {
    index = index - 1;
    if (index <= 0) {
        index = sliderShopNumber.length - 1;
    }
    document.querySelector(".shop__info-slider-list").style.right = index * 100 + "%"; 
    document.querySelector(".slider-shop-cirle-fill").classList.remove("slider-shop-cirle-fill");
    document.getElementById(index).classList.add("slider-shop-cirle-fill");
});

for (let i = 0; i < shopMobileTitle.length; i++) {
    shopMobileTitle[i].addEventListener('click', () => {
        if (i == 0) {
            addShopMobileShop(i);
        } else if (i == 1) {
            addShopMobileProduct(i);
        } else if (i == 2) {
            addShopMobileCategory(i);
        }
    });
}

function addShopMobileShop(i) {
    shopMobileTitle[i].classList.add("active");
    shopMobileTitle[1].classList.remove("active");
    shopMobileTitle[2].classList.remove("active");
    document.querySelector(".shop__mobile-shop").classList.remove("hide-on-mobile");
    document.querySelector(".shop__mobile-product").classList.add("hide-on-mobile");
    document.querySelector(".shop__mobile-category").classList.add("hide-on-mobile");
    document.querySelector(".header__sort-bar").classList.add("hide-on-mobile");
    
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/shop/get-data', true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
            document.querySelector(".shop__mobile-description").innerHTML = data.stores[0].sDesc;
            let html = "";
            html += data.topSellingProducts.map((obj, index) => `
            <div class="shop__mobile-shop-selling-item">
               <a href="#" class="shop__mobile-shop-selling-link">
                    <div class="shop__mobile-shop-selling-link-img"
                        style="background-image: url(/img/${obj.sImageUrl});">
                        <div class="shop__mobile-shop-selling-link-img-top top-${index + 1}">
                            <div class="shop__mobile-shop-selling-link-img-top-text">TOP</div>
                            <div class="shop__mobile-shop-selling-link-img-top-numb">${index + 1}</div>
                        </div>
                    </div>         
                    <div class="shop__mobile-shop-selling-link-desc">
                        <div class="shop__mobile-shop-selling-link-desc-name">
                            ${obj.sProductName}
                        </div>
                        <div class="shop__mobile-shop-selling-link-desc-price">${obj.dPrice}đ</div>
                    </div>
                </a>         
            </div>
            `).join('');
            document.querySelector(".shop__mobile-shop-selling-list").innerHTML = html;
        }
    };
    xhr.send(null);
}

function addShopMobileProduct(i) {
    shopMobileTitle[0].classList.remove("active");
    shopMobileTitle[i].classList.add("active");
    shopMobileTitle[2].classList.remove("active");
    document.querySelector(".shop__mobile-shop").classList.add("hide-on-mobile");
    document.querySelector(".shop__mobile-product").classList.remove("hide-on-mobile");
    document.querySelector(".shop__mobile-category").classList.add("hide-on-mobile");
    document.querySelector(".header__sort-bar").classList.remove("hide-on-mobile");
}

function addShopMobileCategory(i) {
    shopMobileTitle[0].classList.remove("active");
    shopMobileTitle[1].classList.remove("active");
    shopMobileTitle[i].classList.add("active");
    document.querySelector(".shop__mobile-shop").classList.add("hide-on-mobile");
    document.querySelector(".shop__mobile-product").classList.add("hide-on-mobile");
    document.querySelector(".shop__mobile-category").classList.remove("hide-on-mobile");
    document.querySelector(".header__sort-bar").classList.add("hide-on-mobile");
}

function tonglePrice() {
    document.querySelector(".header__sort-link-icon").classList.add("uil-arrow-up");
    document.querySelector(".header__sort-link-icon").classList.toggle("uil-arrow-down")
}

function openModalOrderMe() {
    document.querySelector(".header__mobile-more-modal").classList.add("open");
}

window.addEventListener('click', (e) => {
    if (e.target == document.querySelector(".header__mobile-more-modal")) {
        document.querySelector(".header__mobile-more-modal").classList.remove("open");
    }
});

window.addEventListener('scroll', () => {
    const y = this.pageYOffset;
    if (y > 80) {
        document.querySelector(".shop__mobile-header").classList.add("scroll");
    } else {
        document.querySelector(".shop__mobile-header").classList.remove("scroll");
    }
});