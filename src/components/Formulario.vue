<template>
    <div class="box formulario">
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
import { NOTIFICAR } from '@/store/tipo-mutacoes';
import { INotificacao, TipoNotificacao } from '@/interfaces/INotificacao';

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
            if (!this.idProjeto) {
                this.store.commit(NOTIFICAR, {
                    titulo: 'Projeto inváliado',
                    texto: 'Deve ser selecionada projeto para criar uma nova tarefa',
                    tipo: TipoNotificacao.FALHA
                } as INotificacao);
                return;
            }
            if (this.descricao === '') {
                this.store.commit(NOTIFICAR, {
                    titulo: 'Descrição da tarefa',
                    texto: 'A tarefa foi salva sem descrição',
                    tipo: TipoNotificacao.ATENCAO
                } as INotificacao);
            }
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
        return {
            store,
            projetos: computed(() => store.state.projetos)
        }
    }
});
</script>

<style scoped>
.formulario {
    background: var(--bg-primario);
    color: var(--texto-primario);
}
</style>