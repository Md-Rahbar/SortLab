import React, { useMemo, useState, useEffect } from "react";
import { Box, Card, CardContent, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SortingVisualizer from "../components/SortingVisualizer";
import { useLocation } from "react-router-dom";

export default function SortPage() {
  const [query, setQuery] = useState("");
  const [selectedAlgo, setSelectedAlgo] = useState("Bubble Sort");

  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const algo = params.get("algo");
    const supported = [
      "Bubble Sort",
      "Selection Sort",
      "Insertion Sort",
      "Merge Sort",
      "Quick Sort",
      "Heap Sort",
    ];
    if (algo && supported.includes(algo)) setSelectedAlgo(algo);
  }, [location.search]);

  const theoryByAlgo = useMemo(
    () => ({
      "Bubble Sort": {
        paragraph:
          "Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order. With each pass, the largest unsorted element “bubbles” to its correct position at the end of the array. This continues until the array is fully sorted. Its simplicity makes it easy to understand, but it is inefficient for large datasets.",
        complexity: "Best O(n), Average O(n²), Worst O(n²), Space O(1)",
        usage:
          "Educational purposes; rarely used in production due to inefficiency for large arrays.",
        algorithm: `Algorithm BubbleSort(A[1..n]):
  repeat
    swapped = false
    for i = 1 to n-1:
      if A[i] > A[i+1]:
        swap(A[i], A[i+1])
        swapped = true
  until swapped = false`,
      },
      "Selection Sort": {
        paragraph:
          "Selection Sort repeatedly searches for the smallest element from the unsorted part and swaps it with the first unsorted element. Gradually, this builds a sorted section at the start of the array. Easy to implement and requiring minimal memory, it remains O(n²) for all cases, making it suitable mainly for small arrays or learning purposes rather than large-scale applications.",
        complexity: "Best, Average, Worst O(n²), Space O(1)",
        usage: "Good for small arrays and memory-constrained environments; useful for teaching.",
        algorithm: `Algorithm SelectionSort(A[1..n]):
  for i = 1 to n-1:
    minIndex = i
    for j = i+1 to n:
      if A[j] < A[minIndex]:
        minIndex = j
    swap(A[i], A[minIndex])`,
      },
      "Insertion Sort": {
        paragraph:
          "Insertion Sort builds a sorted section by taking one element at a time and placing it in its correct position relative to the sorted part. It adapts efficiently for nearly sorted arrays and requires minimal extra memory. While it performs well on small datasets, its worst-case complexity is O(n²), limiting its usefulness for large-scale sorting tasks.",
        complexity: "Best O(n), Average O(n²), Worst O(n²), Space O(1)",
        usage:
          "Efficient for small or nearly sorted arrays; often used in hybrid algorithms like TimSort.",
        algorithm: `Algorithm InsertionSort(A[1..n]):
  for i = 2 to n:
    key = A[i]
    j = i - 1
    while j > 0 and A[j] > key:
      A[j+1] = A[j]
      j = j - 1
    A[j+1] = key`,
      },
      "Merge Sort": {
        paragraph:
          "Merge Sort is a divide-and-conquer algorithm that splits the array into halves, recursively sorts each half, and merges them back together. It is stable and predictable, providing consistent O(n log n) performance. Though it requires extra memory for merging, it is ideal for large datasets where stability is important or when performing external sorting on disk-based data.",
        complexity: "Best, Average, Worst O(n log n), Space O(n)",
        usage: "Large datasets where stability matters; often used in external sorting.",
        algorithm: `Algorithm MergeSort(A[1..n]):
  if n <= 1: return A
  mid = n / 2
  left = MergeSort(A[1..mid])
  right = MergeSort(A[mid+1..n])
  return Merge(left, right)`,
      },
      "Quick Sort": {
        paragraph:
          "Quick Sort partitions the array around a pivot element, placing smaller elements to the left and larger elements to the right, then recursively sorts the partitions. It is extremely fast on average with O(n log n) complexity, though worst-case O(n²) occurs with poor pivot selection. It is widely used in libraries due to its practical efficiency for in-memory datasets.",
        complexity: "Best, Average O(n log n), Worst O(n²), Space O(log n)",
        usage:
          "Very fast for large in-memory datasets; widely implemented in standard libraries.",
        algorithm: `Algorithm QuickSort(A, low, high):
  if low < high:
    pivotIndex = Partition(A, low, high)
    QuickSort(A, low, pivotIndex - 1)
    QuickSort(A, pivotIndex + 1, high)`,
      },
      "Heap Sort": {
        paragraph:
          "Heap Sort converts the array into a max-heap and repeatedly extracts the maximum element to sort the array. It guarantees O(n log n) performance in all cases and sorts in place without extra memory. While slightly slower than Quick Sort in practice, Heap Sort is predictable and useful when consistent O(n log n) performance is needed, especially in memory-constrained environments.",
        complexity: "Best, Average, Worst O(n log n), Space O(1)",
        usage: "In-place sorting where consistent performance is important.",
        algorithm: `Algorithm HeapSort(A[1..n]):
  BuildMaxHeap(A)
  for i = n downto 2:
    swap(A[1], A[i])
    heapSize = heapSize - 1
    MaxHeapify(A, 1)`,
      },
    }),
    []
  );

  const currentTheory = theoryByAlgo[selectedAlgo];

  return (
    <Box sx={{ width: "100%", py: 4 }}>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box sx={{ flex: "1 1 auto", minWidth: 0 }}>
          <Box sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <TextField
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                size="small"
                sx={{ width: 420, maxWidth: "90%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box
              sx={{
                textAlign: "center",
                mb: 1,
                display: "flex",
                justifyContent: "center",
                gap: 1,
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {selectedAlgo}
              </Typography>
              <Typography
                title="Open cheatsheet"
                component="a"
                href="/src/assets/cheatsheet.png"
                target="_blank"
                rel="noreferrer"
                sx={{
                  fontSize: 12,
                  color: "primary.main",
                  textDecoration: "underline",
                }}
              >
                Cheatsheet
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 3,
                alignItems: "flex-start",
                flexWrap: "nowrap",
              }}
            >
              <Box
                sx={{
                  flex: "0 0 28%",
                  minWidth: 260,
                  position: "sticky",
                  top: 96,
                  alignSelf: "flex-start",
                }}
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    border: "1px solid #ececec",
                    boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
                    overflow: "hidden",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ mb: 2, fontWeight: 700, textAlign: "center" }}
                    >
                      Theory
                    </Typography>
                    {currentTheory ? (
                      <>
                        <Box
                          sx={{
                            p: 2,
                            bgcolor: "#fffef5",
                            border: "1px dashed #f1c40f",
                            borderRadius: 1,
                            mb: 2,
                          }}
                        >
                          <Typography variant="body2">
                            {currentTheory.paragraph}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            p: 2,
                            bgcolor: "#fffef5",
                            border: "1px dashed #f1c40f",
                            borderRadius: 1,
                            mb: 2,
                          }}
                        >
                          <Typography variant="body2">
                            Time & Space Complexity: {currentTheory.complexity}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            p: 2,
                            bgcolor: "#fffef5",
                            border: "1px dashed #f1c40f",
                            borderRadius: 1,
                            mb: 2,
                          }}
                        >
                          <Typography variant="body2">
                            Practical Usage: {currentTheory.usage}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            p: 2,
                            bgcolor: "#fffef5",
                            border: "1px dashed #f1c40f",
                            borderRadius: 1,
                          }}
                        >
                          <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                            {currentTheory.algorithm}
                          </Typography>
                        </Box>
                      </>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Select an algorithm to view theory.
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Box>

              <Box sx={{ flex: "1 1 72%", minWidth: 320 }}>
                <Card
                  sx={{
                    bgcolor: "#fff",
                    border: "1px solid #ececec",
                    borderRadius: 3,
                    height: "100%",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                    overflow: "hidden",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, textAlign: "center" }}
                      >
                        Implementation
                      </Typography>
                    </Box>
                    <SortingVisualizer externalAlgo={selectedAlgo} handDrawn />
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
