import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { TbPlaylistAdd } from 'react-icons/tb';
import Modal from '../../components/Modal';
import axiosInstance from '../../hooks/axiosInstance';

import toast from 'react-hot-toast';
import AddMetaDataForm from '../../components/rental/AddMetaDataForm';
import UpdateMetaDataForm from '../../components/rental/UpdateMetaDataForm';

const MyMetaData = () => {
  const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editableMetaData, setEditableMetaData] = useState();
  const {
    data: myMetaData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['myMetaData'],
    queryFn: async () => {
      const response = await axiosInstance.get('/metadata/lessor');

      return response.data.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/metadata/${id}`);
      return response.data.data;
    },
    onSuccess: () => {
      toast.success('meta data deleted successfully');
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDelete = async (id) => {
    await deleteMutation.mutate(id);
  };

  const handleEdit = async (id) => {
    setOpenEdit(true)
    const data = myMetaData.find((c) => c._id === id);
    console.log(data)
    
    setEditableMetaData(data);
  }
  if (isLoading) return <div>Loading...</div>;
console.log(myMetaData)
  return (
    <div className='container mx-auto p-2 md:p-6'>
      <div className='flex justify-end'>
        <button onClick={() => setOpen(true)} className='py-2 px-4 bg-[#FF4D30] text-white rounded'>
          Add Meta Data
        </button>
      </div>
      <h1 className='text-2xl font-semibold mb-4'>My Meta Data ({myMetaData?.length > 0 ? myMetaData?.length : 0})</h1>

      {myMetaData.length > 0 && (
        <div className='overflow-x-auto bg-white shadow-md rounded-lg'>
          <table className='min-w-full leading-normal'>
            <thead>
              <tr>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Entity Name</th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Entity Email</th>

                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Key</th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Value</th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myMetaData.map((data) => (
                <tr key={data._id}>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{data.entity.name}</p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{data.entity?.email}</p>
                  </td>

                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{data.key}</p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <img src={data.value} className='w-12 h-12' alt='' />
                  </td>

                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <div className='flex items-center space-x-4'>
                      <button onClick={() => handleEdit(data._id)} className='text-blue-600 hover:text-blue-900'>
                        <MdEdit className='w-5 h-5' />
                      </button>
                      <button onClick={() => handleDelete(data._id)} className='text-red-600 hover:text-red-900'>
                        <MdDelete className='w-5 h-5' />
                      </button>
                      <button
                        // onClick={() => handleSubCategory(category?._id)}
                        className='text-gray-600 hover:text-gray-900'
                      >
                        {/* <MdMoreVert className='w-5 h-5' /> */}
                        <TbPlaylistAdd className='w-5 h-5' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Meta Data Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className=' w-96 overflow-y-auto max-h-[80vh]'>
          <AddMetaDataForm setOpen={setOpen} refetch={refetch} />

          <div className='flex gap-4 py-2'>
            <button className='btn rounded border p-1 w-full' onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button onClick={() => setOpen(false)} className='btn bg-[#FF4D30] rounded p-1 w-full'>
              OK
            </button>
          </div>
        </div>
      </Modal>

      {/* Update Category Modal */}
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <div className=' w-96'>
          <UpdateMetaDataForm setOpen={setOpen} editableMetaData={editableMetaData} refetch={refetch} />

          <div className='flex gap-4 py-2'>
            <button className='btn rounded border p-1 w-full' onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button onClick={() => setOpen(false)} className='btn bg-[#FF4D30] rounded p-1 w-full'>
              OK
            </button>
          </div>
        </div>
      </Modal>

      {myMetaData.length === 0 && <div className='flex justify-center items-center min-h-screen text-pink-500 text-4xl'>You didnot added any meta data. Please Add a meta data and verify your account</div>}
    </div>
  );
};

export default MyMetaData;
