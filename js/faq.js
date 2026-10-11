

document.addEventListener("DOMContentLoaded", function () {


    const faqItems =
        document.querySelectorAll(".faq-card");




    if (faqItems.length === 0) {
        return;
    }



    function closeFaq(item) {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");

        const arrow =
            item.querySelector(".faq-arrow");


        item.classList.remove("active");


        if (question) {
            question.setAttribute(
                "aria-expanded",
                "false"
            );
        }


        if (answer) {
            answer.style.maxHeight = "0px";
        }


        if (arrow) {
            arrow.style.transform =
                "rotate(0deg)";
        }

    }




    function openFaq(item) {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");

        const arrow =
            item.querySelector(".faq-arrow");


        item.classList.add("active");


        if (question) {
            question.setAttribute(
                "aria-expanded",
                "true"
            );
        }


        if (answer) {

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }


        if (arrow) {

            arrow.style.transform =
                "rotate(180deg)";

        }

    }



    faqItems.forEach(function (item) {


        const question =
            item.querySelector(".faq-question");


        if (!question) {
            return;
        }


        question.setAttribute(
            "role",
            "button"
        );


        question.setAttribute(
            "aria-expanded",
            "false"
        );


        question.addEventListener(
            "click",
            function () {


                const isOpen =
                    item.classList.contains("active");


                /* Close all */

                faqItems.forEach(
                    function (otherItem) {

                        if (otherItem !== item) {

                            closeFaq(otherItem);

                        }

                    }
                );




                if (isOpen) {

                    closeFaq(item);

                } else {

                    openFaq(item);

                }

            }
        );

    });



    window.addEventListener(
        "resize",
        function () {

            faqItems.forEach(
                function (item) {

                    if (
                        item.classList.contains(
                            "active"
                        )
                    ) {

                        const answer =
                            item.querySelector(
                                ".faq-answer"
                            );


                        if (answer) {

                            answer.style.maxHeight =
                                answer.scrollHeight +
                                "px";

                        }

                    }

                }
            );

        }
    );

});
questionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const question = questionInput.value.trim();

    if (question === "") {
        message.textContent = "Please enter your question.";
        return;
    }

    const subject = encodeURIComponent("Airplan - User Question");
    const body = encodeURIComponent(question);

    window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=marinaafg2212Gmail.com&su=${subject}&body=${body}`,
        "_blank"
    );
});
questionInput.addEventListener("input", function () {
    if (questionInput.value.trim() !== "") {
        questionInput.classList.remove("invalid");
        message.classList.remove("error");
        message.textContent = "";
    }
});