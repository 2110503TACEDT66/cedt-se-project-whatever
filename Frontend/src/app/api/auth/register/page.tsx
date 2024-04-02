import User from '@/db/models/User';
import { dbConnect } from '@/db/dbConnect';
import Image from 'next/image';
import { redirect } from 'next/navigation';

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
      <Image
        src="/img/cover.jpg"
        alt="cover"
        fill={true}
        className="object-cover"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      <div className="flex justify-center items-center h-screen ">
        <div className="absolute border border-4 rounded-xl p-10 backdrop-blur-xl ">
          <h1 className="text-center text-3xl font-serif text-white m-5 font-bold">
            Registration
          </h1>
          <form action={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="rounded-2xl m-3 p-3 w-[400px] "
            />
            <br />
            <input
              type="text"
              name="tel"
              placeholder="Tel"
              className="rounded-2xl m-3 p-3 w-[400px]"
            />
            <br />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="rounded-2xl m-3 p-3 w-[400px]"
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="rounded-2xl m-3 p-3 w-[400px]"
              minLength={6}
            />
            <br />
            <button
              type="submit"
              className="bg-white hover:bg-fuchsia-900 hover:text-white text-black p-2 m-3 rounded-lg font-serif font-bold ">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
