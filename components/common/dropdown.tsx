import React from 'react';
import clsx from 'clsx';
import Button, { ButtonProps } from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
    button: {
      margin: theme.spacing(1),
      textTransform: 'capitalize',
      fontFamily: "'Montserrat', 'Open Sans', sans-serif",
      fontWeight: 'bold',
      fontSize: "1rem",
      lineHeight: "1.25rem",
      borderRadius: 20,
      color: "#460354"
    },
    popper: {
      zIndex: 100
    }
  }),
);

interface IMenuList {
  label: string 
  onClick: () => void
}
interface IProps extends ButtonProps {
  label: string 
  menuList: IMenuList[]
}
export default function Dropdown(props: IProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <Button
        className={clsx(classes.button, props.className)}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        startIcon={props.startIcon}
        endIcon={props.endIcon}
        variant={props.variant}
        color={props.color}
      >
        {props.label}
      </Button>
      <Popper className={classes.popper} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper square>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {
                    props.menuList.map((item: IMenuList, i) => {
                      return <MenuItem key={`dd-${i}`} onClick={(e) => {
                        handleClose(e)
                        item.onClick()
                      }}>{item.label}</MenuItem>
                    })
                  }
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}