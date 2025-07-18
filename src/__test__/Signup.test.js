import { render, screen,fireEvent,waitFor } from '@testing-library/react';
import Signup from '../Signup';
import { BrowserRouter } from 'react-router-dom';

//Mock useNavigate
const mockNavigate=jest.fn();
jest.mock('react-router-dom',()=>({
  ...jest.requireActual('react-router-dom'),
  useNavigate: ()=>mockNavigate,
}));

beforeEach(()=>{
  jest.clearAllMocks();
});


const MockSignup=()=>(
    <BrowserRouter>
        <Signup/>
    </BrowserRouter>
)



describe('renders page successfully',()=>{
    test('renders username input and label',()=>{
        render(<MockSignup/>);
        const username = screen.getByLabelText(/Username/i);
        expect(username).toBeInTheDocument();
    })
    test('renders password label',()=>{
        render(<MockSignup/>);
        const passwordLabel = screen.getByLabelText(/Password/i);
        expect(passwordLabel).toBeInTheDocument();
      });
    
      test('renders submit button',()=>{
        render(<MockSignup/>);
        const SignupButton=screen.getByRole('button',{name: /Sign Up/i});
        expect(SignupButton).toBeInTheDocument();
      });

      test('renders email input and label',()=>{
        render(<MockSignup/>);
        const email=screen.getByLabelText(/E-mail/i);
        expect(email).toBeInTheDocument();
      });

  describe('sign up page functions', () => {
    test('successfully navigates to login after successful signup',async()=>{
      global.fetch=jest.fn(()=> Promise.resolve({
        ok: true,
        json: ()=> Promise.resolve({message: 'Signup successful'}),
      })
    );
    render(
      <MockSignup/>
    );

      const username = screen.getByLabelText(/Username/i);
      const passwordLabel = screen.getByLabelText(/Password/i);
      const email=screen.getByLabelText(/E-mail/i);
      const signupButton=screen.getByRole('button',{name: /Sign Up/i});

      fireEvent.change(username,{terget:{value: 'newuser'}});
      fireEvent.change(passwordLabel,{target:{value: 'newuser1234'}})
      fireEvent.change(email,{target:{value: 'newuser@gmail.com'}})
      fireEvent.click(signupButton);

      await waitFor(()=>{
        expect(mockNavigate).toHaveBeenCalledWith('/login')
      });

    });
    test('shows error messgage upon failed login',async()=>{
      global.fetch=jest.fn(()=> Promise.resolve({
        ok: false,
        json: ()=> Promise.resolve({message: 'Signup failed'}),
      })
    );
    render(
      <MockSignup/>
    );

      const username = screen.getByLabelText(/Username/i);
      const passwordLabel = screen.getByLabelText(/Password/i);
      const email=screen.getByLabelText(/E-mail/i);
      const signupButton=screen.getByRole('button',{name: /Sign Up/i});

      fireEvent.change(username,{terget:{value: 'faileduser'}});
      fireEvent.change(passwordLabel,{target:{value: 'faileduser1234'}})
      fireEvent.change(email,{target:{value: 'faileduser@gmail.com'}})
      fireEvent.click(signupButton);

      await waitFor(()=>{
        expect(mockNavigate).not.toHaveBeenCalledWith('/login');
      });
      await waitFor(()=>{
        const error=screen.getByText(/Sign-up failed! Account may already exist. Check that your device has stable internet connectivity and try again.../i);
        expect(error).toBeInTheDocument();
      })
    });
  });
  
})