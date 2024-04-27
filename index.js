let container = document.querySelector("#container")
let loginUser = JSON.parse(localStorage.getItem("loginData"))

document.querySelector("#pro").textContent = `Welcome to ${loginUser.name}`



const getData = async(URL) => {
    let res = await fetch(URL)
    let data = await res.json();
    displayData(data)
}
getData("http://localhost:3000/products")

function displayData(arr){
    container.innerHTML = ""

    arr.forEach((ele , i)=>{
        let div = document.createElement("div")
         
        let title = document.createElement("p")
        title.innerHTML = ele.title;

        let ratings = document.createElement("p")
        ratings.innerHTML = `Ratings : ${ele.ratings}`

        let src = document.createElement("img")
        src.src = ele.src;

        let price = document.createElement("p")
        price.innerHTML = `Price : ${ele.price}`

        let cartBtn = document.createElement("button")
        cartBtn.innerHTML = "AddToCart"
        cartBtn.addEventListener("click" , ()=>{
               addcartData(ele , i)
        })

        let dltBtn = document.createElement("button")
        dltBtn.innerHTML = "Delete"
       dltBtn.addEventListener("click" , ()=>{
           deleteData(ele.id)
       })

        div.append( src  , title , ratings ,  price , cartBtn  , dltBtn)
        container.append(div)
    })

}

function logout(){
    localStorage.removeItem("loginData")
    alert("logout successfully")
    window.location.href = "login.html"
}

let  addcartData= async(ele)=>{
    let res = await fetch("http://localhost:3000/allUsersCart")
    let data = await res.json();
    console.log(data[loginUser.name])
    data[loginUser.name].push(ele)


    fetch("http://localhost:3000/allUsersCart",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },

        body:JSON.stringify(data)
     })
    .then(()=>{
        console.log("product added to cart")
    }).catch(()=>{
           console.log("error" , err)
    })

   
    
}
function deleteData(id){

    fetch(`http://localhost:3000/products/${id}` , {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json"
        }
    })
}



document.querySelector("#admin").addEventListener("click"  , () => {
    window.location.href = "admin.html" 
})