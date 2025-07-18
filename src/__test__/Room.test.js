import { render, screen,fireEvent,waitFor, getByText } from '@testing-library/react';
import Room from '../Room'
import { BrowserRouter, useLocation } from 'react-router-dom';

const MockRoom=()=>(
    <BrowserRouter>
        <Room/>
    </BrowserRouter>
)
jest.mock('react-router-dom',()=>({
    ...jest.requireActual('react-router-dom'),
    useLocation:()=>({
        state:{
            id:'1',
            recipient:'Mandy',
            image:'imageUrl'
        }
    })
}))

beforeEach(()=>{
jest.spyOn(Storage.prototype,'getItem').mockImplementation((key)=>{
    if (key==='userId'){
        return '2';
    }
    return 3;
})

global.fetch=jest.fn((url)=>{
    if (url.includes('/get_messages')){
            return Promise.resolve({
            ok: true,
            json: ()=> Promise.resolve(
  [
    {
    "id": 26,
    "room": "ChatRoom(1_2)",
    "sender": 2,
    "recipient": 1,
    "message": "How are Blue",
    "updated_at": "2025-07-06T20:12:31.978629Z",
    "status": "pending..."
  },
]
),
        });
    }
    else if (url.includes('/room')){
        return Promise.resolve({
            ok:true,
            json: ()=> Promise.resolve(
                [
                    {
                "id": "ChatRoom(1_2)",
                "user_1": 1,
                "user_2": 2
            },
                ]
            ),
        });
    }
    else if(url.includes('/post_message')){
        return Promise.resolve({
            ok: true,
            json: ()=> Promise.resolve({
                "status": 'ok'
            }
            ),
        });
    }
    return Promise.reject(new Error('Network request failed'));
});
})



describe('renders correctly',()=>{
    test('renders page elements correctly',async()=>{
        render(<MockRoom/>);
        
        const message1 = await screen.findByText(/Blue/i);
        expect(message1).toBeInTheDocument();
        const recipientName = await screen.findByText(/Mandy/i);
        expect(recipientName).toBeInTheDocument();
        const userProfile = await screen.findByAltText(/user profile/i);
        expect(userProfile).toBeInTheDocument();
        const textArea = await screen.findByRole('textbox');
        expect(textArea).toBeInTheDocument();
        
    
    })
    test('types and sends messages successfully',async()=>{
        render(<MockRoom/>);
        const text = screen.getByRole('textbox');
        const sendButton = screen.getByRole('button',{name: /send/i});
        fireEvent.change(text,{target:{value: 'Fine thanks how are you?'}});
        expect(text).toHaveValue('Fine thanks how are you?');
        fireEvent.click(sendButton);
        await waitFor(()=>{
            expect(text).toHaveValue('');
            
        });
    });
});