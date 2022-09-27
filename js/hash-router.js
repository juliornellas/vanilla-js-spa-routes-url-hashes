const hashPageTitle = "Vanilla JS SPA Routes - URL and HASHES";

const hashRoutes = {
    404: {
        template: "/templates/404.html",
        title: `404 | ${hashPageTitle}`,
        description: "Page not found"
    },
    "/": {
        template: "/templates/index.html",
        title: `Home | ${hashPageTitle}`,
        description: "Welcome"
    },
    about: {
        template: "/templates/about.html",
        title: `About Us | ${hashPageTitle}`,
        description: "Our team"
    },
    contact: {
        template: "/templates/contact.html",
        title: `Contact Us | ${hashPageTitle}`,
        description: "Send a message"
    }
};

//Async to listen actively
//Grab the responses to push out
const hashLocationHandler = async () => {
    let location = window.location.hash.replace("#","");

    if(location.length == 0) location = "/"
    
    const route = hashRoutes[location] || hashRoutes[404];

    const html = await fetch(route.template).then((response)=> response.text());

    document.getElementById("content").innerHTML = html;
    document.title = route.title;
    document.querySelector('meta[name="description"]').setAttribute("content", route.description);
};

window.addEventListener("hashchange", hashLocationHandler);

hashLocationHandler();