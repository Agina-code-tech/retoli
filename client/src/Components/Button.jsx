import { useNavigate } from 'react-router-dom';

export default function Button({ text, to, variant = 'primary' }) {
  const navigate = useNavigate();

  const base = 'px-6 py-3 rounded-lg font-medium transition';
  const styles = {
    primary: 'bg-white text-black',
    outline: 'border border-gray-600 text-white',
  };

  return (
    <button
      onClick={() => navigate(to)}
      className={`${base} ${styles[variant]}`}
    >
      {text}
    </button>
  );
}
