<template>
    <Box>
        <div class="columns tarefa" @click="tarefaClicada">
            <div class="column is-6">
                {{tarefa.descricao || 'Tarefa sem descrição'}}
            </div>
            <div class="column is-4">
                {{ tarefa.projeto?.nome || 'N/D' }}
            </div>
            <div class="column">
                <Cronometro :tempo-em-segundos="tarefa.tempoEmSegundos"/>
            </div>
        </div>
    </Box>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import Cronometro from './Cronometro.vue';
import Box from './Box.vue';
import ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
    name: 'Tarefa',
    components: {
        Cronometro,
        Box
    },
    emits: ['aoTarefaClicada'],
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    methods: {
        tarefaClicada() : void {
            this.$emit('aoTarefaClicada', this.tarefa);
        }
    }
});
</script>

<style scoped>
.tarefa {
    cursor: pointer;
}

</style>