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
        let cardDiv = document.createElement('div')
        cardDiv.className= "card"

        let gameImage = document.createElement('img')
        gameImage.src = gameObj.image

        let titleH3 = document.createElement('h3')
        titleH3.innerText = gameObj.title

        let genreP = document.createElement('p')
        genreP.innerText = `Genre: ${gameObj.genre}`

        
        let newLikeButton = document.createElement('button')
        newLikeButton.innerText = "Like!"
        
        cardDiv.append(gameImage, titleH3, genreP, newLikeButton)
        cardCollectionDiv.append(cardDiv)
        newLikeButton.addEventListener('click', (e) => {
            fetch(`http://localhost:3000/games/${displayGame.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                likes: gameObj.likes + 1 
                })
            })
            .then(resp => resp.json())
            .then(updatedGameObj => {
                gameObj.likes = updatedGameObj.likes
                displayLikesP.innerText = updatedGameObj.likes
        
            })
        
            newLikeButton.disabled=true 
        
        })
        
        
        cardDiv.addEventListener('click', (e) => {
            displayGameFunc(gameObj)

        })

        
    } )
})

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

        let cardDiv = document.createElement('div')
        cardDiv.className= "card"

        let gameImage = document.createElement('img')
        gameImage.src = newGameObj.image

        let titleH3 = document.createElement('h3')
        titleH3.innerText = newGameObj.title

        let genreP = document.createElement('p')
        genreP.innerText = `Genre: ${newGameObj.genre}`

        
        let newLikeButton = document.createElement('button')
        newLikeButton.innerText = "Like!"
        
        cardDiv.append(gameImage, titleH3, genreP, newLikeButton)
        cardCollectionDiv.append(cardDiv)
        newLikeButton.addEventListener('click', (e) => {
            fetch(`http://localhost:3000/games/${displayGame.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                likes: gameObj.likes + 1 
                })
            })
            .then(resp => resp.json())
            .then(updatedGameObj => {
                newGameObj.likes = updatedGameObj.likes
                displayLikesP.innerText = updatedGameObj.likes
        
            })
        
            newLikeButton.disabled=true 
        
        })
        
        
        cardDiv.addEventListener('click', (e) => {
            displayGameFunc(newGameObj)

        })

        
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






{/* <div class="card">
    <img src="https://image.api.playstation.com/cdn/UP0006/CUSA10866_00/3uebKTl6KgC0chEhBOs3GVaOLapwPgQ5.png">
    <p>Burnout Paradise Remastered</p>
    <p>Genre: Racing</p>
    <div id="platforms">
        <img src="https://cdn.icon-icons.com/icons2/688/PNG/512/windows-software-operating-system_icon-icons.com_61426.png">
    </div>
</div> */}