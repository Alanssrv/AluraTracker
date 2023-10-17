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
import { defineComponent, ref } from 'vue';
import { useStore } from '../../store';
import useNotificar from '../../hooks/notificador';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo-acoes';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'Formulario',
    props:{
        id: {
            type: String
        }
    },
    // mixins: [ notificacaoMixin ],
    setup (props) {
        const router = useRouter();
        
        const store = useStore();
        const { notificar } = useNotificar();

        const nomeDoProjeto = ref('');

        if (props.id) {
            const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id);
            nomeDoProjeto.value = projeto?.nome || '';
        }

        const lidarComSucesso = (tituloNotificacao: string, textoNotificacao: string) => {
            notificar(tituloNotificacao, textoNotificacao, TipoNotificacao.SUCESSO);
            nomeDoProjeto.value = '';
            router.push('/projetos');
        };

        const salvar = () => {
            if (props.id) {
                store.dispatch(ALTERAR_PROJETO, {
                    id: props.id,
                    nome: nomeDoProjeto.value
                }).then(() => {
                    lidarComSucesso('Projeto editado', 'Projeto editado com sucesso')
                });
            } else {
                store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value).then(() => {
                    lidarComSucesso('Novo projeto', 'Novo projeto criado com sucesso');
                });
            }
        };

        return {
            nomeDoProjeto,
            salvar
        };
    }
});

</script>