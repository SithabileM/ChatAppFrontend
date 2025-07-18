import { render, screen } from '@testing-library/react';
import Login from '../login';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';

const MockLogin=()=>(
    <BrowserRouter>
        <Login/>
    </BrowserRouter>
)
describe('login page renders', () => {
  describe("renders form",()=>{

  test('renders username label',() => {
  render(<MockLogin/>);
  const usernameLable = screen.getByLabelText(/Username/i);
  expect(usernameLable).toBeInTheDocument();
});

  test('renders password label',()=>{
    render(<MockLogin/>);
    const passwordLabel = screen.getByLabelText(/Password/i);
    expect(passwordLabel).toBeInTheDocument();
  });

  test('renders submit button',()=>{
    render(<MockLogin/>);
    const LoginButton=screen.getByRole('button',{name: /Login/i});
    expect(LoginButton).toBeInTheDocument();
  });

});

  test('renders error Message',()=>{
    render(<MockLogin/>);
    const errorElement=screen.queryByText('Error! Please check that you have stable internet connectivity and that your user credentials are valid.');
    expect(errorElement).not.toBeInTheDocument();
  });

  test('renders p tag',()=>{
    render(<MockLogin/>);
    const ptag=screen.getByText('Not signed Up? |');
    expect(ptag).toBeInTheDocument();
  });

  test('link to signup renders',()=>{
    render(<MockLogin/>);
    const signupLink=screen.getByRole('link',{name: /SignUp/i});
    expect(signupLink).toBeInTheDocument();
  });
})

describe('login page functions',()=>{
  test('logs in successully',async()=>{
    //Mock the fetch call
    global.fetch=jest.fn(()=>
    Promise.resolve({
      ok: true,
      json: ()=> Promise.resolve({token: 'fake-token'}),
    }));

    render(<MockLogin/>);

    //fill out form fields
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const LoginButton=screen.getByRole('button',{name: /Login/i});
    
    fireEvent.change(usernameInput,{target: {value: 'testUser'}});
    fireEvent.change(passwordInput,{target:{value: 'password123'}});
    fireEvent.click(LoginButton);

    //assert fetch was called
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('http://localhost:8000/login'),expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({username: 'testUser', password: 'password123'}),
    }))

  })

  test('shows error when user logs in unsuccessfully',async ()=>{
    //Mock failed login response
    global.fetch=jest.fn(()=> Promise.resolve({
      ok: false,
      status: 404,
      json: ()=> Promise.resolve({detail: 'Not found'}),
    }));

    render(<MockLogin/>);

    
    const usernameInput = screen.getByLabelText(/Username/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const LoginButton=screen.getByRole('button',{name: /Login/i});
    
    fireEvent.change(usernameInput,{target: {value: 'testUser'}});
    fireEvent.change(passwordInput,{target:{value: 'password123'}});
    fireEvent.click(LoginButton);

    const error= await screen.findByText(/Error! Please check that you have stable internet connectivity and that your user credentials are valid./i);
    expect(error).toBeInTheDocument()
  })
})


