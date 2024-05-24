import Breadcrumb from '../components/Breadcrumb.tsx';
const Payment = () => {
  // const enum status {
  //  PENDING, ACTIVE, INACTIVE, DELETED,
  // }
  // interface User {
  //   email: string,
  //   userName: string,
  //   googleId?: string,
  //   startTrail(): string
  // }
  // const abu: User = {
  //   email: '', userName: '', startTrail:() => {
  //   return "string"
  // }}
  // const paymet = status.ACTIVE

  return (
    <>
      <Breadcrumb pageName="Payment" />
      <div className="flex flex-col text-center gap-10 text-title-md font-bold text-black dark:text-white">
        <div>Payment</div>
        <div>Under Construction</div>
      </div>
    </>
  );
};

export default Payment;
