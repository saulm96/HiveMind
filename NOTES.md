Need to change the function generateAuthToken in the jwt ocnfig file because there is not a role field for the user model in the database. For now the token will sign the userId, email and username but in the future it will only store the userId, the role and the isVerified.

Need to test the CSRFVerify middleware. The CSRF Token must go in every APIRequest request where the CSRF token is needed.

2. Password Recovery:
   -Reset Request:
   Create an endpoint for users to request a password reset.
   -Reset Email Sending:
   Send an email with a unique and temporary link to reset the password.
   Reset Endpoint:
   Implement an endpoint for users to enter their new password using the email link.
