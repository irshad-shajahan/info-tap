export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  export function validateName(name) {
    // Name should contain only letters and spaces
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  }
  export function validatePassword(password) {
    // Password should:
    // 1. Be at least 6 characters long
    // 2. Contain at least one lowercase letter
    // 3. Contain at least one uppercase letter
    // 4. Contain at least one digit
    // 5. Contain at least one special character (e.g., !@#$%^&*)
    
  
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
  
    if (!/(?=.*[a-z])/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
  
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
  
    if (!/(?=.*\d)/.test(password)) {
      return "Password must contain at least one digit.";
    }
  
    if (!/(?=.*[\W_])/.test(password)) {
      return "Password must contain at least one special character.";
    }
  
  
    // Password is valid
    return null; // Return null to indicate no error
  }
  
  
  