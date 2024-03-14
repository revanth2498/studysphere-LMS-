import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import './modules.scss';

const modulesData = [
  {
    id: 1,
    name: "Module 15",
    submodules: [],
  },
  {
    id: 2,
    name: "Module 25",
    submodules: [],
  },
  {
    id: 3,
    name: "Module 35",
    submodules: ["Sections"],
  },
];

export default function NestedList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      className="modules"
      sx={{ width: "100%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Modules
        </ListSubheader>
      }
    >
      {modulesData.map((module) => (
        <React.Fragment key={module.id}>
          <ListItemButton onClick={module.submodules.length > 0 ? handleClick : null}>
            <ListItemText primary={module.name} />
            {module.submodules.length > 0 && (open ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          {module.submodules.length > 0 && (
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {module.submodules.map((submodule, index) => (
                  <ListItemButton key={index} sx={{ pl: 4 }}>
                    <ListItemText primary={submodule} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </List>
  );
}
