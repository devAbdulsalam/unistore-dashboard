import Card from './Card';
const CardTable = ({ data }: any) => {
  return (
    <>
      {data?.length > 0 &&
        data?.map((item: any) => <Card key={item._id} data={item} />)}
    </>
  );
};

export default CardTable;
