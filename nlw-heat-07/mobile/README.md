# React Native Heat Mobile

## Expo

```sh
# Start an expo project
expo init mobile

# Start as a tunnel with NGROK
expo start --tunnel

#Instalar fontes personalizadas
expo install expo-font @expo-google-fonts/roboto
```

## React Native

- Já vem com o flexbox aplicado por padrão

## SVG

```sh
# Instalar SVG no React Native
expo install react-native-svg

# Para usar svg como componente
yarn add react-native-svg-transformer -D
```

- Adicionar configuração do `react-native-svg-transformer` no `metro.config.js`

## React Native X Helper

- Ajuda a lidar com espaçamentos

## Moti

- Animações de forma declarativa

```sh
yarn add moti

expo install react-native-reanimated
```

## Autenticação

- Será criado uma pasta de `hooks` para a autenticação integrado ao Context API
- É criada uma função para conseguirmos usar o contexto como um hook

```tsx
// Function to use Auth as a hook
function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
```

### AuthSession

- Criar sessão e redirecionar para o github

```sh
expo install expo-auth-session expo-random
```

- Guardar valores obtivos de token e usuário:

```sh
expo install @react-native-async-storage/async-storage
```
