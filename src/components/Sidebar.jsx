import React from "react";
import { Box, Collapse, Divider, IconButton, List, ListItemButton, ListSubheader, Typography, ListItemIcon, ListItemText, Tooltip, Switch } from "@mui/material";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import TimelineIcon from '@mui/icons-material/Timeline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function Sidebar({ onSelect, selected, width = 240, onMouseDownHandle, collapsed = false, onToggleCollapsed, mode = 'light', onToggleMode }) {
  const [openLog, setOpenLog] = React.useState(true);
  const [openQuad, setOpenQuad] = React.useState(true);
  const [openLin, setOpenLin] = React.useState(true);
  return (
    <Box sx={{ width: collapsed ? 64 : width, p: 2, borderRight: '1px solid #eee', bgcolor: 'background.paper', position: 'relative', height: '100%', transition: 'width 0.2s ease' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', mb: 2 }}>
        {!collapsed && (
          <Typography variant="h6" sx={{ fontWeight: 700 }}>SortLab</Typography>
        )}
        <Tooltip title={collapsed ? 'Expand' : 'Collapse'}>
          <IconButton size="small" onClick={onToggleCollapsed}>
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      {!collapsed && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body2">Dark Mode</Typography>
          <Switch size="small" checked={mode === 'dark'} onChange={(e) => onToggleMode && onToggleMode(e.target.checked ? 'dark' : 'light')} />
        </Box>
      )}
      <List dense>
        {!collapsed && (
          <ListItemButton onClick={() => setOpenLog(v => !v)}>
            <ListItemText primary="Logarithmic" />
            {openLog ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        )}
        <Collapse in={collapsed || openLog} timeout="auto" unmountOnExit>
        {[
          { name: 'Merge Sort', icon: <TimelineIcon fontSize="small" /> },
          { name: 'Quick Sort', icon: <QueryStatsIcon fontSize="small" /> },
          { name: 'Heap Sort', icon: <AutoGraphIcon fontSize="small" /> },
        ].map(({ name, icon }) => (
          <ListItemButton key={name} selected={selected === name} onClick={() => onSelect && onSelect(name)}>
            <ListItemIcon sx={{ minWidth: 32, justifyContent: 'center' }}>{icon}</ListItemIcon>
            {!collapsed && <ListItemText primary={name} />}
          </ListItemButton>
        ))}
        </Collapse>
      </List>
      <Divider sx={{ my: 1 }} />
      <List dense>
        {!collapsed && (
          <ListItemButton onClick={() => setOpenQuad(v => !v)}>
            <ListItemText primary="Quadratic" />
            {openQuad ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        )}
        <Collapse in={collapsed || openQuad} timeout="auto" unmountOnExit>
        {[
          { name: 'Bubble Sort', icon: <TimelineIcon fontSize="small" /> },
          { name: 'Selection Sort', icon: <TimelineIcon fontSize="small" /> },
          { name: 'Insertion Sort', icon: <TimelineIcon fontSize="small" /> },
        ].map(({ name, icon }) => (
          <ListItemButton key={name} selected={selected === name} onClick={() => onSelect && onSelect(name)}>
            <ListItemIcon sx={{ minWidth: 32, justifyContent: 'center' }}>{icon}</ListItemIcon>
            {!collapsed && <ListItemText primary={name} />}
          </ListItemButton>
        ))}
        </Collapse>
      </List>
      <Divider sx={{ my: 1 }} />
      <List dense>
        {!collapsed && (
          <ListItemButton onClick={() => setOpenLin(v => !v)}>
            <ListItemText primary="Linear" />
            {openLin ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        )}
        <Collapse in={collapsed || openLin} timeout="auto" unmountOnExit>
          {['Bucket sort', 'Counting sort', 'Radix sort'].map(name => (
            <ListItemButton key={name} onClick={() => onSelect && onSelect(name)}>
              <ListItemIcon sx={{ minWidth: 32, justifyContent: 'center' }}>
                <TimelineIcon fontSize="small" />
              </ListItemIcon>
              {!collapsed && <ListItemText primary={name} />}
            </ListItemButton>
          ))}
        </Collapse>
      </List>
      {/* Drag handle (hidden when collapsed) */}
      {!collapsed && (
        <Box
          onMouseDown={onMouseDownHandle}
          sx={{ position: 'absolute', right: -4, top: 0, bottom: 0, width: 8, cursor: 'col-resize', zIndex: 2 }}
        />
      )}
    </Box>
  );
}


