import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import classes from './BurgerIngredient.module.css';

// MAYBE - This could be a functional component
class BurgerIngredient extends Component {
	/**
	 * @returns {JSX.Element}
	 */
	render() {
		let ingredient;

		switch (this.props.type) {
			case 'bread-bottom':
				ingredient = <div className={classes.BreadBottom}/>;
				break;

			case 'bread-top':
				ingredient = (
					<div className={classes.BreadTop}>
						<div className={classes.Seeds1}/>
						<div className={classes.Seeds2}/>
					</div>
				);
				break;

			case 'meat':
				ingredient = <div className={classes.Meat}/>;
				break;

			case 'bacon':
				ingredient = <div className={classes.Bacon}/>;
				break;

			case 'cheese':
				ingredient = <div className={classes.Cheese}/>;
				break;

			case 'salad':
				ingredient = <div className={classes.Salad}/>;
				break;

			default:
				ingredient = null;
		}

		return ingredient;
	};
}

BurgerIngredient.propTypes = {
	type: PropTypes.string.isRequired
};

export default BurgerIngredient;
