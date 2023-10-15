<template>
    <div class="box">
        <div class="columns">
            <div class="column is-6" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option
                        :value="projeto.id"
                        v-for="projeto in projetos"
                        :key="projeto.id"
                        >
                        {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <Temporizador @ao-finalizar-cronometro="finalizarTarefa"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Temporizador from "./Temporizador.vue";
import { useStore } from "@/store";
import useNotificar from '../hooks/notificador';
import { TipoNotificacao } from '@/interfaces/INotificacao';

export default defineComponent({
    name: 'Formulario',
    components: {
        Temporizador
    },
    emits: ['aoSalvarTarefa'],
    data () {
        return {
            descricao: '',
            idProjeto: ''
        };
    },
    methods: {
        finalizarTarefa(tempoEmSegundos : number) : void {
            if (!this.idProjeto)
                this.notificar('Projeto', 'A atividade foi salva sem projeto definido', TipoNotificacao.ATENCAO);

            if (this.descricao === '')
                this.notificar('Descrição da tarefa', 'A tarefa foi salva sem descrição', TipoNotificacao.ATENCAO);
            
            this.$emit('aoSalvarTarefa', {
                descricao: this.descricao,
                tempoEmSegundos: tempoEmSegundos,
                projeto: this.projetos.find(proj => proj.id == this.idProjeto)
            });
            this.descricao = '';
        }
    },
    setup () {
        const store = useStore();
        const { notificar } = useNotificar();
        return {
            notificar,
            store,
            projetos: computed(() => store.state.projeto.projetos)
        }
    }
});
</script>

<style>
.box {
    background: var(--bg-primario);
    color: var(--texto-primario);
}
</style>