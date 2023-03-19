import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import IConference from 'types/conference.interface';
import Filter from './Filter';
import Header from './Header';
import Room from './Room';

const page = async () => {
	const session = await getServerSession();
	const typeLabels = ['Все', 'Открытые', 'Закрытые'];
	const timeLabels = ['Все', 'Сегодня', 'Завтра', 'На этой неделе'];
	const conferences: IConference[] = await (
		await fetch('https://aresmeta-back.sqkrv.com/conferences')
	).json();

	if (session?.user?.email) {
		return (
			<div className="grid h-screen grid-rows-[100px,1fr]">
				<Header />
				<div className="grid grid-cols-1 h-full container mx-auto">
					<div className="p-4 grid grid-rows-[auto,1fr] gap-4 max-h-[calc(100vh_-_100px)]">
						<div className="bg-white rounded-xl">
							<Filter filterLabels={typeLabels} />
							<Filter filterLabels={timeLabels} />
						</div>
						<div className="flex flex-col gap-4 pr-4 overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600 scrollbar-thumb-rounded">
							{conferences.map(({ name, datetime, id, visibility }) => (
								<Room name={name} datetime={datetime} key={id} isPublic={visibility === 'public'} />
							))}
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		redirect('/auth');
	}
};

export default page;