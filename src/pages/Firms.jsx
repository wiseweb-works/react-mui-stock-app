import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItem } from '../redux/reducer/dashboardReducer';

const Firms = () => {
  const { firms } = useSelector((state) => state.dashboard);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!firms.length > 0) dispatch(getItem({ item: 'firms', token }));
  }, [dispatch, token]);

  return (
    <div>
      Firms Page
      {firms.map((firm) => {
        return (
          <div
            key={firm.id}
            style={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              marginBottom: '20px',
              gap: '10px',
            }}
          >
            <img
              src={firm.image}
              alt={firm.name}
              width={150}
              // style={{ border: '2px solid red' }}
            />
            <div>
              <p>{firm.phone}</p>
              <p>{firm.address}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Firms;
