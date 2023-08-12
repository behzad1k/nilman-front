export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="px-4 py-2 bg-gray-700 rounded-sm placeholder-white placeholder-opacity-50 text-lg caret-white text-white focus-within:outline-none"
    />
  );
}
