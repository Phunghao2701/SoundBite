import SoundCard from "./SoundCard";

const SoundGrid = ({ sounds }) => {
  if (sounds.length === 0)
    return (
      <p className="text-center text-slate-500">
        Không tìm thấy âm thanh nào...
      </p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {sounds.map((sound) => (
        <SoundCard key={sound.id} sound={sound} />
      ))}
    </div>
  );
};
export default SoundGrid;
