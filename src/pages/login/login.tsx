import {Input} from '../../components';
import {Link} from 'react-router-dom';
import {login} from '../../services/authService';
import Logo from '../../assets/logo.png';

export function Login() {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const user = {
      email: target.email.value,
      password: target.password.value,
    };
    login(user);
  };

  return (
    <main className="flex flex-col items-center justify-center">
      <img src={Logo} className="w-56" />
      <h1 className="text-3xl text-white">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-6 px-4">
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
        />
        <button
          type="submit"
          className="bg-blue-950 p-2 text-white font-semibold"
        >
          Login
        </button>
        <span className="flex gap-2 items-center">
          <p className="text-sm text-gray-400">have not signed up yet ?</p>
          <Link to="/register" className="text-blue-400 font-semibold">
            register
          </Link>
        </span>
      </form>
    </main>
  );
}
