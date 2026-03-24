interface Props {
	title: string;
	children: React.ReactNode;
}

const JobListing: React.FC<Props> = ({ title, children }) => {
	return (
		<div className="w-full min-w-87.5 bg-white border border-gray-200 rounded-xl p-4 shadow-sm ">
			<h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
				{title}
			</h2>

			<div className=" flex flex-col space-y-4">
				<div className="flex flex-col space-y-3">{children}</div>
			</div>
		</div>
	);
};

export default JobListing;
