import { InjectionKey } from "vue";
import { Store, createStore, useStore as baseUseStore } from "vuex";
import { NOTIFICAR } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";

import { EstadoProjeto, projeto } from './modules/projeto';
import { EstadoTarefa, tarefa } from "./modules/tarefa";
import ITarefa from "@/interfaces/ITarefa";

export interface Estado {
    tarefa: EstadoTarefa
    notificacoes: INotificacao[];
    projeto: EstadoProjeto;
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        tarefa: { tarefas: [] },
        notificacoes: [],
        projeto: { projetos: [] }
    },
    mutations: {
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notif => notif.id !== novaNotificacao.id);
            }, 3000);
        },
    },
    modules: {
        projeto,
        tarefa
    }
});

export function useStore() {
    return baseUseStore(key);
}