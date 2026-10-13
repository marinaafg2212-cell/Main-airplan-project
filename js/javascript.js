const testimonials = [
    {
        title: "An Unforgettable Journey",
        description:
            "My journey with Skyline was amazing. Everything was smooth and comfortable. I enjoyed every moment of my trip and discovered beautiful places.",

        profile: "./image/pro2",
        name: "Marina",
        job: "Happy Traveler"
    },

    {
        title: "A Wonderful Experience",
        description:
            "Flying with Skyline made my trip easy and relaxing. The service was excellent, the journey was comfortable, and everything felt perfectly organized.",

        profile: "./image/pro1",
        name: "Sarah",
        job: "Adventure Traveler"
    },

    {
        title: "Memories I Will Never Forget",
        description:
            "This was one of the best travel experiences I have ever had. everything was simple and enjoyable.",

        profile: "./image/pto3",
        name: "Daniel",
        job: "World Traveler"
    },

    {
        title: "Travel Made Beautiful",
        description:
            "Skyline helped me discover a beautiful destination without any stress. The whole experience was comfortable, smooth, and full of unforgettable moments.",

        profile: "./image/pro4",
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