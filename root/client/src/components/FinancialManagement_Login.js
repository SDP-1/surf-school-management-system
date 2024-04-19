import React from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import logoImage from '../assets/images/logoImage.JPG'; // Import the image

// CSS styles as a JavaScript variable
const customStyles = {
  container: {
    height: '100%',
  },
  loginForm: {
    maxWidth: '500px', // Adjust the maximum width as needed
    width: '100%', // Ensure the form fills the available space
    background: 'hsla(0, 0%, 100%, 0.55)', // Added background color
    backdropFilter: 'blur(30px)', // Added backdrop filter
    padding: '40px', // Adjusted padding
    borderRadius: '10px', // Added border radius
  },
  logo: {
    color: '#1266f1', // Changed logo color to match the icon color in the first code snippet
  },
  loginImage: {
    objectFit: 'cover',
    objectPosition: 'left',
    width: '100%', // Adjust the width
    height: 'auto', // Maintain aspect ratio
    borderRadius: '10px', // Added border radius
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Added box shadow
  }
};

function LoginForm() {
  return (
    <React.Fragment>
      <style>{`
        .h-custom-2 {
          height: 100%;
        }
      `}</style>
      <MDBContainer fluid className='my-5' style={{ ...customStyles.container, background: '#f0f0f0' }}>
        <MDBRow className='g-0 align-items-center'>
          <MDBCol col='6'>
            <MDBContainer style={customStyles.loginForm}>
              <div className='d-flex flex-row mb-5'>
                <MDBIcon fas icon="crow" className="me-3" style={customStyles.logo} />
                <h2 className="fw-bold mb-0">Logo</h2> {/* Adjusted styling for logo */}
              </div>
              <div className='d-flex flex-column justify-content-center h-custom-2'>
                <h2 className="fw-bold mb-4 text-center">Log in</h2> {/* Adjusted heading styling */}
                <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" />
                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" />
                <MDBBtn className="mb-4 w-100" color='primary' size='lg'>Login</MDBBtn> {/* Changed button color */}
                <p className="small mb-4 text-center"><a className="text-muted" href="#!">Forgot password?</a></p> {/* Adjusted styling for forgot password link */}
                <p className='text-center'>Don't have an account? <a href="#!" className="link-primary">Register here</a></p> {/* Adjusted styling for register link */}
              </div>
            </MDBContainer>
          </MDBCol>
          <MDBCol col='6'>
            <img
              src={logoImage} // Use the imported image
              alt="Login image"
              className="w-100 rounded-4"
              style={customStyles.loginImage}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </React.Fragment>
  );
}

export default LoginForm;
