<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="descricao">
            </div>
            <div class="column">
                <Temporizador @ao-finalizar-cronometro="finalizarTarefa"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Temporizador from "./Temporizador.vue";

export default defineComponent({
    name: 'Formulario',
    components: {
        Temporizador
    },
    emits: ['aoSalvarTarefa'],
    data () {
        return {
            descricao: ''
        };
    },
    methods: {
        finalizarTarefa(tempoEmSegundos : number) : void {
            this.$emit('aoSalvarTarefa', {
                descricao: this.descricao,
                tempoEmSegundos: tempoEmSegundos
            });
            this.descricao = '';
        }
    }
});
</script>

<style>
.formulario {
    background: var(--bg-primario);
    color: var(--texto-primario);
}
</style>