document.addEventListener("click", (event) => {
    const { target } = event;

    //Click outside nav>a void return
    if(!target.matches("nav a")){
        return;
    }

    event.preventDefault();

    //Call handle Url Route
    urlRoute();
})

const routes = {
    404: {
        template: "/templates/404.html",
        title: "",
        description: ""
    },
    "/": {
        template: "/templates/index.html",
        title: "",
        description: ""
    },
    "/about": {
        template: "/templates/about.html",
        title: "",
        description: ""
    },
    "/contact": {
        template: "/templates/contact.html",
        title: "",
        description: ""
    }
}

//UrlRoute is a function that watch the URL
//and call another function
const urlRoute = (event) => {
    event = event || window.event;

    event.preventDefault();

    window.history.pushState({}, "", event.target.href)

    urlLocationHandler();
}

//Async to listen actively
//Grab the responses to push out
const urlLocationHandler = async () => {
    const location = window.location.pathname;

    if(location.length == 0) location = "/"
    
    const route = routes[location] || routes[404];

    const html = await fetch(route.template).then((response)=> response.text());

    document.getElementById("content").innerHTML = html;

};

window.onpopstate = urlLocationHandler;

window.route = urlRoute;

urlLocationHandler();