import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import classes from './ContactData.module.css';

import Spinner from '../../../components/UI/Spinner/Spinner';
import axiosInstance from '../../../axiosInstance';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { purchaseBurger } from '../../../store/actions';
import { updateForm } from '../../../shared/utility';

class ContactData extends Component {
	/**
	 * @type {{formIsValid: boolean, form: {streetLine2: {touched: boolean, elementConfig: {placeholder: string, type: string}, isValid: boolean, label: string, elementType: string, value: string, validation: {minLength: number, errorMessage: string, required: boolean}}, streetLine1: {touched: boolean, elementConfig: {placeholder: string, type: string}, isValid: boolean, label: string, elementType: string, value: string, validation: {minLength: number, errorMessage: string, required: boolean}}, country: {elementConfig: {placeholder: string, type: string}, label: string, elementType: string, value: string}, city: {touched: boolean, elementConfig: {placeholder: string, type: string}, isValid: boolean, label: string, elementType: string, value: string, validation: {minLength: number, errorMessage: string, required: boolean}}, deliveryMethod: {touched: boolean, elementConfig: {options: [{displayValue: string, value: string}, {displayValue: string, value: string}, {displayValue: string, value: string}]}, isValid: boolean, label: string, elementType: string, value: string, validation: {errorMessage: string, required: boolean}}, postalCode: {touched: boolean, elementConfig: {placeholder: string, type: string}, isValid: boolean, label: string, elementType: string, value: string, validation: {minLength: number, errorMessage: string, required: boolean, maxLength: number}}, fullName: {touched: boolean, elementConfig: {placeholder: string, type: string}, isValid: boolean, label: string, elementType: string, value: string, validation: {minLength: number, errorMessage: string, required: boolean}}, email: {touched: boolean, elementConfig: {placeholder: string, type: string}, isValid: boolean, label: string, elementType: string, value: string, validation: {minLength: number, isEmail: boolean, errorMessage: string, required: boolean}}}}}
	 */
	state = {
		formIsValid: false,
		form: {
			fullName: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'e.g. Sean Delaney'
				},
				label: 'Full Name',
				value: '',
				validation: {
					required: true,
					minLength: 3,
					errorMessage: 'Please enter a valid full name'
				},
				isValid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'e.g. hello@delaneymethod.com'
				},
				label: 'Email',
				value: '',
				validation: {
					required: true,
					minLength: 3,
					isEmail: true,
					errorMessage: 'Please enter a valid email'
				},
				isValid: false,
				touched: false
			},
			streetLine1: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Enter your street line 1 here'
				},
				label: 'Street Line 1',
				value: '',
				validation: {
					required: true,
					minLength: 3,
					errorMessage: 'Please enter a valid street line 1'
				},
				isValid: false,
				touched: false
			},
			streetLine2: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Enter your street line 2 here'
				},
				label: 'Street Line 2',
				value: '',
				validation: {
					required: false,
					minLength: 3,
					errorMessage: 'Please enter a valid street line 2'
				},
				isValid: false,
				touched: false
			},
			city: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'e.g. Bishopton'
				},
				label: 'City',
				value: '',
				validation: {
					required: true,
					minLength: 3,
					errorMessage: 'Please enter a valid city'
				},
				isValid: false,
				touched: false
			},
			postalCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Enter your postal code here'
				},
				label: 'Postal Code',
				value: '',
				validation: {
					required: true,
					minLength: 6,
					maxLength: 7,
					errorMessage: 'Please enter a valid postal code'
				},
				isValid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'e.g. Scotland'
				},
				label: 'Country',
				value: ''
				/*
				,
				validation: {
					required: false,
					minLength: 3,
					errorMessage: 'Please enter a valid country'
				},
				isValid: false,
				touched: false
				*/
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: '', displayValue: '' },
						{ value: 'standard', displayValue: 'Standard' },
						{ value: 'express', displayValue: 'Express' }
					]
				},
				label: 'Delivery Method',
				value: '', // If we didnt have an empty option, setting value to standard
				validation: {
					required: true,
					errorMessage: 'Please select a valid delivery method'
				},
				isValid: false,
				touched: false
			}
		}
	};

	/**
	 * @param event
	 */
	orderNow = event => {
		event.preventDefault();

		const formData = {};

		for (const formElementId in this.state.form) {
			formData[formElementId] = this.state.form[formElementId].value;
		}

		const order = {
			orderData: formData,
			localId: this.props.localId,
			totalPrice: this.props.totalPrice,
			ingredients: this.props.ingredients
		};

		this.props.purchaseBurger(order, this.props.idToken);
	};

	/**
	 * @param event
	 * @param inputId
	 */
	updateField = (event, inputId) => {
		const { updatedForm: form, formIsValid } = updateForm(event, this.state.form, inputId);

		this.setState({ form, formIsValid });
	};

	/**
	 * @returns {JSX.Element}
	 */
	render() {
		const formElements = [];

		for (const key in this.state.form) {
			formElements.push({
				id: key,
				config: this.state.form[key]
			});
		}

		let form = (
			<form onSubmit={this.orderNow}>
				{formElements.map(formElement => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						label={formElement.config.label}
						isValid={formElement.config.isValid}
						onChange={event => this.updateField(event, formElement.id)}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
					/>
				))}
				<Button
					type={'submit'}
					className={'Success'}
					disabled={!this.state.formIsValid}
					onClick={event => this.orderNow(event)}
				>
					Order Now
				</Button>
			</form>
		);

		if (this.props.loading) {
			form = <Spinner/>;
		}

		return (
			<div className={classes.ContactData}>
				<h4>Please enter your contact details</h4>
				{form}
			</div>
		);
	};
}

ContactData.propTypes = {
	loading: PropTypes.bool.isRequired,
	idToken: PropTypes.string.isRequired,
	localId: PropTypes.string.isRequired,
	totalPrice: PropTypes.number.isRequired,
	purchaseBurger: PropTypes.func.isRequired,
	ingredients: PropTypes.objectOf((props, propName, component) => {
		if (typeof propName !== 'string' && typeof props[propName] !== 'string') {
			return new Error(`Invalid prop key/value supplied to ${component}. Validation failed.`);
		}
	}).isRequired
};

/**
 * @param state
 * @returns {{totalPrice: (number|number|*), ingredients: (null|{bacon: number, salad: number, meat: number, cheese: number}|*), loading: *}}
 */
const mapStateToProps = state => {
	return {
		loading: state.order.loading,
		idToken: state.authenticate.idToken,
		localId: state.authenticate.localId,
		totalPrice: state.burgerBuilder.totalPrice,
		ingredients: state.burgerBuilder.ingredients
	};
};

/**
 * @param dispatch
 * @returns {{purchaseBurger: (function(*=): *)}}
 */
const mapDispatchToProps = dispatch => {
	return {
		purchaseBurger: (orderData, idToken) => dispatch(purchaseBurger(orderData, idToken))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axiosInstance));
