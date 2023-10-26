import { useState } from "react";
import Image from "next/image";
interface TrackItemProps {
  id: string;
  track: Record<any, any>;
  onClick: React.EventHandler<any>;
  activeTrack: string | undefined;
}
export default function TrackItem({ id, track, onClick, activeTrack }: TrackItemProps) {
  const [imgSrc, setImgSrc] = useState(`/icons/${track.shortName}.png`);
  return (
    <div className={`at-track ${activeTrack === id ? "active" : undefined}`} onClick={onClick}>
      <div className="at-track-icon">
        <Image src={imgSrc} width={48} height={48} alt={track.name} onError={e => setImgSrc("/icons/004-flute.png")} />
      </div>
      <div className="at-track-details">
        <div className="at-track-name">{track.name}</div>
      </div>
    </div>
  );
}
