import "../css/main.scss";
import { googleApiKey } from "./config";

document.addEventListener("DOMContentLoaded", function () {
    // new Splide("#photo-splide", {
    //     type: "loop",
    //     perPage: 3,
    //     autoWidth: true,
    //     autoplay: true,
    //     interval: 3000,
    //     pauseOnHover: true,
    //     focus: "center",
    //     gap: "1em",
    //     breakpoints: {
    //         870: {
    //             perPage: 2,
    //         },
    //         500: {
    //             perPage: 1,
    //         },
    //     },
    // }).mount();

    const getYouTubeVideos = async (playlistId, apiKey, numResults) => {
        var url = new URL(
                "https://www.googleapis.com/youtube/v3/playlistItems"
            ),
            params = {
                key: apiKey,
                part: "snippet",
                playlistId: playlistId,
                maxResults: 10,
            };
        Object.keys(params).forEach((key) =>
            url.searchParams.append(key, params[key])
        );

        const response = await fetch(url);
        const data = await response.json();
        const videos = await data.items;

        return videos;
    };

    const buildYouTubeSplide = (playlistId, apiKey, numResults) => {
        getYouTubeVideos(playlistId, apiKey, numResults)
            .then((data) => {
                console.log(data);
                data.forEach((video) => {
                    var thumbnail = video.snippet.thumbnails.high.url;

                    if ("standard" in video.snippet.thumbnails) {
                        thumbnail = video.snippet.thumbnails.standard.url;
                    }
                    if (
                        "maxres" in video.snippet.thumbnails &&
                        window.innerWidth > 1000
                    ) {
                        thumbnail = video.snippet.thumbnails.maxres.url;
                    }
                    var videoId = video.snippet.resourceId.videoId;
                    var videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
                    var youtubeSplide = document.querySelector(
                        ".youtube .splide__list"
                    );

                    var slide = document.createElement("div");
                    slide.classList.add("splide__slide");
                    slide.setAttribute("data-splide-youtube", videoUrl);

                    var thumbnailEl = document.createElement("img");
                    thumbnailEl.setAttribute("src", thumbnail);

                    slide.appendChild(thumbnailEl);
                    youtubeSplide.appendChild(slide);
                });
            })
            .then(() => {
                new Splide("#video-splide", {
                    type: "loop",
                    perPage: 1,
                    fixedWidth: "100%",
                    focus: "center",
                    heightRatio: 0.5625,
                    video: {
                        loop: true,
                    },
                }).mount(window.splide.Extensions);
            });
    };

    const switchLanguage = (lang) => {
        // if (lang == 'en-US'){
        // } else if (lang == 'es-MX'){

        // } else {
        //     console.log('error')
        // }
        const languages = {
            "en-US": "es-MX",
            "es-MX": "en-US",
        };
        let show = document.querySelectorAll(`[lang=${lang}]`);
        let hide = document.querySelectorAll(`[lang=${languages[lang]}]`);
        console.log(show);
        console.log(hide);
        show.forEach((el) => {
            el.classList.remove("hide-lang");
        });
        hide.forEach((el) => {
            el.classList.add("hide-lang");
        });
    };
    const langSelectors = document.querySelectorAll(".lang-select");
    langSelectors.forEach((selector) => {
        selector.addEventListener("click", (e) => {
            let lang = e.target.dataset.lang;
            switchLanguage(lang);
        });
    });
    if (window.location.pathname.split("/")[1] == "") {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        if ("scrollRestoration" in history) {
            history.scrollRestoration = "manual";
        }
        let navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach((link) => {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                var navHeight = document.querySelector("nav").offsetHeight;
                gsap.to(window, {
                    duration: 0.6,
                    scrollTo: {
                        y: link.getAttribute("href"),
                        offsetY: navHeight,
                    },
                });
            });
        });
        const sections = document.querySelectorAll("section");

        sections.forEach((section) => {
            let idStr = `#${section.id}`;
            gsap.to(`${idStr}-main`, {
                scrollTrigger: {
                    trigger: idStr,
                    start: "25% bottom",
                },
                opacity: 1,
                duration: 0.7,
                ease: "circ.inOut",
            });
        });
        buildYouTubeSplide(
            "PL-E3wgTJoMcG4iM-Q5f2fGxd5s7RZ2A8d",
            googleApiKey,
            10
        );
    }
});
