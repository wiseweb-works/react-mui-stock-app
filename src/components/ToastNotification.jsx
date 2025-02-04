import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (type, message) => {
  if (type === 'success') {
    toast.success(message, { position: 'top-right' });
  } else if (type === 'error') {
    toast.error(message, { position: 'top-right' });
  } else {
    toast.info(message, { position: 'top-right' });
  }
};

const ToastNotification = () => {
  return <></>;
};

export default ToastNotification;
