interface TrackItemProps {
  id: string;
  track: Record<any, any>;
  onClick: React.EventHandler<any>;
  activeTrack: string | undefined;
}
export default function TrackItem({ id, track, onClick, activeTrack }: TrackItemProps) {
  return (
    <div className={`at-track ${activeTrack === id ? "active" : undefined}`} onClick={onClick}>
      <div className="at-track-icon">icon</div>
      <div className="at-track-details">
        <div className="at-track-name">{track.name}</div>
      </div>
    </div>
  );
}
