import Anchor from "@components/Anchor";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="flex flex-col gap-y-4 font-medium text-4xl tracking-widest">
        <Anchor title="Campaign" target="campaign" />
        <Anchor title="Persona" target="persona" />
      </div>
    </div>
  );
};

export default Home;
