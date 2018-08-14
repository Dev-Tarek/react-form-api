import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function button(props) {
  const { classes } = props;
  let style = {}
  if(props.color === undefined && !props.disabled)
    style = {backgroundColor: 'green', color: 'white'}
  
  return <Button
            variant="contained"
            style={style}
            color={props.color}
            className={classes.button}
            disabled={props.disabled}
            onClick={props.click}
          >
        {props.text}
      </Button>

}

button.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(button);