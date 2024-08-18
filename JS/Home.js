let user_header_info = document.querySelector("#user_header_info")
let header_links = document.querySelector("#header_links")
let header_links_signedin = document.querySelector("#header_links_signedin")

let login_btn = document.querySelector(".login_btn a")
let reg_btn = document.querySelector(".reg_btn a")
let logout_btn = document.querySelector(".logout_btn a")
let logout_btn_icon = document.querySelector("#logout_btn_icon")




let signed_in = false
if(localStorage.getItem("email")){
    signed_in=true
    user_header_info.innerText="welcome"+ "  " + localStorage.getItem("UserFirstName")

    header_links.style.display="none"
    header_links_signedin.style.display="flex"
    header_links_signedin.style.gap="40px"

}

////////////////////////////log out//////////////////////////////////////
logout_btn.addEventListener("click" , LogOut)
logout_btn_icon.addEventListener("click" , LogOut)

function LogOut (){

    localStorage.clear()
    window.location = "login.html";
}

///////////////////////////// products data//////////////////////////////////////////////
let products = [
{
    id : 1,
    name:"Apple IPhone 14 ",
    category:"Mobile",
    img:"Images/Apple-IPhone-14.jpeg",
    price:37444,
    fav:false
},
{
    id : 2,
    name:"Apple IPhone 15 Pro Max",
    category:"Mobile",
    img:"Images/Apple-IPhone-15-Pro-Max.jpeg",
    price:76999 ,
    fav:false
},
{
    id :3,
    name:"Samsung Galaxy S24 Ultra",
    category:"Mobile",
    img:"Images/Samsung-Galaxy-S24-Ultra.jpeg",
    price:64444,
    fav:false
},
{
    id :4,
    name:"Apple IPhone 15 Plus",
    category:"Mobile",
    img:"Images/Apple-IPhone-15-Plus.jpeg",
    price:48999 ,
    fav:false
},
{    id :5,
    name:"Apple AirPods Max",
    category:"Headphones",
    img:"Images/airpodsmax.webp",
    price:29999,
    fav:false
},
{
    id :6,
    name:"Apple MacBook Pro, M1pro",
    img:"Images/Apple-MacBook-Pro14-Inch-M1pro.png",
    category:"Laptop",
    price:107000,
    fav:false
},
{
    id : 7,
    name:"Apple iPad Air (5th gen)",
    category:"Tablets",
    img:"Images/Apple iPad Air.webp",
    price:37333,
    fav:false
},
{
    id : 8,
    name:"ASUS ROG Flow X16",
    img:"Images/ASUS-ROG-Flow-X16.jpeg",
    category:"Laptop",
    price:94888,
    fav:false
},
{
    id :9,
    name:"ASUS TUF GAMING F15",
    img:"Images/ASUS-TUF-GAMING-F15.jpeg",
    category:"Laptop",
    price:68777 ,
    fav:false
},
{
    id :10,
    name:"Apple iPad Pro M4",
    category:"Tablet",
    img:"Images/Apple-iPad-Pro-M4.jpeg",
    price:73000,
    fav:false
},
{    id :11,
    name:"Huawei FreeBuds Pro 3",
    img:"Images/Huawei FreeBuds Pro 3.webp",
    category:"TWS",
    price:9599,
    fav:false
},
{
    id :12,
    name:"Anker Soundcore Liberty 3",
    img:"Images/Anker-Soundcore-Liberty-3-Pro_4375_2.png",
    category:"TWS",
    price:7099,
    fav:false
}
]


let CartProducts = [];
let FavProducts = [];

document.addEventListener("DOMContentLoaded", function() {

    if(localStorage.getItem("CartProducts")){
        CartProducts= JSON.parse(localStorage.getItem("CartProducts"))

        CartProducts.forEach((cartitem) => {
            AddCartItemToHTML(cartitem.id)                  
            updateViewAllCartItems()
            updateViewProductItems(cartitem.id)            
            DisplayCartItemsCount()            
        });
    }


    if(localStorage.getItem("FavProducts")){
        FavProducts= JSON.parse(localStorage.getItem("FavProducts"))
    
        FavProducts.forEach((Favitem) => {
            UpdateFavItemHTML(Favitem.id)

        });
    
    }
    // console.log("reload")
    // console.log(CartProducts)
})




////////////////////////display products///////////////////////////////////

let all_products = document.querySelector(".all_products")

function displayProducts(products){

    let p = products.map((items) => {
        return `
            <div class="col-lg-4 col-sm-6 col-xs-12 " >
                <div class="product_card col-lg-4 col-sm-6 col-xs-12 " data-id="${items.id}" >
                    <div class="card_product_img">
                        <figure>
                            <img src="${items.img}" alt="">
                        </figure>
                    </div>

                    <div class="card_produvt_body">
                        <p class="card_product_name"> <span style="font-weight: 800; font-size:21px; color: #000000;">Product:</span> ${items.name}</p>
                        <p class="card_product_cat"><span style="font-weight: 800; font-size:21px;color: #000000;">Category: </span>${items.category}</p>
                        <p class="card_product_price"><span style="font-weight: 800; font-size:21px;color: #000000;">price:</span> ${items.price} EGP</p>
                    
                        <div class="card_btn">
                            <button type="button" class="AddToCartBtn" onClick="AddToCart(${items.id})">Add To Cart</button>
                            <button type="button" class="RemoveFromCartBtn" onClick="RemoveFromCart(${items.id})">Remove From Cart</button>

                            <i class="fa-solid fa-heart addtofav_icon" data-id="${items.id}" onClick="AddtoFav(${items.id})"></i>
                        </div>
                    </div>
                </div>
            </div>


        `
    }).join(''); 
    all_products.innerHTML=p;
}

displayProducts(products)

////////////////////////////go to cart/////////////////////////  can be removed because it's already displyed by none if user log out
let shopping_cart_header_icon = document.querySelector(".shopping_cart_header_icon")
let viewAllItems = document.querySelector(".viewAllItems")

shopping_cart_header_icon.addEventListener("click", GoToCartPage)
viewAllItems.addEventListener("click", GoToCartPage)


function GoToCartPage(){
    if(signed_in){
    window.location="CartProducts.html"
    }
    else{
        setTimeout( ()=>{
            window.location="login.html"
        },500)
    }
}
////////////////////update cart local storage//////////////////////////////

function updateLocalStorageCart(){
    localStorage.setItem('CartProducts', JSON.stringify(CartProducts))
}


/////////////////////////////add to cart//////////////////////////////////
let cart_count 
let cart_items_count = document.querySelector(".cart_items_count")
let cart_item_drop_down = document.querySelector(".cart_item_drop_down")

function AddToCart(id){   
    
    if(signed_in){

        var Choosenitem = products.find((items) => items.id===id)  //find added item with the id
     
        let inCart=  CartProducts.findIndex((element) =>  element.id === id);     // check if item in cart or not

        if(inCart>=0){                  // if the item already exist

            var addedcartitem = CartProducts.find((items) => items.id===id)  //find added item in the cart and increment
            addedcartitem.countInCart++

        }
        else{

            CartProducts.push({...Choosenitem, countInCart: 1});     // add added item to the cart array
            var addedcartitem = CartProducts.find((items) => items.id===id) 
           
            AddCartItemToHTML(addedcartitem.id)                                 
        }

        updateLocalStorageCart()
        updateViewProductItems(Choosenitem.id)
        updateCartItemCountDisplay(Choosenitem.id) 
        DisplayCartItemsCount()
        updateViewAllCartItems()


    }
    else{

        setTimeout( ()=>{
            window.location="login.html"
        },500)    
    }
    // console.log(Choosenitem)
}

function AddCartItemToHTML(id){
 
    var addedcartitem = CartProducts.find((items) => items.id===id)

    let cartItemHTML = `
    <div class="added_item" data-id="${addedcartitem.id}" >
        <span class="added_item_name">${addedcartitem.name}</span>
        <span class="added_item_count" data-id="${addedcartitem.id}" >${addedcartitem.countInCart}</span> 
        <div class="home_cart_controls">
            <i class="fa-solid fa-plus increment_item" onClick="increment_cart_item_count(${addedcartitem.id})"></i>
            <i class="fa-solid fa-minus decrement_item" onClick="decrement_cart_item_count(${addedcartitem.id})"></i>
        </div>
    </div>`;
    cart_item_drop_down.innerHTML += cartItemHTML; 
}

///////////////////calc and display cart count//////////////////////////////

function DisplayCartItemsCount(){
    cart_count=0
  
    CartProducts.forEach((items) => {
        cart_count += items.countInCart
    });

    cart_items_count.textContent = cart_count;
}

/////////////////////Remove from cart//////////////////////////////////////
function RemoveFromCart(id){

    let removed_item = products.find((items) => items.id===id)
    let removed_cart_item = CartProducts.find((items) => items.id===id)
    let removed_cart_item_index = CartProducts.findIndex((items) => items.id === id);

    

    removed_cart_item.countInCart=0;                                 // remove item count in the cart
    updateCartItemCountDisplay(removed_item.id) 
    CartProducts.splice(removed_cart_item_index, 1);


    let removed_item_cart = cart_item_drop_down.querySelector(`.added_item[data-id="${removed_cart_item.id}"]`)
    removed_item_cart.remove()

    updateLocalStorageCart()
    updateViewProductItems(removed_item.id);
    DisplayCartItemsCount()
    updateViewAllCartItems();


}


/////////////////////////////////////increment items in cart 
function increment_cart_item_count(id){
    let incremented_item = products.find((items) => items.id===id)
    AddToCart(incremented_item.id)    

}
////////////////////////////////////decrement and remove items in cart  

function decrement_cart_item_count(id){
    let decrement_item_item = CartProducts.find((items) => items.id===id)
  
    if(decrement_item_item.countInCart>0){
        decrement_item_item.countInCart--;
        updateLocalStorageCart()
        updateCartItemCountDisplay(decrement_item_item.id) 
        DisplayCartItemsCount()

    }
    
    if(decrement_item_item.countInCart==0){
        RemoveFromCart(decrement_item_item.id)
    }
}

//////////////////////////////////////////////////cart items count update
function updateCartItemCountDisplay(id){
    let updated_item = CartProducts.find((items) => items.id===id)
    let countElement = cart_item_drop_down.querySelector(`.added_item_count[data-id="${id}"]`);

    countElement.innerHTML= updated_item.countInCart
}

////////////////////////show add hide btn in product card/////////////////////////////////////////////


function updateViewProductItems(id){
    let updated_product_card = products.find((items) => items.id===id)
    let RemoveFromCartBtn = all_products.querySelector(`.product_card[data-id="${updated_product_card.id}"] .RemoveFromCartBtn`)
    let AddToCartBtn = all_products.querySelector(`.product_card[data-id="${updated_product_card.id}"] .AddToCartBtn`)

    let inCart=  CartProducts.findIndex((element) =>  element.id === id);

    if (inCart >= 0) {    
        RemoveFromCartBtn.style.display = "block";
        AddToCartBtn.style.display = "none";
    } else {
        RemoveFromCartBtn.style.display = "none";
        AddToCartBtn.style.display = "block";
        // console.log("removed from cart"+ " " + id)
    }
}


//////////////////////////cart state///////////////////////////////////
// Initialize the cart state
updateViewAllCartItems();

function updateViewAllCartItems() {
    if(cart_count === 0) {
        viewAllItems.innerHTML = "Empty Cart";
    } else {
        viewAllItems.innerHTML = "View Cart";
    }
}


/////////////////////////show cart drop down/////////////////////////////

let cart_btn = document.querySelector(".cart_btn")
let cart_close_icon = document.querySelector(".cart_close_icon")
let cart_open_icon = document.querySelector(".cart_open_icon")

let cart_ptoducts = document.querySelector(".cart_ptoducts")

cart_close_icon.addEventListener("click" , openCartDropDown)
cart_open_icon.addEventListener("click" , openCartDropDown)
cart_btn.addEventListener("click" , openCartDropDown)

function openCartDropDown(){
    // if(cart_count != 0){
        if ((cart_ptoducts.style.display === "none" && cart_close_icon.style.display ==="none")){ 
            cart_ptoducts.style.display = "flex";
            cart_close_icon.style.display = "block";
            cart_open_icon.style.display = "none";
        }
        else {
            cart_ptoducts.style.display = "none";
            cart_close_icon.style.display = "none";
            cart_open_icon.style.display = "block";
        }

}

// function openCartDropDown() {
//     if (cart_ptoducts.classList.contains('open')) {
//         cart_ptoducts.classList.remove('open');
//         setTimeout(() => {
//             cart_ptoducts.style.display = "none";
//         }, 300); // Wait for animation to finish
//     } else {
//         cart_ptoducts.style.display = "block";
//         setTimeout(() => {
//             cart_ptoducts.classList.add('open');
//         }, 10); // Allow for initial display change
//     }

//     cart_close_icon.style.display = cart_ptoducts.classList.contains('open') ? "block" : "none";
//     cart_open_icon.style.display = cart_ptoducts.classList.contains('open') ? "none" : "block";
// }


////////////////////add and remove from Fav//////////////////////////////////
function AddtoFav(id){

    if(signed_in){

        let Fav_item_index = FavProducts.findIndex((items) => items.id === id);
        let addedFavItem = products.find((items) => items.id === id);


        if (Fav_item_index<0) {
            FavProducts.push(addedFavItem);
        } 
        else {
            FavProducts.splice(Fav_item_index, 1);
        }

        //// save in local storage
        updateLocalStorageFav() 
        UpdateFavItemHTML(addedFavItem.id)
    }
    else{
        setTimeout( ()=>{
            window.location="login.html"
        },500)    
    }    
}

////////////////////update fav items local storage//////////////////////////////

function updateLocalStorageFav(){
    localStorage.setItem('FavProducts', JSON.stringify(FavProducts))
}

////////////////////update fav product html//////////////////////////////

function UpdateFavItemHTML(id){
    let Fav_item_index = FavProducts.findIndex((items) => items.id === id);
    let heartIcon = document.querySelector(`.product_card .addtofav_icon[data-id="${id}"]`);
    heartIcon.style.color = Fav_item_index >= 0 ? "rgb(255, 50, 50)" : "";  // Toggle heart color
}

//////////////////// Search Functionality /////////////////////////
let filter_by = document.querySelector(".filter_by")
let search_item_name = document.querySelector("#search_item_name")

search_item_name.addEventListener("keyup", () => {
    let FilteredProducts = products.filter((items) => {
        if(filter_by.value === "name"){
            return items.name.toLowerCase().includes(search_item_name.value.toLowerCase())
        }
        else {
            return items.category.toLowerCase().includes(search_item_name.value.toLowerCase())
        }
    })

displayProducts(FilteredProducts);


})
