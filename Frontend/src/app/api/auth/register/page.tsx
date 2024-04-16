import User from '@/db/models/User';
import { dbConnect } from '@/db/dbConnect';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { TextField } from '@mui/material';

export default async function registerPage() {
  const registerUser = async (registerUserForm: FormData) => {
    'use server';
    const name = registerUserForm.get('username');
    const tel = registerUserForm.get('tel');
    const email = registerUserForm.get('email');
    const password = registerUserForm.get('password');

    try {
      await dbConnect();
      const user = await User.create({
        name: name,
        tel: tel,
        email: email,
        password: password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (registerUserForm: FormData) => {
    'use server';

    await registerUser(registerUserForm);
    redirect('/');
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen ">
        <div className="absolute border border-4 border-cyan-500 rounded-xl p-10 backdrop-blur-xl ">
          <h1 className="text-center text-3xl font-serif text-cyan-500 mb-10 font-bold">
            Registration
          </h1>
          <form action={handleSubmit} className='flex flex-col'>
            <TextField id="username" name="username" label="Username" type="text" required className='pl-3 pb-3'
                placeholder="John Smith" InputProps={{
                  style: {
                    borderRadius: "16px",
                    width: "400px",
                    height: "52px",
                    background: "white"
                  }
                }} InputLabelProps={{
                  style: {
                    padding: "0 0 0 12px"
                  }
                }}/>
            <TextField id="tel" name="tel" label="Tel" className="pl-3 pb-3" type="text" required
                placeholder="012-345-6789" InputProps={{
                  style: {
                    borderRadius: "16px",
                    width: "400px",
                    height: "52px",
                    background: "white"
                  }
                }} InputLabelProps={{
                  style: {
                    padding: "0 0 0 12px"
                  }
                }}/>
            <TextField id="email" name="email" label="Email" className="pl-3 pb-3" type='email' required
                placeholder="Email@XXX.com" InputProps={{
                  style: {
                    borderRadius: "16px",
                    width: "400px",
                    height: "52px",
                    background: "white"
                  }
                }} InputLabelProps={{
                  style: {
                    padding: "0 0 0 12px"
                  }
                }}/>
            <TextField id="password" name="password" label="Password" className="pl-3 pb-3" type="password" required 
                placeholder="password" InputProps={{
                  style: {
                    borderRadius: "16px",
                    width: "400px",
                    height: "52px",
                    background: "white"
                  }
                }} InputLabelProps={{
                  style: {
                    padding: "0 0 0 12px"
                  }
                }}/>
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 m-3 rounded-lg font-serif font-bold ">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
