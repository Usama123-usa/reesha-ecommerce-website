import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="pt-32 pb-20 px-4 min-h-[70vh] flex flex-col items-center justify-center text-center">
      <h1 className="font-display-lg text-display-lg text-primary mb-4 italic">404</h1>
      <p className="font-body-lg text-body-lg text-secondary mb-8">
        We couldn't find the page you're looking for.
      </p>
      <Link 
        to="/" 
        className="px-8 py-3 bg-primary text-on-primary font-label-caps rounded-lg hover:bg-on-primary-fixed-variant transition-all shadow-lg"
      >
        Return Home
      </Link>
    </main>
  );
}
