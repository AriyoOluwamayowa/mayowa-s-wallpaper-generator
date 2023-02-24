const imagecontainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesloaded = 0;
let totalImages = 0;
let photosArray = [];



// unsplas API
const count = 10;
const apiKey = 'In5ByCS_1DfY9uEQ5r2oG1m6_O1G17DU12J0lLEfL1I';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageloaded() {  
 imagesloaded++;
 console.log(imagesloaded);
 if (imagesloaded === totalImages) {
    ready = true;
    loader.hidden = true;
    // console.log('ready =', ready);
 }
}

// helper function to set Attributes o DOM elements
// function setAttributes(elements, attributes) {
//     for (const Key in attributes) {
//         element.setAttribute(Key, attributes[key]);
//     }
// }


//  create elemets for links & photos, Add to DOM
function displayPhotos() {
    imagesloaded = 0;
    totalImages = photosArray.length;
    // console.log('toal images', totalImages);

    // run functio for each object to photosarray
     photosArray.forEach((photo) => {
//  create <a> to link to unsplash
const item = document.createElement('a');
item.setAttribute('href',photo.links.html);
item.setAttribute('target', '_blank');

// setAttributes(item, {
//     href: photo.links.html,
//     target: '_blank'
// });
// create <img> for photo
const img = document.createElement('img');
img.setAttribute('src', photo.urls.regular);
img.setAttribute('alt', photo.urls.regular);
img.setAttribute('title', photo.urls.regular);
 
// setAttributes(img, {
//     src: photo.urls.regular,
//     alt: photo.alt_description,
//     title: photo.alt_description,
// });
// event listener, check whe each is finished loedig
img.addEventListener('load',imageloaded);

// put <img> inside <a>, then put both inside imagecotainer elemet

item.appendChild(img); 
imagecontainer.appendChild(item);
     });
    };



// get photos from unsplash API
async function getPhotos() {
    try{
       const response = await fetch(apiUrl);
       photosArray = await response.json();
       displayPhotos();
    } catch (error) {
        //  catch error here
    }
}


// check to see if scrolling near bottom of page, load more photos

window.addEventListener('scroll', () => {
   
    if(window.innerHeight + window.scrollY + document.body.offsetHeight - 1000 && ready) {
        getPhotos();
      ready =  false;
    }
});
// on load 
getPhotos();
// const count = 10;
// const apiKey = ''
// const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;