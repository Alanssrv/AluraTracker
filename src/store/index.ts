import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { Store, createStore, useStore as baseUseStore } from "vuex";
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETOS, EXCLUIR_PROJETO, NOTIFICAR } from "./tipo-mutacoes";
import { INotificacao, TipoNotificacao } from "@/interfaces/INotificacao";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, OBTER_PROJETOS, REMOVER_PROJETO } from "./tipo-acoes";
import http from '@/http';

interface Estado {
    projetos: IProjeto[]
    notificacoes: INotificacao[];
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: []
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto;
            state.projetos.push(projeto);
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id === projeto.id);
            state.projetos[index] = projeto;
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id !== id);
        },
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos
        },
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime();
            state.notificacoes.push(novaNotificacao);

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notif => notif.id !== novaNotificacao.id);
            }, 3000);
        },
    },
    actions: {
        [OBTER_PROJETOS]({ commit }) {
            http.get('projetos').then((response) => {
                commit(DEFINIR_PROJETOS, response.data);
            });
        },
        [CADASTRAR_PROJETO]({ commit }, nomeProjeto: string) {
            return http.post( 'projetos',
                { nome: nomeProjeto }
            ).then((response) => {
                commit(ADICIONA_PROJETO, nomeProjeto);
            });
        },
        [ALTERAR_PROJETO]({ commit }, projeto: IProjeto) {
            return http.put(`projetos/${projeto.id}`,
                { nome: projeto.nome }
            ).then((response) => {
                commit(ALTERA_PROJETO, projeto.id);
            });
        },
        [REMOVER_PROJETO]({ commit }, id: string) {
            http.delete(`projetos/${id}`).then((response) => {
                commit(EXCLUIR_PROJETO, id);
            });
        }
    }
});

export function useStore() {
    return baseUseStore(key);
}