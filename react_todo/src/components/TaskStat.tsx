interface Prop {
  statCount: number;
  statName: string;
  style: string;
}
export const TaskStat = ({ statCount, statName, style }: Prop) => {
  return (
    <div className="card">
      <h2 className={`status ${style}`}>{statCount}</h2>
      <p>{statName}</p>
    </div>
  );
};
