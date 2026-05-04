# Descrição do Trabalho Prático

**Universidade Federal de Mato Grosso do Sul — Faculdade de Computação**  
**Disciplina:** Arquitetura de Computadores II  
**Professor:** Renan Albuquerque Marks

---

## 1 Introdução

Neste documento estão detalhados os procedimentos que devem ser seguidos para o desenvolvimento do Trabalho da disciplina de Arquitetura de Computadores II. Este trabalho será desenvolvido ao longo deste semestre letivo e constituirá como parte da nota final da disciplina.

É fortemente recomendado que os estudantes acessem com frequência este documento para esclarecer possíveis dúvidas, estar ciente do cronograma e estar a par de possíveis atualizações/alterações no trabalho.

---

## 2 Objetivo

O objetivo deste trabalho prático é mostrar na prática como a análise de complexidade de algoritmos está diretamente relacionada com a quantidade de instruções executadas no hardware após a implementação e compilação utilizando diversos níveis de otimização.

Além disso, consegue exemplificar como o tempo de acesso à memória impacta diretamente no tempo de execução, principalmente em situações nas quais a quantidade e qualidade das falhas nos acessos às caches pode degradar o desempenho mesmo quando a implementação é feita em linguagens compiladas.

---

## 3 O que deve ser feito?

Neste trabalho, deve-se fazer a análise de desempenho de algoritmos de ordenação em diferentes implementações usando diferentes linguagens de programação. As linguagens que deverão ser usadas são **Python 3**, **C/C++** e **Java**.

A análise de desempenho deverá ser feita dentro do sistema operacional Linux usando o script `benchmark.sh` presente no mesmo pacote ZIP dessa descrição. A distribuição Linux a ser usada é de livre escolha, desde que possua instalado os softwares `perf`, Python 3 com o pacote `matplotlib`.

Cada grupo deve escolher **dois** algoritmos de **complexidades teóricas diferentes** para realizar a implementação em **três linguagens diferentes**. Isto é: cada algoritmo deve ser implementado três vezes, uma vez em cada linguagem.

> **Exemplo:** O algoritmo Bubble Sort deve ser implementado em C/C++, Python e Java e ter o desempenho analisado nestas três versões.

### Tabela de Algoritmos Disponíveis

| Complexidade (Caso Médio) | Algoritmo |
|---|---|
| O(n log n) | Quick Sort |
| O(n log n) | Merge Sort |
| O(n log n) | Heap Sort |
| Depende | Shell Sort |
| O(n²) | Gnome Sort |
| O(n²) | Insertion Sort |
| O(n²) | Cocktail Sort |
| O(n²) | Selection Sort |
| Ω(n²/2ᵖ) | Comb Sort |
| O(d · n) | Radix Sort |

---

### 3.1 Critérios para Implementação

Os algoritmos devem ser implementados seguindo os critérios abaixo, a fim de garantir uma comparação justa de desempenho entre as linguagens:

1. Os algoritmos devem ordenar um vetor unidimensional de **6800 posições**;
2. O vetor deve ser alocado como **variável global**, isto é, fora de funções;
   - No caso do Java, o vetor deve ser alocado como membro/escopo da classe.
3. O vetor **não** deve ser alocado como variável dinâmica (não usar `malloc()` ou `new()` — somente C/C++);
4. O vetor **não** deve ser alocado com o tipo `std::vector`; usar `std::array` no lugar (somente C++);
5. O vetor deve ter **todas as suas posições preenchidas em tempo de compilação**;
6. O vetor **não** deve ser preenchido durante o tempo de execução (isto é, logo antes da ordenação ser chamada);
7. Todas as implementações devem utilizar a **mesma configuração de vetor** — os valores aleatórios e suas respectivas posições antes da invocação da ordenação devem ser os mesmos para todas as linguagens.

**Exemplo de implementação em C que segue todos os critérios:**

```c
int a[6800] = {1197, 5121, 5741, ... , 5287, 6538, 7432};

void bubbleSort(int* vetor, int tamanho) {
    for (int i = 0; i < tamanho - 1; i++) {
        for (int j = 0; j < tamanho - i - 1; j++) {
            if (vetor[j] > vetor[j + 1]) {
                int temp = vetor[j];
                vetor[j] = vetor[j + 1];
                vetor[j + 1] = temp;
            }
        }
    }
}

int main(){
    bubbleSort(a, MAX);
    return 0;
}
```

---

## 4 Execução do Script e Coleta de Dados

O script `benchmark.sh` executa os arquivos executáveis da implementação **10 vezes** através do software `perf` para a coleta dos índices de desempenho. Ao final, o script usa as informações coletadas para gerar gráficos informativos para análise de desempenho.

**Uso do script:**

```
Uso: ./benchmark.sh [OPÇÕES] [DIRETÓRIOS...]

Opções:
  --cache       Mede eventos de L1 e LLC Cache
  --branches    Mede predições e falhas de Branch
  --all         Mede todos os eventos disponíveis
  --plot-only   Apenas gera gráficos a partir de arquivos .txt existentes na pasta

Exemplos:
  Rodar testes:   ./benchmark.sh --all Bubble
  Apenas plotar:  ./benchmark.sh --plot-only resultados_20260226_125343
```

> **Importante:** Caso sua CPU possua diferença arquitetural entre os núcleos (núcleos de desempenho e de eficiência, como nos modelos recentes da Intel, AMD e ARM), é recomendado fixar a execução em um único núcleo para evitar medições incorretas pelo `perf`. Isso pode ser feito com o utilitário `taskset`:
>
> ```bash
> taskset --cpu-list 1 ./benchmark.sh --all Bubble
> ```

**Estrutura de diretórios esperada (antes da execução):**

```
Trabalho/
├── Bubble/
│   ├── bubblesort_o0
│   ├── bubblesort_o1
│   ├── bubblesort_o2
│   ├── bubblesort_o3
│   ├── bubblesort_os
│   └── bubblesort_of
└── benchmark.sh
```

**Estrutura de diretórios após a execução:**

```
Trabalho/
├── Bubble/
│   ├── bubblesort_o0
│   ├── bubblesort_o1
│   ├── bubblesort_o2
│   ├── bubblesort_o3
│   ├── bubblesort_os
│   ├── bubblesort_of
│   └── resultados_Bubble_20260325_181132/
│       ├── Grafico_Bubble_20260325_181254.pdf
│       └── resultado_Bubble_20260325_181132.txt
└── benchmark.sh
```

---

### 4.1 Implementações em C/C++

Os algoritmos escolhidos devem ser compilados em **6 (seis) executáveis**, cada um utilizando uma das otimizações do compilador `gcc`/`g++`:

| Flag | Descrição |
|---|---|
| `-O0` | Otimizações desligadas |
| `-O1` | Otimizações básicas ligadas |
| `-O2` | Otimizações básicas e avançadas ligadas |
| `-O3` | Otimizações básicas, avançadas e vetoriais ligadas |
| `-Os` | Otimizações para redução de tamanho de código |
| `-Of` | Otimizações para execução rápida (sem redução de tamanho) |

---

### 4.2 Implementações em Python

Utilizar o recurso de **shebang** do shell para produzir um script executável diretamente. A primeira linha deve apontar para o caminho do interpretador:

```python
#!/bin/python3

print('Esse script será executado diretamente pelo Python.')
```

Como a linguagem Python não possui opções de compilação e otimizações, a medição de desempenho será feita diretamente com a execução do script.

---

### 4.3 Implementações em Java

Em Java não é possível utilizar shebang diretamente, pois o código é compilado. É necessário criar um **script bash executável** na mesma pasta do arquivo `.class` que invoque a JVM:

```bash
#!/bin/bash

java Main
```

Como o Java não possui opções de otimização na compilação (as otimizações são feitas em tempo de execução pela JVM), a medição de desempenho será feita diretamente com a execução do script.

---

## 5 Artefato Produzido

Ao final da coleta dos dados e produção dos gráficos, deverá ser produzido um **relatório em LaTeX** usando o template da Sociedade Brasileira de Computação, entregue em formato **PDF**, com **no máximo 10 páginas**.

O relatório deve conter as seguintes seções:

### 1. Introdução
- Algoritmos analisados:
  - Nome;
  - Complexidade;
  - Breve descrição de funcionamento (1 parágrafo de até 5 linhas por algoritmo);
- Sistema Operacional utilizado: nome e versão;
- Hardware utilizado:
  - CPU (modelo e velocidade);
  - Quantidade de memória RAM (modelo e velocidade);
  - Armazenamento (modelo e capacidade);
- Compiladores e interpretadores: versões utilizadas.

### 2. Resultados
- Uma seção para cada algoritmo contendo:
  - Os gráficos produzidos;
  - Análise dos resultados.

### 3. Conclusão
- Fatos encontrados baseados nos dados obtidos.

### 4. Dificuldades Encontradas
- Até 10 linhas descrevendo as dificuldades encontradas no desenvolvimento e as soluções adotadas.

---

## 6 Atribuição de Grupos

Os trabalhos deverão ser feitos por grupos com **no máximo 2 (dois) participantes**. A cada grupo será sorteado dois algoritmos com complexidades diferentes para implementação. A atribuição será postada no AVA da disciplina.

---

## 7 Cronograma

- **Início dos trabalhos:** 02/04/2026
- **Entrega:** 10/05/2026 até as 23h59

Cada grupo deve submeter via AVA:
- Relatório em PDF;
- Código-fonte das implementações;
- Executáveis compilados (caso aplicável).

---

## 8 Avaliação do Trabalho

| Critério | Peso |
|---|---|
| Nota da Metodologia (aderência às seções 3.1 e 4) | [0, 5] |
| Nota do Relatório (conteúdo da seção 5) | [0, 5] |
| **Nota Final** | **Soma das duas notas** |

- Trabalhos que não compilarem e/ou executarem receberão **nota zero**;
- **Não serão aceitas entregas atrasadas**;
- Casos de **plágio** nos códigos serão tratados com rigor;
- **Uso de LLMs para escrita do trabalho não é permitido**.

---

## 9 Agradecimentos

Agradecimentos especiais ao aluno **Pedro Paulo de Oliveira Andrade** do curso de Ciência da Computação, responsável pelo desenvolvimento, teste e validação do script `benchmark.sh` como resultado da Atividade Orientada de Ensino desenvolvida por ele durante os semestres 2025/2 e 2026/1.

---

## 10 Dicas e Sugestões

- Inicie o trabalho o quanto antes. O tempo voa!
- Retire as dúvidas quanto ao entendimento dos elementos que compõem a metodologia. Isso possibilitará detectar possíveis falhas na implementação logo cedo.
- Trabalhem em equipe!
- Para a escrita do trabalho, pode-se usar tanto o **Overleaf** quanto o **LaTeX UFMS** (Overleaf local sem limitações).
- É **permitido** o uso de LLMs generativas para estudo, discussão e interpretação dos resultados, mas **não** para escrita do relatório.
