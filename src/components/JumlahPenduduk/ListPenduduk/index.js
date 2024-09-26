import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db, COLLECTION_PENDUDUK } from '../../../config/firestore'; 
import Swal from 'sweetalert2';

const ListPenduduk = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_PENDUDUK));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(items);
      console.log(data)
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Hapus Data?',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
    }).then(async result => {
      Swal.fire({
        title: 'Loading',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); 
        }
      });

      if (result.value) {
        await deleteDoc(doc(db, COLLECTION_PENDUDUK, id));

        Swal.fire({
          icon: 'success',
          title: 'Data Berhasil DiHapus!',
          showConfirmButton: false,
        });

        const dataCopy = data.filter(dataa => dataa.id !== id);
        setData(dataCopy);
      }
    });
  };

  return (
    <div className="bg-white">
      <div className='flex justify-end'>
      <button type="button" onClick={() => navigate('/dashboardadmin/datapenduduk/add')} class="bg-green-500 text-white font-bold py-1 px-5 rounded-md hover:bg-green-600"
      >
        Tambah Data
      </button>

      </div>
      <table className="min-w-full shadow-md rounded-lg divide-y mt-3 divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Lengkap</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jabatan</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keterangan</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit Data</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hapus Data</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.nama}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.jabatan}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <img src={item.fotoUrl} width={120} alt="" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.keterangan}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button 
                  type="button" 
                  className="bg-blue-500 text-white font-bold py-1 px-3 rounded-md hover:bg-blue-600"
                  onClick={() => navigate(`/dashboardadmin/datapenduduk/${item.id}`)}
                >
                  Edit
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button 
                  type="button" 
                  className="bg-red-500 text-white font-bold py-1 px-3 rounded-md hover:bg-red-600"
                  onClick={() => handleDelete(item.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListPenduduk