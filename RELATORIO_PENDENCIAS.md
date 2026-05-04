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
- Foi instalado `matplotlib` em um ambiente virtual local `.venv`, pois o Python do sistema não possui essa biblioteca.
- Foi executado um teste local com todos os executáveis e scripts gerados; todos retornaram código 0 e validaram internamente que o vetor ficou ordenado.

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

- Sistema operacional: Debian GNU/Linux 13 (trixie)
- Kernel: Linux 6.12.63+deb13-amd64
- Arquitetura: x86_64
- CPU: Intel Core i5-4590 CPU @ 3.30GHz
- Núcleos: 4 físicos
- RAM: 15 GiB
- Armazenamento: ST1000DM003-1SB10C, 931.5 GiB
- GCC: 14.2.0
- Python: 3.13.5
- Java/Javac: 25.0.1
- Matplotlib local: 3.10.9 no `.venv`

## O que falta fazer

- Rodar o benchmark oficial com `perf`.
- Gerar os arquivos `.txt` de resultados e os gráficos PDF produzidos pelo `benchmark.sh`.
- Inserir os gráficos no relatório LaTeX usando o template SBC fornecido pelo professor.
- Escrever a análise dos resultados para cada algoritmo.
- Escrever a conclusão com base nos dados medidos.
- Revisar o relatório final para ficar dentro do limite de 10 páginas.

## Bloqueio atual

O benchmark oficial ainda não foi executado nesta máquina porque:

- `perf` não está instalado/disponível no PATH.
- O script `benchmark.sh` exige `sudo perf`.
- O kernel está com `perf_event_paranoid = 3`, o que normalmente restringe eventos de hardware para usuário comum.

O `matplotlib` já foi resolvido localmente com `.venv`, mas o `perf` depende de pacote/permissão do sistema operacional e não pode ser instalado via `.venv`.

## Comando esperado quando `perf` estiver disponível

```bash
mkdir -p .mplconfig
env PATH="$PWD/.venv/bin:$PATH" MPLCONFIGDIR="$PWD/.mplconfig" ./benchmark.sh --all MergeSort CombSort
```

