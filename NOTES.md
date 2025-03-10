Need to change the function generateAuthToken in the jwt ocnfig file because there is not a role field for the user model in the database. For now the token will sign the userId, email and username but in the future it will only store the userId, the role and the isVerified.

1. Email Verification Implementation:
-Verification Endpoint:
    Create a backend endpoint that receives the token as a parameter.
    This endpoint should validate the token and mark the user as verified in the database.
-Error Handling:
    Implement robust error handling for cases like invalid, expired, or already used tokens.
2. Password Recovery:
-Reset Request:
    Create an endpoint for users to request a password reset.
-Reset Email Sending:
    Send an email with a unique and temporary link to reset the password.
    Reset Endpoint:
    Implement an endpoint for users to enter their new password using the email link.