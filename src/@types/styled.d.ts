import 'styled-components'

import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

/* está criando uma tipagem pro módulo styled-components;
toda vez que importar o styled-components em algum arquivo, a tipagem
que ele vai puxar é o que você definir aqui dentro */
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
