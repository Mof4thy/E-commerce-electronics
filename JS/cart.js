let user_header_info = document.querySelector("#user_header_info")
let header_links_signedin = document.querySelector("#header_links_signedin")

let logout_btn = document.querySelector(".logout_btn a")


let signed_in = false
if(localStorage.getItem("email")){
    signed_in=true
    user_header_info.innerText="welcome"+ "  " + localStorage.getItem("UserFirstName")

    header_links_signedin.style.display="flex"
}
////////////////////////////log out//////////////////////////////////////

logout_btn.addEventListener("click" , LogOut)

function LogOut (){
    localStorage.clear()
    window.location = "login.html";
}
/////////////////////////////////////////////////////////////////////////////////////


let CartProducts=[]
let FavProducts=[]


document.addEventListener("DOMContentLoaded", function() {

    if(localStorage.getItem("CartProducts")){
     
        CartProducts =  JSON.parse(localStorage.getItem("CartProducts"));
        DrawCartProducts(CartProducts)
        calc_display_total(CartProducts)
    }
    else{
        CartProducts=[];

    }

    if(localStorage.getItem("FavProducts")){
     
        FavProducts =  JSON.parse(localStorage.getItem("FavProducts"));
        DrawFavProducts(FavProducts)
        displayfav()
    }
    else{
        FavProducts=[];
        displayfav()

    }
})


function updateLocalStorageCart(){

    localStorage.setItem("CartProducts",JSON.stringify(CartProducts))

}


All_cart_items = document.querySelector(".All_cart_items")

function DrawCartProducts(CartProducts){

    let cart = CartProducts.map((items) => {
        return `
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 cart_item_parent"  data-id="${items.id}">
                <div class="cart_item"  >
                    <div class="cart_item_img">
                        <img src="${items.img}" alt="">
                    </div>
                    <div class="cart_item_details">
                        <p class="cart_item_product_name">Name: ${items.name}</p>
                        <p class="cart_item_product_category">Category: ${items.category}</p>
                        <p class="cart_item_product_price">Price: ${items.price}</p>
                        
                        <div class="cart_item_controles">
                            <p class="CartItemCount"  data-id="${items.id}">${items.countInCart}</p>
                            <div class="inc_dec">
                                <i class="fa-solid fa-plus increment_item_in_cart"  onClick="increment_cart_item_count(${items.id})"></i>
                                <i class="fa-solid fa-minus decrement_item_in_cart"  onClick="decrement_cart_item_count(${items.id})"></i>
                            </div>
                            <button class="remove_from_cart_btn"  onClick="RemoveFromCart(${items.id})">Remove From Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    }).join(''); 

    All_cart_items.innerHTML=cart;

}

let total_price = document.querySelector("#total_price")

function calc_display_total(CartProducts){
    let total=0

    CartProducts.forEach((item) => {
        total+= (item.price*item.countInCart)
    });

    total_price.innerText = "Total Price: "+ total + " EGP"

    if(total===0){
        total_price.innerText="No Items In Cart"
        total_price.style.color="red"
    }
}

///////////////////

function increment_cart_item_count(id){
    let inc_cart_item = CartProducts.find((items) => items.id===id)
    inc_cart_item.countInCart++
    let CartItemCount = All_cart_items.querySelector(`.CartItemCount[data-id="${id}"]`);
    CartItemCount.innerText = inc_cart_item.countInCart
    updateLocalStorageCart()
    calc_display_total(CartProducts)
    console.log("id"+ inc_cart_item.id+"  "+inc_cart_item.countInCart)

}

function decrement_cart_item_count(id){
    let dec_cart_item = CartProducts.find((items) => items.id===id)
    
    if (dec_cart_item.countInCart > 1) {
        dec_cart_item.countInCart -= 1; 
    } else {
        RemoveFromCart(dec_cart_item.id);  
        return;  
    }

    let CartItemCount = All_cart_items.querySelector(`.CartItemCount[data-id="${id}"]`);
    CartItemCount.innerText = dec_cart_item.countInCart;
    calc_display_total(CartProducts);
    updateLocalStorageCart();

}


function RemoveFromCart(id){

    let Removed_item = CartProducts.find((items) => items.id===id)
    let removed_cart_item_index = CartProducts.findIndex((items) => items.id === id);

    let removed_item_element = All_cart_items.querySelector(`.cart_item_parent[data-id="${id}"]`);
    let CartItemCount = All_cart_items.querySelector(`.CartItemCount[data-id="${id}"]`);
    Removed_item.countInCart=0
    CartItemCount.innerText = Removed_item.countInCart;
    setTimeout( ()=>{
        removed_item_element.remove();
        CartProducts.splice(removed_cart_item_index, 1);
        updateLocalStorageCart()
        calc_display_total(CartProducts)    
    },100)   


}


////////////////////////////////////////////////////////////////////////////////////////
// Function to update localStorage for FavProducts
function updateLocalStorageFav(){
    localStorage.setItem("FavProducts", JSON.stringify(FavProducts));


}


All_Fav_items = document.querySelector(".All_Fav_items")

function DrawFavProducts(FavProducts){

    let fav = FavProducts.map((items) => {
        return `
            <div class="col-md-4 col-sm-6 col-xs-12 fav_item_parent"  data-id="${items.id}">
                <div class="fav_item">
                    <div class="fav_item_img">
                        <img src="${items.img}" alt="">
                    </div>
                    <div class="fav_item_details">
                        <div class="name_cat">
                            <p class="fav_item_name">Product: ${items.name}</p>
                            <p class="fav_item_category">Category: ${items.category}</p>
                        </div>
                        <div class="fav_icon">
                            <i class="fa-solid fa-heart addtofav_icon" onClick="RemoveFromFav(${items.id})"></i>
                        </div>
                    </div>
                </div>
            </div>
        `
    }).join(''); 

    All_Fav_items.innerHTML=fav;

}


function RemoveFromFav(id){

    // let Removed_item = FavProducts.find((items) => items.id===id)
    let removed_fav_item_index = FavProducts.findIndex((items) => items.id === id);
    let removed_item_element = All_Fav_items.querySelector(`.fav_item_parent[data-id="${id}"]`);

    FavProducts.splice(removed_fav_item_index, 1);
    removed_item_element.remove()
    updateLocalStorageFav()
    displayfav()
}

function displayfav() {
    const fav_title_div = document.querySelector(".fav_title_div");

    const favProducts = JSON.parse(localStorage.getItem("FavProducts") || "[]");

    if (favProducts.length > 0) {
        fav_title_div.style.display = "block";
    } else {
        fav_title_div.style.display = "none";
    }
}