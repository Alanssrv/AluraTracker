<template>
    <section>
        <router-link to="/projetos/novo" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>Novo projeto</span>
        </router-link>
        <table class="table is-fullwidth mt-4">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome do Projeto</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td> {{ projeto.id }}</td>
                    <td> {{ projeto.nome }}</td>
                    <td>
                        <router-link :to="`/projetos/${projeto.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>
                        <button class="button ml-2 is-danger" v-on:click="excluir(projeto.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '../../store';
import useNotificador from '../../hooks/notificador';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { OBTER_PROJETOS, REMOVER_PROJETO } from '@/store/tipo-acoes';

export default defineComponent({
    name: 'Lista',
    methods: {
        excluir(id: string) {
            this.notificar('Projeto removido', `Projeto com identificador ${id} foi removido`, TipoNotificacao.ATENCAO);
            this.store.dispatch(REMOVER_PROJETO, id);
        }
    },
    setup () {
        const store = useStore();
        store.dispatch(OBTER_PROJETOS);
        const { notificar } = useNotificador();
        return {
            notificar,
            store,
            projetos: computed(() => store.state.projeto.projetos)
        }
    }
});

</script>