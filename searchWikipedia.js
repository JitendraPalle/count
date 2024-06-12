let inputEl = document.getElementById("searchInput");
let serchResult = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner")

function createAndAppendsearchResult(result) {
    let {
        title,
        link,
        description
    } = result
    //1.Div Container--result-item
    let resultItem = document.createElement("div");
    resultItem.classList.add("result-item");

    //2.Anchor Title -- result-title
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title")
    resultTitleEl.textContent = title
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultItem.appendChild(resultTitleEl)
    //3.Title Break 
    let titleBreakEl = document.createElement("br");
    resultItem.appendChild(titleBreakEl)
    //4.Anchor URL -- result-url 
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url")
    urlEl.href = link;
    urlEl.target = "_blank"
    urlEl.textContent = link
    resultItem.appendChild(urlEl)
    //5.Line Break 
    let lineBreakEl = document.createElement("br");
    resultItem.appendChild(lineBreakEl);
    //6.Paragraph Description -- time-description
    let descrptionEl = document.createElement("p");
    descrptionEl.classList.add("line-description");
    descrptionEl.textContent = description;
    resultItem.appendChild(descrptionEl)

    serchResult.appendChild(resultItem);
}

function displayResults(search_results) {
    spinnerEl.classList.toggle("d-none")
    for (let result of search_results) {
        createAndAppendsearchResult(result)
    }

}

function searchwekipedia(event) {

    if (event.key === "Enter") {

        serchResult.textContent = ""
        spinnerEl.classList.toggle("d-none")
        let searchInput = inputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json()
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData
                displayResults(search_results)
            })

    }
}

inputEl.addEventListener("keydown", searchwekipedia)