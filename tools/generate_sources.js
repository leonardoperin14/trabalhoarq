#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SIZE = 6800;

function lcg(seed) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state % 100000;
  };
}

function values() {
  const next = lcg(0xA2C2026);
  return Array.from({ length: SIZE }, () => next());
}

function wrap(items, indent, perLine) {
  const lines = [];
  for (let i = 0; i < items.length; i += perLine) {
    lines.push(indent + items.slice(i, i + perLine).join(", "));
  }
  return lines.join(",\n");
}

function ensureDir(dir) {
  fs.mkdirSync(path.join(ROOT, dir), { recursive: true });
}

function write(rel, content, mode) {
  const file = path.join(ROOT, rel);
  fs.writeFileSync(file, content);
  if (mode) fs.chmodSync(file, mode);
}

const data = values();
const cArray = wrap(data, "    ", 12);
const pyArray = wrap(data, "    ", 12);
const javaArray = wrap(data, "        ", 12);

function cSource(sortName, body) {
  return `#include <stddef.h>

#define MAX 6800

int a[MAX] = {
${cArray}
};

int aux[MAX];
volatile int sink;

${body}

static int checksum(void) {
    long long total = 0;
    for (int i = 0; i < MAX; i++) {
        total += a[i];
    }
    return (int)(total & 0x7fffffff);
}

static int isSorted(void) {
    for (int i = 1; i < MAX; i++) {
        if (a[i - 1] > a[i]) {
            return 0;
        }
    }
    return 1;
}

int main(void) {
    ${sortName}(a, MAX);
    sink = checksum();
    return isSorted() ? 0 : 1;
}
`;
}

const mergeC = `
static void merge(int vetor[], int inicio, int meio, int fim) {
    int i = inicio;
    int j = meio + 1;
    int k = inicio;

    while (i <= meio && j <= fim) {
        if (vetor[i] <= vetor[j]) {
            aux[k++] = vetor[i++];
        } else {
            aux[k++] = vetor[j++];
        }
    }

    while (i <= meio) {
        aux[k++] = vetor[i++];
    }

    while (j <= fim) {
        aux[k++] = vetor[j++];
    }

    for (i = inicio; i <= fim; i++) {
        vetor[i] = aux[i];
    }
}

static void mergeSortRec(int vetor[], int inicio, int fim) {
    if (inicio >= fim) {
        return;
    }

    int meio = inicio + (fim - inicio) / 2;
    mergeSortRec(vetor, inicio, meio);
    mergeSortRec(vetor, meio + 1, fim);
    merge(vetor, inicio, meio, fim);
}

void mergeSort(int vetor[], int tamanho) {
    mergeSortRec(vetor, 0, tamanho - 1);
}
`.trim();

const combC = `
void combSort(int vetor[], int tamanho) {
    int gap = tamanho;
    int trocou = 1;

    while (gap > 1 || trocou) {
        gap = (gap * 10) / 13;
        if (gap < 1) {
            gap = 1;
        }

        trocou = 0;
        for (int i = 0; i + gap < tamanho; i++) {
            if (vetor[i] > vetor[i + gap]) {
                int temp = vetor[i];
                vetor[i] = vetor[i + gap];
                vetor[i + gap] = temp;
                trocou = 1;
            }
        }
    }
}
`.trim();

function pythonSource(functionName, body) {
  return `#!/bin/python3

MAX = 6800

a = [
${pyArray}
]

${body}

def checksum():
    total = 0
    for valor in a:
        total += valor
    return total & 0x7fffffff

def is_sorted():
    for i in range(1, MAX):
        if a[i - 1] > a[i]:
            return False
    return True

if __name__ == "__main__":
    ${functionName}(a, MAX)
    sink = checksum()
    raise SystemExit(0 if is_sorted() else 1)
`;
}

const mergePy = `
aux = [0] * MAX

def merge(vetor, inicio, meio, fim):
    i = inicio
    j = meio + 1
    k = inicio

    while i <= meio and j <= fim:
        if vetor[i] <= vetor[j]:
            aux[k] = vetor[i]
            i += 1
        else:
            aux[k] = vetor[j]
            j += 1
        k += 1

    while i <= meio:
        aux[k] = vetor[i]
        i += 1
        k += 1

    while j <= fim:
        aux[k] = vetor[j]
        j += 1
        k += 1

    for pos in range(inicio, fim + 1):
        vetor[pos] = aux[pos]

def merge_sort_rec(vetor, inicio, fim):
    if inicio >= fim:
        return

    meio = inicio + (fim - inicio) // 2
    merge_sort_rec(vetor, inicio, meio)
    merge_sort_rec(vetor, meio + 1, fim)
    merge(vetor, inicio, meio, fim)

def merge_sort(vetor, tamanho):
    merge_sort_rec(vetor, 0, tamanho - 1)
`.trim();

const combPy = `
def comb_sort(vetor, tamanho):
    gap = tamanho
    trocou = True

    while gap > 1 or trocou:
        gap = (gap * 10) // 13
        if gap < 1:
            gap = 1

        trocou = False
        for i in range(0, tamanho - gap):
            if vetor[i] > vetor[i + gap]:
                vetor[i], vetor[i + gap] = vetor[i + gap], vetor[i]
                trocou = True
`.trim();

function javaSource(className, call, body, auxDecl = "") {
  return `public class ${className} {
    private static final int MAX = 6800;

    private static int[] a = {
${javaArray}
    };

${auxDecl}${body}

    private static int checksum() {
        long total = 0;
        for (int valor : a) {
            total += valor;
        }
        return (int)(total & 0x7fffffff);
    }

    private static boolean isSorted() {
        for (int i = 1; i < MAX; i++) {
            if (a[i - 1] > a[i]) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        ${call}(a, MAX);
        int sink = checksum();
        System.exit(isSorted() ? 0 : 1);
    }
}
`;
}

const mergeJava = `
    private static void merge(int[] vetor, int inicio, int meio, int fim) {
        int i = inicio;
        int j = meio + 1;
        int k = inicio;

        while (i <= meio && j <= fim) {
            if (vetor[i] <= vetor[j]) {
                aux[k++] = vetor[i++];
            } else {
                aux[k++] = vetor[j++];
            }
        }

        while (i <= meio) {
            aux[k++] = vetor[i++];
        }

        while (j <= fim) {
            aux[k++] = vetor[j++];
        }

        for (i = inicio; i <= fim; i++) {
            vetor[i] = aux[i];
        }
    }

    private static void mergeSortRec(int[] vetor, int inicio, int fim) {
        if (inicio >= fim) {
            return;
        }

        int meio = inicio + (fim - inicio) / 2;
        mergeSortRec(vetor, inicio, meio);
        mergeSortRec(vetor, meio + 1, fim);
        merge(vetor, inicio, meio, fim);
    }

    private static void mergeSort(int[] vetor, int tamanho) {
        mergeSortRec(vetor, 0, tamanho - 1);
    }
`.trimEnd();

const combJava = `
    private static void combSort(int[] vetor, int tamanho) {
        int gap = tamanho;
        boolean trocou = true;

        while (gap > 1 || trocou) {
            gap = (gap * 10) / 13;
            if (gap < 1) {
                gap = 1;
            }

            trocou = false;
            for (int i = 0; i + gap < tamanho; i++) {
                if (vetor[i] > vetor[i + gap]) {
                    int temp = vetor[i];
                    vetor[i] = vetor[i + gap];
                    vetor[i + gap] = temp;
                    trocou = true;
                }
            }
        }
    }
`.trimEnd();

ensureDir("MergeSort");
ensureDir("CombSort");

write("MergeSort/mergesort.c", cSource("mergeSort", mergeC));
write("CombSort/combsort.c", cSource("combSort", combC));
write("MergeSort/mergesort.py", pythonSource("merge_sort", mergePy), 0o755);
write("CombSort/combsort.py", pythonSource("comb_sort", combPy), 0o755);
write("MergeSort/MergeSortMain.java", javaSource("MergeSortMain", "mergeSort", mergeJava, "    private static int[] aux = new int[MAX];\n\n"));
write("CombSort/CombSortMain.java", javaSource("CombSortMain", "combSort", combJava));
write("MergeSort/run_java.sh", "#!/bin/bash\ncd \"$(dirname \"$0\")\"\njava -cp . MergeSortMain\n", 0o755);
write("CombSort/run_java.sh", "#!/bin/bash\ncd \"$(dirname \"$0\")\"\njava -cp . CombSortMain\n", 0o755);

console.log(`Generated sources with ${SIZE} fixed values.`);
