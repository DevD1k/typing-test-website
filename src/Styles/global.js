import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => theme.background};
    font-family: 'Roboto', sans-serif;
    transition: all 0.25s linear;
    overflow-x: hidden;
}

.canvas {
    display: grid;
    min-height: 100vh;
    grid-auto-flow: row;
    grid-template-row: auto 1fr auto;
    gap: 0.5rem;
    padding: 2rem;
    width: 100vw;
    align-items: center;
    text-align: center;
}

.type-box {
    display: block;
    max-width: 1000px;
    height: 140px;
    margin: 0 auto;
    overflow: hidden;
    
}

.words {
    display: flex;
    flex-wrap:wrap;
    font-size: 32px;
    color: ${({ theme }) => theme.typeBoxText}

}

.word {
    margin: 5px;
}

.hidden-input {
    opacity: 0;
}

.current {
    border-left: 1px solid;
    animation: blinking 2s infinite;

    @keyframes blinking {
        0%{border-left-color: ${({ theme }) => theme.textColor};}
        25%{border-left-color: ${({ theme }) => theme.background};}
        50%{border-left-color: ${({ theme }) => theme.textColor};}
        75%{border-left-color: ${({ theme }) => theme.background};}
        100%{border-left-color: ${({ theme }) => theme.textColor};}
    }
}
.current-right {
    border-right: 1px solid;
    animation: blinkingRight 2s infinite;

    @keyframes blinkingRight {
        0%{border-right-color: ${({ theme }) => theme.textColor};}
        25%{border-right-color: ${({ theme }) => theme.background};}
        50%{border-right-color: ${({ theme }) => theme.textColor};}
        75%{border-right-color: ${({ theme }) => theme.background};}
        100%{border-right-color: ${({ theme }) => theme.textColor};}
    }
}

.correct {color: ${({ theme }) => theme.textColor}};
.incorrect {color: red};

// Uppermenu Css

.upper-menu {
    display: flex;
    width: 1000px;
    margin: 0 auto;
    font-size: 1.35rem;
    justify-content: space-between;
}

.modes {
    display: flex;
    gap: 0.3rem;
}
.time-mode { transition: all 0.25s ease };
.time-mode:hover {
    color: ${({ theme }) => theme.typeBoxText};
    cursor: pointer;
}

// Stats Component

.stats-box {
    display: flex;
    width: 1000px;
    height: auto;
    margin: 0 auto;
}

.left-stats {
    width: 30%;
    padding: 30px;
}

.right-stats { width: 70%; }

.title {
    font-size: 20px;
    color: ${({ theme }) => theme.typeBoxText};
}

.subtitle { font-size: 30px; }

// Header

.header {
    width: 1000px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
}

//Table

.user-profile {
    width: 1000px;
    margin: auto;
    display: flex;
    height: 15rem;
    background: ${({ theme }) => theme.typeBoxText};
    border-radius: 20px;
    padding: 1rem;
    justify-content: center;
    align-text: center;
}

.user {
    width: 50%;
    display: flex;
    margin: 30px 0;
    font-size: 1.5rem;
    padding: 1rem;
    border-right: 2px solid;
}

.info {
    width: 60%;
    padding: 1rem;
    margin-top: 1rem;
}

.picture { width: 40%; }

.total-tests {
    width: 50%;
    font-size: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.table, .graph-user-page {
    margin: auto;
    width: 1000px;
}

.center-of-screen {
    display: flex;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
}

// Footer

.footer {
    width: 1000px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
}

`;
