// Variables 
const old_chatBtn = document.querySelector(".contact")
const nav = document.getElementsByTagName("nav")[0];
const links = Array.from(document.querySelectorAll("nav ul > li > a"))
const hm_links = Array.from(document.querySelectorAll(".home-links"))
const list = Array.from(document.querySelectorAll("nav ul > li "))
const ul = document.getElementsByTagName("ul")[0];
const toggler = document.querySelector(".navbar-toggler")
const brand = document.querySelector("nav .brand-name")
const html = document.getElementsByTagName("html")[0]
const load_balls = Array.from(document.querySelectorAll(".loading span"))
const preloader = document.querySelector(".preloader")
const fade = Array.from(document.querySelectorAll(".fade-animate"))
const fixed_items = Array.from(document.querySelectorAll(".fixed"))
const nav_arr = [nav]
const hire_modal = document.querySelector("#hire-modal")
const hire_btn = document.querySelector(".hire-btn")
const modal_dismiss = document.querySelector(".dismiss")



// Media query using javascript 
function media(x) {


    if (x.matches) {
        old_chatBtn.remove()
        ul.appendChild(old_chatBtn)
        brand.after(toggler)
        fixed_items[0].remove()
        fixed_items[1].remove()
       
        
    }
    if (y.matches) {
        nav.appendChild(old_chatBtn)
        toggler.remove()
        preloader.after(fixed_items[0])
        fixed_items[0].after(fixed_items[1])
    }


}

const x = window.matchMedia("(max-width:767px)")
const y = window.matchMedia("(min-width:768px)")
media(x)
x.addEventListener("change", media)
y.addEventListener("change", media)

// EventLis tener to change Preloader Height (doing this because of keyboard messing up layout )

// addEventListener("resize" , ()=>{
//     if(window.innerHeight < 9999 && window.innerWidth <= 991){
//         const window_height = window.innerHeight
//         preloader.style.height = `${window_height}px`
//     }
    
// })



// Navbar Toggle 
const toggleNav = () => {
    toggler.classList.toggle("activenav")
    ul.classList.toggle("ul-show")
    html.classList.toggle("no-scroll")
}

toggler.addEventListener("click", toggleNav)


// Loading Animation Functions 
const load_show = async (a, b) => {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            load_balls[a].classList.add('load-toggle')
            setTimeout(() => {
                resolve("done")
            }, b)
        }, 400);
    })

}
const load_remove = () => {
    for (let i = 0; i < load_balls.length; i++) {
        load_balls[i].classList.remove("load-toggle")

    }
}

const load_func = async () => {
    html.style.overflowY = "hidden"
    await load_show(0, 200)
    await load_show(1, 200)
    await load_show(2, 700)
    load_remove()
    if (document.readyState !== "complete") {
        load_func()
    }
}
const load_ending = async () => {
    preloader.classList.add("end")
    html.style.overflowY = "visible"
}


const show = async (b, c, d) => {
    for (let a = 0; a < b.length; a++) {
        setTimeout(() => {
            b[a].classList.add(d)
        }, c)
    }
}
let q = 0
const link_show = () => {
    setTimeout(() => {

        const interval = setInterval(() => {
            if (q == links.length - 1) {
                clearInterval(interval)
                list.forEach((e) => {
                    e.classList.remove("overflow-hidden")
                })
                for (let i of links) {
                    if (i.matches(".active")) {
                        i.classList.add("link-active")
                    }

                }
            }
            links[q].classList.add("links-visible")
            q++

        }, 250);
    }, 300)
}


// reveal elements on scroll 
const reveal = Array.from(document.querySelectorAll(".reveal"))
const container = Array.from(document.querySelectorAll(".main-container"))


const revealer = () => {
    for (let i = 0; i < reveal.length + 1; i++) {
        let elementFromTop = container[i].getBoundingClientRect().top
        let windowHeight = window.innerHeight
        if (elementFromTop < windowHeight) {
            if(i == 4){
                for (const k of links) {
                    k.classList.remove("link-active")
                    k.classList.remove("active")
                }
                break;
            }else{
                reveal[i].classList.add("reveal-active")    
            }
            for (const j of links) {
                if(j == links[i]){
                    j.classList.add("link-active")
                    j.classList.add("active")
                }else{
                    j.classList.remove("link-active")
                    j.classList.remove("active")

                }
            }
        }


    }

    if(document.documentElement.scrollTop > 150){
        document.getElementsByTagName("header")[0].classList.remove("non-sticky")
        document.getElementsByTagName("header")[0].classList.add("sticky")
        
    }else{
        
        document.getElementsByTagName("header")[0].classList.remove("sticky")
        document.getElementsByTagName("header")[0].classList.add("non-sticky")
    }

    
}

// Running the loading Functions 
document.onreadystatechange = async () => {

    if (document.readyState !== "complete") {
        load_func()
    } else {
        await load_func()
        await load_ending()
        document.documentElement.scrollTop = 0
        show(fade, 300, "fade-up")
        show(nav_arr, 600, "nav-visible")
        show(fixed_items, 1100, "fixed-visible")
        link_show()
        window.addEventListener("scroll", revealer)

    }

}

// Modal Toggle
hire_btn.addEventListener("click", () => {
    hire_modal.showModal()
    html.classList.add("no-scroll")
})
modal_dismiss.addEventListener("click", () => {
    hire_modal.close()
    html.classList.remove("no-scroll")
})




// Active link Function 
links.forEach((e) => {
    e.addEventListener("click", () => {
        for (const i of links) {
            if (i == e) {
                e.classList.add("active")
                e.classList.add("link-active")
            } else {

                i.classList.remove("active")
                i.classList.remove("link-active")
            }

        }
    })

})


