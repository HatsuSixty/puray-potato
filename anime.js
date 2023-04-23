import { get, remove_all_child_nodes } from "./common.js"

function get_anime_by_id(id)
{
    let r = get(`https://puray.moe/_next/data/${get("./random-str-idk-whatis")}/anime/${id}.json?id=${id}`)
    return JSON.parse(r);
}

function season_data_to_element(data)
{
    let finalresult = document.createElement("div");

    let separator = document.createElement("hr");

    let season_title = document.createElement("h3");
    let season_bold = document.createElement("b");
    let season_text = document.createTextNode(data["nome"]);
    season_bold.appendChild(season_text);
    season_title.appendChild(season_bold);

    finalresult.appendChild(season_title);

    let eps = document.createElement("div");

    for (let ep of data["episodes"]) {
        let ep_name = document.createElement("a");
        let ep_text = document.createTextNode(ep["nome"]);
        ep_name.setAttribute("href", `javascript:window.location.href = 'player.html?ep=${ep["id_episodios"]}';`);
        ep_name.appendChild(ep_text);

        finalresult.appendChild(ep_name);
        finalresult.appendChild(document.createElement("br"));
    }

    finalresult.appendChild(separator);

    return finalresult;
}

function anime_data_to_element(data)
{
    let finalresult = document.createElement("div");

    let separator = document.createElement("hr");

    let title = document.createElement("h2");
    let title_bold = document.createElement("b");
    let title_text = document.createTextNode(data["pageProps"]["anime"]["nome"]);
    title_bold.appendChild(title_text);
    title.appendChild(title_bold);

    let description = document.createElement("p");
    let description_text = document.createTextNode(data["pageProps"]["anime"]["descricao"]);
    description.appendChild(description_text);

    finalresult.appendChild(title);
    finalresult.appendChild(separator);
    finalresult.appendChild(description);
    finalresult.appendChild(separator);

    for (let season of data["pageProps"]["seasons"]) {
        finalresult.appendChild(season_data_to_element(season));
    }

    return finalresult;
}

const query_string = window.location.search;
const url_params = new URLSearchParams(query_string);
const id = url_params.get('id');

const seasons = document.getElementById("seasons");
remove_all_child_nodes(seasons);

seasons.appendChild(anime_data_to_element(get_anime_by_id(id)));
