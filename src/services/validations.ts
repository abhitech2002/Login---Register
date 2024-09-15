
export const validateSignUp = (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    reEnterPassword: string;
    contact: string;
  }) => {
    const errors: { [key: string]: string } = {};
  
    if (!values.firstName) {
      errors.firstName = 'First name is required';
    }
  
    if (!values.lastName) {
      errors.lastName = 'Last name is required';
    }
  
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
  
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/.test(values.password)) {
      errors.password = 'Password must contain uppercase, number, and special character';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
  
    if (values.password !== values.reEnterPassword) {
      errors.reEnterPassword = 'Passwords do not match';
    }
  
    if (!values.contact) {
      errors.contact = 'Contact number is required';
    } else if (!/^\d{10}$/.test(values.contact)) {
      errors.contact = 'Contact number must be 10 digits long';
    }
  
    return errors;
  };
  
  export const validateLogin = (values: {
    email: string;
    password: string;
  }) => {
    const errors: { [key: string]: string } = {};
  
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
  
    if (!values.password) {
      errors.password = 'Password is required';
    }
  
    return errors;
  };
  