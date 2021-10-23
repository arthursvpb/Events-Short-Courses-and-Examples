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
