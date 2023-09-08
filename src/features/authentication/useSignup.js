import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp as signUpApi } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

function useSignup() {
  const queryClient = useQueryClient();
  const { isLoading: isSigningUp, mutate: signup } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signUpApi({ fullName, email, password }),
    onSuccess: data => {
      console.log(data);
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      );
    },
    onError: error => console.log(error.message),
  });

  return { isSigningUp, signup };
}

export default useSignup;
