const urlPageTitle = "Vanilla JS SPA Routes - URL and HASHES";

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
        title: `404 | ${urlPageTitle}`,
        description: "Page not found"
    },
    "/": {
        template: "/templates/index.html",
        title: `Home | ${urlPageTitle}`,
        description: "Welcome"
    },
    "/about": {
        template: "/templates/about.html",
        title: `About Us | ${urlPageTitle}`,
        description: "Our team"
    },
    "/contact": {
        template: "/templates/contact.html",
        title: `Contact Us | ${urlPageTitle}`,
        description: "Send a message"
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
    document.title = route.title;
    document.querySelector('meta[name="description"]').setAttribute("content", route.description);

};

//Set the watching to the browser router functionality
//onpopstate is fired always the active history entry changes
window.onpopstate = urlLocationHandler;

//Global access to the function
window.route = urlRoute;

//First time calling function to load the first page
urlLocationHandler();