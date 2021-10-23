# NLW Heat React

## Vite

- Alternativa ao webpack
- Mais performático
- Import/Export nativo usando ESM modules ja existentes nos browsers

```sh
yarn create vite web --template react-ts
```

## CSS Modules

- Mudar nome do arquivo para `.module.css` para usar os módulos do css com variáveis js.
- Faz com o que o CSS se torne scoped, acoplado ao componente que está sendo utilizado.
  - Estilos não se misturam!

```tsx
import styles from './App.module.css';

export function App() {
  return (
    <main className={styles.contentWrapper}>
      <h1>Hello World</h1>
    </main>
  );
}
```

## Context API

- Deixar informações acessíveis a todos os componentes da aplicação
- Alternativa ao REDUX

`contexts/auth.tsx`

```tsx
import { createContext, ReactNode } from 'react';

// Cria-se o contexto com o 'createContext' inicializando como null
// Exporta-se esse contexto para que seja usado
export const AuthContext = createContext(null);

type AuthProvider = {
  children: ReactNode; // Qualquer coisa aceitável pelo React
};

export function AuthProvider({ children }: AuthProvider) {
  return (
    // Todos os componentes dentro desse componente irão ter acesso ao contexto
    <AuthContext.Provider value={null}>{children}</AuthContext.Provider>
  );
}
```

`main.tsx`

```tsx
import { AuthProvider } from './contexts/auth';

ReactDOM.render(
    <AuthProvider>
      <App />
    </AuthProvider>
    document.getElementById('root')
);
```

`LoginBox/index.tsx`

```tsx
// Recuperamos o contexto com o useContext
const { githubOAuthUrl, user } = useContext(AuthContext);
```
