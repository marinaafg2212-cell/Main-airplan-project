const testimonials = [
    {
        title: "An Unforgettable Journey",
        description:
            "My journey with Airplan was amazing. Everything was smooth and comfortable. I enjoyed every moment of my trip and discovered beautiful places.",

        profile: "image/4eae151a0ff83952a46f1ac1d2c8ea2d.jpg",
        name: "Marina",
        job: "Happy Traveler"
    },

    {
        title: "A Wonderful Experience",
        description:
            "Flying with Airplan made my trip easy and relaxing. The service was excellent, the journey was comfortable, and everything felt perfectly organized.",

        profile: "image/banner2.jpg",
        name: "Sarah",
        job: "Adventure Traveler"
    },

    {
        title: "Memories I Will Never Forget",
        description:
            "This was one of the best travel experiences I have ever had. From booking my flight to arriving at my destination, everything was simple and enjoyable.",

        profile: "image/banner1.jpg",
        name: "Daniel",
        job: "World Traveler"
    },

    {
        title: "Travel Made Beautiful",
        description:
            "Airplan helped me discover a beautiful destination without any stress. The whole experience was comfortable, smooth, and full of unforgettable moments.",

        profile: "image/banner3.jpg",
        name: "Sophia",
        job: "Travel Lover"
    }
];


let current = 0;




const testimonialTitle = document.getElementById("testimonialTitle");
const testimonialDescription = document.getElementById("testimonialDescription");
const testimonialProfile = document.getElementById("testimonialProfile");
const testimonialName = document.getElementById("testimonialName");
const testimonialJob = document.getElementById("testimonialJob");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");


function goTo(index) {


    if (index >= testimonials.length) {
        current = 0;
    }

    else if (index < 0) {
        current = testimonials.length - 1;
    }

    else {
        current = index;
    }


    const testimonial = testimonials[current];


    testimonialTitle.textContent = testimonial.title;

    testimonialDescription.textContent = testimonial.description;

    testimonialName.textContent = testimonial.name;

    testimonialJob.textContent = testimonial.job;

    testimonialProfile.src = testimonial.profile;
}


function next() {
    goTo(current + 1);
}



function previous() {
    goTo(current - 1);
}



nextBtn.addEventListener("click", next);

prevBtn.addEventListener("click", previous);