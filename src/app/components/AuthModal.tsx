import { Dialog } from './ui/dialog';
import { useState } from 'react';
import { useAuth } from './AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const { login, signup, user } = useAuth();

  // 🔧 če modal ni odprt ali je uporabnik že prijavljen → nič ne prikaži
  if (!open || user) return null;

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const success = login(email, password);

      if (success) {
        toast.success('Dobrodošli nazaj!');
        resetForm();
        setTimeout(() => onClose(), 100);
      } else {
        toast.error('Napačen email ali geslo');
      }
    } else {
      if (!name || !email || !password) {
        toast.error('Prosimo izpolnite vsa polja');
        return;
      }

      const success = signup(name, email, password);

      if (success) {
        toast.success('Račun uspešno ustvarjen!');
        resetForm();
        setTimeout(() => onClose(), 100);
      } else {
        toast.error('Email že obstaja');
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-full max-w-md z-50">
        <h2 className="text-2xl mb-4">
          {isLogin ? 'Prijava' : 'Ustvari račun'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="name">Polno ime</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Janez Novak"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="janez@example.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Geslo</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            {isLogin ? 'Prijava' : 'Registracija'}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          {isLogin ? (
            <p>
              Nimate računa?{' '}
              <button
                onClick={() => setIsLogin(false)}
                className="text-orange-500 hover:text-orange-600"
              >
                Registrirajte se
              </button>
            </p>
          ) : (
            <p>
              Že imate račun?{' '}
              <button
                onClick={() => setIsLogin(true)}
                className="text-orange-500 hover:text-orange-600"
              >
                Prijavite se
              </button>
            </p>
          )}
        </div>
      </div>
    </Dialog>
  );
}