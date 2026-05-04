# Dados do ambiente de teste

Integrantes:

- Leonardo de Moraes Perin
- Guilherme de Souza Cintra

Sistema operacional:

- Ubuntu 24.04.2 LTS (Noble Numbat)
- Kernel: Linux 6.17.0-22-generic
- Arquitetura: x86_64

Hardware:

- CPU: Intel(R) Core(TM) i3-2100 CPU @ 3.10GHz
- Núcleos: 2 físicos, 2 threads por núcleo
- Frequência: 1.60 GHz mínima, 3.10 GHz máxima
- Cache L1d: 64 KiB (2 instâncias)
- Cache L1i: 64 KiB (2 instâncias)
- Cache L2: 512 KiB (2 instâncias)
- Cache L3: 3 MiB (1 instância)
- Memória RAM: 5.7 GiB
- Armazenamento principal: ST3500413AS, 465.8 GiB

Compiladores e interpretadores:

- GCC: 13.3.0
- Python: 3.12.3
- Matplotlib: 3.6.3 no Python do sistema
- Java/Javac: 21.0.10
- perf: 6.8.12

Observação sobre o benchmark:

- `perf` está instalado e foi usado para executar o benchmark oficial.
- `kernel.perf_event_paranoid` estava bloqueando `perf stat` para usuário comum e foi ajustado temporariamente com permissão administrativa.
- O Python do sistema possui `matplotlib`; usar `MPLCONFIGDIR=.mplconfig` evita aviso de cache em diretório sem permissão.
- Foi executado um smoke test local com todos os executáveis e scripts gerados; todos retornaram código 0 e validaram internamente que o vetor foi ordenado.
- A coleta principal foi gerada em `resultados_20260504_153007/`.
- Algumas métricas de hardware apareceram como `<not counted>` ou `<not supported>` neste computador, especialmente eventos de LLC e alguns eventos de cache/branch nos executáveis C.
