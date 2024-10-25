class login {
  constructor(role) {
    this.role = role;
  }

  login() {
    switch (this.role) {
      case 'owner':
        return 'Owner login successful';
      case 'veterinary':
        return 'Veterinary login successful';
      case 'admin':
        return 'Admin login successful';
      default:
        return 'Invalid role';
    }
  }
}