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
import useNotificar from '../../hooks/notificador';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo-acoes';

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
            if (this.id) {
                this.store.dispatch(ALTERAR_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                }).then(() => {
                    this.lidarComSucesso('Projeto editado', 'Projeto editado com sucesso')
                });
            } else {
                this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto).then(() => {
                    this.lidarComSucesso('Novo projeto', 'Novo projeto criado com sucesso');
                });
            }
        },
        lidarComSucesso(tituloNotificacao: string, textoNotificacao: string) {
            this.notificar(tituloNotificacao, textoNotificacao, TipoNotificacao.SUCESSO);
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