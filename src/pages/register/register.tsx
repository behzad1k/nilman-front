import {Link} from 'react-router-dom';
import {Input} from '../../components';
import {signup} from '../../services/authService';
import Logo from '../../assets/logo.png';

export function Register() {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const user = {
      displayName: target.displayName.value,
      username: target.username.value,
      email: target.email.value,
      password: target.password.value,
    };
    console.log(user);
    const response = signup(user);
    console.log(response);
  };

  return (
    <main className="flex flex-col items-center justify-center">
      <img src={Logo} className="w-56" />

      <h1 className="text-3xl text-white">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-6 px-4">
        <Input
          name="displayName"
          type="text"
          placeholder="display name"
          required
          autoComplete="off"
        />
        <Input
          name="username"
          type="text"
          placeholder="username"
          required
          autoComplete="off"
        />
        <Input
          name="email"
          type="email"
          placeholder="email"
          required
          autoComplete="off"
        />
        <Input
          name="password"
          type="password"
          placeholder="password"
          required
          minLength={6}
          maxLength={16}
          autoComplete="off"
        />
        <button
          type="submit"
          className="bg-blue-950 p-2 text-white font-semibold"
        >
          Register
        </button>
        <span className="flex gap-2 items-center">
          <p className="text-sm text-gray-400">signed up before ?</p>
          <Link to="/login" className="text-blue-400 font-semibold">
            login
          </Link>
        </span>
      </form>
    </main>
  );
}
