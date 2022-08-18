let galleryImages = document.querySelectorAll(".pic");
let getLatestOpenedImg;
let windowWidth = window.innerWidth;
let gallery = document.querySelector('#index-gallery');
let marginSize = window.getComputedStyle(gallery).getPropertyValue("margin-left"); 
marginSize = marginSize.match(/\d+/);

if(galleryImages) 
{
    galleryImages.forEach(function(image, index) 
    {
        image.onclick = function() 
        {
            unloadScrollBars();

            let element = image.firstElementChild;
            let smallImgUrl = element.getAttribute("src");
            let piece = smallImgUrl.split("small-")[1];
            let bigImgUrl = "Photos\\IMG_" + piece; 

            getLatestOpenedImg = image.className.substring(4);
            getLatestOpenedImg = parseInt(getLatestOpenedImg);
            

            let container = document.body;
            let newImgWindow = document.createElement("div");
            container.appendChild(newImgWindow);
            newImgWindow.setAttribute("class", "img-window");

            let newImg = document.createElement("img");
            newImgWindow.appendChild(newImg);
            newImg.setAttribute("src", bigImgUrl);
            newImg.setAttribute("id", "current-img");
            newImg.setAttribute("onclick", "closeImg()");

            newImg.onload = function() 
            {
                // let newPrevBtn = document.createElement("a");
                // let btnPrevText = document.createTextNode("🡨");
                // newPrevBtn.appendChild(btnPrevText);
                // container.appendChild(newPrevBtn);
                // newPrevBtn.setAttribute("class", "img-btn-prev");
                // newPrevBtn.setAttribute("onclick", "changeImg(0)")

                let newPrevBtn = document.createElement("a");
                newPrevBtn.setAttribute("class", "img-btn-prev");
                newPrevBtn.setAttribute("onclick", "changeImg(0)")

                let btnPrevIcon = document.createElement("i");
                btnPrevIcon.setAttribute("class", "fa-solid fa-chevron-left")
                newPrevBtn.appendChild(btnPrevIcon);
                container.appendChild(newPrevBtn);
                
    
                // let newNextBtn = document.createElement("a");
                // let btnNextText = document.createTextNode("🡪");
                // newNextBtn.appendChild(btnNextText);
                // container.appendChild(newNextBtn);
                // newNextBtn.setAttribute("class", "img-btn-next");
                // newNextBtn.setAttribute("onclick", "changeImg(1)")

                let newNextBtn = document.createElement("a");
                newNextBtn.setAttribute("class", "img-btn-next");
                newNextBtn.setAttribute("onclick", "changeImg(1)")

                let btnNextIcon = document.createElement("i");
                btnNextIcon.setAttribute("class", "fa-solid fa-chevron-right")
                newNextBtn.appendChild(btnNextIcon);
                container.appendChild(newNextBtn);
            } 
        }
    });
}

function reloadScrollBars() 
{
    document.documentElement.style.overflow = 'auto'; 
    document.body.scroll = "yes"; 
}

function unloadScrollBars() 
{
    document.documentElement.style.overflow = 'hidden';  
    document.body.scroll = "no"; 
}

function closeImg()
{
    document.querySelector(".img-window").remove();
    document.querySelector(".img-btn-prev").remove();
    document.querySelector(".img-btn-next").remove();
    reloadScrollBars();
}

function changeImg(changeDir) // 1 forward, 0 backward
{
    document.querySelector("#current-img").remove();

    let getImgWindow = document.querySelector(".img-window");
    let newImg = document.createElement("img");
    getImgWindow.appendChild(newImg);

    let calcNewImg;
    if(changeDir === 1)
    {
        calcNewImg = getLatestOpenedImg - 1;
        if(calcNewImg < 1)
        {
            calcNewImg = galleryImages.length;
        }
    }
    else if(changeDir === 0)
    {
        calcNewImg = getLatestOpenedImg + 1;
        if(calcNewImg > galleryImages.length)
        {
            calcNewImg = 1;
        }
    }

    let className = "pic " + calcNewImg;
    let imgClass = document.getElementsByClassName(className)[0];
    let element = imgClass.firstElementChild;

    let smallImgUrl = element.getAttribute("src");
    let piece = smallImgUrl.split("small-")[1];
    let bigImgUrl = "Photos\\IMG_" + piece; 

    newImg.setAttribute("src", bigImgUrl);
    newImg.setAttribute("id", "current-img");
    newImg.setAttribute("onclick", "closeImg()");

    getLatestOpenedImg = calcNewImg;
}


