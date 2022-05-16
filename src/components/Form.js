import React, { useState, useEffect, useContext } from 'react'
import { MyContext } from '../App';
import styles from '../scss/Form.module.scss';
import D3_BarChart from './D3_BarChart';

const Form = () => {
	let regex = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;

	const [userDetails, setUserDetails] = useState({
		email: '',
		pass: '',
		confirmPass: '',
		name: '',
		phone: '',
		isAgree: false
	})

	const [error, setError] = useState({
		emailError: '',
		passError: '',
		confirmPassError: '',
		nameError: '',
		phoneError: '',
		isAgreeError: ''
	})
	const { email, pass, confirmPass, name, phone, isAgree } = userDetails;
	const { emailError, passError, confirmPassError, nameError, phoneError, isAgreeError } = error;
	const { isSubmit, setIsSubmit } = useContext(MyContext)

	const changeEmail = (e) => {
		setUserDetails(prevState => ({ ...prevState, email: e.target.value }))
	}

	const changePassword = (e) => {
		setUserDetails(prevState => ({ ...prevState, pass: e.target.value }))
	}

	const changeConfirmPassword = (e) => {
		setUserDetails(prevState => ({ ...prevState, confirmPass: e.target.value }))
	}

	const changeName = (e) => {
		setUserDetails(prevState => ({ ...prevState, name: e.target.value }))
	}

	const changePhoneNo = (e) => {
		setUserDetails(prevState => ({ ...prevState, phone: e.target.value }))
	}

	const changeAgreeStatus = (e) => {
		setUserDetails(prevState => ({ ...prevState, isAgree: e.target.checked }))
	}

	const [click, setClick] = useState(0)
	const handleSubmitForm = () => {
		setClick(clicked => clicked + 1)
		validateDetails()
		console.log(userDetails)
		console.log(error)
	}
	// useEffect(() => {
	// 	if (isSubmit) {
	// 		validateDetails()
	// 	}
	// }, [userDetails, isSubmit])

	useEffect(() => {
		if (!(emailError || passError || confirmPassError || nameError || phoneError || isAgreeError)) {
			if (email || pass || confirmPass || name || phone || isAgree) {
				setIsSubmit(true);
			}
			else {
				click > 1 && setIsSubmit(true);
			}
		}
	}, [error])

	const validateDetails = () => {
		if (!email) {
			setError(prevState => ({ ...prevState, emailError: 'Email is required' }));
		}
		else if (!regex.test(email)) {
			setError(prevState => ({ ...prevState, emailError: 'Please enter a valid email' }));
		}
		else {
			setError(prevState => ({ ...prevState, emailError: '' }));
		}
		if (!pass) {
			setError(prevState => ({ ...prevState, passError: 'Password is required' }));
		}
		else if (pass.length < 6) {
			setError(prevState => ({ ...prevState, passError: 'Password should be at least 6 characters long ' }));
		}
		else {
			setError(prevState => ({ ...prevState, passError: '' }));
		}
		if (!confirmPass) {
			setError(prevState => ({ ...prevState, confirmPassError: 'Confirm Password is required' }));
		}
		else if (confirmPass !== pass) {
			setError(prevState => ({ ...prevState, confirmPassError: 'Passwords not match' }));
		}
		else {
			setError(prevState => ({ ...prevState, confirmPassError: '' }));
		}
		if (!name) {
			setError(prevState => ({ ...prevState, nameError: 'Name is required' }));
		}
		else if (name.length < 3) {
			setError(prevState => ({ ...prevState, nameError: 'Name should be at least 3 characters long ' }));
		}
		else {
			setError(prevState => ({ ...prevState, nameError: '' }));
		}
		if (!phone) {
			setError(prevState => ({ ...prevState, phoneError: 'Phone is required' }));
		}
		else if (phone.startsWith(0)) {
			setError(prevState => ({ ...prevState, phoneError: 'Number should not be start with 0' }));
		}
		else {
			setError(prevState => ({ ...prevState, phoneError: '' }));
		}
		if (!isAgree) {
			setError(prevState => ({ ...prevState, isAgreeError: 'Please check it to continue' }))
		}
		else {
			setError(prevState => ({ ...prevState, isAgreeError: '' }));
		}

	}

	return (
		// !isSubmit?
		<div className={styles.FormDiv}>
			<h2 className={styles.FormDiv__heading}>Create an account</h2>

			<form onSubmit={(e) => e.preventDefault()} className={styles.FormDiv__form}>

				<label className={styles.FormDiv__label} htmlFor="email">Your email address</label>
				<input className={styles.FormDiv__input} type="email" name="email" id="email" value={email} onChange={changeEmail} />
				{emailError && <small className={styles.FormDiv__error}> {emailError} </small>}

				<label className={styles.FormDiv__label} htmlFor="pass">Your password</label>
				<input className={styles.FormDiv__input} type="password" name="password" id="pass" value={pass} onChange={changePassword} />
				{passError && <small className={styles.FormDiv__error}> {passError} </small>}

				<label className={styles.FormDiv__label} htmlFor="confirmPass">Confirm your password</label>
				<input className={styles.FormDiv__input} type="password" name="confirmPassword" id="confirmPass" value={confirmPass} onChange={changeConfirmPassword} />
				{confirmPassError && <small className={styles.FormDiv__error}> {confirmPassError} </small>}

				<label className={styles.FormDiv__label} htmlFor="name">Your full name</label>
				<input className={styles.FormDiv__input} type="text" name="name" id="name" value={name} onChange={changeName} />
				{nameError && <small className={styles.FormDiv__error}> {nameError}</small>}

				<label className={styles.FormDiv__label} htmlFor="phone">Your phone number</label>
				<input className={styles.FormDiv__input} type="number" name="phone" id="phone" value={phone} onChange={changePhoneNo} minLength={10} maxLength={10} />
				{phoneError && <small className={styles.FormDiv__error}>{phoneError}</small>}

				<div className={styles.FormDiv__divAgree}>
					<div className={styles.FormDiv__childDivAgree}>
						<input type="checkbox" className={styles.FormDiv__inputAgree} name="isAgree" id="isAgree" checked={isAgree} onChange={changeAgreeStatus} />
						<label htmlFor='isAgree' className={[styles['FormDiv__label'], styles['FormDiv__label--agree']].join(' ')}>I read and agree Terms and Conditions</label>
					</div>
					{isAgreeError && <small className={styles.FormDiv__error}>{isAgreeError} </small>}
				</div>
				<button className={styles.FormDiv__btn} onClick={handleSubmitForm}>Create Account</button>
			</form >
		</div >
	)
}

export default Form