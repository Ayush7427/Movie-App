


const submitForm = document.querySelector("form")
const inputBox = document.querySelector(".inputBox")
const movieContainer = document.querySelector(".movieContainer")


submitForm.addEventListener("submit", function (event) {
    event.preventDefault()
    const input = inputBox.value
    validationForm(input)
}, false)

function errorMessageDisplay(message) {
    movieContainer.innerHTML = `<h2>${message}</h2>`
    movieContainer.classList.add("noBackGround")
}

function validationForm(data) {

    if (!data) {
        errorMessageDisplay("Enter Movie name to get movie information.")
    } else {
        inputBox.value = ""
        apiCall(data)
    }
}


async function apiCall(inputData) {
    try {
        errorMessageDisplay("Fetching Movie Information.")
        const apiKey = // Yours API Key
        const api = `http://www.omdbapi.com/?apikey=${apiKey}&t="${inputData}"`

        const fetchData = await fetch(api)
        const dataToJson = await fetchData.json()

        dataToShow(dataToJson)
    } catch (error) {
        errorMessageDisplay("Something went wrong. Try again in a few minutes")
    }

}

function dataToShow(data) {

    if (data.Response === "False") {
        errorMessageDisplay(`${data.Error}`)
    } else {
        movieContainer.innerHTML = ""
        movieContainer.classList.remove("noBackGround")
        const { BoxOffice, Actors, Country, Director, Language, Released, Runtime, Title, Type, Plot } = data


        const movieElement = document.createElement("div")
        movieElement.classList.add("movieInfo")

        movieElement.innerHTML = `
<h2>${Title}</h2>
<p><strong>Rating: &#11088;</strong>${data.Ratings[0].Value}</p>
<p class="addMe"><strong>Released Date: </strong>${Released}</p>
<p class="addMe"><strong>Country: </strong>${Country}</p>
<p><strong>BoxOffice: </strong>${BoxOffice}</p>
<p><strong>Duration: </strong>${Runtime}</p>
<p><strong>Language: </strong>${Language}</p>
<p><strong>Type: </strong>${Type}</p>
<p><strong>Director: </strong>${Director}</p>
<p><strong>Cast: </strong>${Actors}</p>
<p><strong>Plot: </strong>${Plot}</p>
`
        const moviePoster = document.createElement("div")
        moviePoster.classList.add("poster")

        moviePoster.innerHTML = `
<img src="${data.Poster}" alt="Image">
`

        movieContainer.append(moviePoster, movieElement)
    }
}
