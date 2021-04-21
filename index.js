let mainDiv = document.querySelector('#main-display') 
let cardCollectionDiv = document.querySelector('#card-collection')
let displayGame = {}

let displayTitleH1 = document.querySelector('#main-display h1')
let displayImage = document.querySelector('#main-display div img')
let displayGenreP = document.querySelector('#genre')
let displayYearP = document.querySelector('#year')
let displayLikesP = document.querySelector('#likes')
let displayPlatformDiv = document.querySelector('#platform')
let displayInfoDiv = document.querySelector('#info')
let reviewsUl = document.querySelector('#reviews')

let pcDiv = document.querySelector('div.pc')
let xboxDiv = document.querySelector('.xbox')
let psDiv = document.querySelector('.ps')
let switchDiv = document.querySelector('.switch')

let likeButton = document.querySelector('#main-display button')

let userGameForm = document.querySelector('#form-container form')
let loginFormCon = document.querySelector('#loginForm-con')

let favoriteOn =  "💖"
let favoriteOff = "🤍"

let userObj = {}

const platformBool = true;

fetch("http://localhost:3000/games/1")
.then(resp => resp.json())
.then(gameObj => {
    displayGameFunc(gameObj)

})

fetch('http://localhost:3000/games')
.then(resp => resp.json())
.then((gamesArr) => {
    gamesArr.forEach(gameObj => {
        cardRenderer(gameObj)       
    } )
})

// Renders Card
function cardRenderer(gameObject){
    let cardDiv = document.createElement('div')
        cardDiv.className= "card"

        let gameImage = document.createElement('img')
        gameImage.src = gameObject.image

        let titleH3 = document.createElement('h3')
        titleH3.innerText = gameObject.title

        let genreP = document.createElement('p')
        genreP.innerText = `Genre: ${gameObject.genre}`

        
        let newLikeButton = document.createElement('button')
        newLikeButton.innerText = "Like!"

        let favoriteSpan = document.createElement('span')
        favoriteSpan.className = "fav-heart"
        favoriteSpan.innerText = favoriteOff
        favoriteSpan.dataset.gameId = gameObject.id
        
        cardDiv.append(gameImage, titleH3, genreP, favoriteSpan, newLikeButton)
        cardCollectionDiv.append(cardDiv)
        newLikeButton.addEventListener('click', (e) => {
            fetch(`http://localhost:3000/games/${displayGame.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                likes: gameObject.likes + 1 
                })
            })
            .then(resp => resp.json())
            .then(updatedGameObj => {
                gameObject.likes = updatedGameObj.likes
                displayLikesP.innerText = updatedGameObj.likes
        
            })
        
            newLikeButton.disabled=true 
        
        })
        

        cardDiv.addEventListener('click', (e) => {
            displayGameFunc(gameObject)

        })
        favoriteSpan.addEventListener('click', (e) =>{
            let {favoritedGames} = userObj.favoriteslist[0]
            console.log(favoritedGames)
            fetch(`http://localhost:3000/favoriteslist?userId=${userObj.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({                
                    favoritedGames: favoritedGames
                })
            })
            .then(resp => resp.json())
            .then(()=>{

            })
        })
}

let newGamePc = false
let newGameXbox = false
let newGamePs = false
let newGameSwitch = false

userGameForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let newGameTitle = e.target.title.value
    let newGameImage = e.target.image.value
    let newGameYear = e.target.year.value
    let newGameGenre = e.target.genre.value

    if(document.querySelector('#pc').checked){
        newGamePc = true
    }

    if(document.querySelector('#xbox').checked){
        newGameXbox = true
    }

    if(document.querySelector('#ps').checked){
        newGamePs = true
    }

    if(document.querySelector('#switch').checked){
        newGameSwitch = true
    }

    fetch('http://localhost:3000/games', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: newGameTitle,
            image: newGameImage,
            year: newGameYear,
            genre: newGameGenre,
            platform: {
                PC: newGamePc,
                Xbox: newGameXbox,
                PS: newGamePs,
                Switch: newGameSwitch
            }

        })
        
    })
    .then(resp => resp.json())
    .then(newGameObj => {
        e.target.reset()

        cardRenderer(newGameObj)      
    } ) 
    
})


// helper function
function displayGameFunc(gameObj){
    displayGame = gameObj
            
    displayTitleH1.innerText = gameObj.title
    displayImage.src = gameObj.image
    displayGenreP.innerText = `Genre: ${gameObj.genre}`
    displayYearP.innerText = `Release Year: ${gameObj.year}`
    displayLikesP.innerText = `Likes: ${gameObj.likes}`

    
    
    fetch(`http://localhost:3000/games/${gameObj.id}?_embed=reviews`)
    .then(resp => resp.json())
    .then(gameReviewObj => {
        reviewsUl.innerText = ""
        gameReviewObj.reviews.forEach(review => {
            

            let reviewLi = document.createElement('li')
            reviewLi.innerText = review.review
            

            reviewsUl.append(reviewLi)
            



        })
    })
    
            
    gameObj.platform.PC ? pcDiv.style.display = "block" : pcDiv.style.display = "none"
    gameObj.platform.Xbox ? xboxDiv.style.display = "block" : xboxDiv.style.display = "none"
    gameObj.platform.PS ? psDiv.style.display = "block" : psDiv.style.display = "none"
    gameObj.platform.Switch ? switchDiv.style.display = "block" : switchDiv.style.display = "none"

}



// STRETCH GOALS
function displayLoginForm(){
    loginFormCon.innerHTML = ""

    let loginForm = document.createElement("form")

    let usernameDiv = document.createElement('div')

    let usernameLabel = document.createElement("label")
    usernameLabel.htmlFor = "username"
    usernameLabel.innerText = "Username"

    let usernameInput = document.createElement("input")
    usernameInput.type = "text"
    usernameInput.className = "form-control"
    usernameInput.id = "username"
    usernameInput.placeholder = "Enter Username"
    usernameInput.autocomplete = "off"

    usernameDiv.append(usernameLabel, usernameInput)

    let submitButton = document.createElement('button')
    submitButton.type = "submit"
    submitButton.innerText = "Login"

    loginForm.append(usernameDiv, submitButton)
    loginFormCon.append(loginForm)
    loginForm.addEventListener("submit", userLogin)

    let registerForm = document.createElement("form")

    let usernameDiv2 = document.createElement('div')

    let usernameLabel2 = document.createElement("label")
    let usernameInput2 = document.createElement("input")
    usernameInput2.type = "text"

    usernameInput2.id = "username2"
    usernameInput2.placeholder = "Enter Username"
    usernameInput2.autocomplete = "off"

    usernameDiv2.append(usernameLabel2, usernameInput2)

    let submitButton2 = document.createElement('button')
    submitButton2.type = "submit"
    submitButton2.innerText = "Register"

    registerForm.append(usernameDiv2, submitButton2)

    loginFormCon.append(registerForm)
    // registerForm.addEventListener("submit", handleRegisterForm)
}

function userLogin(evt){
    evt.preventDefault()
    let username = evt.target.username.value

    fetch(`http://localhost:3000/users?_embed=favoriteslist&username=${username}`)
    .then(resp => resp.json())
    .then(potentialUserArr => {
        if(potentialUserArr.length > 0){
            let foundUser = potentialUserArr[0]
            userObj = foundUser
            let {favoritedGames} = foundUser.favoriteslist[0]
            favoritedGames.forEach(gameId => {
                document.querySelector(`[data-game-id='${gameId}']`).innerText = favoriteOn
            })
        }else{
            console.log("no user found")
        }
    })
}

displayLoginForm()
