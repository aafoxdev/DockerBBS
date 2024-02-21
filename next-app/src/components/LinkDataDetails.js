import Link from 'next/link';
import DataDetails from './DataDetails';

export default function LinkedDataDetails({ index, data }) {
    return (
    <Link href={`/edit/${data.id}`}>
        <div className="hover:bg-green-50">
            <DataDetails index={index} data={data} />
        </div>
    </Link>
    );
}