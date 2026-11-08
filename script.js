const username = document.querySelector("#getInput input");
const searchBtn = document.querySelector("#searchBtn button");
const BaseUrl = "https://api.github.com/users/"
//basharath222
const profileCard = document.querySelector(".profileCard");
let notFound = document.querySelector("#notFound");

searchBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    searchUser(username.value);
})

const generateProfile = (response) =>{
    if(response.status == "404" || response.message?.includes("Not Found")){
        profileCard.style.display = "none";
        notFound.innerText = "User Not Found";
        notFound.style.opacity = 1;
        return;
    }
    if(response.message?.includes("API rate limit exceeded")){
        profileCard.style.display = "none";
        notFound.innerText = "Rate Limit Exceed. Please Try again Later";
        notFound.style.opacity = 1;
        return;
    }

    notFound.style.opacity = 0;
    profileCard.style.display = "block";
    let userImg = document.querySelector("#userImg");
    userImg.src = response.avatar_url;
    let username = document.querySelector("#username");
    username.innerText ="Name: "+ response.name;
    let userBio = document.querySelector("#userBio");
    if(response.bio === null){
        userBio.innerText ="Bio: "+ "___";
    }
    else{
        userBio.innerText ="Bio: "+ response.bio;
    }
    
    let followers = document.querySelector("#followers");
    followers.innerText ="Followers: "+ response.followers;
    let following = document.querySelector("#following");
    following.innerText ="Following: "+ response.following;
    let repositories = document.querySelector("#repositories");
    repositories.innerText ="Repositories: "+ response.public_repos;
    let userUrl = document.querySelector("#userUrl a"); 
    userUrl.href = response.html_url;
    userUrl.innerText =""+ response.login;
    
}

const searchUser = async(username) =>{  
    let url = BaseUrl + username;
    const data = await fetch(url);
    const response = await data.json()
    generateProfile(response);
}

