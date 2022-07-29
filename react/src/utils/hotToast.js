import toast from 'react-hot-toast';

const hotToast = (status, text) => {
  switch (status) {
    case 'success':
      toast.success(text, {
        duration: 3000,
        style: {
          padding: '20px',
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      break;
    case 'error': {
      toast.error(text, {
        duration: 3000,
        style: {
          padding: '20px',
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      break;
    }
  }
};

export default hotToast;
