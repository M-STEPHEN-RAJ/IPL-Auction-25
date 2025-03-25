
import LoginForm from '@/components/LoginForm';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div 
        className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-ipl-blue/20 via-ipl-purple/10 to-ipl-orange/20"
      >
        <div className="w-full max-w-screen-xl mx-auto grid md:grid-cols-2 gap-6 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 relative">
              <span className="ipl-gradient bg-clip-text text-transparent animate-pulse-light">
                IPL Auction 
              </span>
              <span className="block mt-2 text-ipl-slate">Management System</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
              A premium platform for team owners and administrators to manage the IPL auction process with precision and elegance.
            </p>
            <div className="hidden md:flex space-x-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-ipl-purple mb-1">8</div>
                <div className="text-sm text-gray-500">Teams</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ipl-blue mb-1">120</div>
                <div className="text-sm text-gray-500">Players</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ipl-orange mb-1">50 Cr</div>
                <div className="text-sm text-gray-500">Team Purse</div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center md:justify-end">
            <LoginForm />
          </div>
        </div>
      </div>
      
      <footer className="bg-ipl-slate text-white py-4">
        <div className="container mx-auto text-center text-sm">
          IPL Auction Management System © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Index;
