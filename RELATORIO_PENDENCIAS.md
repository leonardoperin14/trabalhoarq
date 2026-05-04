# Relatório do estado atual

## O que foi feito

- Implementados os algoritmos Merge Sort e Comb Sort.
- Cada algoritmo foi implementado em C, Python 3 e Java.
- Todas as versões usam o mesmo vetor fixo de 6800 posições, gerado em tempo de desenvolvimento e declarado diretamente no código.
- O vetor principal fica em escopo global no C e Python, e em escopo da classe no Java.
- Foram gerados executáveis C para `-O0`, `-O1`, `-O2`, `-O3`, `-Os` e `-Ofast`.
- Foram criados scripts `run_java.sh` para execução das versões Java pelo `benchmark.sh`.
- Foi criado o script `build.sh` para recompilar os executáveis C e os arquivos `.class` Java.
- Foi criado o script `tools/generate_sources.js` para regenerar os códigos com o mesmo vetor em todas as linguagens.
- O projeto foi clonado novamente no computador atual.
- Os executáveis C e arquivos `.class` Java foram recompilados com sucesso neste computador usando `./build.sh`.
- Foi executado um teste local com todos os executáveis e scripts gerados; todos retornaram código 0 e validaram internamente que o vetor ficou ordenado.
- Foi verificado que `perf` está instalado neste computador.
- Foi liberado temporariamente o uso do `perf` com permissão administrativa.
- Foi executado o benchmark oficial com `./benchmark.sh --all MergeSort CombSort`.
- Foram gerados arquivos `.txt` e gráficos PDF com os resultados.

## Arquivos principais

- `MergeSort/mergesort.c`
- `MergeSort/mergesort.py`
- `MergeSort/MergeSortMain.java`
- `CombSort/combsort.c`
- `CombSort/combsort.py`
- `CombSort/CombSortMain.java`
- `build.sh`
- `benchmark.sh`
- `INSTRUCOES.md`
- `DADOS_AMBIENTE.md`

## Dados coletados da máquina

- Sistema operacional: Ubuntu 24.04.2 LTS (Noble Numbat)
- Kernel: Linux 6.17.0-22-generic
- Arquitetura: x86_64
- CPU: Intel Core i3-2100 CPU @ 3.10GHz
- Núcleos: 2 físicos, 4 threads
- RAM: 5.7 GiB
- Armazenamento: ST3500413AS, 465.8 GiB
- GCC: 13.3.0
- Python: 3.12.3
- Java/Javac: 21.0.10
- Matplotlib: 3.6.3 no Python do sistema
- perf: 6.8.12

## Resultados gerados

- Coleta principal: `resultados_20260504_153007/`
  - `resultado_MergeSort_20260504_153007.txt`
  - `resultado_CombSort_20260504_153007.txt`
  - `Grafico_Mergesort_20260504_153101.pdf`
  - `Grafico_Combsort_20260504_153106.pdf`
- Coleta anterior: `resultados_20260504_152631/`

## O que falta fazer

- Inserir os gráficos no relatório LaTeX usando o template SBC fornecido pelo professor.
- Escrever a análise dos resultados para cada algoritmo.
- Escrever a conclusão com base nos dados medidos.
- Revisar o relatório final para ficar dentro do limite de 10 páginas.

## Observações sobre a coleta

O benchmark oficial foi executado nesta máquina. Para isso, foi necessário liberar temporariamente o `perf`, pois:

- O script `benchmark.sh` exige `sudo perf`.
- O kernel está com `perf_event_paranoid = 4`, bloqueando `perf stat` para usuário comum.

Comando usado para liberar temporariamente a coleta:

```bash
sudo sysctl kernel.perf_event_paranoid=1
```

Algumas métricas de hardware vieram incompletas neste computador:

- `LLC-load-misses` apareceu como `<not supported>`.
- Para vários executáveis C, eventos como `L1-dcache-load-misses`, `LLC-loads`, `branches` e `branch-misses` apareceram como `<not counted>`.

Essa limitação deve ser mencionada na seção de dificuldades encontradas do relatório final.

## Comando de benchmark utilizado

```bash
mkdir -p .mplconfig
env MPLCONFIGDIR="$PWD/.mplconfig" ./benchmark.sh --all MergeSort CombSort
```
