/* =====================================================
   FAQ ACCORDION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    const faqItems =
        document.querySelectorAll(".faq-card");


    /* اگر FAQ پیدا نشد، چیزی انجام نده */

    if (faqItems.length === 0) {
        return;
    }


    /* =================================================
       CLOSE FAQ
    ================================================= */

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


    /* =================================================
       OPEN FAQ
    ================================================= */

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


    /* =================================================
       CLICK
    ================================================= */

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


                /* Open / close current */

                if (isOpen) {

                    closeFaq(item);

                } else {

                    openFaq(item);

                }

            }
        );

    });


    /* =================================================
       RESIZE
    ================================================= */

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