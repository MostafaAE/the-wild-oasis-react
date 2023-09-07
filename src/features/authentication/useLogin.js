import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: data => {
      queryClient.setQueryData(['user'], data.user);
      navigate('/dashboard', { replace: true });
    },
    onError: err => {
      console.log('Login Error', err);
      toast.error('Provided email or password are incorrect');
    },
  });

  return { isLoading, login };
}

export default useLogin;
