# Dados do ambiente de teste

Integrantes:

- Leonardo de Moraes Perin
- Guilherme de Souza Cintra

Sistema operacional:

- Debian GNU/Linux 13 (trixie)
- Kernel: Linux 6.12.63+deb13-amd64
- Arquitetura: x86_64

Hardware:

- CPU: Intel(R) Core(TM) i5-4590 CPU @ 3.30GHz
- Núcleos: 4 físicos, 1 thread por núcleo
- Frequência: 800 MHz mínima, 3.70 GHz máxima
- Cache L1d: 128 KiB (4 instâncias)
- Cache L1i: 128 KiB (4 instâncias)
- Cache L2: 1 MiB (4 instâncias)
- Cache L3: 6 MiB (1 instância)
- Memória RAM: 15 GiB
- Armazenamento principal: ST1000DM003-1SB10C, 931.5 GiB

Compiladores e interpretadores:

- GCC: 14.2.0
- Python: 3.13.5
- Matplotlib: 3.10.9 instalado no `.venv` local do projeto
- Java/Javac: 25.0.1

Observação sobre o benchmark:

- `perf` não está instalado/disponível no PATH desta máquina.
- `matplotlib` não está instalado no Python 3 do sistema, mas foi instalado no `.venv` local.
- `kernel.perf_event_paranoid = 3`, então mesmo com `perf` instalado pode ser necessário ajuste administrativo para coletar eventos de hardware.
- O script oficial `benchmark.sh` não conseguiu executar neste ambiente por falta dessas dependências/permissões.
- Foi executado um smoke test local com todos os executáveis e scripts gerados; todos retornaram código 0 e validaram internamente que o vetor foi ordenado.
