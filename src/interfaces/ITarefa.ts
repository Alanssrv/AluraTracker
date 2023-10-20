import IProjeto from "./IProjeto";

export default interface ITarefa {
    id: string;
    descricao: string;
    tempoEmSegundos: number;
    projeto: IProjeto;
}