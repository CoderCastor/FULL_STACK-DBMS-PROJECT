import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  const goToChooseUser = () => {
    navigate('/choose-user');  // Navigates to ChooseUser page
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold">Welcome to the Application</h1>
        <p className="mt-4 text-lg text-gray-600">
          Please proceed to select your role and log in.
        </p>
        <button
          className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-700"
          onClick={goToChooseUser}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;