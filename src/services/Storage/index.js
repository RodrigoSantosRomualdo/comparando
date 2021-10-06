import AsyncStorageUsuario from '@react-native-async-storage/async-storage';


const armazenarUserLogin = (chave, valor) => {
  AsyncStorageUsuario.setItem(chave, valor)
    console.log('value: ', valor)
}

const buscarUserLogin = async (chave) => {
  const valor = await AsyncStorageUsuario.getItem(chave)
  console.log('DENTRO DO STORAGE STORAGE: ', valor )
  return valor;
}

const armazenarListaPadrao = (chave, valor) => {
  AsyncStorageUsuario.setItem(chave, valor)
    console.log('armazenarListaPadrao value: ', valor)
}

const deletarListaPadrao = async (chave) => {
  await AsyncStorageUsuario.removeItem(chave)
    console.log('DeletarListaPadrao value: ', chave)
}

const buscarListaPadrao = async (chave) => {
  const valor = await AsyncStorageUsuario.getItem(chave)
  console.log('buscarListaPadrao DO STORAGE: ', valor )
  return valor;
}


export default {
    armazenarUserLogin,
    buscarUserLogin,
    armazenarListaPadrao,
    deletarListaPadrao,
    buscarListaPadrao
}