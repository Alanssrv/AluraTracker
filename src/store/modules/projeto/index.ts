import http from "@/http";
import IProjeto from "@/interfaces/IProjeto";
import { Estado } from "@/store";
import { OBTER_PROJETOS, CADASTRAR_PROJETO, ALTERAR_PROJETO, REMOVER_PROJETO } from "@/store/tipo-acoes";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, DEFINIR_PROJETOS } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoProjeto {
    projetos: IProjeto[];
}

export const projeto: Module<EstadoProjeto, Estado> = {
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
        }
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
}