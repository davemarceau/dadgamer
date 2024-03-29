import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

// OUR COLOR PALETTE AND FONTS
    :root {

    
    --primaryblue: #0088ff;
    --primaryhover: #36a1ff;

    --secondaryblue: #004078;
    
    --lightbackground: #deeefa;
    --darkbackground: #2e3133;
    
    --lighttext: #deeefa;
    --lighthover: #a2b0ba;

    --darktext: #2e3133;
    --darkhover: #81878f;
    
    }

    /* http://meyerweb.com/eric/tools/css/reset/
        v2.0 | 20110126
        License: none (public domain)
    */

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        box-sizing: border-box;
        font-size: 100%;
        vertical-align: baseline;
        @import url('https://fonts.googleapis.com/css2?family=Lato');
        font-family: 'Lato', sans-serif;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
    line-height: 1; 
        margin: 0px;
        background-color: var(--darkbackground);
        color: var(--lighttext)
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }

    h1, h2, h3, label, button {
        text-decoration: none;
        padding: 0px;
    }
    p, a {
        text-decoration: none;
    }
`;
