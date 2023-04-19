import { get, remove_all_child_nodes } from "./common.js"

const API_URL = "https://api.puray.moe";

function create_video_player_for_episode(id)
{
    let r = JSON.parse(get(API_URL + `/episodios/${id}/m3u8/mp4/`));

    let stream = "";
    for (let s of r["streams"]) {
        if (s["resolucao"][0] == "1280" && s["resolucao"][1] == "720") {
            stream = s["url"];
        }
    }

    if (!stream) {
        stream = r["streams"][0]["url"];
    }

    let video = document.createElement("video");
    video.setAttribute("controls", "");
    let source = document.createElement("source");
    source.setAttribute("type", "video/mp4");
    source.setAttribute("src", stream);
    video.appendChild(source);

    return video;
}

const query_string = window.location.search;
const url_params = new URLSearchParams(query_string);
const ep = url_params.get('ep');

const player = document.getElementById("player");
remove_all_child_nodes(player);

player.appendChild(create_video_player_for_episode(ep));
