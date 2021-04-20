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

let pcDiv = document.querySelector('div.pc')
let xboxDiv = document.querySelector('.xbox')
let psDiv = document.querySelector('.ps')
let switchDiv = document.querySelector('.switch')

let likeButton = document.querySelector('#main-display button')

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

function displayGameFunc(gameObj){
    displayGame = gameObj
            
    displayTitleH1.innerText = gameObj.title
    displayImage.src = gameObj.image
    displayGenreP.innerText = gameObj.genre
    displayYearP.innerText = gameObj.year
    displayLikesP.innerText = gameObj.likes
    
    
            
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