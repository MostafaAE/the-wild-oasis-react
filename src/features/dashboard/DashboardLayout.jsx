import styled from 'styled-components';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
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
