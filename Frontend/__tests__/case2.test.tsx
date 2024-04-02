import '@testing-library/jest-dom'
import { screen, render, waitFor } from '@testing-library/react'
import { getServerSession } from "next-auth";
import Page from '@/components/TopMenu';
import * as GetUserProfile from '@/libs/getUserProfile';

const mockCallback = {
  async jwt(param: { token: {}, user: {} }) {
    return { ...param.token, ... param.user };
  },
  async session(param: {session:{}, token:{}, user:{}}) {
    param.session.user = param.token as any;
    return param.session;
  },
}

jest.mock("next-auth", () => {
  const originalModule = jest.requireActual('next-auth');
  
  return {
    __esModule: true,
    ...originalModule,
    getServerSession: jest.fn(({providers:[], session: mockSession, callbacks: mockCallback}) => {
      const resultSession = {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: { name: "Trevor Bashirian", token: "xxxxxxxxxxxxxxxxx" }
      };
      return resultSession  // return type is [] in v3 but changed to {} in v4
    }),
  };
});

jest.mock('../src/libs/getUserProfile', ()=>(token:string)=>{
  const userObj = {
    "success": true,
    "data": {
        "_id": "660146b8b7892cde399ee7a6",
        "name": "Trevor Bashirian",
        "tel": "000-9999999",
        "email": "admin1@gmail.com",
        "role": "admin",
        "createdAt": "2024-03-25T09:41:12.301Z",
        "__v": 0
    }
  }
  return Promise.resolve(userObj)
})


describe('Sign up Icon', () => {
  it('Sign up button disappear after login', async() => {
    const page = await Page()
    render(page)
    await waitFor(()=>{
      const signupbutton = screen.queryAllByTestId('Sign up')
      expect(signupbutton).toHaveLength(0)
    })
  })
})