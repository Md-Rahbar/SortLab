import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, Container, Grid, Typography, Stack, List, ListItem, ListItemText } from "@mui/material";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%', py: 6 }}>
      <Container maxWidth="lg">
        <Box textAlign="center" sx={{ mb: 6 }}>
          <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: { xs: '2.2rem', md: '3rem' }, fontWeight: 800 }}>
            SortLab – a lab to experiment with sorting
          </Typography>
          <Typography component="div" gutterBottom sx={{
            fontSize: { xs: '2rem', md: '2.6rem' },
            fontWeight: 900,
            background: 'linear-gradient(90deg,#7c4dff 0%, #00b0ff 50%, #00e676 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            mb: 2,
          }}>
            Sorting Visuals
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, mx: 'auto', mt: 2 }}>
            A small but intact website for all types of sorting algorithms
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 4, px: 4, borderRadius: 3 }}
            onClick={() => navigate('/sort')}
          >
            Explore All →
          </Button>
          {/* Animated bars illustration */}
          <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center', gap: 0.8 }}>
            {[10, 18, 14, 22, 16, 26, 12].map((h, i) => (
              <Box key={i} sx={{
                width: 10,
                height: h * 3,
                backgroundColor: 'primary.main',
                opacity: 0.2,
                borderRadius: 1,
                animation: 'bounce 1.6s ease-in-out infinite',
                animationDelay: `${i * 0.12}s`,
                '@keyframes bounce': {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-8px)' },
                },
              }} />
            ))}
          </Box>
        </Box>

        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', transition: 'all .2s ease', border: '1px solid', borderColor: 'divider', borderRadius: 16, overflow: 'hidden', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6, borderColor: 'primary.main' } }}>
              <CardContent sx={{ py: 4, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Logarithmic Algorithms (O(log n))</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Logarithmic algorithms are highly efficient because with each step, they reduce the problem size by a factor (usually half). A common example is Binary Search, where instead of checking all elements, the algorithm repeatedly divides the search space until the target is found. This makes logarithmic algorithms extremely fast, especially for large inputs.
                </Typography>
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Button variant="outlined" size="small" onClick={() => navigate('/sort')}>Explore Logarithmic</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', transition: 'all .2s ease', border: '1px solid', borderColor: 'divider', borderRadius: 16, overflow: 'hidden', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6, borderColor: 'primary.main' } }}>
              <CardContent sx={{ py: 4, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Linear Algorithms (O(n))</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Linear algorithms take time proportional to the number of elements, meaning they process each item once. Sorting examples include Counting Sort, Radix Sort, and Bucket Sort, which avoid comparisons and instead use direct element counts or digit grouping. These algorithms are very fast when conditions are right, often outperforming comparison-based sorts.
                </Typography>
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Button variant="outlined" size="small" onClick={() => navigate('/sort')}>Explore Linear</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', transition: 'all .2s ease', border: '1px solid', borderColor: 'divider', borderRadius: 16, overflow: 'hidden', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6, borderColor: 'primary.main' } }}>
              <CardContent sx={{ py: 4, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Quadratic Algorithms (O(n²))</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Quadratic algorithms are usually simpler but less efficient, as they compare or process pairs of elements, leading to performance that grows rapidly with input size. Examples include Bubble Sort, Insertion Sort, and Selection Sort, which are easy to understand and implement, making them great for learning, but impractical for very large datasets.
                </Typography>
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Button variant="outlined" size="small" onClick={() => navigate('/sort')}>Explore Quadratic</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}


