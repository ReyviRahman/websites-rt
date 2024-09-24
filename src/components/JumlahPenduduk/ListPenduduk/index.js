import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db, COLLECTION_BERKAS } from '../../../config/firestore'; 

const ListPenduduk = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_BERKAS));
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

  return (
    <div className="bg-white">
      <div className='flex justify-end'>
      <button type="button" class="bg-green-500 text-white font-bold py-1 px-5 rounded-md hover:bg-green-600">
        Tambah Data
      </button>

      </div>
      <table className="min-w-full shadow-md rounded-lg divide-y mt-3 divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jabatan</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Lengkap</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keterangan</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tanggalPengajuan}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.nama}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.nik}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.nik}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListPenduduk