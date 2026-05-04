# Analise de aderencia dos resultados

Este arquivo resume se a implementacao e os resultados gerados atendem ao que foi pedido no enunciado do trabalho.

## Itens atendidos

- Foram implementados dois algoritmos de ordenacao: Merge Sort e Comb Sort.
- Os algoritmos possuem complexidades teoricas diferentes:
  - Merge Sort: O(n log n).
  - Comb Sort: conforme tabela do enunciado, Ω(n²/2ᵖ).
- Cada algoritmo foi implementado em tres linguagens: C, Python 3 e Java.
- Todas as implementacoes usam vetor de 6800 posicoes.
- O vetor fica em escopo global no C e no Python, e em escopo da classe no Java.
- O vetor ja vem preenchido no codigo-fonte, sem geracao em tempo de execucao.
- As implementacoes usam a mesma configuracao de vetor entre as linguagens.
- Cada algoritmo em C possui seis executaveis compilados:
  - -O0
  - -O1
  - -O2
  - -O3
  - -Os
  - -Ofast
- As versoes Python sao executaveis diretamente por shebang.
- As versoes Java sao executadas por `run_java.sh`.
- O script `benchmark.sh --all MergeSort CombSort` foi executado com `perf`.
- Foram gerados arquivos `.txt` e graficos PDF para os dois algoritmos.

## Resultados gerados

A coleta principal ficou na pasta:

```bash
resultados_20260504_153007/
```

Arquivos gerados:

- `resultado_MergeSort_20260504_153007.txt`
- `resultado_CombSort_20260504_153007.txt`
- `Grafico_Mergesort_20260504_153101.pdf`
- `Grafico_Combsort_20260504_153106.pdf`

Tambem existe uma coleta anterior em:

```bash
resultados_20260504_152631/
```

## Correspondencia com o pedido do professor

O projeto atende a parte metodologica principal do enunciado:

- dois algoritmos;
- complexidades diferentes;
- tres linguagens;
- vetor fixo de 6800 posicoes;
- implementacoes comparaveis;
- binarios C com diferentes niveis de otimizacao;
- execucao no Linux usando `perf`;
- producao de resultados e graficos.

## Pontos de atencao

Apesar de o benchmark ter executado e gerado os arquivos esperados, algumas metricas de hardware vieram incompletas neste computador:

- `LLC-load-misses` apareceu como `<not supported>`.
- Para varios executaveis C, eventos como `L1-dcache-load-misses`, `LLC-loads`, `branches` e `branch-misses` apareceram como `<not counted>`.

Isso significa que os resultados de tempo, ciclos e instrucoes podem ser usados normalmente, mas a analise de cache e desvios deve mencionar essa limitacao do ambiente de medicao.

Essa observacao deve entrar na secao "Dificuldades Encontradas" do relatorio final.

## Pendencias para entrega final

Ainda falta produzir o relatorio final em LaTeX usando o template da SBC, com no maximo 10 paginas, contendo:

- Introducao;
- Resultados, com uma secao para cada algoritmo;
- Analise dos graficos;
- Conclusao baseada nos dados obtidos;
- Dificuldades encontradas.

Resumo: a implementacao e a coleta principal estao alinhadas com o que foi pedido. O principal cuidado restante e escrever o relatorio explicando as limitacoes de algumas metricas do `perf`.
