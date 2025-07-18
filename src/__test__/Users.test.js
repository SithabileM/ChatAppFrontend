import { render, screen, waitFor } from '@testing-library/react';
import Users from '../Users';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';

const MockUsers=()=>(
    <BrowserRouter>
        <Users/>
    </BrowserRouter>
)

beforeEach(()=>{
    jest.spyOn(Storage.prototype,'getItem').mockImplementation((key)=>{
    if (key==='token'){
        return 'test-token';
    }
    return 'test-token';
})
    global.fetch=jest.fn((url)=>{
        if (url.includes('/users')){
            return Promise.resolve({
                ok: true,
                json:()=> Promise.resolve([
                    {
    "id": 1,
    "username": "testConnected",
    "profile_picture": "/media/profile_pictures/download.jpeg"
  },
  {
    "id": 3,
    "username": "test2",
    "profile_picture": "/media/profile_pictures/OIP_dDxKkm9.jpg"
  },
  {
    "id": 5,
    "username": "AnotherUser",
    "profile_picture": "/media/profile_pictures/ovaries.jpg"
  },
                ]),
            });
        }
    else if(url.includes('/get_connections')){
        return Promise.resolve({
            ok: true,
            json: ()=> Promise.resolve({
  "connectedUsers": [
    {
      "id": 1,
      "username": "testConnected",
      "profile_picture": "/media/profile_pictures/download.jpeg"
    },
    {
      "id": 3,
      "username": "test2",
      "profile_picture": "/media/profile_pictures/OIP_dDxKkm9.jpg"
    }
  ]
})
        })
    }
    else if(url.includes('getProfilePicture')){
        return Promise.resolve({
            ok: true,
            json: ()=> Promise.resolve({
                profile_picture:'/media/profile_pictures/download.jpeg',
            })
        })
    }

    });
})

describe('renders page successfully',()=>{
    test('header renders',()=>{
        render(<MockUsers/>);
        const header=screen.getByRole('heading',{name:/Let's Chat/i});
        expect(header).toBeInTheDocument();
    })
    test('button renders',()=>{
        render(<MockUsers/>);
        const button=screen.getByText(/Show all users/i);
        expect(button).toBeInTheDocument();
    })
    test('no results for new users shows',()=>{
        render(<MockUsers/>);
        const noResultsText=screen.getByText(/No results found/i);
        expect(noResultsText).toBeInTheDocument();
    })
    test('update profile link',()=>{
        render(<MockUsers/>);
        const updateProfileLink=screen.getByRole('link',{name: /Update Profile/i})
        expect(updateProfileLink).toBeInTheDocument();
    })
    test('logout and Deactivate Account buttons render',()=>{
        render(<MockUsers/>);
        const logoutButton=screen.getByRole('button',{name: /Logout/i})
        expect(logoutButton).toBeInTheDocument();
        const deactivateAccount=screen.getByRole('button',{name: /Deactivate Account/i})
        expect(deactivateAccount).toBeInTheDocument();
    })
    test('renders search user input field',()=>{
        render(<MockUsers/>);
        const inputField=screen.getByPlaceholderText(/search user/i);
        expect(inputField).toBeInTheDocument();
    })
})
    describe('user page functions',()=>{
        test('Users can type into input box',()=>{
        render(<MockUsers/>);
        const inputField=screen.getByPlaceholderText(/search user/i);
        fireEvent.change(inputField,{target:{value: 'testing1234'}});
        expect(inputField.value).toBe('testing1234');
    })
        test('input box and toggle button filters users rendered',async()=>{
            render(<MockUsers/>);
            const inputField=screen.getByPlaceholderText(/search user/i);
            fireEvent.change(inputField,{target:{value: 'test'}});
            await waitFor(()=>{
                const users= screen.queryAllByTestId('username');
                expect(users.length).toBe(2);
            })
            const user=screen.queryAllByText('AnotherUser');
            expect(user.length).toBe(0);
            fireEvent.change(inputField,{target:{value: ''}});
            const filterButton=screen.getByText(/show all users/i);
            fireEvent.click(filterButton);
            await waitFor(()=>{
                const users= screen.queryAllByTestId('username');
                expect(users.length).toBe(3);
            
        })
        const name=screen.getByText('AnotherUser');
        expect(name).toBeInTheDocument();
    })
})