import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Container, Typography, Box, AppBar, Toolbar, Button, Menu, MenuItem, ListSubheader, Divider } from "@mui/material";
// import SortIcon from '@mui/icons-material/Sort';
import TimelineIcon from '@mui/icons-material/Timeline';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import BoltIcon from '@mui/icons-material/Bolt';
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#fffef7',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
    },
  },
  typography: {
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: '#1a1a1a',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      color: '#1a1a1a',
    },
    body1: {
      fontSize: '1.1rem',
      color: '#666666',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#1976d2',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: '1px solid #e0e0e0',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '1px solid #e0e0e0',
        },
      },
    },
  },
});

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const dynamicTheme = React.useMemo(() => createTheme({
    ...theme,
    palette: {
      ...theme.palette,
      mode: 'light',
      background: {
        default: '#f9f9fb',
        paper: '#ffffff',
      },
      text: {
        primary: '#1a1a1a',
        secondary: '#666666',
      },
    },
  }), []);

  return (
    <ThemeProvider theme={dynamicTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(to right, #f9f9f9, #eef2ff)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TopNav />
        <Box sx={{ height: 72 }} />
        <Container maxWidth="xl" sx={{ flex: 1, py: isHome ? 6 : 3 }}>
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

 

function TopNav() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const hoverTimeoutRef = React.useRef(null);
  
  const handleMouseEnter = (event) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setAnchorEl(event.currentTarget);
  };
  
  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setAnchorEl(null);
    }, 200);
  };
  
  const handleMenuMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };
  
  const handleClose = () => setAnchorEl(null);
  const goAlgo = (name) => { handleClose(); navigate(`/sort?algo=${encodeURIComponent(name)}`); };

  return (
    <AppBar position="fixed" color="transparent" elevation={0} sx={{
      backdropFilter: 'blur(10px)',
      backgroundColor: 'transparent',
      zIndex: 1000,
      px: 2,
      pt: 2,
      boxShadow: 'none'
    }}>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          px: 2.5,
          py: 0.75,
          borderRadius: 9999,
          border: '1px solid',
          borderColor: 'rgba(0,0,0,0.15)',
          backgroundColor: 'rgba(255,255,255,0.8)'
        }}>
          <Button onClick={() => navigate('/')} sx={{ color: 'text.primary', textTransform: 'none', '&:hover': { textDecoration: 'underline' } }}>Home</Button>
          <Button 
            sx={{ color: 'text.primary', textTransform: 'none', '&:hover': { textDecoration: 'underline' } }} 
            onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
            // startIcon={<SortIcon />} 
            aria-controls={open ? 'sort-menu' : undefined} 
            aria-haspopup="true" 
            aria-expanded={open ? 'true' : undefined}
          >
            Sort
          </Button>
          <Menu 
            id="sort-menu" 
            anchorEl={anchorEl} 
            open={open} 
            onClose={handleClose}
            keepMounted
            MenuListProps={{ 
              onMouseEnter: handleMenuMouseEnter,
              onMouseLeave: handleMouseLeave,
              sx: { display: 'flex', flexDirection: 'row', gap: 3, p: 2 }
            }}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            disableAutoFocusItem
          >
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Box sx={{ minWidth: 180 }}>
                <ListSubheader disableSticky sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase' }}>
                  <TimelineIcon fontSize="small" /> Logarithmic
                </ListSubheader>
                <MenuItem onClick={() => goAlgo('Merge Sort')}>Merge Sort</MenuItem>
                <MenuItem onClick={() => goAlgo('Quick Sort')}>Quick Sort</MenuItem>
                <MenuItem onClick={() => goAlgo('Heap Sort')}>Heap Sort</MenuItem>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box sx={{ minWidth: 180 }}>
                <ListSubheader disableSticky sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase' }}>
                  <QueryStatsIcon fontSize="small" /> Quadratic
                </ListSubheader>
                <MenuItem onClick={() => goAlgo('Bubble Sort')}>Bubble Sort</MenuItem>
                <MenuItem onClick={() => goAlgo('Selection Sort')}>Selection Sort</MenuItem>
                <MenuItem onClick={() => goAlgo('Insertion Sort')}>Insertion Sort</MenuItem>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box sx={{ minWidth: 180 }}>
                <ListSubheader disableSticky sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontSize: 12, textTransform: 'uppercase' }}>
                  <BoltIcon fontSize="small" /> Linear
                </ListSubheader>
                <MenuItem disabled>Counting Sort</MenuItem>
                <MenuItem disabled>Radix Sort</MenuItem>
                <MenuItem disabled>Bucket Sort</MenuItem>
              </Box>
            </Box>
          </Menu>
          
        </Box>
      </Toolbar>
    </AppBar>
  );
}
