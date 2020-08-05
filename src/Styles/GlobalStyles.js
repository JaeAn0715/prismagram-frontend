import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`

    ${reset}
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;400;500;700&display=swap');
    *{
        box-sizing:border-box;
    }

    body{
        background-color: ${(props) => props.theme.bgColor};
        color: ${(props) => props.theme.blackColor};
        font-size: 14px;
        font-family: 'Noto Sans JP', sans-serif;
    }

    a{
        color:${(props) => props.theme.blueColor};
        text-decoration:none;
    }
`;
