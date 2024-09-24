import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db, COLLECTION_PENDUDUK } from '../../config/firestore'; 
import imgTangan from '../../assets/images/img-tangan.png'
import iconIg from '../../assets/images/icon-ig.png'
import iconFb from '../../assets/images/icon-fb.png'


const DataPendudukUser = () => {
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

  return (
    <div className='h-screen flex flex-col'>
      <div className="container mx-auto p-6 bg-gray-100 mt-20">
        <div className="bg-white">
          <table className="min-w-full shadow-md rounded-lg divide-y mt-3 divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Lengkap</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jabatan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keterangan</th>
                
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-auto bg-primary">
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 py-8'>
          <div className="flex items-center space-x-4">
            <img className="w-32 h-32 object-cover" src={imgTangan} alt="" />
            <div>
              <p className='text-white'>Perumahan yeyes lestari III, RT 38, kelurahan kenali besar kecamatan alam barajo kota jambi, KOTA JAMBI, KOTA BARU, JAMBI, ID, 36129</p>
            </div>
          </div>
          <div className='ms-20 text-white flex flex-col items-center justify-center'>
            <div>
              <h1 className='text-center font-semibold text-xl'>Kontak Kami</h1>
              <h1 className='text-center text-lg'>+62 8000-0000-0000</h1>
            </div>
            <div className='flex gap-4 mt-1'>
              <img className="object-cover" src={iconFb} alt="" />
              <img className="object-cover" src={iconIg} alt="" />
            </div>
          </div>
        </div>
      </div>

    </div>
    
  )
}

export default DataPendudukUser