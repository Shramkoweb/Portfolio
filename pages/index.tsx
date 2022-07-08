import { Container } from '@/components/container';

function IndegPage() {
  return (
    <Container>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          throw new Error('Sentry Frontend Error');
        }}
      >
        Throw error
      </button>
    </Container>
  );
}

export default IndegPage;
