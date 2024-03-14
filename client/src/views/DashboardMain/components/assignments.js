import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import './assignments.scss';

const assignmentsData = [
  {
    id: 1,
    name: "Assignment 1",
    submodules: [],
  },
  {
    id: 2,
    name: "Assignment 2",
    submodules: [],
  },
  {
    id: 3,
    name: "Assignment 3",
    submodules: ["Quiz","Mcq","Discussion"],
  },
];

export default function AssignmentList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      className="assignments"
      sx={{ width: "100%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Assignments
        </ListSubheader>
      }
    >
      {assignmentsData.map((assignment) => (
        <React.Fragment key={assignment.id}>
          <ListItemButton onClick={assignment.submodules.length > 0 ? handleClick : null}>
            <ListItemText primary={assignment.name} />
            {assignment.submodules.length > 0 && (open ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          {assignment.submodules.length > 0 && (
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {assignment.submodules.map((submodule, index) => (
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
