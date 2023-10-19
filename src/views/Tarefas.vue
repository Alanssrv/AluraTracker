<template>
    <Formulario @ao-salvar-tarefa="salvarTarefa" />
    <div class="lista">
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Digite para filtrar" v-model="filtro">
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>

        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @ao-tarefa-clicada="selecionarTarefa" />
        <Box v-if="listaTarefasVazia">
            Você não está muito produtivo hoje :(
        </Box>
        <Modal :mostrar="tarefaSelecionada != null">
            <template v-slot:cabecalho>
                <p class="modal-card-title">Editando uma tarefa</p>
                <button class="delete" @click="fecharModal" aria-label="close"></button>
            </template>
            <template v-slot:corpo>
                <div class="field">
                    <label for="descricaoDaTarefa" class="label">Descrição</label>
                    <input type="text" class="input" v-model="tarefaSelecionada!.descricao" id="descricaoDaTarefa" />
                </div>
            </template>
            <template v-slot:rodape>
                <button class="button is-info" @click="alterarTarefa">Salvar alterações</button>
                <button class="button" @click="fecharModal">Cancelar</button>
            </template>
        </Modal>
    </div>
</template>
  
<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import Formulario from '../components/Formulario.vue';
import Modal from '../components/Modal.vue';
import Tarefa from "../components/Tarefa.vue";
import Box from "../components/Box.vue";
import ITarefa from '../interfaces/ITarefa';
import { useStore } from '@/store';
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-acoes';

export default defineComponent({
    name: 'App',
    components: {
        Formulario,
        Tarefa,
        Box,
        Modal
    },
    data() {
        return {
            tarefaSelecionada: null as ITarefa | null
        }
    },
    computed: {
        listaTarefasVazia(): boolean {
            return this.tarefas.length === 0;
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.store.dispatch(CADASTRAR_TAREFA, tarefa);
        },
        selecionarTarefa(tarefa: ITarefa) {
            this.tarefaSelecionada = tarefa;
        },
        fecharModal() {
            this.tarefaSelecionada = null;
        },
        alterarTarefa() {
            this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada).then(() => {
                this.fecharModal();
            });
        }
    },
    setup() {
        const store = useStore();
        store.dispatch(OBTER_TAREFAS);
        store.dispatch(OBTER_PROJETOS);

        const filtro = ref('');

        // const tarefas = computed(() => store.state.tarefa.tarefas.filter((tarefa) => 
        //     !filtro.value || tarefa.descricao.includes(filtro.value)
        // ));

        watchEffect(() => {
            store.dispatch(OBTER_TAREFAS, filtro.value);
        });

        return {
            store,
            tarefas: computed(() => store.state.tarefa.tarefas),
            filtro
        }
    }
});
</script>
  
<style></style>