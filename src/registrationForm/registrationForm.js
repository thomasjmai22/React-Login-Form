import React from "react";
import ValidationError from "../ValidationError/ValidationError";

//export default Function vs class & extends Component vs React.Component
export default class registrationForm extends React.Component {
  state = {
    name: {
      value: "",
      touched: false,
    },
    password: {
      value: "",
      touched: false,
    },
    repeatPassword: {
      value: "",
      touched: false,
    },
  };
  // this.nameInput = React.createRef(); remove this after setState added????
  //added createRef as a prop to pass nameInput to specific input

  updateName(name) {
    this.setState({ name: { value: name, touched: true } });
  }
  updatePassword(password) {
    this.setState({ password: { value: password, touched: true } });
  }
  updateRepeatPassword(repeatPassword) {
    this.setState({ repeatPassword: { value: repeatPassword, touched: true } });
  }

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Name is required";
    } else if (name.length < 3) {
      return "Name must be at least 3 characters long";
    }
  }

  validatePassword() {
    const password = this.state.password.value.trim();
    if (password.length === 0) {
      return "Password is required";
    } else if (password.length < 6 || password.length > 72) {
      return "Password must be between 6 and 72 characters long";
    } else if (!password.match(/[0-9]/)) {
      return "Password must contain at least one number";
    }
  }

  validateRepeatPassword() {
    const repeatPassword = this.state.repeatPassword.value.trim();
    const password = this.state.password.value.trim();

    if (repeatPassword !== password) {
      return "Passwords do not match";
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, password, repeatPassword } = this.state;
    // const name = this.nameInput.current.value;
    // const name = event.target.name.value;
    //changed e.target.name TO this.nameInput
    // const password = event.target.password.value;
    // console.log("Name: ", name);
    // console.log("Password: ", password);
    console.log("Name: ", name.value);
    console.log("Password: ", password.value);
    console.log("Repeat Password: ", repeatPassword.value);
  }

  render() {
    const nameError = this.validateName();
    const passwordError = this.validatePassword();
    const repeatPasswordError = this.validateRepeatPassword();

    return (
      //adding onSubmit to entire <Form> vs just the <button>
      <form className='registration' onSubmit={(e) => this.handleSubmit(e)}>
        <h2>Register</h2>
        <div className='registration__hint'>* required field</div>
        <div className='form-group'>
          <label htmlFor='name'>Name *</label>
          <input
            type='text'
            className='registration__control'
            name='name'
            id='name'
            onChange={(e) => this.updateName(e.target.value)}
            // ref={this.nameInput}
            // defaultValue='Frank'
          />
          {this.state.name.touched && <ValidationError message={nameError} />}
          {/* <ValidationError message={this.validateName()} /> */}
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password *</label>
          <input
            type='password'
            className='registration__control'
            name='password'
            id='password'
            onChange={(e) => this.updatePassword(e.target.value)}
          />
          {this.state.password.touched && (
            <ValidationError message={passwordError} />
          )}

          <div className='registration__hint'>
            6 to 72 characters, must include a number
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='repeatPassword'>Repeat Password *</label>
          <input
            type='password'
            className='registration__control'
            name='repeatPassword'
            id='repeatPassword'
            onChange={(e) => this.updateRepeatPassword(e.target.value)}
          />
          {this.state.repeatPassword.touched && (
            <ValidationError message={repeatPasswordError} />
          )}
        </div>

        <div className='registration__button__group'>
          <button type='reset' className='registration__button'>
            Cancel
          </button>
          <button
            type='submit'
            className='registration__button'
            disabled={
              this.validateRepeatPassword() ||
              this.validatePassword() ||
              this.validateRepeatPassword()
            }
          >
            Save
          </button>
        </div>
      </form>
    );
  }
}
