import { useState } from 'react';
import { Link } from 'react-router-dom';

import ErrorForm from '@/components/errors-form';
import Input from '@/components/input';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAcceptpp, setIsAcceptpp] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = 'Email is not valid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (
      !/^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).*$/.test(
        password,
      )
    ) {
      newErrors.password =
        'The password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.';
    }

    if (!isAcceptpp) {
      newErrors.isAcceptpp = 'Please accept the Privacy Policy to continue.';
    }

    return newErrors;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await fetch(`/api/auth/register`, {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const data = await res.json();

        if (data.ok === false) {
          setMessage('Email is already in use');
        } else {
          setMessage('You can login now');
        }
      } catch (error) {
        setMessage('An error occurred');
      }
    }
  };

  return (
    <div className='bg-secondary flex min-h-screen flex-col'>
      <div className='flex flex-1 items-center justify-center pr-8 pl-8'>
        <div className='text-primary top-0 z-2 w-full max-w-3xl self-start bg-transparent'>
          <div className='relative top-0 flex flex-col items-center gap-4 text-center'>
            <img
              className='h-32 w-auto md:h-42'
              src='/assets/logo-label.png'
              alt='Logo Label'
            />
            <h1 className='mb-5 text-3xl font-light tracking-wide'>
              {'REGISTER'}
            </h1>
            <form className='w-full max-w-xl' onSubmit={handleSubmit}>
              <div className='flex flex-col gap-2'>
                <Input
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  className='bg-primary w-full'
                />
                {errors.email ? <ErrorForm error={errors.email} /> : null}

                <Input
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  className='bg-primary w-full'
                />
                {errors.password ? <ErrorForm error={errors.password} /> : null}

                <div className='flex items-center gap-2'>
                  <Input
                    id='acceptpp'
                    type='checkbox'
                    name='acceptpp'
                    className='h-4 w-4 accent-[var(--color-orange)]'
                    checked={isAcceptpp}
                    onChange={(event) => {
                      setIsAcceptpp(event.target.checked);
                    }}
                  />
                  <label htmlFor='acceptpp' className='text-sm select-none'>
                    {'Please accept the '}
                    <Link
                      to='/privacy-policy'
                      className='hover:text-primary text-[var(--color-orange)] hover:underline'
                      target='_blank'
                    >
                      {'Privacy Policy'}
                    </Link>
                  </label>
                </div>
                {errors.isAcceptpp ? (
                  <ErrorForm error={errors.isAcceptpp} />
                ) : null}

                <Input
                  type='submit'
                  value='Register'
                  name='submit'
                  className='bg-primary hover:text-primary w-full self-center !rounded-full text-black transition duration-300 ease-in-out hover:bg-[var(--color-orange)] md:w-1/2'
                />
                {message ? (
                  <div className='mt-2 text-center text-sm'>{message}</div>
                ) : null}
                <div className='mt-4 flex flex-col items-center gap-1 text-sm'>
                  <Link
                    to='/sign-in'
                    className='group hover:text-primary hover:underline'
                  >
                    {'Already have an account ? '}
                    <span className='group-hover:text-primary text-[var(--color-orange)]'>
                      {'Sign In'}
                    </span>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        <img
          className='lg:w-1xl pointer-events-none fixed right-0 bottom-0 w-md md:w-xl'
          src='/assets/vinyl.png'
          alt='Vinyle'
        />
      </div>
    </div>
  );
}

// import type { FormEvent } from "react";
// import { useState } from "react";

// export default function Register() {
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [message, setMessage] = useState("");

// 	const login = async (event: FormEvent) => {
// 		event.preventDefault();
// 		try {
// 			const res = await fetch(`/api/auth/register`, {
// 				method: "POST",
// 				body: JSON.stringify({ email, password }),
// 				headers: { "Content-Type": "application/json" },
// 				credentials: "include",
// 			});
// 			const data = await res.json();

// 			if (data.ok === false) {
// 				setMessage("email is already in use");
// 			} else {
// 				setMessage("you can login now");
// 			}
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	};

// 	return (
// 		<form
// 			onSubmit={async (event) => {
// 				await login(event);
// 			}}
// 		>
// 			<label htmlFor="email" />
// 			<input
// 				type="email"
// 				value={email}
// 				onChange={(event) => {
// 					setEmail(event.target.value);
// 				}}
// 				className="bg-amber-300"
// 				placeholder="Email"
// 			/>
// 			<label htmlFor="" />
// 			<input
// 				type="password"
// 				value={password}
// 				onChange={(event) => {
// 					setPassword(event.target.value);
// 				}}
// 				className="bg-amber-300"
// 				placeholder="Password"
// 			/>
// 			<button type="submit" className="rounded-md bg-gray-500 text-center">
// 				{"Register\r"}
// 			</button>
// 			{message ? <p>{message}</p> : null}
// 		</form>
// 	);
// }
