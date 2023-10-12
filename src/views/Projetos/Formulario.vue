<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto"/>
            </div>
            <div class="field">
                <button class="button" type="submit">Salvar</button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '../../store';
import { ALTERA_PROJETO, ADICIONA_PROJETO, NOTIFICAR } from '@/store/tipo-mutacoes';
import useNotificar from '../../hooks/notificador';
import { TipoNotificacao } from '@/interfaces/INotificacao';

export default defineComponent({
    name: 'Formulario',
    props:{
        id: {
            type: String
        }
    },
    // mixins: [ notificacaoMixin ],
    mounted () {
        if (this.id) {
            const projeto = this.store.state.projetos.find(proj => proj.id == this.id);
            this.nomeDoProjeto = projeto?.nome || '';
        }
    },
    data () {
        return {
            nomeDoProjeto: '',
        };
    },
    methods: {
        salvar() {
            var titulo;
            var texto;

            if (this.id) {
                this.store.commit(ALTERA_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                });
                titulo = 'Projeto editado';
                texto = 'Projeto editado com sucesso';
            } else {
                this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto);
                titulo = 'Novo projeto';
                texto = 'Novo projeto criado com sucesso';
            }
            this.notificar(titulo, texto, TipoNotificacao.SUCESSO);
            this.nomeDoProjeto = '';
            this.$router.push('/projetos');
        }
    },
    setup () {
        const store = useStore();
        const { notificar } = useNotificar();
        return {
            notificar,
            store: store
        }
    }
});

</script>