/* eslint-disable react/prop-types */
import { useContext } from 'react';
import AuthContext from '../context/authContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import getError from '../hooks/getError';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import imageIcon from './../assets/img/icons/office.png';
import Modal from './Modal';
const DeleteAssetModal = ({ show, setShow, setLoading, loading }) => {
	const { user, selectedProduct, setSelectedProduct } = useContext(AuthContext);
	const apiUrl = import.meta.env.VITE_API_URL;
	const config = {
		headers: {
			Authorization: `Bearer ${user?.token}`,
		},
	};
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const handleDelete = async (asset) => {
		setLoading(true);
		setShow(false);
		if (!asset._id) {
			return toast.success('Invalid Asset');
		}
		try {
			axios
				.delete(`${apiUrl}/assets/${asset._id}`, config)
				.then((res) => {
					if (res.data) {
						toast.success('Asset deleted successfully');
					}
					queryClient.invalidateQueries(['asset', asset._id]);
					navigate('/assets');
				})
				.catch((error) => {
					const message = getError(error);
					toast.error(message);
				})
				.finally(() => {
					setLoading(false);
					setShow(false);
					setSelectedProduct('');
				});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Modal show={show}>
			<div className="transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all font-josefin">
				<div className="space-y-5 p-4">
					<div className="flex justify-between">
						<div>
							<p className="font-semibold text-lg text-primary">Delete Asset</p>
						</div>
						<button
							onClick={() => setShow(false)}
							className="m-1 p-2 py-1 shadow rounded-full hover:bg-red-300 duration-150 ease-in-out"
						>
							<i className="fa-solid fa-xmark text-xl text-red-300 hover:text-red-500" />
						</button>
					</div>
					<div className="p-2">
						<p className="text-center ">
							Are you sure you want to delete this Asset?
						</p>
						<div className="flex items-center space-x-5">
							<img
								className="w-[60px] h-[60px] rounded-md"
								src={
									selectedProduct?.image?.url ||
									selectedProduct?.image ||
									imageIcon
								}
								alt={selectedProduct?.name}
							/>
							<p className=" text-center">{selectedProduct?.name}</p>
						</div>
					</div>
					<button
						disabled={loading}
						className="bg-red-500 hover:bg-red-400 text-white font-semibold h-10 py-1 w-full flex items-center justify-center rounded-md transition-all duration-500 ease-in-out"
						onClick={() => handleDelete(selectedProduct)}
					>
						<span>Delete Asset</span>
						<i className="fa-solid fa-delete text-2xl text-primary"></i>
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default DeleteAssetModal;
