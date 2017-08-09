// 'polished/lib/mixins/normalize';
import normalizeStyled from 'normalize-styled'
import { injectGlobal } from 'styled-components'

injectGlobal`
  ${normalizeStyled}
  body {
    padding: 0;
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
    color: #333;
  }
  a{
    text-decoration: none;
  }
  `

//
// export function boxShadow() {
//   return 'box-shadow: 0px 2px 2px #888888'
// }
