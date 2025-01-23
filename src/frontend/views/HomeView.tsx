import icon from '../../../assets/icon.svg';

export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <img className="bg-blue-500 h-12" src={icon} alt="icon" />
        <h1 className="text-4xl font-bold text-center text-blue-500">
          Hello World!
        </h1>
      </div>
    </div>
  );
}
