import React, { useEffect } from 'react';
import Badge from '@material-ui/core/Badge';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../redux/rootReducer'
import { getProductCategories } from '../../redux/products/actions'
// import MiniCart from '../cart/mini-cart'

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 5,
    border: `2px solid #460354`,
    padding: '0 4px',
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    textTransform: 'capitalize',
    fontFamily: "'Montserrat', 'Open Sans', sans-serif",
    fontWeight: 'bold',
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
    borderRadius: 20,
    color: "#460354"
  },
  text: {
    color: "#460354"
  }
}));

export default function TemporaryDrawer() {
  const styles = useStyles();
  const [open, setState] = React.useState(false);
  const cart = useSelector((state: ApplicationState) => state.cart.data)

  const dispatch = useDispatch()
  const categories = useSelector((state: ApplicationState) => state.products.categories)

  useEffect(() => {
    if(categories.length <= 0) {
      dispatch(getProductCategories())
    }
  }, [])

  const toggleDrawer = () => {
    setState(!open);
  };

  return (
    <div>
      <IconButton className={styles.button} aria-label="cart" color="inherit" onClick={toggleDrawer}>
        <StyledBadge badgeContent={cart.length} color="secondary">
          <ShoppingBasket fontSize="large" />
        </StyledBadge>
      </IconButton>
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        {/* <MiniCart toggle={toggleDrawer} /> */}
      </Drawer>
    </div>
  );
}
