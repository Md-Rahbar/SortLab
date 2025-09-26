import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  PlayArrow,
  Stop,
  Pause,
  SkipNext,
  Refresh,
  Speed,
  Storage,
  Timeline,
} from "@mui/icons-material";
import bubbleSort from "../algorithms/bubbleSort";
import selectionSort from "../algorithms/selectionSort";
import insertionSort from "../algorithms/insertionSort";
import mergeSort from "../algorithms/mergeSort";
import quickSort from "../algorithms/quickSort";
import heapSort from "../algorithms/heapSort";

const algorithms = {
  "Bubble Sort": bubbleSort,
  "Selection Sort": selectionSort,
  "Insertion Sort": insertionSort,
  "Merge Sort": mergeSort,
  "Quick Sort": quickSort,
  "Heap Sort": heapSort,
};

export default function SortingVisualizer({ externalAlgo, handDrawn = false }) {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(10);
  const [algo, setAlgo] = useState("Bubble Sort");
  const [speed] = useState(350);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [timeouts, setTimeouts] = useState([]);
  const animationsRef = useRef([]);
  const stepIndexRef = useRef(0);
  const runnerTimeoutRef = useRef(null);

  useEffect(() => {
    resetArray();
  }, [arraySize]);

  // Sync external algorithm selection
  useEffect(() => {
    if (externalAlgo && algorithms[externalAlgo] && externalAlgo !== algo) {
      setAlgo(externalAlgo);
    }
  }, [externalAlgo]);

  function resetArray() {
    if (running) return;
    timeouts.forEach(timeout => clearTimeout(timeout));
    setTimeouts([]);
    
    const arr = Array.from({ length: arraySize }, () =>
      Math.floor(Math.random() * 250) + 20
    );
    setArray(arr);
    
    setTimeout(() => {
      const bars = document.getElementsByClassName("bar");
      for (let bar of bars) {
        bar.style.backgroundColor = "rgba(25, 118, 210, 0.1)";
        bar.style.borderColor = "#1976d2";
        bar.style.transform = "scale(1)";
      }
    }, 0);
  }

  function applyStepEffect(step) {
    if (!step) return;
    const [i, j, type] = step;
    if (type === "compare") {
      const bars = document.getElementsByClassName("bar");
      if (bars[i]) {
        bars[i].style.backgroundColor = "#f44336";
        bars[i].style.borderColor = "#d32f2f";
        bars[i].style.transform = "scale(1.08)";
      }
      if (j !== null && bars[j]) {
        bars[j].style.backgroundColor = "#f44336";
        bars[j].style.borderColor = "#d32f2f";
        bars[j].style.transform = "scale(1.08)";
      }
      const resetTimeout = setTimeout(() => {
        if (bars[i]) {
          bars[i].style.backgroundColor = handDrawn ? "#fff8e1" : "rgba(25, 118, 210, 0.1)";
          bars[i].style.borderColor = handDrawn ? "#e0b400" : "#1976d2";
          bars[i].style.transform = "scale(1)";
        }
        if (j !== null && bars[j]) {
          bars[j].style.backgroundColor = handDrawn ? "#fff8e1" : "rgba(25, 118, 210, 0.1)";
          bars[j].style.borderColor = handDrawn ? "#e0b400" : "#1976d2";
          bars[j].style.transform = "scale(1)";
        }
      }, Math.min(150, speed));
      setTimeouts(prev => [...prev, resetTimeout]);
    } else if (type === "swap") {
      setArray(prev => {
        const next = [...prev];
        [next[i], next[j]] = [next[j], next[i]];
        return next;
      });
    } else if (type === "done") {
      const bars = document.getElementsByClassName("bar");
      if (bars[i]) {
        bars[i].style.backgroundColor = "rgba(76, 175, 80, 0.2)";
        bars[i].style.borderColor = "#4caf50";
      }
    }
  }

  function runLoop() {
    if (paused) return;
    const idx = stepIndexRef.current;
    const steps = animationsRef.current;
    if (idx >= steps.length) {
      setRunning(false);
      setPaused(false);
      runnerTimeoutRef.current = null;
      return;
    }
    applyStepEffect(steps[idx]);
    stepIndexRef.current = idx + 1;
    runnerTimeoutRef.current = setTimeout(runLoop, speed);
  }

  function stopSorting() {
    timeouts.forEach(timeout => clearTimeout(timeout));
    setTimeouts([]);
    setRunning(false);
    setPaused(false);
    animationsRef.current = [];
    stepIndexRef.current = 0;
    
    const bars = document.getElementsByClassName("bar");
    for (let bar of bars) {
      bar.style.backgroundColor = handDrawn ? "#fff8e1" : "rgba(25, 118, 210, 0.1)";
      bar.style.borderColor = handDrawn ? "#e0b400" : "#1976d2";
      bar.style.transform = "scale(1)";
    }
  }

  function startSorting() {
    if (running && !paused) return; // already playing
    if (!running) {
      const animations = algorithms[algo](array);
      animationsRef.current = animations;
      stepIndexRef.current = 0;
      setRunning(true);
      setPaused(false);
    } else {
      // was paused -> resume
      setPaused(false);
    }
    runLoop();
  }

  function pauseSorting() {
    if (!running) return;
    setPaused(true);
    if (runnerTimeoutRef.current) {
      clearTimeout(runnerTimeoutRef.current);
      runnerTimeoutRef.current = null;
    }
  }

  function stepOnce() {
    if (!running) {
      const animations = algorithms[algo](array);
      animationsRef.current = animations;
      stepIndexRef.current = 0;
      setRunning(true);
      setPaused(true);
    }
    const idx = stepIndexRef.current;
    const steps = animationsRef.current;
    if (idx >= steps.length) {
      setRunning(false);
      setPaused(false);
      return;
    }
    applyStepEffect(steps[idx]);
    stepIndexRef.current = idx + 1;
  }

  const handDrawnCardSx = handDrawn ? { border: '2px dashed', borderColor: 'warning.main', bgcolor: 'background.paper' } : {};
  const handDrawnPaperSx = handDrawn ? { border: '2px dashed', borderColor: 'warning.main', bgcolor: 'background.paper' } : {};

  return (
    <Box sx={{ width: '100%' }}>
      {/* Controls */}
      <Card sx={{ mb: 4, bgcolor: 'background.paper', ...handDrawnCardSx }}>
        <CardContent sx={{ p: 3 }}>
          {/* 1) Array Size */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>
                Array Size
              </Typography>
              <TextField
                type="number"
                value={arraySize}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 5 && value <= 20) {
                    setArraySize(value);
                  }
                }}
                onBlur={(e) => {
                  const value = parseInt(e.target.value);
                  if (isNaN(value) || value < 5) {
                    setArraySize(5);
                  } else if (value > 20) {
                    setArraySize(20);
                  }
                }}
                disabled={running && !paused}
                placeholder="5-20"
                size="small"
                variant="outlined"
                sx={{ width: '10ch' }}
                inputProps={{ min: 5, max: 20, step: 1 }}
                error={arraySize < 5 || arraySize > 20}
              />
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                <Typography variant="body2" color="text.secondary">Quick:</Typography>
                {[5, 10, 15, 20].map((size) => (
                  <Button key={size} variant={arraySize === size ? 'contained' : 'outlined'} size="small" onClick={() => !(running && !paused) && setArraySize(size)} disabled={running && !paused} sx={{ minWidth: 36, px: 1 }}>
                    {size}
                  </Button>
                ))}
              </Box>
            </Box>
          </Box>

          {/* 2) Sort name and elements count */}
          <Box sx={{ mb: 3 }}>
            <Box display="flex" gap={1} flexWrap="wrap" alignItems="center">
              <Chip icon={<Timeline />} label={algo} color="primary" variant="filled" sx={{ fontWeight: 600 }} />
              <Chip icon={<Storage />} label={`${arraySize} elements`} color="secondary" variant="filled" sx={{ fontWeight: 600 }} />
              {!externalAlgo && (
                <FormControl sx={{ minWidth: 220 }} size="small">
                  <InputLabel>Sorting Algorithm</InputLabel>
                  <Select value={algo} onChange={(e) => setAlgo(e.target.value)} disabled={running && !paused} label="Sorting Algorithm">
                    {Object.keys(algorithms).map((name) => (
                      <MenuItem key={name} value={name}>{name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Box>
          </Box>

          

          {/* 4) Controls: Play / Step / Stop + New Array */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Tooltip title={running && !paused ? 'Pause' : 'Play'}>
              <Button variant="contained" color={running && !paused ? 'warning' : 'success'} startIcon={running && !paused ? <Pause /> : <PlayArrow />} onClick={running && !paused ? pauseSorting : startSorting}>
                {running && !paused ? 'Pause' : 'Play'}
              </Button>
            </Tooltip>
            <Tooltip title="Step one">
              <Button variant="outlined" color="primary" startIcon={<SkipNext />} onClick={stepOnce} disabled={running && !paused}>Step</Button>
            </Tooltip>
            <Tooltip title="Stop">
              <Button variant="outlined" color="error" startIcon={<Stop />} onClick={stopSorting}>Stop</Button>
            </Tooltip>
            <Tooltip title="New Array">
              <Button variant="contained" color="primary" startIcon={<Refresh />} onClick={resetArray} disabled={running && !paused}>New Array</Button>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>

      {/* Array Visualization */}
      <Paper
        elevation={8}
        sx={{
          p: 4,
          bgcolor: '#ffffff',
          borderRadius: 2,
          border: handDrawn ? '2px dashed' : undefined,
          borderColor: handDrawn ? 'warning.main' : undefined,
          minHeight: 200,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Array Label */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          arr
        </Typography>
        
        {/* Array Cells */}
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {array.map((val, idx) => (
            <Box
              key={idx}
              className="bar"
              sx={{
                width: 70,
                height: 70,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: handDrawn ? 'transparent' : (running ? 'rgba(76, 175, 80, 0.1)' : 'rgba(25, 118, 210, 0.1)'),
                border: handDrawn ? '2px dashed' : '2px solid',
                borderColor: handDrawn ? 'warning.main' : (running ? 'success.main' : 'primary.main'),
                borderRadius: 2,
                position: 'relative',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: handDrawn ? '#8d6e63' : (running ? 'success.dark' : 'primary.dark'),
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                }}
              >
                {val}
              </Typography>
              
              {/* Index Label */}
              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  top: -20,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: 'text.secondary',
                  fontWeight: 'bold',
                  fontSize: '0.7rem',
                }}
              >
                [{idx}]
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Status Info */}
      <Box mt={3} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          {running ? `${paused ? 'Paused' : 'Sorting'} with ${algo}…` : 'Ready to sort'}
        </Typography>
      </Box>
    </Box>
  );
}
