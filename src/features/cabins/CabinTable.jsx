import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';

function filterCabins(cabins, filterBy) {
  if (filterBy === 'all') return cabins;

  return cabins.filter(cabin =>
    filterBy === 'no-discount' ? !cabin.discount : cabin.discount
  );
}

function CabinTable() {
  const { isLoading, error, cabins } = useCabins();
  const [searchParams, setSearchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  const filterBy = searchParams.get('discount') || 'all';

  const filteredCabins = filterCabins(cabins, filterBy);

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filteredCabins}
          render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
