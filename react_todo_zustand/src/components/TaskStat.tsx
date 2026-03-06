interface Prop {
	statCount: number;
	statName: string;
	style: string;
}
export const TaskStat = ({ statCount, statName, style }: Prop) => {
	return (
		<div className="flex-1 p-4 rounded-[10px] border border-[#e5e7eb]  bg-white dark:bg-[#121212]">
			<h2 className={`text-[22px] font-bold ${style}`}>{statCount}</h2>
			<p className="dark:text-white">{statName}</p>
		</div>
	);
};
