export function get(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);

    const headers = {
        "Accept": "*/*",
    };

    for (const [key, value] of Object.entries(headers)) {
        xmlHttp.setRequestHeader(key, value);
    }

    xmlHttp.send(null);

    return xmlHttp.responseText;
}

export function remove_all_child_nodes(node) {
    let i = (typeof(node) == "object") ? node : document.getElementById(node);

    while (i.hasChildNodes()) {
        i.removeChild(i.firstChild);
    }
}
