import styled from 'styled-components';
import useRecentBookings from './useRecentBookings';
import Spinner from '../../ui/Spinner';
import useRecentStays from './useRecentStays';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading1, bookings } = useRecentBookings();
  const { isLoading2, stays, confirmedStays } = useRecentStays();

  if (isLoading1 || isLoading2) return <Spinner />;

  console.log(bookings);
  return (
    <StyledDashboardLayout>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
