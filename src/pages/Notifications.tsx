import Breadcrumb from '../components/Breadcrumb';
import TableThree from '../components/TableThree';

const Notifications = () => {
  return (
    <>
      <Breadcrumb pageName="Notifications" />
      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </>
  );
};

export default Notifications;
