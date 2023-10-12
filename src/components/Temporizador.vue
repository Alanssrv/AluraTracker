<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro class="temp" :tempo-em-segundos="tempoEmSegundos"/>
        <Botao
            :icone="'fas fa-play'"
            :texto="'play'"
            :desabilitado="cronometroRodando"
            @clicado="iniciarCronometro"
        />
        <Botao
            :icone="'fas fa-stop'"
            :texto="'stop'"
            :desabilitado="!cronometroRodando"
            @clicado="finalizarCronometro"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cronometro from "./Cronometro.vue";
import Botao from "./Botao.vue";

export default defineComponent({
    name: 'Temporizador',
    data () {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false
        }
    },
    emits: ['aoFinalizarCronometro'],
    components: {
        Cronometro,
        Botao
    },
    methods: {
        iniciarCronometro() {
            this.cronometroRodando = true;
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos++;
            }, 1000);
        },
        finalizarCronometro() {
            this.cronometroRodando = false;
            clearInterval(this.cronometro);
            this.$emit('aoFinalizarCronometro', this.tempoEmSegundos);
            this.tempoEmSegundos = 0;
        }
    },
});
</script>

<style scoped>
.temp {
    background: var(--bg-primario);
    color: var(--texto-primario);

}
</style>