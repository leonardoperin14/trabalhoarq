#!/bin/bash
set -euo pipefail

gcc -std=c11 -Wall -Wextra -O0 MergeSort/mergesort.c -o MergeSort/mergesort_o0
gcc -std=c11 -Wall -Wextra -O1 MergeSort/mergesort.c -o MergeSort/mergesort_o1
gcc -std=c11 -Wall -Wextra -O2 MergeSort/mergesort.c -o MergeSort/mergesort_o2
gcc -std=c11 -Wall -Wextra -O3 MergeSort/mergesort.c -o MergeSort/mergesort_o3
gcc -std=c11 -Wall -Wextra -Os MergeSort/mergesort.c -o MergeSort/mergesort_os
gcc -std=c11 -Wall -Wextra -Ofast MergeSort/mergesort.c -o MergeSort/mergesort_ofast

gcc -std=c11 -Wall -Wextra -O0 CombSort/combsort.c -o CombSort/combsort_o0
gcc -std=c11 -Wall -Wextra -O1 CombSort/combsort.c -o CombSort/combsort_o1
gcc -std=c11 -Wall -Wextra -O2 CombSort/combsort.c -o CombSort/combsort_o2
gcc -std=c11 -Wall -Wextra -O3 CombSort/combsort.c -o CombSort/combsort_o3
gcc -std=c11 -Wall -Wextra -Os CombSort/combsort.c -o CombSort/combsort_os
gcc -std=c11 -Wall -Wextra -Ofast CombSort/combsort.c -o CombSort/combsort_ofast

javac MergeSort/MergeSortMain.java
javac CombSort/CombSortMain.java
