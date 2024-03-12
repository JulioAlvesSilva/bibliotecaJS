import { ILivros } from "Types/itens";

export  function Embaralhar(array: ILivros) {
    let indexAtual = array.length, randomIndex;
    while (indexAtual !== 0) {
        randomIndex = Math.floor(Math.random() * indexAtual);
        indexAtual--;
        [array[indexAtual], array[randomIndex]] = [
            array[randomIndex], array[indexAtual]];
    }

    return array;
}
