import { get, remove_all_child_nodes } from "./common.js"

const API_URL = "https://api.puray.moe"

function search_anime(query)
{
    let r = get(API_URL + `/animes/fulltext/?q=${query}`);
    return JSON.parse(r);
}

function get_anime_by_id(id)
{
    let r = get(`https://puray.moe/_next/data/uhDUANuYe4rxvgVqp0qgt/anime/${id}.json?id=${id}`);
    return JSON.parse(r);
}

function search_result_to_element(result)
{
    let finalresult = document.createElement("div");

    let name = document.createElement("h3");
    let text_bold = document.createElement("b");
    let text = document.createTextNode(result["nome"]);
    text_bold.appendChild(text);
    name.appendChild(text_bold);

    let desc = document.createElement("p");
    let desc_text = document.createTextNode(result["descricao"]);
    desc.appendChild(desc_text);

    finalresult.appendChild(name);
    finalresult.appendChild(desc);

    let watch_link = document.createElement("a");
    let watch_text = document.createTextNode("watch");
    watch_link.setAttribute("href", `javascript:window.location.href = '/anime.html?id=${result["id_animes"]}';`);
    watch_link.appendChild(watch_text);

    finalresult.appendChild(watch_link);

    finalresult.appendChild(document.createElement("hr"));

    return finalresult;
}

function update_results(query)
{
    let results = document.getElementById("results");
    remove_all_child_nodes(results);

    for (let r of search_anime(query)["results"])
    {
        results.appendChild(search_result_to_element(r));
    }
}
window.update_results = update_results;

let input = document.createElement("input");
input.setAttribute("type", "search");
input.setAttribute("onchange", "update_results(this.value)");

document.getElementById("search").appendChild(input);
