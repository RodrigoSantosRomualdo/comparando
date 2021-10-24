import AsyncStorageUsuario from '@react-native-async-storage/async-storage';


const armazenarUserLogin = (chave, valor) => {
  AsyncStorageUsuario.setItem(chave, valor)
    console.log('value: ', valor)
}

const armazenarKM = (chave, valor) => {
  AsyncStorageUsuario.setItem(chave, valor)
    console.log('value KM: ', valor)
}
const buscarKM = async (chave) => {
  const valor = await AsyncStorageUsuario.getItem(chave)
  console.log('DENTRO DO STORAGE KM: ', valor )
  return valor;
}

const deletarKM = async (chave) => {
  await AsyncStorageUsuario.removeItem(chave)
    console.log('DeletarListaPadrao value: ', chave)
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

const removeUserLogin = async (chave) => {
  await AsyncStorageUsuario.removeItem(chave)
  console.log('DELETE STORAGE MENU: ')
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
    buscarListaPadrao,
    removeUserLogin,
    armazenarKM,
    buscarKM,
    deletarKM
}