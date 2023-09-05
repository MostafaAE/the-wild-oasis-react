import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';

import { toast } from 'react-hot-toast';

function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: bookingId => deleteBookingApi(bookingId),
    onSuccess: data => {
      toast.success(`Booking #${data.id} successfully deleted`);
      queryClient.invalidateQueries('bookings');
    },
    onError: () => toast.error('There was an error while deleteing booking'),
  });

  return { isDeleting, deleteBooking };
}

export default useDeleteBooking;
