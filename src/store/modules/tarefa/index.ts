import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from "@/store/tipo-acoes";
import { ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoTarefa {
    tarefas: ITarefa[];
}

export const tarefa: Module<EstadoTarefa, Estado> = {
    state: {
        tarefas: [],
    },
    mutations: {
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa);
        },
        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(taref => taref.id === tarefa.id);
            state.tarefas[index] = tarefa;
        },
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        }
    },
    actions: {
        [OBTER_TAREFAS]({ commit }, filtro) {
            let url = 'tarefas';

            if (filtro) {
                url += `?descricao=${filtro}`
            }

            http.get(url).then((response) => {
                commit(DEFINIR_TAREFAS, response.data);
            });
        },
        [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.post('tarefas', tarefa).then((response) => {
                commit(ADICIONA_TAREFA, tarefa);
            });
        },
        [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.put(`tarefas/${tarefa.id}`, tarefa).then((response) => {
                commit(ALTERA_TAREFA, tarefa);
            });
        }
    },
}