// 'polished/lib/mixins/normalize';
import normalizeStyled from 'normalize-styled'
import { injectGlobal, css } from 'styled-components'

injectGlobal`
  ${normalizeStyled}
  body {
    padding: 0;
    ${window.location.pathname == '/' ? css`background: linear-gradient(#5A6ED0 0%, #4053AE 100%);` : css`background: #fff;`}
    background-repeat: no-repeat;
    height: 100vh;
    color: #333;
  }

  @font-face {
    font-family: 'Open Sans', sans-serif;
    src: url(''https://fonts.googleapis.com/css?family=Open+Sans'') format('opentype');
  }

  * {
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
  }

  a:visited, a:active {
    text-decoration: none;
    color: #fff;
  }
  `

//
// export function boxShadow() {
//   return 'box-shadow: 0px 2px 2px #888888'
// }
