
/* =========================================================
   FOODKART - HOME.JS
   Navigation | Restaurants | Categories | Menus
   Cart | Profile | Current Location Map
   ========================================================= */

// ==================== ELEMENTS ====================

const homePage = document.getElementById("homePage");
const menuPage = document.getElementById("menuPage");
const profilePage = document.getElementById("profilePage");
const foodLocationSection = document.getElementById("foodLocationSection");
const restaurantGrid = document.getElementById("restaurantGrid");
const menuGrid = document.getElementById("menuGrid");

const homeLink = document.getElementById("homeLink");
const restaurantLink = document.getElementById("restaurantLink");
const categoryLink = document.getElementById("categoryLink");
const profileLink = document.getElementById("profileLink");
const logoLink = document.getElementById("logoLink");
const backToRestaurants = document.getElementById("backToRestaurants");

const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const navLocationButton = document.getElementById("navLocationButton");
const navLocationText = document.getElementById("navLocationText");
const selectedLocationText = document.getElementById("selectedLocationText");

const mapSearchInput = document.getElementById("mapSearchInput");
const mapSearchButton = document.getElementById("mapSearchButton");
const currentLocationButton = document.getElementById("currentLocationButton");

// ==================== CART DATA ====================

let cart = [];

try {
    const savedCart = JSON.parse(
        localStorage.getItem("foodkart_cart") || "[]"
    );

    cart = Array.isArray(savedCart) ? savedCart : [];
} catch (error) {
    cart = [];
}

let foodKartMap = null;
let currentLocationMarker = null;
let selectedRestaurant = null;

// ==================== RESTAURANT MENUS ====================

const menus = {
    paradise: [
        { id: "p1", name: "Chicken Dum Biryani", price: 220, image: "https://media.istockphoto.com/id/1410130688/photo/mutton-biryani-served-in-a-golden-dish-isolated-on-dark-background-side-view-indian-food.jpg?s=612x612&w=0&k=20&c=ueFrghYZuKAty-rFVe5dtMtNIbn0jaUsSvCUwTVOmd8=" },
        { id: "p2", name: "Mutton Biryani", price: 280, image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500" },
        { id: "p3", name: "Chicken Fry Piece Biryani", price: 250, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500" }
    ],

    pizza: [
        { id: "pi1", name: "Margherita Pizza", price: 199, image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=500" },
        { id: "pi2", name: "Farmhouse Pizza", price: 279, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" },
        { id: "pi3", name: "Cheese Burst Pizza", price: 299, image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=500" }
    ],

    burger: [
        { id: "b1", name: "Classic Burger", price: 129, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
        { id: "b2", name: "Cheese Burger", price: 159, image: "https://images.immediate.co.uk/production/volatile/sites/2/2020/04/Cheeseburger-74e8cde.jpg" },
        { id: "b3", name: "Chicken Burger", price: 189, image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500" }
    ],

    sweet: [
        { id: "s1", name: "Chocolate Cake", price: 120, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500" },
        { id: "s2", name: "Brownie", price: 100, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500" },
        { id: "s3", name: "Cupcake", price: 80, image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=500" }
    ],

    chicken: [
        { id: "c1", name: "Grilled Chicken", price: 250, image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=500" },
        { id: "c2", name: "Chicken Wings", price: 180, image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500" },
        { id: "c3", name: "Chicken Lollipop", price: 200, image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500" }
    ],

    royal: [
        { id: "r1", name: "Royal Chicken Biryani", price: 240, image: "https://img.magnific.com/premium-photo/dum-handi-chicken-biryani-is-prepared-earthen-clay-pot-called-haandi-popular-indian-non-vegetarian-food_466689-52350.jpg?semt=ais_hybrid&w=740&q=80" },
        { id: "r2", name: "Mutton Biryani", price: 290, image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500" },
        { id: "r3", name: "Egg Biryani", price: 170, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500" }
    ],

    "south-spice": [
        { id: "ss1", name: "Masala Dosa", price: 80, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500" },
        { id: "ss2", name: "Idli Sambar", price: 60, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500" },
        { id: "ss3", name: "Pesarattu", price: 90, image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=500" }
    ],

    "chinese-wok": [
        { id: "cw1", name: "Veg Noodles", price: 130, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500" },
        { id: "cw2", name: "Chicken Noodles", price: 170, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500" },
        { id: "cw3", name: "Schezwan Noodles", price: 160, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500" }
    ],

    "rolls-wraps": [
        { id: "rw1", name: "Chicken Roll", price: 120, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500" },
        { id: "rw2", name: "Paneer Roll", price: 110, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500" },
        { id: "rw3", name: "Egg Roll", price: 90, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500" }
    ],

    "kebab-junction": [
        { id: "kj1", name: "Chicken Kebab", price: 200, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500" },
        { id: "kj2", name: "Seekh Kebab", price: 220, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500" },
        { id: "kj3", name: "Tandoori Kebab", price: 240, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500" }
    ],

    "coffee-house": [
        { id: "ch1", name: "Cold Coffee", price: 100, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500" },
        { id: "ch2", name: "Cappuccino", price: 120, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500" },
        { id: "ch3", name: "Chocolate Shake", price: 140, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500" }
    ],

    "italian-kitchen": [
        { id: "ik1", name: "Pasta Alfredo", price: 220, image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500" },
        { id: "ik2", name: "Red Sauce Pasta", price: 200, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500" },
        { id: "ik3", name: "Cheese Pizza", price: 250, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" }
    ],

    "sandwich-station": [
        { id: "sw1", name: "Veg Sandwich", price: 90, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500" },
        { id: "sw2", name: "Cheese Sandwich", price: 120, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500" },
        { id: "sw3", name: "Chicken Sandwich", price: 150, image: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=500" }
    ],

    "ocean-seafood": [
        { id: "os1", name: "Fish Fry", price: 250, image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500" },
        { id: "os2", name: "Prawn Fry", price: 280, image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=500" },
        { id: "os3", name: "Fish Curry", price: 230, image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500" }
    ],

    "thali-house": [
        { id: "th1", name: "Veg Thali", price: 150, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500" },
        { id: "th2", name: "South Indian Thali", price: 180, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500" },
        { id: "th3", name: "Special Thali", price: 220, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500" }
    ],

    "momo-street": [
        { id: "ms1", name: "Veg Momos", price: 100, image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500" },
        { id: "ms2", name: "Chicken Momos", price: 130, image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500" },
        { id: "ms3", name: "Fried Momos", price: 140, image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500" }
    ],

    "shawarma-point": [
        { id: "sp1", name: "Chicken Shawarma", price: 130, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500" },
        { id: "sp2", name: "Special Shawarma", price: 160, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500" },
        { id: "sp3", name: "Plate Shawarma", price: 190, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500" }
    ],

    "fresh-bake": [
        { id: "fb1", name: "Chocolate Cake", price: 120, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500" },
        { id: "fb2", name: "Donut", price: 70, image: "https://bakewithshivesh.com/wp-content/uploads/2020/06/B6A93BC1-0424-485F-8BF4-622140B2BE4D-scaled.jpg" },
        { id: "fb3", name: "Croissant", price: 90, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500" }
    ],

    "ice-cream-world": [
        { id: "iw1", name: "Vanilla Ice Cream", price: 80, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500" },
        { id: "iw2", name: "Chocolate Ice Cream", price: 100, image: "https://images.immediate.co.uk/production/volatile/sites/30/2021/06/Next-Level_Ice-Cream-3db3bd9.jpg" },
        { id: "iw3", name: "Strawberry Ice Cream", price: 110, image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=500" }
    ],

    "street-food": [
        { id: "sf1", name: "Pani Puri", price: 50, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500" },
        { id: "sf2", name: "Pav Bhaji", price: 100, image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500" },
        { id: "sf3", name: "Samosa", price: 30, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500" }
    ],

    "healthy-bowl": [
        { id: "hb1", name: "Veg Salad Bowl", price: 140, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500" },
        { id: "hb2", name: "Chicken Bowl", price: 190, image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500" },
        { id: "hb3", name: "Fruit Bowl", price: 120, image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=500" }
    ],

    "tandoori-house": [
        { id: "ta1", name: "Tandoori Chicken", price: 280, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500" },
        { id: "ta2", name: "Chicken Tikka", price: 220, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500" },
        { id: "ta3", name: "Paneer Tikka", price: 190, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500" }
    ],

    "noodle-express": [
        { id: "ne1", name: "Hakka Noodles", price: 140, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500" },
        { id: "ne2", name: "Chicken Noodles", price: 180, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500" },
        { id: "ne3", name: "Schezwan Noodles", price: 160, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500" }
    ]
};


// ==================== FOOD DESCRIPTIONS ====================

const foodDescriptions = {
    // Paradise
    p1: "Aromatic basmati rice cooked with tender chicken, traditional spices and authentic dum biryani flavours.",
    p2: "Rich and flavourful mutton biryani prepared with fragrant basmati rice and delicious spices.",
    p3: "Spicy fried chicken pieces served with aromatic biryani rice and traditional masala.",

    // Pizza
    pi1: "Classic Italian pizza topped with fresh mozzarella cheese, tomato sauce and aromatic basil.",
    pi2: "Loaded with fresh capsicum, onions, tomatoes, mushrooms and melted cheese.",
    pi3: "Delicious pizza with a creamy cheese-filled crust and generous cheesy toppings.",

    // Burgers
    b1: "A classic burger with a juicy patty, fresh lettuce, tomato and delicious signature sauce.",
    b2: "A delicious burger filled with melted cheese, a crispy patty and creamy sauce.",
    b3: "Juicy chicken patty layered with fresh vegetables and flavourful burger sauce.",

    // Sweets
    s1: "Soft and moist chocolate cake layered with rich chocolate cream and smooth frosting.",
    s2: "Warm and fudgy chocolate brownie with a rich cocoa flavour.",
    s3: "Soft and fluffy cupcake topped with delicious creamy frosting.",

    // Chicken
    c1: "Tender chicken grilled to perfection with aromatic herbs and delicious seasoning.",
    c2: "Juicy chicken wings coated in a flavourful marinade and cooked until deliciously tender.",
    c3: "Crispy chicken lollipops marinated with spices and served with a tasty dipping sauce.",

    // Royal Biryani
    r1: "Royal-style chicken biryani prepared with fragrant basmati rice and rich traditional spices.",
    r2: "Tender mutton pieces cooked with aromatic rice and a delicious blend of spices.",
    r3: "Flavourful egg biryani prepared with boiled eggs, basmati rice and special masala.",

    // South Spice
    ss1: "Golden crispy dosa filled with seasoned potato masala and served with chutney and sambar.",
    ss2: "Soft steamed idlis served with flavourful sambar and fresh coconut chutney.",
    ss3: "Traditional green gram dosa served with tasty chutney and delicious South Indian flavours.",

    // Chinese Wok
    cw1: "Stir-fried noodles tossed with fresh vegetables, sauces and aromatic seasonings.",
    cw2: "Delicious noodles tossed with tender chicken pieces, vegetables and Chinese sauces.",
    cw3: "Spicy Schezwan noodles prepared with vegetables and bold Indo-Chinese flavours.",

    // Rolls and Wraps
    rw1: "Soft wrap filled with juicy chicken, fresh vegetables and flavourful sauces.",
    rw2: "Delicious paneer roll stuffed with seasoned paneer, onions and creamy sauces.",
    rw3: "Freshly prepared roll filled with egg, onions and tasty spices.",

    // Kebab Junction
    kj1: "Juicy chicken pieces marinated with aromatic spices and grilled to perfection.",
    kj2: "Traditional minced meat kebab seasoned with herbs and spices, cooked until tender.",
    kj3: "Delicious kebabs prepared with a flavourful tandoori marinade and smoky seasoning.",

    // Coffee House
    ch1: "Refreshing chilled coffee blended with milk, coffee and a smooth creamy texture.",
    ch2: "Rich espresso combined with steamed milk and a smooth layer of milk foam.",
    ch3: "Thick and creamy chocolate shake blended with milk and rich chocolate flavour.",

    // Italian Kitchen
    ik1: "Creamy Alfredo pasta tossed in a rich white sauce with herbs and delicious seasoning.",
    ik2: "Italian-style pasta coated in tangy red tomato sauce with aromatic herbs.",
    ik3: "Delicious pizza topped with melted cheese, rich tomato sauce and Italian seasoning.",

    // Sandwich Station
    sw1: "Fresh bread filled with crunchy vegetables, lettuce and a delicious spread.",
    sw2: "Toasted sandwich filled with melted cheese and a creamy, flavourful filling.",
    sw3: "Tasty chicken sandwich layered with tender chicken, fresh vegetables and sauce.",

    // Ocean Seafood
    os1: "Fresh fish marinated with aromatic spices and pan-fried until crispy and delicious.",
    os2: "Juicy prawns tossed in a spicy marinade and fried with flavourful seasonings.",
    os3: "Traditional fish curry cooked in a rich, spicy gravy with aromatic ingredients.",

    // Thali House
    th1: "A wholesome vegetarian meal served with rice, dal, vegetables, curry and accompaniments.",
    th2: "Traditional South Indian meal featuring rice, sambar, rasam, vegetables and other sides.",
    th3: "A special meal with a delicious combination of rice, curries, dal, vegetables and sides.",

    // Momo Street
    ms1: "Soft steamed dumplings filled with seasoned vegetables and served with spicy chutney.",
    ms2: "Steamed dumplings stuffed with flavourful chicken filling and served with dipping sauce.",
    ms3: "Crispy fried dumplings with a delicious filling and spicy dipping sauce.",

    // Shawarma Point
    sp1: "Juicy seasoned chicken wrapped in soft bread with fresh vegetables and creamy garlic sauce.",
    sp2: "A flavourful chicken shawarma loaded with special sauces and fresh vegetable fillings.",
    sp3: "A generous shawarma platter served with seasoned chicken, sauces and fresh accompaniments.",

    // Fresh Bake
    fb1: "Moist chocolate cake with rich chocolate layers and smooth creamy frosting.",
    fb2: "Soft, fluffy donut topped with sweet glaze and delicious flavours.",
    fb3: "Buttery, flaky French pastry baked until golden and crisp.",

    // Ice Cream World
    iw1: "Smooth and creamy vanilla ice cream with a classic sweet flavour.",
    iw2: "Rich chocolate ice cream made for chocolate lovers with a creamy texture.",
    iw3: "Sweet and refreshing strawberry ice cream with fruity flavour.",

    // Street Food
    sf1: "Crispy puris filled with spicy tangy water, potatoes and delicious street-style flavours.",
    sf2: "Popular Indian street food made with buttery bread served alongside spicy vegetable mash.",
    sf3: "Crispy golden pastry filled with a deliciously spiced potato mixture.",

    // Healthy Bowl
    hb1: "A refreshing bowl of fresh vegetables and greens for a light and tasty meal.",
    hb2: "A satisfying bowl with tender chicken, fresh vegetables and flavourful accompaniments.",
    hb3: "A colourful bowl filled with fresh seasonal fruits and natural sweetness.",

    // Tandoori House
    ta1: "Chicken marinated in traditional tandoori spices and roasted for a smoky flavour.",
    ta2: "Tender chicken pieces marinated with yoghurt and spices, grilled until deliciously smoky.",
    ta3: "Soft paneer cubes marinated with spices and grilled with a delicious tandoori flavour.",

    // Noodle Express
    ne1: "Classic Hakka noodles stir-fried with fresh vegetables and Chinese-style seasonings.",
    ne2: "Delicious chicken noodles tossed with vegetables and flavourful sauces.",
    ne3: "Hot and spicy Schezwan noodles tossed with vegetables and bold sauces."
};


// ==================== CART DATA REPAIR ====================

function findMenuItem(item) {
    for (const [restaurantId, items] of Object.entries(menus)) {
        const found = items.find(food =>
            food.id === item.id ||
            food.name.toLowerCase() ===
            String(item.name || item.itemName || "").toLowerCase()
        );

        if (found) {
            return { food: found, restaurantId };
        }
    }

    return null;
}

function normalizeCartItem(item) {
    const match = findMenuItem(item);
    const food = match?.food;

    return {
        id: item.id || item.itemId || food?.id || "",
        name: item.name || item.itemName || food?.name || "Food Item",
        price: Number(item.price ?? item.cost ?? food?.price ?? 0),
        image: item.image || item.imageUrl || item.img || food?.image || "",
        restaurantId: item.restaurantId || match?.restaurantId || "unknown",
        restaurantName: item.restaurantName || "Restaurant",
        quantity: Math.max(1, Number(item.quantity ?? item.qty ?? 1) || 1)
    };
}

cart = cart.map(normalizeCartItem).filter(item => item.id);

localStorage.setItem("foodkart_cart", JSON.stringify(cart));

// ==================== PAGE NAVIGATION ====================

function hideAllPages() {
    if (homePage) homePage.hidden = true;
    if (menuPage) menuPage.hidden = true;
    if (profilePage) profilePage.hidden = true;

    if (foodLocationSection) {
        foodLocationSection.hidden = true;
    }
}

function setActiveLink(activeLink) {
    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
    });

    if (activeLink) {
        activeLink.classList.add("active");
    }
}

function showFooter() {
    const footer = document.getElementById("mainFooter");

    if (footer) {
        footer.style.display = "block";
    }
}

function showHome() {
    hideAllPages();
    showFooter();

    if (homePage) {
        homePage.hidden = false;
        homePage.style.display = "block";
    }

    if (foodLocationSection) {
        foodLocationSection.style.display = "block";
    }

    setActiveLink(homeLink);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function showLocation() {
    hideAllPages();


    // Hide the footer while displaying only the location section
    const footer = document.getElementById("mainFooter");

    if (footer) {
        footer.style.display = "none";
    }

    
    if (foodLocationSection) {
        foodLocationSection.hidden = false;

        foodLocationSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    setTimeout(() => {
        if (foodKartMap) {
            foodKartMap.invalidateSize();
        }
    }, 300);
}


function showRestaurants() {
    hideAllPages();
    showFooter();

    if (homePage) {
        homePage.hidden = false;
        homePage.style.display = "block";
    }

    setActiveLink(restaurantLink);

    const section = document.getElementById("restaurantsSection");

    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}

function showCategories() {
    hideAllPages();
    showFooter();

    if (homePage) {
        homePage.hidden = false;
        homePage.style.display = "block";
    }

    if (foodLocationSection) {
        foodLocationSection.style.display = "none";
    }

    setActiveLink(categoryLink);

    const section = document.getElementById("categoriesSection");

    if (section) {
        setTimeout(() => {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 100);
    } else {
        console.error("Categories section not found!");
    }
}

function showProfile() {
    hideAllPages();
    showFooter();

    if (!profilePage) {
        console.error("Profile page not found. Check id='profilePage' in HTML.");
        return;
    }

    profilePage.hidden = false;
    profilePage.style.display = "block";

    setActiveLink(profileLink);

    updateProfile();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function showMenu(restaurantId) {
    const restaurant = document.querySelector(
        `.restaurant-card[data-id="${restaurantId}"]`
    );

    if (!restaurant) return;

    selectedRestaurant = {
        id: restaurantId,
        name: restaurant.dataset.name || "Restaurant"
    };

    hideAllPages();
    showFooter();

    if (menuPage) {
        menuPage.hidden = false;
        menuPage.style.display = "block";
    }

    const restaurantName = document.getElementById("menuRestaurantName");

    if (restaurantName) {
        restaurantName.textContent = selectedRestaurant.name;
    }

    renderMenu(restaurantId);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// ==================== NAVIGATION EVENTS ====================

if (logoLink) {
    logoLink.addEventListener("click", e => {
        e.preventDefault();
        showHome();
    });
}

if (homeLink) {
    homeLink.addEventListener("click", e => {
        e.preventDefault();
        showHome();
    });
}

if (restaurantLink) {
    restaurantLink.addEventListener("click", e => {
        e.preventDefault();
        showRestaurants();
    });
}

if (categoryLink) {
    categoryLink.addEventListener("click", e => {
        e.preventDefault();
        showCategories();
    });
}

if (profileLink) {
    profileLink.addEventListener("click", e => {
        e.preventDefault();
        showProfile();
    });
}

if (backToRestaurants) {
    backToRestaurants.addEventListener("click", e => {
        e.preventDefault();
        showRestaurants();
    });
}

// ==================== RESTAURANT CLICK ====================

if (restaurantGrid) {
    restaurantGrid.addEventListener("click", e => {
        const card = e.target.closest(".restaurant-card");

        if (card) {
            showMenu(card.dataset.id);
        }
    });
}

// ==================== CATEGORY FILTER ====================

document.querySelectorAll(".category-card").forEach(category => {
    category.addEventListener("click", () => {
        const selectedCategory =
            (category.dataset.category || "").toLowerCase();

        document.querySelectorAll(".restaurant-card").forEach(card => {
            const categories =
                (card.dataset.category || "").toLowerCase().split(/\s+/);

            card.style.display =
                !selectedCategory || categories.includes(selectedCategory)
                    ? ""
                    : "none";
        });

        showRestaurants();
    });
});

// ==================== RESTAURANT SEARCH ====================


const restaurantSearch =
    document.getElementById("searchInput") ||
    document.getElementById("restaurantSearch");

const searchSuggestions =
    document.getElementById("searchSuggestions");

if (restaurantSearch) {
    restaurantSearch.addEventListener("input", () => {
        const searchValue = restaurantSearch.value.toLowerCase().trim();

        if (!searchSuggestions) return;

        searchSuggestions.innerHTML = "";

        if (!searchValue) {
            searchSuggestions.style.display = "none";

            document.querySelectorAll(".restaurant-card").forEach(card => {
                card.style.display = "";
            });

            return;
        }

        const suggestions = [];

        // Restaurant suggestions with images
        document.querySelectorAll(".restaurant-card").forEach(card => {
            const name = card.dataset.name || "";
            const image = card.querySelector("img")?.src || "";

            if (name.toLowerCase().includes(searchValue)) {
                suggestions.push({
                    name,
                    image,
                    restaurantId: card.dataset.id
                });
            }
        });

        // Food suggestions with menu images
        Object.entries(menus).forEach(([restaurantId, items]) => {
            items.forEach(item => {
                if (item.name.toLowerCase().includes(searchValue)) {
                    suggestions.push({
                        name: item.name,
                        image: item.image,
                        restaurantId
                    });
                }
            });
        });

        // Display suggestions
        searchSuggestions.innerHTML = "";
        suggestions.forEach(item => {
            const option = document.createElement("div");
            option.className = "search-suggestion";

            const img = document.createElement("img");
            img.src = item.image;
            img.alt = item.name;

            const name = document.createElement("span");
            name.textContent = item.name;

            option.appendChild(img);
            option.appendChild(name);

            option.addEventListener("click", () => {
                restaurantSearch.value = item.name;

                document.querySelectorAll(".restaurant-card").forEach(card => {
                    card.style.display =
                        card.dataset.id === item.restaurantId ? "" : "none";
                });

                searchSuggestions.style.display = "none";
            });

            searchSuggestions.appendChild(option);
        });

        if (suggestions.length > 0) {
            searchSuggestions.style.display = "block";
        } else {
            const emptyMessage = document.createElement("p");

            emptyMessage.textContent =
                    "No matching restaurants or food found.";

            searchSuggestions.appendChild(emptyMessage);
            searchSuggestions.style.display = "block";
        }

        // Filter restaurants while typing
        document.querySelectorAll(".restaurant-card").forEach(card => {
            const name = (card.dataset.name || "").toLowerCase();
            const category = (card.dataset.category || "").toLowerCase();

            const hasMatchingFood = (menus[card.dataset.id] || []).some(item =>
                item.name.toLowerCase().includes(searchValue)
            );

            card.style.display =
                name.includes(searchValue) ||
                category.includes(searchValue) ||
                hasMatchingFood
                    ? ""
                    : "none";
        });
    });
}

                
           

// ==================== MENU RENDERING ====================


function renderMenu(restaurantId) {
    if (!menuGrid) return;

    const items = menus[restaurantId] || [];

    if (!items.length) {
        menuGrid.innerHTML = "<p>No menu items available.</p>";
        return;
    }

    menuGrid.innerHTML = items.map(item => {
        const cartItem = cart.find(food =>
            food.id === item.id &&
            food.restaurantId === restaurantId
        );

        const quantity = cartItem ? cartItem.quantity : 0;

        return `
            <article class="menu-card">
                <div class="menu-image">
                    <img src="${item.image}" alt="${item.name}"
                         onerror="this.style.display='none'">
                </div>

                <div class="menu-details">
                    <h3>${item.name}</h3>

                    <p class="menu-description">
                        ${foodDescriptions[item.id] || "Delicious food freshly prepared for you."}
                    </p>

                    <div class="menu-price">₹${item.price}</div>

                    <div class="menu-actions">
                        <div class="menu-quantity"
                             style="display:${quantity > 0 ? 'flex' : 'none'}">

                            <button type="button"
                                class="menu-decrease"
                                data-id="${item.id}">−</button>

                            <span class="menu-quantity-value">${quantity}</span>

                            <button type="button"
                                class="menu-increase"
                                data-id="${item.id}">+</button>
                        </div>

                        <button class="add-to-cart"
                            data-id="${item.id}"
                            data-name="${item.name}"
                            data-price="${item.price}"
                            data-image="${item.image}"
                            style="display:${quantity > 0 ? 'none' : 'inline-flex'}">
                            <i class="fa-solid fa-plus"></i> Add
                        </button>
                    </div>
                </div>
            </article>
        `;
    }).join("");
}



// ==================== ADD TO CART ====================

if (menuGrid) {
    menuGrid.addEventListener("click", e => {
        const addButton = e.target.closest(".add-to-cart");
        const increaseButton = e.target.closest(".menu-increase");
        const decreaseButton = e.target.closest(".menu-decrease");

        if (!selectedRestaurant) return;

        const clickedButton = addButton || increaseButton || decreaseButton;
        if (!clickedButton) return;

        const itemId = clickedButton.dataset.id;

        let existingItem = cart.find(item =>
            item.id === itemId &&
            item.restaurantId === selectedRestaurant.id
        );

        if (addButton) {
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    id: itemId,
                    name: addButton.dataset.name,
                    price: Number(addButton.dataset.price),
                    image: addButton.dataset.image,
                    restaurantId: selectedRestaurant.id,
                    restaurantName: selectedRestaurant.name,
                    quantity: 1
                });
            }
        } else if (increaseButton && existingItem) {
            existingItem.quantity++;
        } else if (decreaseButton && existingItem) {
            existingItem.quantity--;

            if (existingItem.quantity <= 0) {
                cart = cart.filter(item =>
                    !(item.id === itemId &&
                      item.restaurantId === selectedRestaurant.id)
                );
            }
        }

        saveCart();
        updateCart();
        renderMenu(selectedRestaurant.id);
    });
}

// ==================== CART STORAGE ====================

function saveCart() {
    localStorage.setItem("foodkart_cart", JSON.stringify(cart));
}

function updateCart() {
    const cartCount = document.getElementById("cartCount");
    const checkoutButton = document.getElementById("checkoutButton");

    const totalQuantity = cart.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
    );

    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }

    if (checkoutButton) {
        checkoutButton.disabled = cart.length === 0;

        const isLoggedIn =
            localStorage.getItem("foodkart_authenticated") === "true" ||
            localStorage.getItem("foodkart_loggedIn") === "true";

        checkoutButton.textContent = isLoggedIn
            ? "Proceed to Checkout"
            : "Please Login First";
    }

    renderCart();
    updateCartLocation();
}

// ==================== CART DISPLAY ====================

function renderCart() {
    const cartItems = document.getElementById("cartItems");

    if (!cartItems) return;

    if (!cart.length) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-basket-shopping"></i>
                <h3>Your cart is empty</h3>
                <p>Add some delicious food!</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}"
                     onerror="this.style.display='none'">

                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.restaurantName || ""}</p>

                    <strong>
                        ₹${Number(item.price) * Number(item.quantity)}
                    </strong>

                    <div class="cart-quantity">
                        <button type="button"
                            data-action="decrease"
                            data-id="${item.id}"
                            data-restaurant="${item.restaurantId}">−</button>

                        <span>${item.quantity}</span>

                        <button type="button"
                            data-action="increase"
                            data-id="${item.id}"
                            data-restaurant="${item.restaurantId}">+</button>
                    </div>
                </div>

                <button type="button"
                    class="remove-cart-item"
                    data-action="remove"
                    data-id="${item.id}"
                    data-restaurant="${item.restaurantId}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `).join("");
    }

    calculateCartTotal();
}

// ==================== CART LOCATION DISPLAY ====================

function updateCartLocation() {
    const locationButton =
        document.getElementById("cartLocationButton");

    const locationDisplay =
        document.getElementById("cartLocationDisplay");

    const addressText =
        document.getElementById("cartAddressText");

    let savedLocation = null;

    try {
        savedLocation = JSON.parse(
            localStorage.getItem("foodkart_location") || "null"
        );
    } catch (error) {
        savedLocation = null;
    }

    if (savedLocation && savedLocation.name) {
        if (locationButton) {
            locationButton.style.display = "none";
        }

        if (locationDisplay) {
            locationDisplay.style.display = "flex";
        }

        if (addressText) {
            addressText.textContent = savedLocation.name;
        }
    } else {
        if (locationButton) {
            locationButton.style.display = "flex";
        }

        if (locationDisplay) {
            locationDisplay.style.display = "none";
        }
    }
}

// ==================== OPEN LOCATION FROM CART ====================

const cartLocationButton =
    document.getElementById("cartLocationButton");


console.log("Cart button:", cartLocationButton);

if (cartLocationButton) {
    cartLocationButton.addEventListener("click", function () {
        console.log("Cart button clicked!");

        closeCartDrawer();
        showLocation();
    });
}

// ==================== CART QUANTITY ====================

const cartItemsElement = document.getElementById("cartItems");

if (cartItemsElement) {
    cartItemsElement.addEventListener("click", e => {
        const button = e.target.closest("[data-action]");

        if (!button) return;

        const id = button.dataset.id;
        const restaurantId = button.dataset.restaurant;
        const action = button.dataset.action;

        const item = cart.find(item =>
            item.id === id &&
            item.restaurantId === restaurantId
        );

        if (!item) return;

        if (action === "increase") {
            item.quantity++;
        }

        if (action === "decrease") {
            item.quantity--;

            if (item.quantity <= 0) {
                cart = cart.filter(cartItem =>
                    !(cartItem.id === id &&
                      cartItem.restaurantId === restaurantId)
                );
            }
        }

        if (action === "remove") {
            cart = cart.filter(cartItem =>
                !(cartItem.id === id &&
                  cartItem.restaurantId === restaurantId)
            );
        }

        saveCart();
        updateCart();
    });
}

// ==================== CART TOTAL ====================

function calculateCartTotal() {
    const itemTotalElement = document.getElementById("itemTotal");
    const deliveryFeeElement = document.getElementById("deliveryFee");
    const platformFeeElement = document.getElementById("platformFee");
    const grandTotalElement = document.getElementById("grandTotal");

    const itemTotal = cart.reduce(
        (total, item) =>
            total +
            Number(item.price || 0) * Number(item.quantity || 0),
        0
    );

    const deliveryFee = itemTotal > 0 ? 30 : 0;
    const platformFee = itemTotal > 0 ? 5 : 0;
    const grandTotal = itemTotal + deliveryFee + platformFee;

    if (itemTotalElement) {
        itemTotalElement.textContent = `₹${itemTotal}`;
    }

    if (deliveryFeeElement) {
        deliveryFeeElement.textContent = `₹${deliveryFee}`;
    }

    if (platformFeeElement) {
        platformFeeElement.textContent = `₹${platformFee}`;
    }

    if (grandTotalElement) {
        grandTotalElement.textContent = `₹${grandTotal}`;
    }
}

// ==================== OPEN / CLOSE CART ====================

function openCartDrawer() {
    updateCartLocation();

    if (cartDrawer) {
        cartDrawer.classList.add("active");
    }

    if (cartOverlay) {
        cartOverlay.classList.add("active");
    }
}

function closeCartDrawer() {
    if (cartDrawer) {
        cartDrawer.classList.remove("active");
    }

    if (cartOverlay) {
        cartOverlay.classList.remove("active");
    }
}

if (cartButton) {
    cartButton.addEventListener("click", e => {
        e.preventDefault();
        openCartDrawer();
    });
}

if (closeCart) {
    closeCart.addEventListener("click", closeCartDrawer);
}

if (cartOverlay) {
    cartOverlay.addEventListener("click", closeCartDrawer);
}

// ==================== CHECKOUT ====================

const checkoutButton = document.getElementById("checkoutButton");

if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {

        if (!cart.length) {
            alert("Your cart is empty!");
            return;
        }

        const savedLocation =
            localStorage.getItem("foodkart_location");

        if (!savedLocation) {
            alert("Please select your delivery location first.");
            return;
        }

        const isLoggedIn =
            localStorage.getItem("foodkart_authenticated") === "true" ||
            localStorage.getItem("foodkart_loggedIn") === "true";

        if (!isLoggedIn) {
            window.location.href = "login.html";
            return;
        }

        alert("Your order has been placed successfully!");

        cart = [];

        saveCart();
        updateCart();

        closeCartDrawer();
    });
}

// ==================== PROFILE ====================

function updateProfile() {
    const guestSection = document.getElementById("guestSection");
    const loggedInSection = document.getElementById("loggedInSection");

    const displayName = document.getElementById("displayName");
    const displayEmail = document.getElementById("displayEmail");
    const displayPhone = document.getElementById("displayPhone");

    let profile = null;

    try {
        profile =
            JSON.parse(localStorage.getItem("foodkart_profile")) ||
            JSON.parse(localStorage.getItem("foodkartUser")) ||
            JSON.parse(localStorage.getItem("foodkartCurrentUser"));
    } catch (error) {
        profile = null;
    }

    const isLoggedIn =
        localStorage.getItem("foodkart_authenticated") === "true" ||
        localStorage.getItem("foodkart_loggedIn") === "true";

    if (profile && isLoggedIn) {

        if (guestSection) {
            guestSection.hidden = false;
            guestSection.style.display = "none";
        }

        if (loggedInSection) {
            loggedInSection.hidden = false;
            loggedInSection.style.display = "block";
        }

        if (displayName) {
            displayName.textContent =
                profile.name || profile.username || "User";
        }

        if (displayEmail) {
            displayEmail.textContent = profile.email || "";
        }

        if (displayPhone) {
            displayPhone.textContent =
                profile.phone || profile.mobile || "";
        }

    } else {

        if (guestSection) {
            guestSection.hidden = false;
            guestSection.style.display = "block";
        }

        if (loggedInSection) {
            loggedInSection.hidden = false;
            loggedInSection.style.display = "none";
        }
    }
}

// ==================== LOGOUT ====================

const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
    logoutButton.addEventListener("click", () => {

        localStorage.removeItem("foodkart_authenticated");
        localStorage.removeItem("foodkart_loggedIn");
        localStorage.removeItem("foodkart_profile");
        localStorage.removeItem("foodkartUser");
        localStorage.removeItem("foodkartCurrentUser");

        alert("Logged out successfully!");

        showProfile();
    });
}

// ==================== CURRENT LOCATION MAP ====================

const DEFAULT_LATITUDE = 17.9689;
const DEFAULT_LONGITUDE = 79.5941;

function initializeMap(
    latitude,
    longitude,
    locationName = "Selected Location"
) {
    const mapElement = document.getElementById("foodKartMap");

    if (!mapElement || typeof L === "undefined") {
        console.error("Map element or Leaflet library not found.");
        return;
    }

    if (foodKartMap) {
        foodKartMap.remove();
        foodKartMap = null;
    }

    foodKartMap = L.map("foodKartMap").setView(
        [latitude, longitude],
        16
    );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "&copy; OpenStreetMap contributors",
            maxZoom: 19
        }
    ).addTo(foodKartMap);

    currentLocationMarker = L.marker([
        latitude,
        longitude
    ]).addTo(foodKartMap);

    currentLocationMarker.bindPopup(`
        <div style="text-align:center;">
            <strong>📍 ${locationName}</strong><br>
            <span>Your selected location</span>
        </div>
    `).openPopup();

    setTimeout(() => {
        foodKartMap.invalidateSize();
    }, 200);
}

// ==================== LOAD CURRENT LOCATION ====================


// ==================== LOAD CURRENT LOCATION ====================

function loadCurrentLocation(returnToCart = false) {

    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }

    if (currentLocationButton) {
        currentLocationButton.textContent = "Detecting location...";
    }

    navigator.geolocation.getCurrentPosition(

        // SUCCESS CALLBACK
        async position => {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            let locationName = "Your Current Location";

            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                );

                if (!response.ok) {
                    throw new Error("Address lookup failed");
                }

                const data = await response.json();

                if (data.display_name) {
                    locationName = data.display_name
                        .split(",")
                        .slice(0, 4)
                        .join(",")
                        .trim();
                }

            } catch (error) {
                console.error("Reverse geocoding error:", error);
            }

            initializeMap(
                latitude,
                longitude,
                locationName
            );

            if (selectedLocationText) {
                selectedLocationText.textContent = locationName;
            }

            if (navLocationText) {
                navLocationText.textContent =
                    locationName.split(",")[0];
            }

            if (currentLocationButton) {
                currentLocationButton.innerHTML =
                    '<i class="fa-solid fa-location-crosshairs"></i> Location Detected';
            }

            localStorage.setItem(
                "foodkart_location",
                JSON.stringify({
                    name: locationName,
                    latitude,
                    longitude
                })
            );

            updateCartLocation();

            if (returnToCart && cart.length > 0) {
                openCartDrawer();
            }
        },

        // ERROR CALLBACK
        error => {

            console.error("Location error:", error);

            if (currentLocationButton) {
                currentLocationButton.innerHTML =
                    '<i class="fa-solid fa-location-crosshairs"></i> Use Current Location';
            }

            alert("Unable to detect your location. Please allow location access and try again.");
        },

        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        }
    );
}


// ==================== SEARCH LOCATION ====================

async function searchLocation() {

    const query = mapSearchInput?.value.trim();

    if (!query) {
        alert("Please enter a location.");
        return;
    }

    try {

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`
        );

        const results = await response.json();

        if (!results.length) {
            alert("Location not found. Try another location.");
            return;
        }

        const latitude = Number(results[0].lat);
        const longitude = Number(results[0].lon);

        const locationName = results[0].display_name
            .split(",")
            .slice(0, 3)
            .join(",");

        initializeMap(
            latitude,
            longitude,
            locationName
        );

        if (selectedLocationText) {
            selectedLocationText.textContent = locationName;
        }

        if (navLocationText) {
            navLocationText.textContent =
                locationName.split(",")[0];
        }

        localStorage.setItem(
            "foodkart_location",
            JSON.stringify({
                name: locationName,
                latitude,
                longitude
            })
        );

        // UPDATE CART WITH SELECTED ADDRESS
        updateCartLocation();

        // RETURN TO CART ONLY IF ITEMS EXIST
        if (cart.length > 0) {
            openCartDrawer();
        }

    } catch (error) {

        console.error("Location search error:", error);

        alert("Unable to search location. Please try again.");
    }
}

// ==================== LOCATION EVENTS ====================

if (mapSearchButton) {
    mapSearchButton.addEventListener("click", searchLocation);
}

if (mapSearchInput) {
    mapSearchInput.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            searchLocation();
        }
    });
}

// CURRENT LOCATION BUTTON

if (currentLocationButton) {
    currentLocationButton.addEventListener("click", () => {
        loadCurrentLocation(true);
    });
}

// NAVBAR LOCATION BUTTON

// ==================== NAVBAR LOCATION BUTTON ====================

if (navLocationButton) {
    navLocationButton.addEventListener("click", e => {
        e.preventDefault();
        showLocation();
    });
}

// ==================== INITIAL LOAD ====================

updateCart();
updateProfile();
showHome();
// loadCurrentLocation(false);

console.log(
    "Location button:",
    document.getElementById("cartLocationButton")
);