# Instruções rápidas

Algoritmos implementados:

- `MergeSort`: O(n log n)
- `CombSort`: Ω(n²/2ᵖ), conforme tabela do enunciado

Cada pasta contém:

- implementação em C;
- implementação em Python 3 executável por shebang;
- implementação em Java com `run_java.sh`;
- 6 executáveis C compilados com `-O0`, `-O1`, `-O2`, `-O3`, `-Os` e `-Ofast`.

## Recriar fontes

```bash
node tools/generate_sources.js
```

Esse comando recria o mesmo vetor fixo de 6800 posições em todas as linguagens.

## Compilar

```bash
./build.sh
```

## Coletar métricas

```bash
./benchmark.sh --all MergeSort CombSort
```

Nesta máquina, o `matplotlib` foi instalado em um ambiente virtual local. Para usar esse Python no script e evitar aviso de cache do Matplotlib, rode:

```bash
mkdir -p .mplconfig
env PATH="$PWD/.venv/bin:$PATH" MPLCONFIGDIR="$PWD/.mplconfig" ./benchmark.sh --all MergeSort CombSort
```

Se o processador tiver núcleos híbridos, use um núcleo fixo:

```bash
taskset --cpu-list 1 ./benchmark.sh --all MergeSort CombSort
```
