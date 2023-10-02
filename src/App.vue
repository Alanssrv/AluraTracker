<template>
  <main class="columns is-gapless is-multiple" :class="{'modo-escuro': modoEscuroAtivo}">
    <div class="column is-one-quarter">
      <BarraLateral @ao-tema-alterado="trocarTema"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <Formulario @ao-salvar-tarefa="salvarTarefa"/>
      <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
        <Box v-if="listaTarefasVazia">
          Você não está muito produtivo hoje :(
        </Box>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from "./components/BarraLateral.vue";
import Formulario from "./components/Formulario.vue";
import Tarefa from "./components/Tarefa.vue";
import Box from "./components/Box.vue";
import ITarefa from './interfaces/ITarefa';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    Formulario,
    Tarefa,
    Box
  },
  data () {
    return {
      tarefas: [] as ITarefa[],
      modoEscuroAtivo: false
    }
  },
  computed: {
    listaTarefasVazia() : boolean {
      return this.tarefas.length === 0;
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa);
    },
    trocarTema(modoEscuroAtivo : boolean) {
      this.modoEscuroAtivo = modoEscuroAtivo;
    }
  }
});
</script>

<style>
.lista {
  padding: 1.5rem;
}

main {
  --bg-primario: white;
  --texto-primario: black;
}

main.modo-escuro {
  --bg-primario: #2d2d2d;
  --texto-primario: #ddd;
}

.conteudo {
  background-color: var(--bg-primario);
}
</style>
